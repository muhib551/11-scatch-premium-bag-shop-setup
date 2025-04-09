const express = require("express");
const router = express.Router();
const ownerModel = require("../models/owners-model");

if (process.env.NODE_ENV === "development") {
  router.post("/create", async function (req, res) {
    const owner = await ownerModel.find();
    if (owner.length > 0) {
      return res
        .status(504)
        .send("You don't have permission to create a new owner.");
    }
    let { fullname, email, password } = req.body;
    let createOwner = await ownerModel.create({
      fullname,
      email,
      password,
    });
    res.status(202).send(createOwner);
  });
}

router.get("/", function (req, res) {
  res.send("Hey This is the owner Router");
});

module.exports = router;
