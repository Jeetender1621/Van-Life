import { useEffect, useState } from "react";
import { Link, useLoaderData } from "react-router-dom";
import { getHostVans } from "../../utilities/vanAPIs";
import { requireAuth } from "../../utilities/requireAuth";

export async function getHostVansData({ request }) {
  await requireAuth(request);
  return getHostVans();
}

export default function HostVans() {
  const hostVansList = useLoaderData();

  return (
    <section>
      <h1 className="host-vans-title">Your listed vans</h1>
      <div className="host-vans-list">
        <section>
          {hostVansList.map((van) => (
            <Link to={van.id} key={van.id} className="host-van-link-wrapper">
              <div className="host-van-single" key={van.id}>
                <img src={van.imageUrl} alt={`Photo of ${van.name}`} />
                <div className="host-van-info">
                  <h3>{van.name}</h3>
                  <p>${van.price}/day</p>
                </div>
              </div>
            </Link>
          ))}
        </section>
      </div>
    </section>
  );
}
