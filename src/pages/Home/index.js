import React, { useState, useEffect } from 'react';

import './styles.scss';

import Button from '../../components/Button';
import Films from '../../components/Film';
import Input from '../../components/Input';
import Paginate from '../../components/Paginate';
import Select from '../../components/Select';

import api from '../../services/api';

import optionsSelect from './optionsSelect';
import Film from '../../components/Film';

export default function Search() {
  const [name, setName] = useState('');
  const [genre, setGenre] = useState('');
  const [genres, setGenres] = useState('');

  const [currentPage, setCurrentPage] = useState(1);
  const [filmPerPage, setFilmPerPage] = useState(12);
  const [films, setFilms] = useState(undefined);
  const [totalPages, setTotalPages] = useState(undefined);

  const queryString = `api_key=563ff87b1a264a4d94dfacd2b4fc22fd&language=pt-BR`;
  const paginate = pageNumber => setCurrentPage(pageNumber);

  async function handleSearch(e) {
    if (e !== undefined) {
      e.preventDefault();
    }

    try {
      const { data } = await api.get(`movie/now_playing?${queryString}`);
      setFilms(data.results);
      setTotalPages(5);
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    handleSearch();
  }, [currentPage, filmPerPage]);

  useEffect(() => {
    async function getGenres() {
      const { data } = await api.get(`/genre/movie/list?${queryString}`);

      setGenres(data.genres);
    }

    getGenres();
  }, []);

  function handleFilmPerPage(e) {
    setFilmPerPage(e);
  }

  function handleName(e) {
    setName(e.target.value);
  }

  function handleGenre(e) {
    setGenre(e.target.value);
  }

  return (
    <>
      <div
        className={
          films !== undefined && films.length !== 0 ? 'search-container -films' : 'search-container'
        }
      >
        <header>
          <h1>FILM</h1>
        </header>
        <form>
          <div className="header">
            <h1>Buscar</h1>
            <div>
              <h2>Qual filme você quer ver hoje?</h2>
              <p>selecione os filtros e seja feliz.</p>
            </div>
          </div>
          <div className="search">
            <Input placeholder="Nome" defaultValue={name} onBlur={handleName} />
            <Select placeholder="Genero" value={genre} onChange={handleGenre} option={genres} />
            <Button classe="-white" label="Buscar" onClick={handleSearch} />
          </div>
        </form>
      </div>
      {films !== undefined && (
        <>
          <Films films={films} />
          <div className="footer">
            <div className="register">
              <div className="select">
                <p>Mostrando</p>
                <Select value={filmPerPage} onChange={handleFilmPerPage} option={optionsSelect} />
                <p>
                  de <strong>{films.count}</strong> registros encontrados.{' '}
                </p>
              </div>
              <div className="paginate">
                <Paginate
                  currentPage={currentPage}
                  filmPerPage={filmPerPage}
                  totalPages={totalPages}
                  paginate={paginate}
                />
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
}
