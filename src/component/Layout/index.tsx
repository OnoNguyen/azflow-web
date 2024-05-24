import { Header } from "./Header";
import { Navigation } from "./Navigation";
import React from "react";
import { Footer, Main, Wrapper } from "./style"; // @ts-ignore

// @ts-ignore
export const Layout = ({ children }) => {
  return (
    <Wrapper>
      <Header />
      <Navigation />
      <Main>{children}</Main>
      <Footer>This is footer</Footer>
    </Wrapper>
  );
};
