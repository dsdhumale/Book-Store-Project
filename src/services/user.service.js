import User from '../models/user.model';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { sendMail } from '../utils/user.util';

//Register and create new user and hashing password
export const newUserRegistration = async (body) => {
  const email = await User.find({ emailID: body.emailID });
  if (email.length != 0) {
    throw new Error("Already exist,Enter another")
  } else {
    const saltRounds = 10;
    const hashpassword = await bcrypt.hash(body.password, saltRounds);
    body.password = hashpassword;
    const data = await User.create(body);
    return data;
  }
};

//Login with email ID and password
export const login = async (body) => {
  // To check email id is register or not in database
  const data = await User.findOne({ emailID: body.emailID });
  if (data !== null) {
    // bcrypt compare function used for validating password
    const result = await bcrypt.compare(body.password, data.password);

    if (result) {
      var token = jwt.sign({ 'id': data._id, 'firstName': data.firstName, 'emailID': data.emailID }, process.env.SECRET_KEY);
      return token;
    }
    else {
      throw new Error("Entered Password is Invalid ");
    }
  }
  else {
    throw new Error("Entered Email ID is Invalid");
  }
};

//Forgot password
export const forgotPassword = async (body) => {
  // To check email id is register or not in database
  const data = await User.findOne({ emailID: body.emailID });
  if (data !== null) {
    var passwordToken = jwt.sign({ id: data._id, firstName: data.firstName, emailID: data.emailID }, process.env.SECRET_KEY);
    sendMail(data.emailID);
    return passwordToken;
  }
  else {
    throw new Error("Invalid Email ID");
  }
};



