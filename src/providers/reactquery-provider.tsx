"use client";

import {
  DefaultOptions,
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";
import { ReactNode } from "react";
interface ReactQueryProviderType {
  children: ReactNode;
}

const defaultOptions: DefaultOptions = {
  queries: {
    staleTime: 1000 * 60 * 5, // داده‌ها تا ۵ دقیقه معتبره
    gcTime: 1000 * 60 * 10, // کش برای ۱۰ دقیقه نگه‌داری میشه
    retry: 2, // دو بار سعی مجدد در صورت خطا
    refetchOnWindowFocus: false, // وقتی برمی‌گرده به تب، دوباره fetch نکن
    refetchOnReconnect: true, // موقع وصل شدن اینترنت، دوباره بگیر
  },
  mutations: {
    retry: 1, // فقط یه بار تلاش مجدد برای mutation‌ها
  },
};

export const queryClient = new QueryClient({
  defaultOptions,
});

export default function ReactQueryProvider({
  children,
}: ReactQueryProviderType) {
  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
}
