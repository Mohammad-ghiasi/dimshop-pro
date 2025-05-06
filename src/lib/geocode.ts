export default async function getCoordinatesFromCityName(
  city: string
): Promise<[number, number]> {
  const response = await fetch(
    `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(
      city
    )}`
  );
  const data = await response.json();
  if (data && data.length > 0) {
    return [parseFloat(data[0].lat), parseFloat(data[0].lon)];
  } else {
    throw new Error("مختصاتی برای این شهر پیدا نشد");
  }
}
