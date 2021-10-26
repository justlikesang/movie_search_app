import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, Link } from 'react-router-dom';
import { API_ENDPOINT } from './context';
import { SERVER_ENDPOINT } from './context';
import { HiOutlineThumbUp, HiOutlineThumbDown } from 'react-icons/hi';

const SingleMovie = () => {
  const { id } = useParams();
  const [movie, setMovie] = useState({});
  const [isLoading, setLoading] = useState(true);
  const [error, setError] = useState({ show: false, msg: '' });
  const [like, setLike] = useState(0);
  const [dislike, setDislike] = useState(0);
  const [likeToggle, setlikeToggle] = useState(false);
  // const [ip, setIP] = useState('');

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

  const fetchLikesAndDisLikes = async (url) => {
    try {
      const res = await axios.get(`${SERVER_ENDPOINT}/api/${id}`);
      console.log(res);
      setLike(res.data.movie.likes);
      setDislike(res.data.movie.dislikes);
    } catch (error) {
      console.log(error);
    }
  };

  const addLike = async () => {
    const newLike = like + 1;
    const res = await axios.patch(`${SERVER_ENDPOINT}/api/likes/${id}`, {
      likes: newLike,
    });
    setLike(res.data.movie.likes);
  };

  const addDislike = async () => {
    const newDislike = dislike - 1;
    const res = await axios.patch(`${SERVER_ENDPOINT}/api/likes/${id}`, {
      dislikes: newDislike,
    });
    setDislike(res.data.movie.dislikes);
  };

  // const getIpAddress = async () => {
  //   const res = await axios.get('https://geolocation-db.com/json/');
  //   console.log(res.data.IPv4);
  //   setIP(res.data.IPv4);
  // };

  useEffect(() => {
    fetchMovie(`${API_ENDPOINT}&i=${id}`);
    fetchLikesAndDisLikes(`${SERVER_ENDPOINT}/${id}`);
  }, [id]);

  // useEffect(() => {
  //   getIpAddress();
  // }, []);

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
        <div className='likes-dislikes-container'>
          <div className="likes-container">
            <button className="likes" onClick={addLike}>
              <HiOutlineThumbUp size="2.5em" />
            </button>
            <span>{like}</span>
          </div>
          <div className="dislikes-container">
            <button className="likes" onClick={addDislike}>
              <HiOutlineThumbDown size="2.5em" />
            </button>
            <span>{dislike}</span>
          </div>
        </div>
        <Link to="/" className="btn">
          back to movies
        </Link>
      </div>
    </section>
  );
};

export default SingleMovie;
