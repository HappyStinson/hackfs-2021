import React, { useContext } from "react";
import styled from "styled-components";
import { ThemeContext } from "../../contexts/ThemeStore";

import Button from "./Button";

const Container = styled.div`
  width: "100%";
  height: 60px;
  display: flex;
  justify-content: center;
  align-items: center;
  padding-right: 30px;
  padding-top: 10px;
  padding-bottom: 70px;
  background-color: ${(props) => props.theme.background};
  position: fixed;
`;

const TopBar = () => {
  const { switchTheme } = useContext(ThemeContext);

  return (
    <Container>
      <Button onClick={() => switchTheme("electronic")}>Electronic</Button>
      <Button onClick={() => switchTheme("rock")}>Rock</Button>
    </Container>
  )
};

export default TopBar;