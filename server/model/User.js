const mongoose = require('mongoose')
const { isEmail } = require('validator')

const UserSchema = mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
      minLength: 2,
      maxLength: 50,
    },
    lastName: {
      type: String,
      maxLength: 50,
    },
    friends: {
      type: Array,
      default: [],
    },
    email: {
      type: String,
      required: true,
      maxLength: 50,
      unique: true,
      lowercase: true,
      validate: [ isEmail , 'Invalid Email']
    },
    password: {
      type: String,
      required: true,
      minLength: 5,
    },
    picturePath: {
      type: String,
      default: "",
    },
    location: String,
    occupation: String,
    viewedProfile: Number,
    impressions: Number,
  },
  { timestamps: true }
);

module.exports = mongoose.model('User', UserSchema);