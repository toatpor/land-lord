import { HiChevronLeft, HiChevronRight } from "react-icons/hi2";
import { useSearchParams } from "react-router-dom";

import styled from "styled-components";

const StyledPagination = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const P = styled.p`
  display: flex;
  font-size: 1.4rem;
  margin-left: 0.8rem;
  gap: 0.4rem;

  & span {
    font-weight: 600;
  }
`;

const Buttons = styled.div`
  display: flex;
  gap: 0.6rem;
`;

const PaginationButton = styled.button`
  background-color: ${(props) =>
    props.active ? " var(--color-brand-600)" : "var(--color-grey-50)"};
  color: ${(props) => (props.active ? " var(--color-brand-50)" : "inherit")};
  border: none;
  border-radius: var(--border-radius-sm);
  font-weight: 500;
  font-size: 1.4rem;

  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.4rem;
  padding: 0.6rem 1.2rem;
  transition: all 0.3s;

  &:has(span:last-child) {
    padding-left: 0.4rem;
  }

  &:has(span:first-child) {
    padding-right: 0.4rem;
  }

  & svg {
    height: 1.8rem;
    width: 1.8rem;
  }

  &:hover:not(:disabled) {
    background-color: var(--color-brand-600);
    color: var(--color-brand-50);
  }
`;
function Pagination({ bookingAmount }) {
  const pageLimited = import.meta.env.VITE_PAGE_LIMITED;
  const [searchParam, setSearchParam] = useSearchParams();

  const currentPage = !searchParam.get("page")
    ? 1
    : Number(searchParam.get("page"));

  const lastPage = Math.ceil(bookingAmount / pageLimited);

  const handleNextpage = function () {
    searchParam.set(
      "page",
      currentPage === lastPage ? lastPage : currentPage + 1
    );
    setSearchParam(searchParam);
  };

  const handlePrevious = function () {
    searchParam.set("page", currentPage === 1 ? currentPage : currentPage - 1);
    setSearchParam(searchParam);
  };
  if (lastPage <= 1) return null;
  return (
    <StyledPagination>
      <P>
        Showing <span>{(currentPage - 1) * pageLimited + 1}</span> to
        <span>
          {currentPage === lastPage ? bookingAmount : currentPage * pageLimited}
        </span>
        of
        <span>{bookingAmount}</span>
      </P>
      <Buttons>
        <PaginationButton onClick={handlePrevious} disabled={currentPage === 1}>
          <HiChevronLeft /> <span>Previous</span>
        </PaginationButton>

        <PaginationButton
          onClick={handleNextpage}
          disabled={currentPage === lastPage}
        >
          <span>Next</span>
          <HiChevronRight />
        </PaginationButton>
      </Buttons>
    </StyledPagination>
  );
}

export default Pagination;
