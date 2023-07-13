import React from "react";
import ReactDOMClient from "react-dom/client";
import { Apresentao } from "./screens/Apresentao";

const app = document.getElementById("app");
const root = ReactDOMClient.createRoot(app);
root.render(<Apresentao />);
