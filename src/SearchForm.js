import React from 'react';
import { useGlobalContext } from './context';
import { API_ENDPOINT } from './context';
import { FaSearch } from 'react-icons/fa';

const SearchForm = () => {
  const { query, setQuery, error, fetchMovies } = useGlobalContext();

  const handleSubmit = (e) => {
    e.preventDefault();
    fetchMovies(`${API_ENDPOINT}&s=${query}`);
  };

  return (
    // <form className="search-form" onSubmit={(e) => e.preventDefault()}>
    <form className="search-form" onSubmit={handleSubmit}>
      <h2>search movies</h2>
      <input
        type="text"
        className="form-input"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <button className="search-btn" type="submit">
        <FaSearch size='1.5em' />
      </button>
      {error.show && <div className="error">{error.msg}</div>}
    </form>
  );
};

export default SearchForm;
