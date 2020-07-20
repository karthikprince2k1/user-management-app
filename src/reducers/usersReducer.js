const initialState = {
  users: [],
};

export const usersReducer = (state = initialState.users, action) => {
  switch (action.type) {
    case "UPDATE_USERS":
      const users = action.payload.users;
      return [...users];
    default:
      return state;
  }
};
