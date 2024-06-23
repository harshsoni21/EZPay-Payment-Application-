import {
  BrowserRouter,
  Route,
  Routes,
  Navigate
} from "react-router-dom";
import { Signup } from "./pages/Signup";
import { Signin } from "./pages/Signin";
import { Dashboard } from "./pages/Dashboard";
import { SendMoney } from "./pages/SendMoney";
import { Protected } from "./pages/Protected";
import { ProtectedLog } from "./pages/Protected2";
import { ErrorPage } from "./pages/Error";

function App() {
  return (
    <>
       <BrowserRouter>
        <Routes>
          <Route path = "/" element = {<Navigate to="/signup" />}/>
          <Route path="/signup" element={<ProtectedLog Components ={ Signup}/>} />
          <Route path="/signin" element={<ProtectedLog Components ={ Signin}/>} />
          <Route path="/dashboard" element={<Protected Components ={ Dashboard}/>} />
          <Route path="/send" element={<Protected Components ={SendMoney}/>}/>
          <Route path ="/*"  element={<ErrorPage/>} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App