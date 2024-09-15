import { BrowserRouter, Route, Routes } from "react-router-dom";
import Layout from "./component/Layout";
import User from "./pages/User";
import Posts from "./pages/Posts";
import Todos from "./pages/Todos";
import Albums from "./pages/Albums";
import Setting from "./pages/Setting";
import { useState } from "react";

function App() {
  const [darkMode, setDarkMode] = useState(false);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  return (
    <BrowserRouter>
      <Routes>
        <Route 
          path="/" 
          element={
            <Layout 
              darkMode={darkMode} 
              toggleDarkMode={toggleDarkMode} 
              setDarkMode={setDarkMode} 
            />
          }
        >
          <Route index element={<User />} />
          <Route path="posts" element={<Posts />} />
          <Route path="todos" element={<Todos />} />
          <Route path="albums" element={<Albums />} />
          <Route path="setting" element={<Setting />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
