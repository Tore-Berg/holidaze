import React from "react";
import backgroundImage from "../../assets/home-bg.jpg";
import styled from "styled-components";
import axios from "axios";
import { useState, useEffect } from "react";
import { BASE_URL, ACCOMMODATION_PATH } from "../../components/constants/api";
import { Link } from "react-router-dom";
import SearchBar from "./SearchBar";
import Heading from "../../components/layout/headings/Heading";
import SubHeading from "../../components/layout/headings/SubHeading";
import LoaderIndicator from "../../components/common/LoaderIndicator";
import { Helmet } from "react-helmet";

const HeroSection = styled.div`
  display: flex;
  width: 100%;
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
const FeaturedGrid = styled.div`
  width: 1100px;
  max-width: 90%;
  margin: 50px auto;
  gap: 10px;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
`;
const FeaturedCard = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  & img {
    border-radius: 10px;
  }
`;
const FeaturedBg = styled.div`
  background-size: cover;
  background-position: center center;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 300px;
  height: 300px;
  border-radius: 10px;
`;
const Home = () => {
  const [places, setPlaces] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getPlaces = async () => {
      try {
        const response = await axios.get(BASE_URL + "/" + ACCOMMODATION_PATH);
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
    return <LoaderIndicator />;
  }
  if (error) {
    return <div>Oh NO! Error</div>;
  }

  return (
    <>
      <Helmet>
        <title>Holidaze | Home</title>
        <meta
          name="description"
          content="We at Holidaze will make sure you find hotels, guesthouses and BnB accommodations in just a few clicks. Find the one you like, send us an enquiry or contact us if you need help."
        />
      </Helmet>
      <HeroSection>
        <Heading title="Where do you wanna go?" />
        <SearchBar placeholder="Search places" data={places} />
      </HeroSection>
      <SubHeading title="Our top picks" />
      <FeaturedGrid>
        {places.map((place) => {
          const { id, featured, title, featured_media } = place;
          if (featured) {
            return (
              <Link key={id} to={`details/${id}`}>
                <FeaturedCard key={id}>
                  <FeaturedBg
                    style={{
                      backgroundImage: `url(${featured_media.formats.small.url})`,
                    }}
                  ></FeaturedBg>
                  <h3>{title}</h3>
                </FeaturedCard>
              </Link>
            );
          }
        })}
      </FeaturedGrid>
    </>
  );
};

export default Home;
