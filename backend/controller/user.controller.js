const User = require('../models/user.model');

// Create a new user
async function createUser(req,res) {
  try {
   let  data = req.body
   let {email ,age,name} = data
   if(!(email && age && name)) return res.status(400).send({msg:"all are required fields"})
    const user = new User(data)
    let checkUser = await User.findOne({email})
  if(checkUser)return res.status(400).send({msg:"user already present"})
    await user.save();

// Emit a 'newUser' event with the user data
    res.status(201).send({status:true, msg:"user successfully created"})
  } catch (error) {
    throw error;
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
async function getAllUsers(req,res) {
    try {
      const users = await User.find({ isDeleted: false });
// Emit a 'allUsers' event with the users data
     res.status(200).send({status:true, data: users})
    } catch (error) {
      throw error;
    }
  }


// Update an existing user by ID
async function updateUser(id, data) {
  try {
    const user = await User.findById(id);
    if (!user || user.isDeleted) {
      return null;
    }
    user.set(data);
    await user.validate();
   const updatedUser =  await user.save();

    return user;
  } catch (error) {
    throw error;
  }
}

// Delete a user by ID (actually update isDeleted to true)
async function deleteUser(id) {
  try {
    const user = await User.findById(id);
    if (!user || user.isDeleted) {
      return null;
    }
    user.isDeleted = true;
 const save =   await user.save();
    console.log("save return", save);
    return user;
  } catch (error) {
    throw error;
  }
}


module.exports ={createUser, getUserById,getAllUsers, updateUser, deleteUser}