import styled from "styled-components";

const ContentContainer = styled.div`
  /* display: flex; */
  /* width: 100vw; */
  width: 100%;
  height: calc(200vh - 60px);
  justify-content: center;
  align-items: center;
  /* overflow: auto; */
  background-color: ${(props) => props.theme.background};
`;

export default ContentContainer;