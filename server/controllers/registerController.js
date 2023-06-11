const User = require("../model/User");
const bcrypt = require("bcrypt");

const handleNewUser = async (req, res) => {
  const {
    firstName,
    lastName,
    email,
    password,
    picturePath,
    friends,
    location,
    occupation,
  } = req.body;
  console.log(req.body);
  if (!firstName || !email || !password)
    return res
      .status(400)
      .json({ message: "Firstname , email and password are required." });

  // check for duplicate usernames in the db
  const duplicate = await User.findOne({ email }).exec();
  if (duplicate)
    return res.status(409).json({ message: "User with same email exists" }); //Conflict

  try {
    //encrypt the password
    const hashedPwd = await bcrypt.hash(password, 10);

    //create and store the new user
    const result = new User({
      firstName,
      lastName,
      email,
      password: hashedPwd,
      picturePath: picturePath,
      friends,
      location,
      occupation,
      viewedProfile: Math.floor(Math.random() * 1000),
      impressions: Math.floor(Math.random() * 1000),
    });

    await result.save();

    res.status(201).json({ success: `New user ${firstName} created!` });
  } catch (err) {
    res.status(500).json({ message: err.message.slice(23).toUpperCase() });
    console.log(err.message)
  }
};

module.exports = handleNewUser;
