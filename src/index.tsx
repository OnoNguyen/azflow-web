import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';
import {BrowserRouter} from "react-router-dom";
import ApolloAppProvider from "./ApolloAppProvider";
import {Layout} from "./components/Layout";
import {AppRoutes} from "./components/AppRoutes";
import GlobalStyle from "./components/GlobalStyle";

const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement
);
root.render(
    <ApolloAppProvider>
        <GlobalStyle/>
        <React.StrictMode>
            <BrowserRouter>
                <Layout>
                    <AppRoutes/>
                </Layout>
            </BrowserRouter>
        </React.StrictMode>
    </ApolloAppProvider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
