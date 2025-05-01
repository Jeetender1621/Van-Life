import { Link, useSearchParams, useLoaderData } from "react-router-dom";
import { getVans } from "../../utilities/vanAPIs";

export function getVansData() {
  return getVans();
}
export default function Vans() {
  const [searchParams, setSearchParams] = useSearchParams();

  const vansList = useLoaderData();

  const typeFilter = searchParams.get("type");

  const vansListDisplay = typeFilter
    ? vansList.filter((van) => van.type === typeFilter)
    : vansList;

  const handleFilterChange = (key, value) => {
    setSearchParams((prevParams) => {
      if (value === null) {
        prevParams.delete(key);
      } else {
        prevParams.set(key, value);
      }

      return prevParams;
    });
  };

  const getNewSearchParams = (key, value) => {
    const searchParam = new URLSearchParams(searchParams);

    if (value === null) {
      searchParam.delete(key);
    } else {
      searchParam.set(key, value);
    }

    return `?${searchParam.toString()}`;
  };

  return (
    <div className="van-list-container">
      <h1>Explore our van options</h1>
      <div className="van-list-filter-buttons">
        <button
          onClick={() => handleFilterChange("type", "simple")}
          className={`van-type simple ${
            typeFilter === "simple" ? "selected" : ""
          }`}
        >
          Simple
        </button>
        <Link
          to={getNewSearchParams("type", "rugged")}
          className={`van-type rugged ${
            typeFilter === "rugged" ? "selected" : ""
          }`}
        >
          Rugged
        </Link>
        <button
          onClick={() => handleFilterChange("type", "luxury")}
          className={`van-type luxury ${
            typeFilter === "luxury" ? "selected" : ""
          }`} // Link to="?type="luxury"// setSearchParams({type: "luxury"}) // setSearchParams("?type=luxury")
        >
          Luxury
        </button>
        {typeFilter && (
          <Link
            to={getNewSearchParams("type", null)} // setSearchParams("") also, setSearchParams({})
            className="van-type clear-filters"
          >
            Clear filter
          </Link>
        )}
      </div>
      <div className="van-list">
        {vansListDisplay?.map((van) => (
          <div key={van.id} className="van-tile">
            <Link
              to={van.id}
              aria-label={`View details for ${van.name}, 
                             priced at $${van.price} per day`}
              state={{
                search: `?${searchParams.toString()}`,
                type: typeFilter,
              }}
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
