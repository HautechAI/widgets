import ReactDOM from "react-dom/client";
import "./main.css";
import WidgetApplication from "./Application";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(<WidgetApplication />);
