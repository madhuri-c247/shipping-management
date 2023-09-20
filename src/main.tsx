import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import { Provider } from "react-redux";
//CSS
import "./index.css";
//redux-store
import { store } from "./redux/store/index.ts";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <Provider store={store}>
    <App />
  </Provider>
);
