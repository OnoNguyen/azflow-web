import {Header} from "./Header";
import {Navigation} from "./Navigation";
import React, {Fragment} from "react";
import styled from "styled-components";

const Wrapper = styled.div`
    @media (min-width: 768px) {
        display: flex;
        flex-direction: column;
        top: 64px;
        position: relative;
        height: calc(100% - 64px);
        width: 100%;
        flex: auto;
    }
`;

const Main = styled.main`
    position: fixed;
    height: calc(100% - 185px);
    width: 100%;
    padding: 1em;
    overflow: scroll;
    @media (min-width: 768px) {
        flex: 1;
        margin-left: 220px;
        height: calc(100% - 64px);
        width: calc(100% - 220px);
    }
`;

// @ts-ignore
export const Layout = ({children}) => {
    return (
        <Fragment>
            <Header/>
            <Wrapper>
                <Navigation/>
                <Main>{children}</Main>
            </Wrapper>
        </Fragment>
    );
};