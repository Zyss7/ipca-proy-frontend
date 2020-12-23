import styled from "@emotion/styled";

export const StyledContainer = styled.main`
  height: ${(props) => props.fullHeight && "100vh !important;"};
  display: grid !important;
  align-items: center;
  justify-content: center !important;
`;
