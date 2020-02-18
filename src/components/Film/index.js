import React from 'react';

import './styles.scss';

export default function Film({ films }) {
  return (
    <div className="films-container">
      <div className="films-content">
        {films.map(elem => (
          <div className="films-card" key={elem.id}>
            <div className="header">
              <div
                style={{
                  backgroundImage: `url(https://image.tmdb.org/t/p/original/${elem.poster_path})`,
                }}
                title={elem.title}
                className="film-img"
              />
              <div>
                <h2>{elem.title}</h2>
                <p>{elem.overview}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
