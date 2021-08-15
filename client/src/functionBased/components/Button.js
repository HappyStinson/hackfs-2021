import styled from "styled-components";

import { ThemeContext } from "../../contexts/ThemeStore";

const Button = styled.button`
  display: block;
  margin: 10px auto;
  padding: .5rem;
  font-size: 1em;
  background: ${(props) => props.theme.title};
  border-radius: 5px;
  color: ${(props) => props.theme.text};
  cursor: pointer;
  margin: 5px auto;
`;

export default Button;