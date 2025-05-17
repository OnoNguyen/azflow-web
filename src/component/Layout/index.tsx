import {Footer, HeaderBar, LogoText, Main, Nav, NavList, Wrapper,} from "./style";
import {Link, Outlet} from "react-router-dom";
import {CreateButtonWrapper} from "@/component/Create";
import {Search} from "@/component/Search";
import {Login} from "@/component/Login";

export const PrimaryLayout = () => {
  return (
    <Wrapper>
      <HeaderBar>
        <LogoText>AzFlow</LogoText>
        <Search/>
        <CreateButtonWrapper/>
        <Login/>
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
            <Link to="/you">
              <span className="material-symbols-outlined">person</span>
              <span>You</span>
            </Link>
          </li>
          <li>
            <Link to="/predict">
              <span className="material-symbols-outlined">group</span>
              <span>Predict</span>
            </Link>
          </li>
          <li>
            <Link to="/">
              <span className="material-symbols-outlined">manage_accounts</span>
              <span>Profile</span>
            </Link>
          </li>
        </NavList>
      </Nav>
      <Main>
        <Outlet/>
      </Main>
      <Footer>AzFlow inc</Footer>
    </Wrapper>
  );
};

export const StudioLayout = () => {
  return (
    <Wrapper>
      <HeaderBar>
        <LogoText>AzFlow</LogoText>
        <Login/>
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
            <Link to="/">
              <span className="material-symbols-outlined">person</span>
              <span>You</span>
            </Link>
          </li>
          <li>
            <Link to="/">
              <span className="material-symbols-outlined">group</span>
              <span>Them</span>
            </Link>
          </li>
          <li>
            <Link to="/">
              <span className="material-symbols-outlined">manage_accounts</span>
              <span>Profile</span>
            </Link>
          </li>
        </NavList>
      </Nav>
      <Main>
        <Outlet/>
      </Main>
      <Footer>AzFlow inc</Footer>
    </Wrapper>
  );
};
