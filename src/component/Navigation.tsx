import React from 'react';
import {Link} from "react-router-dom";
import styled from "styled-components";

const Nav = styled.nav`
    padding: 1em;
    background: #f1f1f1;
    @media (max-width: 768px) {
        padding-top: 64px;
    }
    @media (min-width: 768px) {
        position: fixed;
        width: 220px;
        height: calc(100% - 64px);
        overflow-y: scroll;
    }
`;

const NavList = styled.ul`
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

export const Navigation = () => {
    return (
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
    );
}