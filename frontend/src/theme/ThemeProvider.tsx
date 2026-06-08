import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { ThemeProvider } from '@mui/material';
import { themeCreator } from './base';
import { StylesProvider } from '@mui/styles';
import { CacheProvider } from '@emotion/react';
import createCache from '@emotion/cache';
import stylisRTLPlugin from 'stylis-plugin-rtl';
import { useTranslation } from 'react-i18next';

const isPrerender =
  typeof navigator !== 'undefined' &&
  navigator.userAgent.toLowerCase().indexOf('prerender') !== -1;

const cacheRtl = createCache({
  key: 'bloom-ui-rtl',
  prepend: true,
  speedy: !isPrerender,
  // @ts-ignore
  stylisPlugins: [stylisRTLPlugin]
});

const cacheLtr = createCache({
  key: 'bloom-ui-ltr',
  prepend: true,
  speedy: !isPrerender
});

export const ThemeContext = React.createContext(
  (themeName: string): void => {}
);

export type ColorMode = 'light' | 'dark';

interface ColorModeContextValue {
  mode: ColorMode;
  setMode: (mode: ColorMode) => void;
  toggleMode: () => void;
}

export const ColorModeContext = React.createContext<ColorModeContextValue>({
  mode: 'light',
  setMode: () => {},
  toggleMode: () => {}
});

const ThemeProviderWrapper: React.FC = (props) => {
  const storedMode = localStorage.getItem('appColorMode') as ColorMode | null;
  const prefersDarkMode =
    typeof window !== 'undefined' &&
    window.matchMedia?.('(prefers-color-scheme: dark)').matches;
  const initialMode: ColorMode =
    storedMode === 'dark' || storedMode === 'light'
      ? storedMode
      : prefersDarkMode
      ? 'dark'
      : 'light';
  const curThemeName = localStorage.getItem('appTheme') || 'PureLightTheme';
  const curLightThemeName =
    curThemeName === 'DarkTheme' ? 'PureLightTheme' : curThemeName;
  const [colorMode, _setColorMode] = useState<ColorMode>(initialMode);
  const [themeName, _setThemeName] = useState(curLightThemeName);
  const theme = useMemo(
    () => themeCreator(colorMode === 'dark' ? 'DarkTheme' : themeName),
    [colorMode, themeName]
  );
  const { i18n } = useTranslation();
  const rtl = i18n.dir() === 'rtl';
  const setColorMode = useCallback((mode: ColorMode): void => {
    localStorage.setItem('appColorMode', mode);
    _setColorMode(mode);
  }, []);
  const setThemeName = (themeName: string): void => {
    const nextThemeName =
      themeName === 'DarkTheme' ? curLightThemeName : themeName;
    localStorage.setItem('appTheme', nextThemeName);
    if (themeName === 'DarkTheme') {
      setColorMode('dark');
    } else {
      setColorMode('light');
    }
    _setThemeName(nextThemeName);
  };
  const toggleMode = useCallback((): void => {
    _setColorMode((currentMode) => {
      const nextMode = currentMode === 'dark' ? 'light' : 'dark';
      localStorage.setItem('appColorMode', nextMode);
      return nextMode;
    });
  }, []);

  const colorModeContextValue = useMemo(
    () => ({
      mode: colorMode,
      setMode: setColorMode,
      toggleMode
    }),
    [colorMode, setColorMode, toggleMode]
  );

  useEffect(() => {
    if (curThemeName === 'DarkTheme') {
      localStorage.setItem('appTheme', curLightThemeName);
      localStorage.setItem('appColorMode', 'dark');
      _setThemeName(curLightThemeName);
      _setColorMode('dark');
    }
  }, [curLightThemeName, curThemeName]);

  useEffect(() => {
    document.documentElement.dataset.colorMode = colorMode;
    document.documentElement.style.colorScheme = colorMode;
  }, [colorMode]);

  useEffect(() => {
    if (!localStorage.getItem('appTheme')) {
      localStorage.setItem('appTheme', curLightThemeName);
    }
    if (!localStorage.getItem('appColorMode')) {
      localStorage.setItem('appColorMode', colorMode);
    }
  }, [colorMode, curLightThemeName]);

  useEffect(() => {
    if (rtl) document.documentElement.setAttribute('dir', 'rtl');
    else document.documentElement.removeAttribute('dir');
  }, [rtl]);

  const providers = (
    <ThemeContext.Provider value={setThemeName}>
      <ColorModeContext.Provider value={colorModeContextValue}>
        <ThemeProvider theme={theme}>{props.children}</ThemeProvider>
      </ColorModeContext.Provider>
    </ThemeContext.Provider>
  );
  return (
    <StylesProvider injectFirst>
      <CacheProvider value={rtl ? cacheRtl : cacheLtr}>
        {providers}
      </CacheProvider>
    </StylesProvider>
  );
};

export default ThemeProviderWrapper;
