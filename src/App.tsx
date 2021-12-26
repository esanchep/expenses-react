import { Link, Outlet, Route, Routes } from 'react-router-dom';
import './App.css';
import logo from './logo.svg';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
        <Routes>
          <Route path="/">
            <Route index element={<Home />} />
            <Route path="about">
              <Route index element={<About />} />
              <Route path="test1" element={<Test1 />} />
              <Route path="test2" element={<Test2 />} />
            </Route>
          </Route>
        </Routes>
      </header>
    </div>
  );
}

function Home() {
  return (
    <>
      <main>
        <h2>You are in HOME</h2>
      </main>
      <nav>
        Home | <Link to="/about">About</Link>
      </nav>
    </>
  );
}

function About() {
  return (
    <>
      <main>
        <h2>You are in ABOUT</h2>
      </main>
      <nav>
        <Link to="/">Home</Link> | About
        <Outlet />
      </nav>
    </>
  );
}

function Test1() {
  return (
    <>
      This is TEST 1
      <Link to="../test2">To TEST2</Link>
    </>
  );
}

function Test2() {
  return (
    <>
      This is TEST 2
      <Link to="../test1">To TEST1</Link>
    </>
  );
}

export default App;
