import { Link, Outlet, Route, Routes } from 'react-router-dom';
import { Button, DateRangePicker, Divider, Loader, Stack } from 'rsuite';
import './App.css';
import logo from './logo.svg';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>React with React Suite</p>
        <ReactSuiteExamples />
        <ReactRouterExample />
      </header>
    </div>
  );
}

function ReactSuiteExamples() {
  return (
    <>
      <Stack divider={<Divider vertical />}>
        <Loader />
        <Button>Button</Button>
        <DateRangePicker />
      </Stack>
    </>
  );
}

function ReactRouterExample() {
  return (
    <>
      <p>React sub-routes example</p>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />}>
          <Route path="test1" element={<Test1 />}>
              <Route path="sub" element={<SubTest />} />
          </Route>
          <Route path="test2" element={<Test2 />} />
        </Route>
      </Routes>
    </>
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
      </nav>
      <Outlet />
    </>
  );
}

function Test1() {
  return (
    <>
      This is /test1
      <Link to="../test2">To /test2</Link>
      <Link to="sub">To /sub</Link>
      <div><Outlet /></div>
    </>
  );
}

function Test2() {
  return (
    <>
      This is /test2
      <Link to="../test1">To /test1</Link>
    </>
  );
}

function SubTest() {
  return (
    <>This is /sub</>
  );
}

export default App;
