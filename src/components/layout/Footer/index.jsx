import React from "react";
import { FaFacebook, FaInstagram, FaTwitter } from "react-icons/fa";
import styled from "styled-components";
import logo from '../../../assets/logo_bottom.png'

const StyledFooter = styled.footer`
  height: auto;
  text-align: center;
  display: flex;
  flex-direction: column;
  justify-content: center;
  background-color: #f7f7f7;
  .bottom_logo {
    margin: 100px auto;
    width: 150px;
  }
`;
const SocialIcons = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 20px auto;
`;
const Footer = () => {
  return (
    <StyledFooter>
      <img src={logo} alt="logo" className="bottom_logo" />
      <SocialIcons>
        <FaFacebook className="icon" size={40} />
        <FaInstagram className="icon" size={40} />
        <FaTwitter className="icon" size={40} />
      </SocialIcons>
      <div>
        <span
          dangerouslySetInnerHTML={{
            __html: "&copy; Tore Berg 2021. All rights reserved.",
          }}
        />
      </div>
    </StyledFooter>
  );
};

export default Footer;
