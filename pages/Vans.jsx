import { useState, useEffect } from "react";

export default function Vans() {
  const [vansList, setVansList] = useState([]);

  useEffect(() => {
    fetch("/api/vans")
      .then((data) => data.json())
      .then((vans) => setVansList(vans.vans))
      .catch((err) => console.log(err));
  }, []);

  if (vansList.length < 0) {
    return <h1>Loading Vans...</h1>;
  }
  return (
    <div className="van-list-container">
      <h1>Explore our van options</h1>
      <div className="van-list">
        {vansList?.map((van) => (
          <div key={van.id} className="van-tile">
            <img src={van.imageUrl} />
            <div className="van-info">
              <h3>{van.name}</h3>
              <p>
                ${van.price}
                <span>/day</span>
              </p>
            </div>
            <i className={`van-type ${van.type} selected`}>{van.type}</i>
          </div>
        ))}
      </div>
    </div>
  );
}
