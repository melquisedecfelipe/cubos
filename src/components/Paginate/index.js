import React, { memo } from 'react';
import { MdArrowBack, MdArrowForward } from 'react-icons/md';

import './styles.scss';

function Paginate({ currentPage, totalPages, paginate }) {
  const pages = [];

  for (let i = 1; i <= totalPages; i += 1) {
    pages.push(i);
  }

  return (
    <>
      <MdArrowBack
        className="icon"
        onClick={() => paginate(currentPage === 1 ? currentPage : currentPage - 1)}
      />
      <ul className="paginate">
        {pages !== undefined &&
          pages.splice(currentPage - 1, 5).map(elem => (
            <li
              key={elem}
              className={elem === currentPage ? '-active' : ''}
              onClick={() => paginate(elem)}
            >
              {elem}
            </li>
          ))}
      </ul>
      <MdArrowForward
        className="icon"
        onClick={() => paginate(currentPage === totalPages ? currentPage : currentPage + 1)}
      />
    </>
  );
}

export default memo(Paginate);
