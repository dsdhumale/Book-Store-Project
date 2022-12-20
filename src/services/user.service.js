import User from '../models/user.model';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import {sendMail} from '../utils/user.util';

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



