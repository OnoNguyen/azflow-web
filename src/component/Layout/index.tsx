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
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/freemind">FreeMind</Link>
          </li>
          <li>
            <Link to="/login">Login</Link>
          </li>
          <li>
            <Link to="/signup">Sign Up</Link>
          </li>
        </NavList>
      </Nav>
      <Main>{children}</Main>
      <Footer>This is footer</Footer>
    </Wrapper>
  );
};
