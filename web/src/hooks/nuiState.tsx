import { createContext, useState, useCallback, useContext } from 'react';
import Locales from '../shared/interfaces/locales';

interface Display {
  appearance: boolean;
}

interface NuiState {
  display: Display;
  locales?: Locales;
}

interface NuiContextData {
  display: Display;
  setDisplay(value: Display): void;
  locales?: Locales;
  setLocales(value: Locales): void;
}

const INITIAL_STATE: NuiState = {
  display: {
    appearance: false,
  },
};

const NuiContext = createContext<NuiContextData>({} as NuiContextData);

const NuiStateProvider: React.FC = ({ children }) => {
  const [data, setData] = useState<NuiState>(INITIAL_STATE);

  const setDisplay = useCallback(
    (value: Display) => {
      setData(state => ({
        ...state,
        display: {
          ...value,
        },
      }));
    },
    [setData],
  );

  const setLocales = useCallback(
    (value: Locales) => {
      setData(state => ({
        ...state,
        locales: value,
      }));
    },
    [setData],
  );

  const contextValue = {
    display: data.display,
    setDisplay,
    locales: data.locales,
    setLocales,
  };

  return <NuiContext.Provider value={contextValue}>{children}</NuiContext.Provider>;
};

function useNuiState(): NuiContextData {
  const context = useContext(NuiContext);

  return context;
}

export { NuiStateProvider, useNuiState };
