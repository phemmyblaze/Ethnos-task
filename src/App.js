import {BrowserRouter, Route, Routes} from "react-router-dom"
import Layout from "./component/Layout";
import User from "./pages/User"
import Posts from "./pages/Posts";
import Todos from "./pages/Todos";
import Albums from "./pages/Albums";
import Setting from "./pages/Setting";
function App() {
  return (
   <BrowserRouter>
   <Routes>
    <Route path="/" element={<Layout/>}>
      <Route index element={<User/>}/>
      <Route path="posts" element={<Posts/>}/>
      <Route path="todos" element={<Todos/>}/>
      <Route path="albums" element={<Albums/>}/>
      <Route path="setting" element={<Setting/>}/>
      
    </Route>
   </Routes>
   </BrowserRouter>
  );
}

export default App;
