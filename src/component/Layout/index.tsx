import {
  Footer,
  HeaderBar,
  LogoText,
  Main,
  Nav,
  NavList,
  Wrapper,
} from "./style";
import { Link } from "react-router-dom";
import { Search } from "../Search";
import { Login } from "../Login"; // @ts-ignore

// @ts-ignore
export const Layout = ({ children }) => {
  return (
    <Wrapper>
      <HeaderBar>
        <LogoText>AzFlow</LogoText>
        <Search />
        <Login />
      </HeaderBar>
      <Nav>
        <NavList>
          <li>
            <Link to="/">
              <span className="material-symbols-outlined">home</span>
              <span>Home</span>
            </Link>
          </li>
          <li>
            <Link to="/freemind">
              <span className="material-symbols-outlined">person</span>
              <span>You</span>
            </Link>
          </li>
          <li>
            <Link to="/login">
              <span className="material-symbols-outlined">group</span>
              <span>Them</span>
            </Link>
          </li>
          <li>
            <Link to="/signup">
              <span className="material-symbols-outlined">manage_accounts</span>
              <span>Profile</span>
            </Link>
          </li>
        </NavList>
      </Nav>
      <Main>{children}</Main>
      <Footer>AzFlow inc</Footer>
    </Wrapper>
  );
};
