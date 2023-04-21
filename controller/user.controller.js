const User = require("../models/user.model");
const { io } = require("../utils/socket");

// Create a new user
async function createUser(req, res) {
  try {
    let data = req.body;
    let { email, age, name } = data;
    if (!(email && age && name))
      return res.status(400).send({ msg: "all are required fields" });
    const user = new User(data);
    let checkUser = await User.findOne({ email });
    if (checkUser) return res.status(400).send({ msg: "user already present" });
    let val = await user.save();

    // Emit a 'newUser' event with the user data
    io.emit("user created", val);
    res.status(201).send({ status: true, msg: "user successfully created" });
  } catch (error) {
    console.log(error);
  }
}

// Get a single user by ID
async function getUserById(id) {
  try {
    const user = await User.findById(id);
    if (!user || user.isDeleted) {
      return null;
    }
    return user;
  } catch (error) {
    throw error;
  }
}

// Get all users
async function getAllUsers(req, res) {
  try {
    const users = await User.find({ isDeleted: false });
    // Emit a 'allUsers' event with the users data
    res.status(200).send({ status: true, data: users });
  } catch (error) {
    throw error;
  }
}

// Update an existing user by ID
async function updateUser(req,res) {
  try {
const {id }  = req.params
    const data = req.body;
const user = await User.findOne({_id:id})
    if (!user || user.isDeleted) {
      return res.status(400).send({ msg: "user already deleted" });
    }
    const updatedUser = await User.findOneAndUpdate({_id:id},{...data},{new:true})

    io.emit("user updated", updatedUser);

    res.status(200).send({ updatedUser });
    // res.status(200).send({ id });
  } catch (error) {
    throw error;
  }
}

// Delete a user by ID (actually update isDeleted to true)
async function deleteUser(req, res) {
  try {
    const { id } = req.params;
    const user = await User.findById(id);
    if (!user || user.isDeleted) {
      return res.status(400).send({ msg: "user already deleted" });
    }

    user.isDeleted = true;
    const save = await user.save();
    io.emit("user deleted", user._id);
    // console.log("save return", save);
    res.status(200).send({ save });
  } catch (error) {
    console.log(error);
  }
}

module.exports = {
  createUser,
  getUserById,
  getAllUsers,
  updateUser,
  deleteUser,
};
