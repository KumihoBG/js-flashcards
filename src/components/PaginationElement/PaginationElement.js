import React from "react";
import { NavLink } from 'react-router-dom';
import './PaginationElement.css';

function PaginationElement({ cardsPerPage, totalCards, paginate, previousPage, nextPage, currentPageName }) {
    const pageNumbers = [];

    for (let index = 1; index <= Math.ceil(totalCards / cardsPerPage); index++) {
        pageNumbers.push(index);
    }

    return (
        <nav className="pagination-nav">
            <ul className="pagination">
                {pageNumbers.map((number, i) => (
                    <div>
                        <li key={number} className="page-item">
                            <NavLink className={(navData) => navData.isActive ? 'active-pagination' : 'page-link'} to={`/${currentPageName}/${number}`} onClick={() => {
                                paginate(number);
                            }}>
                                {number}
                            </NavLink>
                        </li>
                    </div>
                ))}
            </ul>
        </nav>
    )
}

export default PaginationElement;