import queryStore from "../stores/queryStore";
import { IoArrowForwardOutline, IoArrowBackOutline } from "react-icons/io5";

const Pagination = () => {
  const query = queryStore((s) => s.query);
  const setPage = queryStore((s) => s.setPage);

  return (
    <div className="flex items-center gap-3 justify-end">
      {query.page > 1 && (
        <button
          className={`btn btn__accent btn__small flex gap-1 items-end`}
          onClick={() => setPage((query.page -= 1))}
        >
          <IoArrowBackOutline />
          <span>Back</span>
        </button>
      )}
      <button
        className="btn btn__accent btn__small flex gap-1 items-end"
        onClick={() => setPage((query.page += 1))}
      >
        <span>Next</span> <IoArrowForwardOutline />
      </button>
    </div>
  );
};

export default Pagination;
