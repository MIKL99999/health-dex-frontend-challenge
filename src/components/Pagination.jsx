import React from 'react';
import PropTypes from 'prop-types';
import ReactPaginate from 'react-paginate';
import '../styles/pagination.scss';


export const Pagination = ({pageCount, onPageChange, pageRangeDisplayed, marginPagesDisplayed}) => {
    return (
        <ReactPaginate
            previousLabel={'Previous'}
            nextLabel={'Next'}
            breakLabel={'...'}
            pageCount={pageCount}
            pageRangeDisplayed={pageRangeDisplayed}
            marginPagesDisplayed={marginPagesDisplayed}
            onPageChange={onPageChange}
            containerClassName={'pagination'}
            subContainerClassName={'pages pagination'}
            activeClassName="pagination__active"
            breakClassName={'break-me'}
        />
    );
};

Pagination.propTypes = {
    pageCount: PropTypes.number.isRequired,
    pageRangeDisplayed: PropTypes.number.isRequired,
    marginPagesDisplayed: PropTypes.number.isRequired,
};

Pagination.defaultProps = {
    pageRangeDisplayed: 10,
    marginPagesDisplayed: 10,
};
