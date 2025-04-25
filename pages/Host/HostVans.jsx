import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function HostVans() {
  const [hostVansList, setHostVansList] = useState([]);

  useEffect(() => {
    fetch("/api/host/vans/")
      .then((data) => data.json())
      .then((vansList) => setHostVansList(vansList.vans))
      .catch((err) => console.log(err));
  }, []);
  return (
    <section>
      <h1 className="host-vans-title">Your listed vans</h1>
      <div className="host-vans-list">
        {hostVansList.length !== 0 && (
          <section>
            {hostVansList.map((van) => (
              <Link
                to={`/host/vans/${van.id}`}
                key={van.id}
                className="host-van-link-wrapper"
              >
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
        )}
      </div>
    </section>
  );
}
