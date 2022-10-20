import Login from "../src/components/Login/Login"
import Blog from "../src/components/Blog/Blog"
import PrivateRoute from "./components/routing/PrivateRoute";
import Navbar from "./components/NavBar/Navbar";
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <div className="App container">
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route exact path='/blog' element={<PrivateRoute/>}>
            <Route exact path='/blog' element={<Blog/>}/>
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
