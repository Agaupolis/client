import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./styles/index.scss";
import { BrowserRouter as Router } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "react-hot-toast";

const queryClient = new QueryClient({});
ReactDOM.createRoot(document.getElementById("root")).render(
    <React.StrictMode>
        <Router>
            <QueryClientProvider client={queryClient}>
                <App />
            </QueryClientProvider>
        </Router>
    </React.StrictMode>
);
