import { Route, Routes } from "react-router-dom";
import Login from "./pages/Login/Login";
import CreateAccount from "./pages/CreateAccount/CreateAccount";
import Home from "./pages/Home/Home";
import Layout from "./components/Layout/Layout";

function App() {

  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />}/>
      </Route>
      <Route path="/login" element={<Login />}/>
      <Route path="criar-conta" element={<CreateAccount />}/>
    </Routes>
  )
}

export default App
