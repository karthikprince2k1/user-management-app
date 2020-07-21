const initialState = {
  contacts: [],
};

export const contactsReducer = (state = initialState.contacts, action) => {
  switch (action.type) {
    case "UPDATE_CONTACTS":
      const users = action.payload.users;
      return [...users];
    default:
      return state;
  }
};
