import styled from "styled-components";

export const Wrapper = styled.div`
  @media (min-width: 40em) {
    display: grid;
    grid-gap: 1em;
    grid-template-areas:
      "header header header"
      "nav main main"
      "footer footer footer";
    grid-template-rows: auto 1fr auto;
    min-height: 100vh;
  }
`;

export const Main = styled.div`
  padding: 1em;
  grid-area: main;
`;

export const Nav = styled.div`
  padding: 1em;
  background: gold;
  grid-area: nav;
`;

export const NavList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
  line-height: 2;

  a {
    color: #333;
    text-decoration: none;
    font-weight: bold;
    font-size: 1.1em;
  }

  a:visited {
    color: #333;
  }

  a:hover,
  a:focus {
    color: #0077cc;
  }
`;

export const HeaderBar = styled.div`
  padding: 0.5em 1em;
  height: 64px;
  align-items: center;
  background-color: pink;
  grid-area: header;
`;

export const LogoText = styled.h1`
  margin: 0;
  padding: 0;
  display: inline;
`;

export const Footer = styled.div`
  padding: 1em;
  background: #333;
  color: white;
  grid-area: footer;
`;
