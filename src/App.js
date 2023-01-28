import {
  createBrowserRouter,
  RouterProvider,
  createRoutesFromElements,
  Route,
} from "react-router-dom";
import RootLayout from "./components/RootLayout";
import Login from "./pages/Login";
import Registation from "./pages/Registation";
const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<RootLayout />}>
      <Route  element={<Registation/>}></Route>
      <Route index element={<Login/>}></Route>
    </Route>
  )
);
function App() {
  return <RouterProvider router={router} />;
}

export default App;
