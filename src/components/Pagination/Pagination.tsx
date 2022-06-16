import React from 'react';
import ReactPaginate from "react-paginate";
import s from './Pagination.module.scss'

type PaginationPropsType = {
    currentPage: number
    onClickPage: (page: number) => void
}

export const Pagination = ({currentPage, onClickPage}: PaginationPropsType) => {
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
            forcePage={currentPage - 1}
        />
    );
};
