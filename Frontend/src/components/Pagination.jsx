import queryStore from "../stores/queryStore";
import { IoArrowForwardOutline, IoArrowBackOutline } from "react-icons/io5";

const Pagination = () => {
  const query = queryStore((s) => s.query);
  const setPage = queryStore((s) => s.setPage);

  return (
    <div className="flex justify-end mt-6 justify-self-end self-end">
      <div className="flex items-center gap-1">
        {query.page > 1 && (
          <button
            className={`btn btn__primary flex items-center p-[6px]`}
            onClick={() => setPage((query.page -= 1))}
          >
            <IoArrowBackOutline />
          </button>
        )}
        <button
          className="btn btn__accent flex items-center p-[6px] font-semibold"
          onClick={() => setPage((query.page += 1))}
        >
          <span>Next</span> <IoArrowForwardOutline className="mt-[2.75px]" />
        </button>
      </div>
    </div>
  );
};

export default Pagination;
