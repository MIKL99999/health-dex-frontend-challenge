import React from 'react';
import PropTypes from 'prop-types';
import ReactPaginate from 'react-paginate';
import '../styles/pagination.scss';


export const Pagination = ({pageCount, currentPage, onPageChange, pageRangeDisplayed, marginPagesDisplayed}) => {
    return (
        <ReactPaginate
            previousLabel="Previous"
            nextLabel="Next"
            breakLabel="..."
            pageCount={pageCount}
            initialPage={currentPage}
            onPageChange={onPageChange}
            containerClassName="pagination"
            pageClassName="pagination__item"
            nextClassName="pagination__item"
            previousClassName="pagination__item"
            activeClassName="pagination__active"
            pageRangeDisplayed={pageRangeDisplayed}
            marginPagesDisplayed={marginPagesDisplayed}
        />
    );
};

Pagination.propTypes = {
    pageCount: PropTypes.number.isRequired,
    currentPage: PropTypes.number.isRequired,
    pageRangeDisplayed: PropTypes.number.isRequired,
    marginPagesDisplayed: PropTypes.number.isRequired,
};

Pagination.defaultProps = {
    pageRangeDisplayed: 10,
    marginPagesDisplayed: 10,
};
