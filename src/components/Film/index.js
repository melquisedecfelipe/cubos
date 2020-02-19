import React from 'react';

import './styles.scss';

import history from '../../services/history';

export default function Film({ films }) {
  function truncate(string, size) {
    if (string.length > size) {
      return string.slice(0, size) + '...';
    } else {
      return string;
    }
  }

  function handleDetail(id) {
    history.push(`/detail/${id}`, { id });
  }

  return films.map(elem => (
    <div className="films-card" key={elem.id} onClick={() => handleDetail(elem.id)}>
      <div className="header">
        <div
          style={{
            backgroundImage: `url(https://image.tmdb.org/t/p/original/${elem.poster_path})`,
          }}
          title={elem.title}
          className="film-img"
        />
        <div>
          <h2>{truncate(elem.title, 15)}</h2>
          <p>
            {elem.overview.length > 0
              ? truncate(elem.overview, 50)
              : 'Nenhuma sinopse disponível para esse filme.'}
          </p>
          <span>
            <strong className={parseFloat(elem.vote_average) < 5.0 ? '-red' : '-green'}>
              {elem.vote_average}
            </strong>
            /10 | {new Date(elem.release_date).toLocaleDateString('pt-BR')}
          </span>
        </div>
      </div>
    </div>
  ));
}
