import logo from "./logo.svg";
import "./App.css";
import {Link} from "react-router-dom";
import {gql, useQuery} from "@apollo/client";
import {__DEV__} from "@apollo/client/utilities/globals";
import {loadDevMessages, loadErrorMessages} from "@apollo/client/dev";

if (__DEV__) {
    // Adds messages only in a dev environment
    loadDevMessages();
    loadErrorMessages();
}

const App = () => {
    const FIND_TODOS = gql`
        query findTodos {
            todos {
                text
                done
                user {
                    name
                }
            }
        }
    `;

    const {loading, error, data} = useQuery(FIND_TODOS);

    if (loading) return <p>Loading...</p>;
    if (error) {
        console.log("theres an error", error);
        return <p>Error :(</p>;
    }

    return (
        <div className="App">
            <header className="App-header">
                <img src={logo} className="App-logo" alt="logo"/>
                <Link to="/freemind" color="gold">
                    A Free Mind Has Humility
                </Link>
            </header>
            <div>
                {data.todos.map((todo: any, index: number) => (
                    <div key={index}>
                        <p>{todo.text}</p>
                        <p>{todo.user.name}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default App;
