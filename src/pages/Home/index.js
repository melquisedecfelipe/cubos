import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import './styles.scss';

import Button from '../../components/Button';
import Films from '../../components/Film';
import Input from '../../components/Input';
import Paginate from '../../components/Paginate';
import Select from '../../components/Select';

import api from '../../services/api';

export default function Home() {
  const [name, setName] = useState('');
  const [genre, setGenre] = useState('');
  const [genres, setGenres] = useState('');

  const [currentPage, setCurrentPage] = useState(1);
  const [films, setFilms] = useState(undefined);
  const [totalPages, setTotalPages] = useState(undefined);

  const paginate = pageNumber => setCurrentPage(pageNumber);

  const queryString = `api_key=563ff87b1a264a4d94dfacd2b4fc22fd&language=pt-BR`;

  async function handleSearch(e) {
    if (e !== undefined) {
      e.preventDefault();
    }

    try {
      const { data } = await api.get(`movie/now_playing?${queryString}&page=${currentPage}`);
      setFilms(data.results);
      setTotalPages(5);
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    handleSearch();
  }, [currentPage]);

  useEffect(() => {
    async function getGenres() {
      const { data } = await api.get(`/genre/movie/list?${queryString}`);

      setGenres(data.genres);
    }

    getGenres();
  }, [queryString]);

  function handleName(e) {
    setName(e.target.value);
  }

  function handleGenre(e) {
    setGenre(e);
  }

  return (
    <div className="home-container">
      <div className="home-search">
        <header>
          <Link to="/">FILM</Link>
        </header>
        <form>
          <div className="header">
            <h2>Qual filme você quer ver hoje?</h2>
            <p>Selecione os filtros e seja feliz.</p>
          </div>
          <div className="search">
            <Input placeholder="Nome" defaultValue={name} onBlur={handleName} />
            <div>
              <Select placeholder="Genero" value={genre} onChange={handleGenre} option={genres} />
              <Button classe="-white" label="Buscar" onClick={handleSearch} />
            </div>
          </div>
        </form>
      </div>

      {films !== undefined && (
        <div className="home-content">
          <div className="film">
            <Films films={films} />
          </div>

          <div className="footer">
            <div className="paginate">
              <Paginate currentPage={currentPage} totalPages={totalPages} paginate={paginate} />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
