import * as use from "@tensorflow-models/universal-sentence-encoder";

let model;
const useTensor = () => {
  const loadodel = async () => {
    if (!model) model = use.load();
    console.log(model);
  };
  loadModel();
};

export default useTensor;
