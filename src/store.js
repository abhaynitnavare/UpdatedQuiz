import { legacy_createStore as createStore } from "redux";
import rootReducer from "./Reducerfolf/Combinereduce";
const store = createStore(rootReducer)
export default store