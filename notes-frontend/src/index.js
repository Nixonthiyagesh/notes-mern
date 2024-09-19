import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import * as serviceWorkerRegistration from "./serviceWorkerRegistration";

import App from "./App";
import { Provider } from "./context/Provider";

const rootElement = document.getElementById("root");
const root = createRoot(rootElement);

root.render(
  <Provider>
    <App />
  </Provider>
);

serviceWorkerRegistration.register();
