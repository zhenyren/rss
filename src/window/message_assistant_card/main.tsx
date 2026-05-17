import React from "react";
import ReactDOM from "react-dom/client";
import MessageAssistantCard from "./MessageAssistantCard";
import "virtual:uno.css";

ReactDOM.createRoot(document.getElementById("card-root") as HTMLElement).render(
  <React.StrictMode>
    <MessageAssistantCard />
  </React.StrictMode>,
);
