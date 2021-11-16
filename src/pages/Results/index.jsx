import React from "react";
import { BASE_URL, ACCOMMODATION_PATH } from "../../components/constants/api";
import useFetch from "../../components/hooks/useFetch";
import { FaHeart } from "react-icons/fa";
import AuthContext from "../../context/AuthContext";
import { useContext } from "react";

const Results = () => {
  const [auth, setAuth] = useContext(AuthContext);
  const {
    data: places,
    loading,
    error,
  } = useFetch(BASE_URL + ACCOMMODATION_PATH);
  console.log(places);
  return (
    <div className="results-wrapper">
      {loading && <div className="loader">Loading...</div>}
      {error && <div className="error">{error}</div>}
      {places &&
        places.map((place) => {
          return (
            <div key={place.id} className="results-card">
              {place.categories.map((category) => {
                return (
                  <div key={category.id}>
                    <h5>
                      <small>{category.name}</small>
                    </h5>
                  </div>
                );
              })}
              <h3>{place.title}</h3>
              <img src={place.image_url} alt={place.title} />
              <div className="results-features">
                <span>
                  {place.keyless ? "Keyless entry | " : "Key required | "}
                </span>
                {place.beds && <span>{`${place.beds} Beds | `}</span>}
                {place.persons && <span>{`${place.persons} Persons | `}</span>}
                {place.bathrooms && (
                  <span>{`${place.bathrooms} Bathrooms | `}</span>
                )}
                {place.rooms && <span>{`${place.rooms} Rooms | `}</span>}
                <FaHeart />
              </div>
              {auth ? <button>Edit</button> : <button>Check it Out</button>}
            </div>
          );
        })}
    </div>
  );
};

export default Results;
