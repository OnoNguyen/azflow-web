import { gql } from "@apollo/client";

export const IS_LOGGED_IN = gql`
  query IsLoggedIn {
    isLoggedIn @client
  }
`;

export const TOGGLE_LOGGED_IN = gql`
  mutation ToggleLoggedIn($status: Boolean!) {
    toggleLoggedIn(status: $status) @client
  }
`;
