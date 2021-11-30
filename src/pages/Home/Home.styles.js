import styled from "styled-components";
import backgroundImage from "../../assets/home-bg.jpg";

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

export { HeroSection, FeaturedBg, FeaturedCard, FeaturedGrid };
