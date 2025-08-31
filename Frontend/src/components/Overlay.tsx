const alphas = {
  A: "bg-primary/25",
  B: "bg-primary/50",
  C: "bg-primary/75",
  D: "bg-primary",
};

const Overlay = ({ children, alpha }) => {
  const overlayClassConfig = ["overlay", alphas[alpha] ?? "bg-primary/50"]
    .filter(Boolean)
    .join(" ");

  return <div className={overlayClassConfig}>{children}</div>;
};

export default Overlay;
