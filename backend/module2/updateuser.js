const express = require("express");
const app = express();
const UserController = require("./Controller");
const cors = require("cors");

app.use(express.json());
app.use(cors({ origin: "*" }));

const userController = new UserController();

app.post("/updateUserData", userController.updateUserData.bind(userController));
app.post("/setUserData", userController.setUserData.bind(userController));
app.get("/getUserData", userController.getUserData.bind(userController));

exports.hey = app;
