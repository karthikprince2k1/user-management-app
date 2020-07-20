export const updateUsers = (users) => {
  return {
    type: "UPDATE_USERS",
    payload: {
      users: users,
    },
  };
};
