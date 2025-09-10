import AppRoute from "./components/routes/AppRoute";
import { Provider } from "react-redux";
import { store } from "./assets/store/store";

export default function App() {
  return (
   <Provider store={store}>
      <AppRoute/>
   </Provider>
  );
}