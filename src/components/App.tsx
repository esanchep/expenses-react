import { Navigate, Route, Routes } from 'react-router-dom';
import { CustomProvider } from 'rsuite';
import { useConfig } from './Configuration/Config';
import Configuration from './Configuration/Configuration';
import Expenses from './Expenses/Expenses';
import Layout from './Layout/Layout';
import Login from './Login/Login';
import Summary from './Summary/Summary';

function App() {
  const config = useConfig();

  return (
    <CustomProvider theme={config.getTheme()}>
      <Routes>
        <Route path="/" element={<Navigate to="/expenses" />} />
        <Route path="/summary" element={<Layout content={<Summary />} />} />
        <Route path="/expenses" element={<Layout content={<Expenses />} />} />
        <Route path="/configuration" element={<Layout content={<Configuration />} />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </CustomProvider>
  );
}

export default App;
