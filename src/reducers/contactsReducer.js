const initialState = {
  contacts: [],
};

export const contactsReducer = (state = initialState.contacts, action) => {
  switch (action.type) {
    case "UPDATE_CONTACTS":
      const contacts = action.payload.contacts;
      return [...contacts];
    default:
      return state;
  }
};
