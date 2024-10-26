import { Route, Routes } from "react-router-dom";
import Login from "./pages/Login/Login";
import CreateAccount from "./pages/CreateAccount/CreateAccount";
import Home from "./pages/Home/Home";
import Layout from "./components/Layout/Layout";
import AccountAuthentication from "./pages/AccountAuthentication/AccountAuthentication";
import AccountRecovery from "./pages/AccountRecovery/AccountRecovery";
import ChangePassword from "./pages/ChangePassword/ChangePassword";

function App() {

  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />}/>
      </Route>
      <Route path="/login" element={<Login />}/>
      <Route path="/criar-conta" element={<CreateAccount />}/>
      <Route path="/verificar-email" element={<AccountAuthentication />}/>
      <Route path="/recuperar-conta" element={<AccountRecovery />}/>
      <Route path="/redefinir-senha" element={<ChangePassword />}/>
    </Routes>
  )
}

export default App
