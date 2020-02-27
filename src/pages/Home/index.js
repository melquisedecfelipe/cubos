import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import './styles.scss';

import Films from '../../components/Films';
import Input from '../../components/Input';
import Paginate from '../../components/Paginate';
import Select from '../../components/Select';

import api from '../../services/api';
import { Creators as FilmActions } from '../../store/ducks/film';

function Home({ films, setFilms, getAll }) {
  const [name, setName] = useState('');
  const [genre, setGenre] = useState('');
  const [genres, setGenres] = useState('');

  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(undefined);

  const paginate = pageNumber => setCurrentPage(pageNumber);

  const queryString = `api_key=563ff87b1a264a4d94dfacd2b4fc22fd&language=pt-BR`;

  useEffect(() => {
    async function getGenres() {
      const { data } = await api.get(`/genre/movie/list?${queryString}`);

      setGenres(data.genres);
    }

    getGenres();
  }, [currentPage, queryString]);

  useEffect(() => {
    async function getFilms() {
      if (name !== '') {
        const { data } = await api.get(
          `search/movie?${queryString}&page=${currentPage}&query=${name.replace(' ', '+')}`,
        );

        setFilms(data.results);
        setTotalPages(data.total_pages);
      } else {
        const { data } = await api.get(
          `discover/movie?${queryString}&page=${currentPage}&with_genres=${genre}`,
        );

        setFilms(data.results);
        setTotalPages(data.total_pages);
      }

      const storageFilms = JSON.parse(localStorage.getItem('films'));
      getAll(storageFilms);
    }

    getFilms();
  }, [getAll, setFilms, name, genre, currentPage, queryString]);

  const handleName = e => {
    setName(e.target.value);
  };

  const handleGenre = e => {
    setGenre(e.target.value);
  };

  return (
    <div className="home-container">
      <div className="home-search">
        <header>
          <Link to="/">FILM</Link>
        </header>
        <div>
          <div className="header">
            <h2>Qual filme você quer ver hoje?</h2>
            <p>Selecione um dos filtros e seja feliz.</p>
          </div>
          <div className="search">
            <Input defaultValue={name} onBlur={handleName} disabled={genre !== ''} />
            <Select value={genre} onChange={handleGenre} option={genres} disabled={name !== ''} />
          </div>
        </div>
      </div>

      <div className="home-content">
        <div className="film">
          {films.length > 0 ? (
            <Films films={films} />
          ) : (
            <h1>Não encontramos nenhum item com esse filtro... :(</h1>
          )}
        </div>

        {totalPages > 1 && (
          <div className="footer">
            <div className="paginate">
              <Paginate currentPage={currentPage} totalPages={totalPages} paginate={paginate} />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

const mapStateToProps = state => ({
  films: state.film.films,
});

const mapDispatchToProps = dispatch => bindActionCreators(FilmActions, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Home);
