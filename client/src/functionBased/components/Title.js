import styled from "styled-components";

const Title = styled.h1`
  padding: 20px;
  font-size: 6rem;
  font-weight: 600;
  margin-bottom: 2rem;
  line-height: 1em;
  color: ${(props) => props.theme.title};
  text-transform: lowercase;
  text-align: center;
`;

export default Title;