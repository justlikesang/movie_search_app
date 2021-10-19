import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { API_ENDPOINT } from './context';
import { HiOutlineThumbUp, HiOutlineThumbDown } from 'react-icons/hi';

const SingleMovie = () => {
  const { id } = useParams();
  const [movie, setMovie] = useState({});
  const [isLoading, setLoading] = useState(true);
  const [error, setError] = useState({ show: false, msg: '' });
  const [like, setLike] = useState(0);
  const [dislike, setDislike] = useState(0);

  const fetchMovie = async (url) => {
    const response = await fetch(url);
    const data = await response.json();

    if (data.Response === 'False') {
      setError({ show: true, msg: data.Error });
      setLoading(false);
    } else {
      setMovie(data);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMovie(`${API_ENDPOINT}&i=${id}`);
  }, [id]);

  if (isLoading) {
    return <div className="loading"></div>;
  }

  if (error.show) {
    return (
      <div className="page-error">
        <h1>{error.msg}</h1>
        <Link to="/" className="btn">
          back to movies
        </Link>
      </div>
    );
  }

  const {
    Poster: poster,
    Title: title,
    Plot: plot,
    Year: year,
    Director: director,
  } = movie;
  return (
    <section className="single-movie">
      <img src={poster} alt={title} />
      <div className="single-movie-info">
        <h2>{title}</h2>
        <p>{plot}</p>
        <h4>Director: {director}</h4>
        <h4>Released: {year}</h4>
        <div className="likes-show">
          <button className="likes" onClick={() => setLike(like + 1)}>
            <HiOutlineThumbUp size="2.5em" />
          </button>
          <span>{like}</span>
          <button className="likes" onClick={() => setDislike(dislike + 1)}>
            <HiOutlineThumbDown size="2.5em" />
          </button>
          <span>{dislike}</span>
        </div>
        <Link to="/" className="btn">
          back to movies
        </Link>
      </div>
    </section>
  );
};

export default SingleMovie;
