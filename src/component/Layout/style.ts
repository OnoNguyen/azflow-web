import styled from "styled-components";

export const Wrapper = styled.div`
  display: grid;
  grid-template-areas:
    "header header header header"
    "nav main main main"
    "footer footer footer footer";
  grid-template-rows: auto 1fr auto;
  min-height: 100vh;
`;

export const Main = styled.div`
  padding: 1em;
  grid-area: main;
`;

export const Nav = styled.div`
  padding: 1em;
  grid-area: nav;
  border-right: 1px solid #ddd;
  min-width: 50px;
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
    display: flex;
    gap: 0.4em;

    .material-symbols-outlined {
      margin-top: 0.2em;
    }

    @media (max-width: 600px) {
      :nth-child(2) {
        display: none;
      }

      justify-content: center;
    }
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
  display: flex;
  gap: 1em;
  padding: 0.5em 1em;
  height: 64px;
  align-items: center;
  grid-area: header;
  border-bottom: 1px solid #ddd;
  justify-content: space-between;
`;

export const LogoText = styled.h1`
  margin: 0;
  padding: 0;
  display: inline;
`;

export const Footer = styled.div`
  padding: 1em;
  grid-area: footer;
  border-top: 1px solid #ddd;
`;
