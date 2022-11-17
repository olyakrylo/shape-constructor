import styles from "./Constructor.module.css";

type LineType = "primary" | "secondary" | "tertiary";

const dasharray: Record<LineType, string> = {
  primary: "3 3",
  secondary: "2 2",
  tertiary: "1 1",
};

const line = (
  offset: number,
  direction: "vertical" | "horizontal",
  type: "primary" | "secondary" | "tertiary"
) => {
  const className = `markup__${type}`;
  const options = {
    className: styles[className],
    x1: direction === "vertical" ? `${offset}%` : "0",
    x2: direction === "vertical" ? `${offset}%` : "100%",
    y1: direction === "horizontal" ? `${offset}%` : "0",
    y2: direction === "horizontal" ? `${offset}%` : "100%",
    strokeDasharray: dasharray[type],
  };
  const key = `${options.x1}-${options.x2}-${options.y1}-${options.y2}`;
  return <line key={key} {...options} />;
};

export function markupLines() {
  const lines = [];

  for (let offset = 2.5; offset < 100; offset += 5) {
    lines.push(line(offset, "horizontal", "tertiary"));
    lines.push(line(offset, "vertical", "tertiary"));
  }

  for (let offset = 5; offset < 100; offset += 10) {
    lines.push(line(offset, "horizontal", "secondary"));
    lines.push(line(offset, "vertical", "secondary"));
  }

  for (let offset = 10; offset < 100; offset += 10) {
    lines.push(line(offset, "horizontal", "primary"));
    lines.push(line(offset, "vertical", "primary"));
  }

  return lines;
}
