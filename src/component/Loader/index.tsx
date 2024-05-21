import React from "react";
import { ArrowSpinner, GradientSpinner } from "./style"; // TODO: add spinner type

interface LoaderProps {
  type?: "arrow" | "gradient";
}

export function Loader({ type = "arrow" }: LoaderProps) {
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
