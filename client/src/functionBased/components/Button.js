import styled, { css } from "styled-components";

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

  ${(props) => props.fixed && css`
    position: fixed;
    top: 90%;
    left: 60%;
    box-shadow: 0 0 20px 0 #000a;
  `};
`;

export default Button;