import "./index.css";
import "@ungap/global-this";

import React from "react";
import { hydrate, render } from "react-dom";
import { BrowserRouter as Router } from "react-router-dom";

import reportWebVitals from "./reportWebVitals";
import { ThemeProvider } from "./contexts/ThemeContext";

import App from "./App";

const rootElement = document.getElementById("root");

const Root = (
  <ThemeProvider>
    <Router>
      <React.StrictMode>
        <App />
      </React.StrictMode>
    </Router>
  </ThemeProvider>
);

const main = () => {
  if (rootElement.hasChildNodes()) {
    hydrate(Root, rootElement);
  } else {
    render(Root, rootElement);
  }
};

const browserSupportsAllFeatures = () => {
  return Object.fromEntries && window.IntersectionObserver;
};

const loadScript = (src, done) => {
  const js = document.createElement("script");
  js.src = src;
  js.onload = function () {
    done();
  };
  js.onerror = function () {
    done(new Error("Failed to load script " + src));
  };
  document.head.appendChild(js);
};

if (browserSupportsAllFeatures()) {
  main();
} else {
  loadScript(
    "https://polyfill.io/v3/polyfill.min.js?features=IntersectionObserver%2CObject.fromEntries",
    main
  );
}

reportWebVitals();
