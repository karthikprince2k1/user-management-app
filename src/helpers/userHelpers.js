export async function getUsers() {
  const response = await fetch("http://localhost:8000/users");
  const data = await response.json();
  return data;
}

export async function getUserByUserId(userId) {
  const response = await fetch("http://localhost:8000/users/" + userId);
  const data = await response.json();
  return data;
}

export async function deleteUserByUserId(userId) {
  const response = await fetch("http://localhost:8000/users/" + userId, {
    method: "DELETE",
    header: {
      "Content-Type": "application/json",
    },
  });
  const data = await response.json();
  return data;
}
