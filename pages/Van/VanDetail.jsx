import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export default function VanDetail() {
  const { id } = useParams();
  const [vanDetail, setVanDetail] = useState([]);

  useEffect(() => {
    fetch(`/api/vans/${id}`)
      .then((data) => data.json())
      .then((vanDet) => setVanDetail(vanDet.vans));
  }, []);
  console.log();
  return (
    <div className="van-detail-container">
      {vanDetail.length !== 0 && (
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
      )}
    </div>
  );
}
