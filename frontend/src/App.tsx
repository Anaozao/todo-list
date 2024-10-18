import { Route, Routes } from "react-router-dom";
import Login from "./pages/Login/Login";
import CreateAccount from "./pages/CreateAccount/CreateAccount";
import Home from "./pages/Home/Home";

function App() {

  return (
    <Routes>
      <Route path="/" element={<Home />}/>
      <Route path="/login" element={<Login />}/>
      <Route path="criar-conta" element={<CreateAccount />}/>
    </Routes>
  )
}

export default App
