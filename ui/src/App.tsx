import { useEffect, useState } from 'react';
import mock from './mocks';
import Nui from './Nui';

mock('GET_CLIENT_DATA', () => 'Hello World');

const App: React.FC = () => {
  const [data, setData] = useState('');

  useEffect(() => {
    Nui.post('GET_CLIENT_DATA').then(result => {
      setData(result);
    });
  }, []);

  return <h1>{data}</h1>;
};

export default App;
