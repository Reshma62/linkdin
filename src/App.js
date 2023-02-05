import {
  createBrowserRouter,
  RouterProvider,
  createRoutesFromElements,
  Route,
} from "react-router-dom";
import RootLayout from "./components/RootLayout";
import ForgotPassword from "./pages/ForgotPassword";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Profile from "./pages/Profile";
import Registation from "./pages/Registation";
const router = createBrowserRouter(
  createRoutesFromElements(
    /*  <Route path="/" element={<RootLayout />}>
      <Route index element={<Login/>}></Route>
      <Route path="/registation"  element={<Registation/>}></Route>
      <Route path="/home"  element={<Home/>}></Route>
    </Route> */
    <Route>
      <Route path="/" element={<Login />}></Route>
      <Route path="/registation" element={<Registation />}></Route>
      <Route path="/home" element={<Home />}></Route>
      <Route path="/profile" element={<Profile />}></Route>
      <Route path="/forgotpassword" element={<ForgotPassword />}></Route>
    </Route>
  )
);
function App() {
  return <RouterProvider router={router} />;
}

export default App;
