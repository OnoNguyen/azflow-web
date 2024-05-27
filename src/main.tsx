import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import ApolloAppProvider from "./ApolloAppProvider.tsx";
import GlobalStyle from "./component/GlobalStyle.tsx";
import {BrowserRouter} from "react-router-dom";
import {Layout} from "./component/Layout";
import {AppRoutes} from "./component/AppRoutes.tsx";

ReactDOM.createRoot(document.getElementById('root')!).render(
    <ApolloAppProvider>
        <GlobalStyle/>
        <React.StrictMode>
            <BrowserRouter>
                <Layout>
                    <AppRoutes/>
                </Layout>
            </BrowserRouter>
        </React.StrictMode>
    </ApolloAppProvider>,
)
