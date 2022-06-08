import React from 'react';
import ReactPaginate from "react-paginate";
import s from './Pagination.module.scss'

export const Pagination = ({onClickPage}) => {
    return (
        <ReactPaginate
            className={s.root}
            breakLabel="..."
            nextLabel=">"
            previousLabel="<"
            onPageChange={(event) =>
                onClickPage(event.selected + 1)}
            pageRangeDisplayed={8}
            pageCount={2}
            renderOnZeroPageCount={null}
        />
    );
};
