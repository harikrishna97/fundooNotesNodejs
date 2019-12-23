
/******************************************************************************
 *  Execution       :   1. default node              cmd> node server.js 
 *                      2. if nodemon installed   cmd> nodemon server.js
 * 
 *  Purpose         : send mail using nodemailer in nodejs
 * 
 *  @description    : send mail using nodemailer in nodejs
 * 
 *  @file              : sendMail.js
 *  @overview      :  send mail using nodemailer in nodejs
 *  @module        : 
 *  @author         : Shailesh Borase
 *  @version        : npm -3.5.2  node v8.10.0 
 *  @since           : 04-12-2019
 *
 ******************************************************************************/


var nodemailer = require('nodemailer');
const dotenv = require('dotenv/config');


class NodeMailerClass {

  sendMailUsingNodeMailer(email, token) {
    console.log('Email In Send Mail Fun :: ' + email);
  //  console.log(`${process.env.EMAIL}`,)
  //  console.log(`${process.env.PASSWORD}`)
    console.log('Iam in NodeMailer Class now..');
    var transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: `${process.env.EMAIL}`,
        pass: `${process.env.PASSWORD}`
      }
    });
    console.log('after send mail');


    var mailOptions = {
      from: `${process.env.EMAIL}`,
      to: email,
      subject: 'Verification',
      // text: `Hi, Hari Please Find Bellow Link To reset Your PassWord, Link is valid for 2 hours only.`,
      html: token + `>Click me here</a> </p>`

    };


    transporter.sendMail(mailOptions, function (err, data) {
      if (err) {
        console.log('after Eroorr in send mail mail');

        console.log(err,null);
      } else {
        console.log('Email sent: ' + data.response);
      }
    });

    
  }
}

module.exports = {
  NodeMailerClass
}







