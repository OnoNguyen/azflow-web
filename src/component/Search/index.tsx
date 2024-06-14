import { SearchContainer, SearchIcon, SearchInput } from "./style.ts";

export const Search = () => {
  return (
    <SearchContainer>
      <SearchInput placeholder="Search..." />
      <SearchIcon>&#128269;</SearchIcon>
    </SearchContainer>
  );
};
