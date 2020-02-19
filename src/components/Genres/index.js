import React, { useEffect, useState, memo } from 'react';

import api from '../../services/api';

import './styles.scss';

function Genres({ id }) {
  const [genres, setGenres] = useState(undefined);

  const queryString = `api_key=563ff87b1a264a4d94dfacd2b4fc22fd&language=pt-BR`;

  useEffect(() => {
    async function getGenre() {
      if (id !== undefined) {
        const { data } = await api.get(`movie/${id}?${queryString}`);

        setGenres(data.genres);
      }
    }

    getGenre();
  }, [id, queryString]);
  return (
    <div className="genres">
      <div>
        {genres !== undefined ? (
          genres.map(genre => <p key={Math.random()}>{genre.name}</p>)
        ) : (
          <p>Nenhum genero disponível</p>
        )}
      </div>
    </div>
  );
}

export default memo(Genres);
