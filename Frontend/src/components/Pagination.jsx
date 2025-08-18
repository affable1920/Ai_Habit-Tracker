import React from "react";
import useQueryStore from "../stores/queryStore";
import { IoArrowForwardOutline, IoArrowBackOutline } from "react-icons/io5";
import Button from "./Button";

const Pagination = React.memo(() => {
  const page = useQueryStore((s) => s.query.page);
  const setPage = useQueryStore((s) => s.setPage);

  const handleNext = React.useCallback(() => setPage(page + 1), [page]);
  const handlePrev = React.useCallback(() => setPage(page - 1), [page]);

  const iconConfig =
    "group-hover:translate-x-1 transition-transform duration-[220ms]";

  return (
    <div className="flex items-center gap-4 justify-end">
      {page > 1 && (
        <Button className={`group gap-1`} onClick={handlePrev}>
          Back
          <IoArrowBackOutline className={iconConfig} />
        </Button>
      )}

      <Button className={`group gap-1`} onClick={handleNext}>
        <span>Next</span>
        <IoArrowForwardOutline className={iconConfig} />
      </Button>
    </div>
  );
});

export default Pagination;
