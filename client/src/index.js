import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import "./App.css";
// import App from "./App";
import LoadableApp from "./LoadableApp";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter } from "react-router-dom";
import "antd/dist/antd.min.css";

import { createStore } from "redux";
import { Provider } from "react-redux";
import { composeWithDevTools } from "redux-devtools-extension";
import rootReducer from "./reducers";

// Store
const store = createStore(rootReducer, composeWithDevTools());

ReactDOM.render(
  // <React.StrictMode>
  <Provider store={store}>
    <BrowserRouter>
      <LoadableApp />
      {/* <App /> */}
    </BrowserRouter>
  </Provider>,

  // </React.StrictMode>,
  document.getElementById("root"),
);

reportWebVitals();
