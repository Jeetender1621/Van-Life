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
import LoginPage, { loginActionSubmit, loginLoader } from "./pages/Login";
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
      <Route
        path="vans/:id"
        loader={getVanDetail}
        element={<VanDetail />}
        errorElement={<ErrorFetchingVans />}
      />
      <Route path="host" element={<HostLayout />}>
        <Route
          index
          element={<HostDashboard />}
          loader={async ({ request }) => {
            return await requireAuth(request);
          }}
        />
        <Route
          path="income"
          element={<HostIncome />}
          loader={async ({ request }) => {
            return await requireAuth(request);
          }}
        />
        <Route
          path="vans"
          loader={getHostVansData}
          element={<HostVans />}
          errorElement={<ErrorFetchingVans />}
        />
        <Route
          path="vans/:id"
          loader={getHostVanDetail}
          element={<HostVanDetail />}
          errorElement={<ErrorFetchingVans />}
        >
          <Route
            index
            element={<HostVanDetailInfo />}
            loader={async ({ request }) => {
              return await requireAuth(request);
            }}
          />
          <Route
            path="pricing"
            element={<HostVanDetailPricing />}
            loader={async ({ request }) => {
              return await requireAuth(request);
            }}
          />
          <Route
            path="photos"
            element={<HostVanDetailPhotos />}
            loader={async ({ request }) => {
              return await requireAuth(request);
            }}
          />
        </Route>
        <Route
          path="reviews"
          loader={async ({ request }) => {
            return await requireAuth(request);
          }}
          element={<HostReviews />}
        />
      </Route>
      <Route
        path="login"
        element={<LoginPage />}
        loader={loginLoader}
        action={loginActionSubmit}
      />
      <Route path="*" element={<ErrorPage />} />
    </Route>
  )
);
function App() {
  return <RouterProvider router={appRouter} />;
}

ReactDOM.createRoot(document.getElementById("root")).render(<App />);
