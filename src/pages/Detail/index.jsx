import { useParams } from "react-router-dom";
import { BASE_URL, ACCOMMODATION_PATH } from "../../components/constants/api";
import useFetch from "../../components/hooks/useFetch";

const Detail = () => {
  const { id } = useParams();

  const {
    data: place,
    loading,
    error,
  } = useFetch(BASE_URL + ACCOMMODATION_PATH + id);
  return (
    <div className="details-wrapper">
      {loading && <div className="loader">Loading...</div>}
      {error && <div className="error">{error}</div>}
      {place && (
        <div key={place.id} className="place-card">
          <h1>{place.title}</h1>
          <img
            src={place.image_url}
            className="place-image"
            alt={`${place.title}`}
          />
          <span>
            <strong>${place.price}</strong>
          </span>
          <p>{place.description}</p>
        </div>
      )}
    </div>
  );
};
export default Detail;
