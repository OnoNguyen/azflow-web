import { ArrowSpinner, GradientSpinner } from "./style";

interface ILoaderProps {
  type?: "arrow" | "gradient";
}

export function Loader({ type = "arrow" }: ILoaderProps) {
  if (type === "arrow") {
    return <ArrowSpinner />;
  }

  if (type === "gradient") {
    return (
      <GradientSpinner>
        <div />
      </GradientSpinner>
    );
  }

  return <div>Loading...</div>;
}
