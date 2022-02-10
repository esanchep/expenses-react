import { Navigate, Route, Routes } from 'react-router-dom';
import Expenses from './Expenses/Expenses';
import Login from './Login/Login';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/expenses" />} />
      <Route path="/expenses" element={<Expenses />} />
      <Route path="/login" element={<Login />} />
    </Routes>
  );
}


export default App;
