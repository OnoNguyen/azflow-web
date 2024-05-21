import React from 'react';
import styled from "styled-components";

const HeaderBar = styled.header`
    width: 100%;
    padding: 0.5em 1em;
    display: flex;
    height: 64px;
    position: fixed;
    align-items: center;
    background-color: #333;
    box-shadow: 0 0 5px 0 rgba(0, 0, 0, 0.1);
    z-index: 1;
`;

const LogoText = styled.h1`
    margin: 0;
    padding: 0;
    display: inline;
`;

export const Header = () => {
    return (
        <HeaderBar>
            <LogoText>My App</LogoText>
        </HeaderBar>
    );
}