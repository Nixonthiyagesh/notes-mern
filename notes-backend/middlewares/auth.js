const jwt = require("jsonwebtoken");
const NewNoteModel = require("../models/NewNoteModel");

const auth = async (req, res, next) => {
  try {
    const token = req.header("auth-token").replace("Bearer ", "");
    console.log(token + "hiii");
    const { _id } = jwt.verify(token, process.env.SECRET_TOKEN);
    const data = await NewNoteModel.find({ _id, token });
    if (!data.length > 0) {
      throw new Error("pls Login");
    }
    req.user = data[0];
    req.token = token;
    next();
  } catch (error) {
    res.status(400).json({ err: error.message });
  }
};

module.exports = auth;
