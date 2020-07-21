export const updateContacts = (contacts) => {
  return {
    type: "UPDATE_CONTACTS",
    payload: {
      contacts: contacts,
    },
  };
};
