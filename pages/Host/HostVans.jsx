import { Suspense, useEffect, useState } from "react";
import { Await, defer, Link, useLoaderData } from "react-router-dom";
import { getHostVans } from "../../utilities/vanAPIs";
import { requireAuth } from "../../utilities/requireAuth";

export async function getHostVansData({ request }) {
  await requireAuth(request);
  return defer({ hostVans: getHostVans() });
}

export default function HostVans() {
  const hostVansListPromise = useLoaderData();

  function renderHostVans(hostVansList) {
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
  return (
    <Suspense fallback={<h2>Loading host vans...</h2>}>
      <Await resolve={hostVansListPromise.hostVans}>
        {(hostVansList) => renderHostVans(hostVansList)}
      </Await>
    </Suspense>
  );
}
