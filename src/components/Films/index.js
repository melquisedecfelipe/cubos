import React, { memo } from 'react';

import Genres from '../Genres';

import './styles.scss';

import history from '../../services/history';

import truncate from '../../utils/truncate';

function Film({ films }) {
  const handleDetail = id => {
    history.push(`/detail/${id}`, { id });
  };

  return films !== undefined ? (
    films.map(elem => (
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
            <h2 title={elem.title}>{truncate(elem.title, 20)}</h2>
            <p title={elem.overview}>
              {elem.overview.length > 0
                ? truncate(elem.overview, 75)
                : 'Nenhuma sinopse disponível para esse filme.'}
            </p>
            <div>
              <p>
                Score:{' '}
                <strong className={parseFloat(elem.vote_average) < 5.0 ? '-red' : '-green'}>
                  {elem.vote_average}
                </strong>
                /10
              </p>
              <p>Lançado: {new Date(elem.release_date).toLocaleDateString('pt-BR')}</p>
            </div>
            <hr />
            <div className="film-genre">
              <Genres id={elem.id} />
            </div>
          </div>
        </div>
      </div>
    ))
  ) : (
    <h1>Nenhum filme encontrado</h1>
  );
}
export default memo(Film);
