import React from "react";
import ReactDOM from "react-dom/client";
import "./server";
import {
  BrowserRouter,
  Routes,
  Route,
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
} from "react-router-dom";
import Home from "./pages/Home";
import About from "./pages/About";
import Vans, { getVansData } from "./pages/Van/Vans";
import VanDetail, { getVanDetail } from "./pages/Van/VanDetail";
import Layout from "./components/Layout";
import HostIncome from "./pages/Host/HostIncome";
import HostReviews from "./pages/Host/HostReviews";
import HostDashboard from "./pages/Host/HostDashboard";
import HostLayout from "./components/HostLayout";
import HostVans, { getHostVansData } from "./pages/Host/HostVans";
import HostVanDetail, { getHostVanDetail } from "./pages/Host/HostVanDetail";
import HostVanDetailInfo from "./pages/Host/HostVanDetailInfo";
import HostVanDetailPricing from "./pages/Host/HostVanDetailPricing";
import HostVanDetailPhotos from "./pages/Host/HostVanDetailsPhotos";
import ErrorPage from "./pages/Error/ErrorPage";
import ErrorFetchingVans from "./pages/Error/ErrorFetchingVans";
import LoginPage, { loginLoader } from "./pages/Login";
import { requireAuth } from "./utilities/requireAuth";

const appRouter = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Layout />}>
      <Route index element={<Home />} />
      <Route path="about" element={<About />} />
      <Route
        path="vans"
        loader={getVansData}
        element={<Vans />}
        errorElement={<ErrorFetchingVans />}
      />
      <Route path="vans/:id" loader={getVanDetail} element={<VanDetail />} />
      <Route path="host" element={<HostLayout />}>
        <Route
          index
          element={<HostDashboard />}
          loader={async () => {
            return await requireAuth();
          }}
        />
        <Route
          path="income"
          element={<HostIncome />}
          loader={async () => {
            return await requireAuth();
          }}
        />
        <Route path="vans" loader={getHostVansData} element={<HostVans />} />
        <Route
          path="vans/:id"
          loader={getHostVanDetail}
          element={<HostVanDetail />}
        >
          <Route index element={<HostVanDetailInfo />} />
          <Route path="pricing" element={<HostVanDetailPricing />} />
          <Route path="photos" element={<HostVanDetailPhotos />} />
        </Route>
        <Route
          path="reviews"
          loader={async () => {
            return await requireAuth();
          }}
          element={<HostReviews />}
        />
      </Route>
      <Route path="login" element={<LoginPage />} loader={loginLoader} />
      <Route path="*" element={<ErrorPage />} />
    </Route>
  )
);
function App() {
  return <RouterProvider router={appRouter} />;
}

ReactDOM.createRoot(document.getElementById("root")).render(<App />);
