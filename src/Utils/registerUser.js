const addUserToDB = (JSONUser) => {
  const userToRegister = { habits: [] };

  Object.entries(JSONUser).map(
    (property) => (userToRegister[property[0]] = property[1] || "")
  );
  return userToRegister;
};

export default addUserToDB;
