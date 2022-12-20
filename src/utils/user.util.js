import dotenv from 'dotenv';
dotenv.config();

const nodemailer = require('nodemailer')
const { google } = require('googleapis')

const CLIENT_ID = process.env.CLIENT_ID;
const CLIENT_SECRET = process.env.CLIENT_SECRET;
const REDIRECT_URI = process.env.REDIRECT_URI;
const REFRESH_TOKEN = process.env.REFRESH_TOKEN;


const oAuth2Client = new google.auth.OAuth2(CLIENT_ID, CLIENT_SECRET, REDIRECT_URI)
oAuth2Client.setCredentials({ refresh_token: REFRESH_TOKEN })

//Function for sending mail for reset password
export const sendMail = async (email) => {
    try {
        const accessToken = await oAuth2Client.getAccessToken();
        const transport = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                type: 'OAuth2',
                user: 'd.sdhumale@gmail.com',
                clientId: CLIENT_ID,
                clientSecret: CLIENT_SECRET,
                refreshToken: REFRESH_TOKEN,
                accessToken: accessToken
            }
        })
        const mailoption = {
            from: 'Devendra  <d.sdhumale@gmail.com>',
            to: email,
            subject: 'Reset Password',
            text: 'Reset Password',
            html: '<h1>To Reset Your Password <a href="http://localhost:2000/api/v1/users/resetpassword"> Click Here </a></h1><h1>'
        };

        const result = await transport.sendMail(mailoption)
        return result
    } catch (error) {
        return error
    }

}