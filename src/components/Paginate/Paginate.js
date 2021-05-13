import React, { useState } from "react";
import "./Paginate.css";
import { useLocation, useHistory } from "react-router-dom";
import ReactPaginate from "react-paginate";

import { RiArrowLeftSLine, RiArrowRightSLine } from "react-icons/ri";

export default function Paginate({ totalPages, setPage }) {
  //   <Pagination>
  //     <Pagination.First disabled={page === 1 && true} />
  //     <Pagination.Prev disabled={page === 1 && true} />
  //     <Pagination.Item onClick={() => setPage(1)}>1</Pagination.Item>
  //     <Pagination.Ellipsis />
  //     {[...Array(totalPages).keys()].map((id) => (
  //       <Pagination.Item>{id}</Pagination.Item>
  //     ))}
  //     <Pagination.Ellipsis />
  //     <Pagination.Item>{totalPages}</Pagination.Item>
  //     <Pagination.Next />
  //     <Pagination.Last />
  //   </Pagination>

  //   <ReactPaginate
  //     disableInitialCallback
  //     pageCount={totalPages}
  //     pageRangeDisplayed={4}
  //     containerClassName={"pagination"}
  //     marginPagesDisplayed={2}
  //     breakClassName={"break-me"}
  //     activeClassName={"active-page"}
  //     activeLinkClassName={"active-link-page"}
  //     previousLabel={<RiArrowLeftSLine />}
  //     previousClassName={"preview-arrow"}
  //     nextClassName={"next-arrow"}
  //     nextLabel={<RiArrowRightSLine />}
  //     pageClassName={"page-btn"}
  //     onPageChange={handlePageChange}
  //     onPageActive={handlePageActive}
  //   />;

  const { search } = useLocation();
  const query = new URLSearchParams(search);
  const pageQuery = query.get("page");
  console.log(pageQuery);
  const handlePageChange = (data) => {
    setPage(data.selected + 1);
  };
  return (
    <ReactPaginate
      pageCount={totalPages}
      pageRangeDisplayed={4}
      containerClassName={"pagination"}
      marginPagesDisplayed={2}
      breakClassName={"break-me"}
      activeClassName={"active-page"}
      activeLinkClassName={"active-link-page"}
      previousLabel={totalPages > 1 && <RiArrowLeftSLine />}
      previousClassName={"preview-arrow"}
      nextClassName={"next-arrow"}
      nextLabel={totalPages > 1 && <RiArrowRightSLine />}
      pageClassName={"page-btn"}
      onPageChange={handlePageChange}
      forcePage={parseInt(pageQuery) - 1}
      //onPageActive={handlePageActive}
    />
  );
}

{
  /* <div>
      {totalPages === 1 ? null : totalPages <= 5 ? (
        <Pagination>
          <Pagination.First
            disabled={page === 1 && true}
            onClick={() => setPage(1)}
          />
          <Pagination.Prev
            disabled={page === 1 && true}
            onClick={() => setPage(page - 1)}
          />
          {[...Array(5).keys()].map((id) => (
            <Pagination.Item
              onClick={() => setPage(id + 1)}
              active={Number(pageQuery) === id + 1 && true}
            >
              {id + 1}
            </Pagination.Item>
          ))}
          <Pagination.Next onClick={() => setPage(page + 1)} />
          <Pagination.Last />
        </Pagination>
      ) : (
        <Pagination>
          <Pagination.First
            disabled={page === 1 && true}
            onClick={() => setPage(1)}
          />
          <Pagination.Prev
            disabled={page === 1 && true}
            onClick={() => setPage(page - 1)}
          />
          {[...Array(5).keys()].map((id) => {
            return (
              <div>
                <Pagination.Item
                  onClick={() => setPage(id + 1)}
                  active={Number(pageQuery) === id + 1 && true}
                >
                  {id + 1}
                </Pagination.Item>
              </div>
            );
          })}
          <Pagination.Next onClick={() => setPage(page + 1)} />
          <Pagination.Last />
        </Pagination>
      )}
    </div> */
}
