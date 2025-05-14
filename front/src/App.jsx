import React,{ useState} from 'react';
import {BrowserRouter ,  Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Registers";
import Error from "./pages/Error"
import Try from './pages/Try';

function App() {
  const [isLoggedin ,setisLoggedin ] = useState(false);
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login  setisLoggedin={setisLoggedin}/>} />
        <Route path='/try' element={<Try />} />
        
        <Route path="/register" element={<Register setisLoggedin={setisLoggedin}/>} />
        {
          isLoggedin?
          <> 
          <Route path="/home" element={<Home setisLoggedin={setisLoggedin}/>}/>
            </>
          :<>
          <Route path='/error' element={<Error />} />
          </>
          

        }
      </Routes >
    </BrowserRouter>
  )
}

export default App;