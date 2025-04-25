import { useOutletContext } from "react-router-dom";

export default function HostVanDetailPhotos() {
  const { currentVan } = useOutletContext();
  return <img src={`${currentVan.imageUrl}`} width={100} />;
}
