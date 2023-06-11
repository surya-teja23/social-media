const User = require("../model/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const handleLogin = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password)
    return res
      .status(400)
      .json({ message: "Email and password are required." });

  const foundUser = await User.findOne({ email });
  if (!foundUser) return res.status(400).json({"message": "User does not exist"}); //Unauthorized
  // evaluate password
  const match = await bcrypt.compare(password, foundUser.password);
  if (match) {
    // create JWTs
    const accessToken = jwt.sign(
      { id: foundUser._id },
      process.env.ACCESS_TOKEN_SECRET
    );
    await foundUser.save();

    const user = foundUser.toObject()
    delete user.password 

    // Send access token to user
    res.json({ accessToken , user });
  } else {
    res.status(400).json({"message": "Invalid credentials"});
  }
};

module.exports = handleLogin;
