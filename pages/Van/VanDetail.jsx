import { useEffect, useState } from "react";
import { useParams, Link, useLocation, useLoaderData } from "react-router-dom";
import { getVans } from "../../utilities/vanAPIs";

export function getVanDetail({ params }) {
  return getVans(params.id);
}

export default function VanDetail() {
  // const { id } = useParams();
  const location = useLocation();
  const vanDetail = useLoaderData();

  return (
    <div className="van-detail-container">
      <Link
        to={location?.state?.search ? `../${location.state.search}` : ".."}
        relative="path"
        className="back-button"
      >
        &larr;{" "}
        <span>
          Back to{" "}
          {location.state?.search.includes(location.state?.type)
            ? location.state?.type
            : "all"}{" "}
          vans
        </span>
      </Link>

      <div className="van-detail">
        <img src={vanDetail.imageUrl} />
        <i className={`van-type ${vanDetail.type} selected`}>
          {vanDetail.type}
        </i>
        <h2>{vanDetail.name}</h2>
        <p className="van-price">
          <span>${vanDetail.price}</span>/day
        </p>
        <p>{vanDetail.description}</p>
        <button className="link-button">Rent this van</button>
      </div>
    </div>
  );
}
