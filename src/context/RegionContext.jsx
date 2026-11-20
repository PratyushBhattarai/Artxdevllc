// src/context/RegionContext.jsx
//
// Shares the NEP / US choice (the floating pill in the navbar) with the whole site,
// so pages like Contact can show the matching office details.
// The choice is remembered in the browser between visits.

import { createContext, useContext, useEffect, useState } from 'react';

const STORAGE_KEY = 'artx-region';
const DEFAULT_REGION = 'USA'; // first-time visitors see the USA office
const RegionContext = createContext({ region: DEFAULT_REGION, setRegion: () => {} });

const readSaved = () => {
  try {
    const saved = window.localStorage.getItem(STORAGE_KEY);
    return saved === 'USA' || saved === 'Nepal' ? saved : DEFAULT_REGION;
  } catch {
    return DEFAULT_REGION;
  }
};

export const RegionProvider = ({ children }) => {
  const [region, setRegion] = useState(readSaved);

  useEffect(() => {
    try {
      window.localStorage.setItem(STORAGE_KEY, region);
    } catch {
      /* storage blocked (private mode) – the choice just won't be remembered */
    }
  }, [region]);

  return <RegionContext.Provider value={{ region, setRegion }}>{children}</RegionContext.Provider>;
};

// eslint-disable-next-line react-refresh/only-export-components
export const useRegion = () => useContext(RegionContext);
