import { useOutletContext } from "react-router-dom";

export default function HostVanDetailPricing() {
  const { currentVan } = useOutletContext();
  return (
    <p>
      $
      <span style={{ fontSize: "20px", fontWeight: "bold" }}>
        {currentVan.price}
      </span>
      /day
    </p>
  );
}
