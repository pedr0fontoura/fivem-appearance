import { NuiStateProvider } from './hooks/nuiState';
import GlobalStyles from './styles/global';

import Appearance from './components/Appearance';

const App: React.FC = () => {
  return (
    <NuiStateProvider>
      <Appearance />
      <GlobalStyles />
    </NuiStateProvider>
  );
};

export default App;
