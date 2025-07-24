import { TiTick } from "react-icons/ti";
import RecommendationSystem from "../components/RecommendationSystem";

const modalMap = {
  rec_system: <RecommendationSystem />,
  edit_habit: (
    <button className="btn btn__accent flex items-center gap-3">
      Mark complete <TiTick />
    </button>
  ),
};

export default modalMap;
