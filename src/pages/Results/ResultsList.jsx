import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

const ResultsCard = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 30px;
  width: 1100px;
  max-width: 90%;
  margin: 50px auto;
  padding: 20px 0;
  border-bottom: 1px solid lightgray;
`;

const ImageSection = styled.div`
  background-size: cover;
  background-repeat: no-repeat;
  height: 300px;
  border-radius: 10px;
  transition: all ease-in-out 0.3s;
  &:hover {
    opacity: 0.8;
    transform: scale(1.05);
  }
`;

const TextSection = styled.div`
  display: block;
  & span {
    font-size: 12px;
    color: gray;
  }
`;

export default function ResultsList({ ...place }) {
  const {
    id,
    featured_media,
    title,
    keyless,
    beds,
    persons,
    bathrooms,
    rooms,
    categories,
  } = place;

  return (
    <>
      <Link to={`details/${id}`}>
        <ResultsCard id={id} key={id}>
          <ImageSection
            style={{
              backgroundImage: `url(${featured_media.formats.small.url})`,
            }}
          ></ImageSection>
          <TextSection>
            {categories.map((category) => (
              <span key={id}>{category.name}</span>
            ))}
            <h3>{title}</h3>
            <span>{keyless ? "Keyless entry | " : "Key required | "}</span>
            {beds && <span>{`${beds} Beds | `}</span>}
            {persons && <span>{`${persons} Persons | `}</span>}
            {bathrooms && <span>{`${bathrooms} Bathrooms | `}</span>}
            {rooms && <span>{`${rooms} Rooms | `}</span>}
          </TextSection>
        </ResultsCard>
      </Link>
    </>
  );
}
