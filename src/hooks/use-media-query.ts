// custom-hooks/useMediaQuery.ts
import { useState, useEffect } from 'react';

export const useMediaQuery = (query: string) => {
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    const mediaQueryList = window.matchMedia(query);
    const listener = (event: MediaQueryListEvent) => setMatches(event.matches);
    mediaQueryList.addEventListener('change', listener);

    // Set the initial value
    setMatches(mediaQueryList.matches);

    // Clean up the event listener on unmount
    return () => mediaQueryList.removeEventListener('change', listener);
  }, [query]);

  return matches;
};
