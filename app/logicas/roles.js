const rolesArray = ["Colaborador"];

function roles(roles) {
  return roles.map((role) => {
    if (role === "Colaborador") {
      return "funcionou";
    } else {
      return "não funcionou";
    }
  });
}

console.log(roles(rolesArray));
