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
      if (genre !== '') {
        const { data } = await api.get(
          `discover/movie?${queryString}&page=${currentPage}&with_genres=${genre}`,
        );

        setFilms(data.results);
        setTotalPages(5);
      } else {
        const { data } = await api.get(`discover/movie?${queryString}&page=${currentPage}`);

        setFilms(data.results);
        setTotalPages(5);
      }

      const storageFilms = JSON.parse(localStorage.getItem('films'));
      getAll(storageFilms);
    }

    getFilms();
  }, [getAll, setFilms, genre, currentPage, queryString]);

  function handleName(e) {
    setName(e.target.value);
  }

  async function handleGenre(e) {
    setGenre(e);
  }

  const filteredFilms = films.filter(film => film.title.toLowerCase().includes(name.toLowerCase()));

  return (
    <div className="home-container">
      <div className="home-search">
        <header>
          <Link to="/">FILM</Link>
        </header>
        <div>
          <div className="header">
            <h2>Qual filme você quer ver hoje?</h2>
            <p>Selecione os filtros e seja feliz.</p>
          </div>
          <div className="search">
            <Input defaultValue={name} onBlur={handleName} />
            <Select value={genre} onChange={handleGenre} option={genres} />
          </div>
        </div>
      </div>

      <div className="home-content">
        <div className="film">
          {filteredFilms.length > 0 ? (
            <Films films={filteredFilms} />
          ) : (
            <h1>Não encontramos nenhum item com esse filtro... :(</h1>
          )}
        </div>

        {!(name !== '') && (
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
