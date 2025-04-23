import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

export default function Vans() {
  const [vansList, setVansList] = useState([]);

  useEffect(() => {
    fetch("/api/vans")
      .then((data) => data.json())
      .then((vans) => setVansList(vans.vans))
      .catch((err) => console.log(err));
  }, []);

  return (
    <div className="van-list-container">
      <h1>Explore our van options</h1>
      <div className="van-list">
        {vansList?.map((van) => (
          <div key={van.id} className="van-tile">
            <Link
              to={`/vans/${van.id}`}
              aria-label={`View details for ${van.name}, 
                             priced at $${van.price} per day`}
            >
              <img src={van.imageUrl} alt={`Image of ${van.name}`} />
              <div className="van-info">
                <h3>{van.name}</h3>
                <p>
                  ${van.price}
                  <span>/day</span>
                </p>
              </div>
              <i className={`van-type ${van.type} selected`}>{van.type}</i>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
