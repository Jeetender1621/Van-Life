import React from "react";
import {
  useParams,
  Link,
  NavLink,
  Outlet,
  useLoaderData,
} from "react-router-dom";
import { getHostVans } from "../../utilities/vanAPIs";
import { requireAuth } from "../../utilities/requireAuth";

export async function getHostVanDetail({ params }) {
  await requireAuth();
  return getHostVans(params.id);
}
export default function HostVanDetail() {
  // const {id} = useParams()
  const currentVan = useLoaderData();

  const navLinkStyling = {
    fontWeight: "bold",
    textDecoration: "underline",
    color: "#161616",
  };

  return (
    <section>
      <Link to=".." relative="path" className="back-button">
        &larr; <span>Back to all vans</span>
      </Link>
      <div className="host-van-detail-layout-container">
        <div className="host-van-detail">
          <img src={currentVan.imageUrl} />
          <div className="host-van-detail-info-text">
            <i className={`van-type van-type-${currentVan.type}`}>
              {currentVan.type}
            </i>
            <h3>{currentVan.name}</h3>
            <h4>${currentVan.price}/day</h4>
          </div>
        </div>

        <nav className="host-van-detail-nav">
          <NavLink
            to="."
            end
            style={({ isActive }) => (isActive ? navLinkStyling : null)}
          >
            Details
          </NavLink>
          <NavLink
            to="pricing"
            style={({ isActive }) => (isActive ? navLinkStyling : null)}
          >
            Pricing
          </NavLink>
          <NavLink
            to="photos"
            style={({ isActive }) => (isActive ? navLinkStyling : null)}
          >
            Photos
          </NavLink>
        </nav>

        <Outlet context={{ currentVan }} />
      </div>
    </section>
  );
}
