import React from "react";
import backgroundImage from "../../assets/home-bg.jpg";
import styled from "styled-components";
import axios from "axios";
import { useState, useEffect, useRef } from "react";
import { BASE_URL, ACCOMMODATION_PATH } from "../../components/constants/api";
import { Link, useHistory, useParams } from "react-router-dom";
import SearchBar from "./SearchBar";

const Hero = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  color: #ffffff;
  min-height: 90vh;
  background-image: url(${backgroundImage});
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center center;
`;
const Home = () => {
  document.title = "Holidaze";
  const [places, setPlaces] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const myRef = useRef(null);
  const history = useHistory();

  useEffect(() => {
    const getPlaces = async () => {
      try {
        const response = await axios.get(`${BASE_URL}${ACCOMMODATION_PATH}`);
        setPlaces(response.data);
        console.log(response.data);
      } catch (error) {
        console.log(error);
        setError(error.toString("There was an error"));
      } finally {
        setLoading(false);
      }
    };
    getPlaces();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }
  if (error) {
    return <div>Oh NO! Error</div>;
  }

  return (
    <>
      <Hero>
        <h1>Where do you wanna go?</h1>
        <SearchBar placeholder="Search places" data={places} />
      </Hero>
      <div className="cards">
        {places.map((place) => {
          return (
            <Link key={place.id} to={`details/${place.id}`}>
              <div key={place.id}>
                <h3>{place.title}</h3>;
              </div>
            </Link>
          );
        })}
      </div>
    </>
  );
};

export default Home;
