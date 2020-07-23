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
    headers: {
      "Content-Type": "application/json",
    },
  });
  const data = await response.json();
  return data;
}

export async function createUser(userObj) {
  const response = await fetch("http://localhost:8000/users/", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(userObj),
  });
  const data = await response.json();
  console.log("Post return", data);
  return data;
}

export async function replaceUser(userObj) {
  const response = await fetch(
    "http://localhost:8000/users/" + userObj.userId,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userObj),
    }
  );
  const data = await response.json();
  console.log("Post return", data);
  return data;
}

export async function getContactsByUserId(userId) {
  const response = await fetch(
    "http://localhost:8000/users/" + userId + "/contacts"
  );
  const data = await response.json();
  return data;
}

export async function getContactByUserIdAndContactId(userId, contactId) {
  const response = await fetch(
    "http://localhost:8000/users/" + userId + "/contacts/" + contactId
  );
  const data = await response.json();
  return data;
}

export async function setContactForUser(userId, contactObj) {
  console.log(JSON.stringify(contactObj));
  const response = await fetch(
    "http://localhost:8000/users/" + userId + "/contacts",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(contactObj),
    }
  );
  const data = await response.json();
  console.log("Post return", data);
  return data;
}

export async function deleteContactByContactId(userId, contactId) {
  const response = await fetch(
    "http://localhost:8000/users/" + userId + "/contacts/" + contactId,
    {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  const data = await response.json();
  return data;
}

export async function getUserByContact(type, contact) {
  const response = await fetch(
    "http://localhost:8000/contacts/" + type + "/" + contact
  );
  const data = await response.json();
  return data;
}
