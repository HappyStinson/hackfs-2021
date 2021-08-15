import styled from "styled-components";

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

export default Button;