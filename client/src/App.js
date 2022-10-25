import Login from "../src/components/Login/Login"
import Blog from "../src/components/Blog/Blog"
import PrivateRoute from "./components/routing/PrivateRoute";
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <div className="App container">
      <BrowserRouter>
        <Routes>
          <Route exact path="/" element={<Login />} />
          <Route path='/blog' element={<PrivateRoute/>}>
            <Route path='/blog' element={<Blog/>}/>
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
