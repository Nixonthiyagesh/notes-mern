const express = require("express");
const router = express.Router();
const NewNoteModel = require("../models/NewNoteModel");
const auth = require("../middlewares/auth");

router.post("/signup", async (req, res) => {
  const { name, email, password } = req.body;
  if (typeof password !== "string") {
    res.status(400).json({ error: "enter string password" });
    return;
  }
  const data = await new NewNoteModel({ name, email, password }).save();
  res.status(200).json({ data });
});

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    console.log(req.body);
    if (typeof password !== "string") {
      res.status(400).json({ error: "enter only string password" });
      return;
    }
    const data = await NewNoteModel.findByCredentials(email, password);
    console.log(data);
    const token = await data.genAuthToken();
    data.token = token;
    await data.save();
    res.status(200).json(data);
  } catch (err) {
    res.status(400).json({ err });
  }
});

router.post("/logout", auth, async (req, res) => {
  try {
    req.user.token = undefined;
    await req.user.save();
    res.status(200).json({ success: "successfully logged out" });
  } catch (err) {
    res.status(400).json({ err: "logout", err2: err });
  }
});

router.get("/", auth, (req, res) => {
  res.json(req.user.notes);
});

router.put("/:id", auth, async (req, res) => {
  // await NewNoteModel.updateOne(
  //   { _id: req.params.id, "notes._id": req.body.id },
  //   { $set: { "notes.$.description": req.body.description } }
  // );
  const newData = req.user.notes.map((val) => {
    if (val?._id.toString() === req.params.id) {
      return { ...val, description: req.body.description };
    } else {
      return val;
    }
  });
  req.user.notes = newData;
  req.user.save();
  // const data = await NewNoteModel.find();
  res.json(req.user.notes);
});

router.delete("/:id", auth, async (req, res) => {
  try {
    // await NewNoteModel.updateOne(
    //   { _id: req.params.id },
    //   { $pull: { notes: { _id: req.body.noteid } } }
    // );
    const index = req.user.notes
      .map((val) => val._id.toString())
      .indexOf(req.params.id);
    if (index == -1) {
      throw new Error("matching notes not found");
    }
    req.user.notes.splice(index, 1);
    await req.user.save();
    // const data = await NewNoteModel.find();
    res.json(req.user.notes);
  } catch (err) {
    res.status(400).json({ err });
  }
});

router.post("/new", auth, async (req, res) => {
  try {
    // await NewNoteModel.findOneAndUpdate(
    //   { _id: req.body.id },
    //   { $push: { notes: { description: req.body.description } } },
    //   { new: true }
    // );
    req.user.notes.push({ description: req.body.description });
    await req.user.save();
    // const [{ data: notes }] = await NewNoteModel.find();

    res.json(req.user.notes);
  } catch (error) {
    res.status(400).json({ error: "pls enter correct values" });
  }
});

module.exports = router;
