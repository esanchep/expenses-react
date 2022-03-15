import { useState } from 'react';
import { Button, Input } from 'rsuite';
import './Login.css';

function Login() {
  const [token, setToken] = useState<string>();
  const updateToken = (value: string) => setToken(value);
  const doLogin = () => localStorage.setItem('token', token!);

  // TODO create AuthContext and put the updated token value in doLogin()

  return (
    <div className="Login">
      <Input onChange={updateToken} className="Login-input" size="lg" />
      <Button appearance="primary" onClick={doLogin}>Login</Button>
    </div>
  );
}

export default Login;
