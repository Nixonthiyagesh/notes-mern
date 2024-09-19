const bcrypt = require("bcryptjs");

const a = {
  has: "",
};
const pass = async () => {
  const hashedPassword = await bcrypt.hash("password", 10);
  a.has = hashedPassword;
  console.log(hashedPassword);
  return a;
};
const has = pass();

const checkIsMatch = async () => {
  console.log(a.has);
  const ismatch = await bcrypt.compare("password", a.has);
  console.log(ismatch);
};

checkIsMatch();
