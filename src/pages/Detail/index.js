import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import './styles.scss';

import api from '../../services/api';

export default function Detail({ location }) {
  const [film, setFilm] = useState(undefined);
  const [youtube, setYoutube] = useState('');

  const { id } = location.state;
  const queryString = `api_key=563ff87b1a264a4d94dfacd2b4fc22fd&language=pt-BR`;

  useEffect(() => {
    async function getFilm() {
      const { data } = await api.get(`movie/${id}?${queryString}`);
      setFilm(data);
    }

    async function getYoutube() {
      const { data } = await api.get(`movie/${id}/videos?${queryString}`);
      setYoutube(data.results[0]);
    }

    getFilm();
    getYoutube();
  }, [id, queryString]);

  return (
    <div className="film-container">
      {film !== undefined && (
        <>
          <div
            className="film-header"
            style={{
              backgroundImage: `linear-gradient(120deg, rgba(255, 0, 199, .4) 0%, rgba(81, 0, 63, .4) 100%), linear-gradient(120deg, rgba(0, 48, 173, .4) 0%, rgba(0, 7, 26, .4) 100%), linear-gradient(rgba(0, 3, 70, .4) 0%, rgba(255, 0, 0, .4) 100%), linear-gradient(60deg, rgba(0, 41, 255, .4) 0%, rgba(170, 0, 20, .4) 100%), radial-gradient(100% 165% at 100% 100%, rgba(255, 0, 168, .4) 0%, rgba(0, 255, 71, .4) 100%), radial-gradient(100% 150% at 0% 0%, rgba(255, 245, 0, .4) 0%, rgba(81, 213, 0, .4) 100%), url(https://image.tmdb.org/t/p/original/${film.backdrop_path})`,
            }}
          >
            <header>
              <Link to="/">FILM</Link>
            </header>
            <div>
              <div className="header">
                <h2>{film.title}</h2>
                <p>
                  <strong>{film.vote_average}</strong>
                  /10 | {new Date(film.release_date).toLocaleDateString('pt-BR')}
                </p>
                <div>
                  {film.genres.map(genre => (
                    <p key={genre.id}>{genre.name}</p>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="film-detail">
            <small>nome original</small>
            <h1>{film.original_title}</h1>
            <h2>Sinopse</h2>
            <p>
              {film.overview.length > 0
                ? film.overview
                : 'Nenhuma sinopse disponível para esse filme.'}
            </p>
            <h2>Informações</h2>
            <div>
              <div>
                <p>Situação</p> <strong>{film.status}</strong>
              </div>
              <div>
                <p>Idioma</p> <strong>{film.original_language.toUpperCase()}</strong>
              </div>
              <div>
                <p>Duração</p> <strong>{film.runtime} minutos</strong>
              </div>
              <div>
                <p>Orçamento</p>
                <strong>
                  {film.revenue.toLocaleString('pt-BR', {
                    minimumFractionDigits: 2,
                    style: 'currency',
                    currency: 'BRL',
                  })}
                </strong>
              </div>
              <div>
                <p>Receita</p>
                <strong>{film.revenue}</strong>
              </div>
            </div>
            {youtube !== undefined && (
              <iframe
                title={film.title}
                width="100%"
                height="400"
                src={`https://www.youtube.com/embed/${youtube.key}`}
                frameBorder="0"
                allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            )}
          </div>
        </>
      )}
    </div>
  );
}
