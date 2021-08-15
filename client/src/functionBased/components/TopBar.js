import React, { useContext } from "react";
import styled from "styled-components";
import { ThemeContext } from "../../contexts/ThemeStore";

const Container = styled.div`
  width: "100%";
  height: 60px;
  display: flex;
  justify-content: center;
  align-items: center;
  padding-right: 30px;
  background-color: ${(props) => props.theme.background};
`;

const Button = styled.button`
  display: block;
  margin: 10px auto;
  padding: .5rem;
  font-size: 1em;
  background: darkcyan;
  border-radius: 5px;
  color: ${(props) => props.theme.text};
  cursor: pointer;
  margin: 5px auto;
`;

const TopBar = () => {
  const { theme, switchTheme } = useContext(ThemeContext);

  return (
    <Container>
      <Button onClick={() => switchTheme("electronic")}>Electronic</Button>
      <Button onClick={() => switchTheme("rock")}>Rock</Button>
    </Container>
  )
};

export default TopBar;