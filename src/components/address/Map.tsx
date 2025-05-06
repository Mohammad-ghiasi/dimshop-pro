"use client";

import "leaflet/dist/leaflet.css";
import { useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";
import addressFinder from "@/lib/addressFinder";
import Image from "next/image";
import { TileLayer, useMap } from "react-leaflet";
import AddressForm from "./AddressForm";
import { singleAddress } from "@/types/useProfile";
import getCoordinatesFromCityName from "@/lib/geocode";
import { Input } from "../ui/input";
import debounce from "lodash.debounce";

const MapContainer: any = dynamic(
  () => import("react-leaflet").then((mod) => mod.MapContainer),
  { ssr: false }
);

export default function GoogleMapWithLeaflet({
  editMode,
  userOwnAddressInfo,
}: {
  editMode: boolean;
  userOwnAddressInfo?: singleAddress;
}) {
  const [mapCenter, setMapCenter] = useState<[number, number]>([
    35.6892, 51.389,
  ]);
  const [userAddress, setUserAddress] = useState("");
  const [loading, setLoading] = useState(false);
  const [isMoving, setIsMoving] = useState(false);
  const [cityInput, setCityInput] = useState("");
  const cityInputRef: any = useRef<HTMLInputElement>(null);

  const mapRef = useRef<any>(null);

  useEffect(() => {
    const fetchAddress = async () => {
      setLoading(true);
      try {
        const response = await addressFinder(mapCenter[0], mapCenter[1]);
        setUserAddress(response);
      } catch (error) {
        console.error("Failed to fetch address:", error);
        setUserAddress("خطا در دریافت آدرس");
      } finally {
        setLoading(false);
      }
    };

    fetchAddress();
  }, [mapCenter]);

  const handleCitySearch = async (cityName: string) => {
    if (!cityName.trim()) return;

    try {
      const coords = await getCoordinatesFromCityName(cityName);

      setMapCenter(coords);
      mapRef.current?.setView(coords, 13); // نقشه را به مختصات جدید ببرید
    } catch (error) {
      console.error("خطا در جستجوی شهر:", error);
    }
  };

  const debouncedSearch = useRef(
    debounce(async (cityName: string) => {
      await handleCitySearch(cityName); // در اینجا handleCitySearch را فراخوانی می‌کنیم
    }, 1000)
  ).current;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setCityInput(value); // مقدار ورودی را در state ذخیره می‌کنیم
    debouncedSearch(value);
  };
  return (
    <div className="w-full space-y-3">
      {/* سرچ شهر */}
      <div className="px-3 md:px-6">
        <Input
          type="text"
          placeholder="نام شهر را وارد کنید..."
          value={cityInput}
          // onChange={(e) => setCityInput(e.target.value)}
          onChange={handleChange}
          className="w-full bg-input text-xs md:text-sm py-2"
        />
      </div>

      {/* نقشه */}
      <MapContainer
        center={mapCenter}
        zoomControl={false}
        zoom={16}
        whenCreated={(mapInstance: any) => {
          mapRef.current = mapInstance;
        }}
        className="h-[300px] md:h-[450px] w-full shadow-sm overflow-hidden z-0"
      >
        <MapController coords={mapCenter} mapRef={mapRef} />

        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

        <MapEventsHandler
          setMapCenter={setMapCenter}
          setIsMoving={setIsMoving}
        />

        <div
          className={`absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-[1000] pointer-events-none transition-all ${
            isMoving
              ? "shadow-2xl scale-110 translate-y-[-20px]"
              : "shadow-none"
          }`}
        >
          <Image src="/location-pin.png" alt="marker" width={35} height={35} />
        </div>
      </MapContainer>

      {/* فرم آدرس */}
      <AddressForm
        defaulValueMap={userAddress}
        loading={loading}
        userAddress={userOwnAddressInfo}
        editeMode={editMode}
      />
    </div>
  );
}

function MapEventsHandler({
  setMapCenter,
  setIsMoving,
}: {
  setMapCenter: (pos: [number, number]) => void;
  setIsMoving: (moving: boolean) => void;
}) {
  const map = useMap();

  useEffect(() => {
    const onMoveStart = () => setIsMoving(true);
    const onMoveEnd = () => {
      setIsMoving(false);
      const newCenter = map.getCenter();
      setMapCenter([newCenter.lat, newCenter.lng]);
    };

    map.on("movestart", onMoveStart);
    map.on("moveend", onMoveEnd);

    return () => {
      map.off("movestart", onMoveStart);
      map.off("moveend", onMoveEnd);
    };
  }, [map, setMapCenter, setIsMoving]);

  return null;
}
function MapController({
  coords,
  mapRef,
}: {
  coords: [number, number];
  mapRef: any;
}) {
  const map = useMap();

  useEffect(() => {
    // فقط وقتی که مختصات تغییر کرده باشند، نقشه به موقعیت جدید برود
    if (map && coords && mapRef.current) {
      const currentCenter = map.getCenter();
      // مقایسه موقعیت فعلی با موقعیت جدید برای جلوگیری از فراخوانی اضافی
      if (currentCenter.lat !== coords[0] || currentCenter.lng !== coords[1]) {
        map.setView(coords, map.getZoom(), { animate: true });
      }
    }
  }, [coords, map, mapRef]);

  useEffect(() => {
    if (mapRef && map) {
      mapRef.current = map;
    }
  }, [map, mapRef]);

  return null;
}
