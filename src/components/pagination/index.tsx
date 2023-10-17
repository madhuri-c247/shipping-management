import * as React from "react";
import ReactPaginate from "react-paginate";

interface PaginationProps {
  setPage: React.Dispatch<React.SetStateAction<number>>;
  fetchData: (page: number) => Promise<void>;
  totalPages: number;
}

export default function Pagination({
  setPage,
  totalPages,
  fetchData,
}: PaginationProps) {
  const handlePageClick = (data: any) => {
    const selectedPage = data.selected + 1;
    setPage(selectedPage);
    fetchData(selectedPage);
  };

  return (
    <ReactPaginate
      pageCount={totalPages}
      pageRangeDisplayed={5}
      marginPagesDisplayed={2}
      onPageChange={handlePageClick}
      containerClassName={"pagination justify-content-center"}
      pageClassName={"page-item"}
      pageLinkClassName={"page-link"}
      previousClassName={"page-item"}
      previousLinkClassName={"page-link"}
      nextClassName={"page-item"}
      nextLinkClassName={"page-link"}
      breakClassName={"page-item"}
      breakLinkClassName={"page-link"}
      activeClassName={"active"}
    />
  );
}
