import React, { useState, useRef } from "react";
import styled from "styled-components";
import Menu from "./Menu";
import useOnClickOutside from "../../hooks/useOnClickOutside";

const StyledBurger = styled.div`
  width: 2rem;
  height: 2rem;
  position: fixed;
  z-index: 10000;
  top: 15px;
  right: 20px;
  display: none;
  @media (max-width: 768px) {
    display: flex;
    justify-content: space-around;
    flex-flow: column nowrap;
  }
  div {
    width: 2rem;
    height: 0.25rem;
    background-color: ${({ open }) => (open ? "#ccc" : "#333")};
    border-radius: 10px;
    transform-origin: 1px;
    transition: all 0.3s linear;
    &:nth-child(1) {
      transform: ${({ open }) => (open ? "rotate(45deg)" : "rotate(0)")};
      z-index: 1000;
    }
    &:nth-child(2) {
      transform: ${({ open }) => (open ? "translateX(100%)" : "translateX(0)")};
      opacity: ${({ open }) => (open ? 0 : 1)};
      z-index: 1000;
    }
    &:nth-child(3) {
      transform: ${({ open }) => (open ? "rotate(-45deg)" : "rotate(0)")};
      z-index: 1000;
    }
  }
`;

const Hamburger = () => {
  const [open, setOpen] = useState(false);
  const node = useRef();
  useOnClickOutside(node, () => setOpen(false));

  return (
    <div ref={node}>
      <StyledBurger
        className="scrolledburger"
        open={open}
        onClick={() => setOpen(!open)}
      >
        <div />
        <div />
        <div />
      </StyledBurger>
      <Menu open={open} />
    </div>
  );
};

export default Hamburger;
