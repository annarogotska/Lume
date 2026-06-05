import { ViteReactSSG } from "vite-react-ssg";
import "./styles/index.css";
import { routes } from "./routes";

export const createRoot = ViteReactSSG({ routes });
