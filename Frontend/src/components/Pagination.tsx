import React from "react";
import Button from "./Interactives/Button.js";
import useQueryStore from "../stores/queryStore.js";
import { IoArrowForwardOutline, IoArrowBackOutline } from "react-icons/io5";

const Pagination = React.memo(() => {
  const page = useQueryStore((s) => s.query.page);
  const setPage = useQueryStore((s) => s.setPage);

  const handleNext = React.useCallback(() => setPage(page + 1), [page]);
  const handlePrev = React.useCallback(() => setPage(page - 1), [page]);

  return (
    <div className="flex items-center gap-4 justify-end">
      {page > 1 && (
        <Button className={`px-4`} onClick={handlePrev}>
          Back
          <IoArrowBackOutline />
        </Button>
      )}

      <Button className={`px-4`} onClick={handleNext}>
        Next
        <IoArrowForwardOutline />
      </Button>
    </div>
  );
});

export default Pagination;
