import React, { useState } from "react";
import { Button, ButtonGroup } from "react-bootstrap";
import { Link } from "react-router-dom";
const Search = () => {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("");

  return (
    <div className="my-4">
      <p>Search Posts</p>
      <input
        className="mx-auto d-block"
        type="text"
        placeholder="Enter Search Query"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        style={{ marginBottom: "1em" }}
      />
      <div className="d-flex flex-column">
        <ButtonGroup aria-label="category">
          <Button
            variant="secondary"
            onClick={(e) => {
              setCategory("Genre");
            }}
          >
            Genre
          </Button>
          <Button
            variant="secondary"
            onClick={(e) => {
              setCategory("BookTitle");
            }}
          >
            Book Title
          </Button>
          <Button
            variant="secondary"
            onClick={(e) => {
              setCategory("Author");
            }}
          >
            Author
          </Button>
          <Button
            variant="secondary"
            onClick={(e) => {
              setCategory("PostTitle");
            }}
          >
            Post Title
          </Button>
        </ButtonGroup>
        <Link to={`/search`} state={{ query, category }}>
          <Button className="d-block my-4 mx-auto" variant="primary" size="lg">
            Search
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default Search;
