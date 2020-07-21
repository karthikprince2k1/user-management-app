import { usersReducer } from "./usersReducer";
import { contactsReducer } from "./contactsReducer";

import { combineReducers } from "redux";

const rootReducer = combineReducers({
  users: usersReducer,
  contacts: contactsReducer,
});

export default rootReducer;
