import { RouterProvider } from "react-router-dom";
import "./App.css";
import { Toaster } from "./components/ui/sonner";
import { AppRoutes } from "./routes/routes";

function App() {
  return (
    <>
      <RouterProvider router={AppRoutes} />
      <Toaster />
    </>
  );
}

export default App;
