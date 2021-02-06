import { createContext, useState, useCallback, useContext } from 'react';

interface Display {
  appearance: boolean;
}

interface NuiState {
  display: Display;
}

interface NuiContextData {
  display: Display;
  setDisplay(value: Display): void;
}

const INITIAL_STATE: NuiState = {
  display: {
    appearance: true,
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

  return <NuiContext.Provider value={{ display: data.display, setDisplay }}>{children}</NuiContext.Provider>;
};

function useNuiState(): NuiContextData {
  const context = useContext(NuiContext);

  return context;
}

export { NuiStateProvider, useNuiState };
