import { useRouteError } from "react-router-dom";

export default function ErrorFetchingVans() {
  const errorDet = useRouteError();
  return (
    <>
      <h1 style={{ textAlign: "center" }}>Error: {errorDet.message}</h1>
    </>
  );
}
