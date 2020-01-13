/******************************************************************************
 *  @Execution       :   1. default node              cmd> node server.js 
 *                      2. if nodemon installed   cmd> nodemon server.js
 * 
 *  @Purpose         : Fundoo-Notes APP backend server
 * 
 *  @description    : Controllers process incoming requests, handle user input
 *                    and interactions, and execute appropriate application logic

 * 
 *  @file              : user.js
 *  @overview      :  Controllers process incoming requests, handle user input
 *                    and interactions, and execute appropriate application logic
 *  @module        : 
 *  @author         : Shailesh Borase
 *  @version        : npm -3.5.2  node v13.5.0 
 *  @since           : 25-12-2019
 *
 ******************************************************************************/

require("dotenv").config();

const service = require("../services/user"),
  tokenGenerator = require("../utility/tokenGeneration"),
  nodeMailer = require("../utility/sendMail"),
  upload = require("../services/s3"),
  singleUpload = upload.single("image"),
  urlShortnerClassObject = require("../utility/urlShortner"),
  nodeMailerObject = new nodeMailer.NodeMailerClass(),
  serviceClassObject = new service.ServiceClass(),
  redis = require("redis"),
  client = redis.createClient(process.env.REDIS_PORT);
// const client = redis.createClient();

class ControllerClass {
  /**
   * @description: registration API to create new User or register user Using callback
   * @param {*} req
   * @param {*} res
   * @returns {*} response
   */
  registration(req, res) {
    try {
      console.log("in control registration");
      req.checkBody("firstName", "First name should not be empty.").notEmpty();
      req.checkBody("firstName", "Please enter only lettes.").isAlpha();
      req.checkBody("lastName", "Last name should not be empty.").notEmpty();
      req.checkBody("lastName", "Please enter only letters.").isAlpha();
      req.checkBody("email", "Email id should not be empty").notEmpty();
      req.checkBody("email", "Please enter valid email id.").isEmail();
      req.checkBody("password", "Password should not be empty.").notEmpty();
      req
        .checkBody("password", "Password length should be minimum 6.")
        .isLength({ min: 6 });

      var errors = req.validationErrors();
      var response = {};
      if (errors) {
        response.success = false;
        response.error = errors[0].msg;
        return res.status(400).send(response);
      } else {
        const userRegistrationData = {};
        (userRegistrationData.firstName = req.body.firstName),
          (userRegistrationData.lastName = req.body.lastName),
          (userRegistrationData.email = req.body.email),
          (userRegistrationData.password = req.body.password);
        console.log(userRegistrationData);
        serviceClassObject.userRegistration(
          userRegistrationData,
          (err, resData) => {
            // console.log('Data In Controller :: '+resData);
            if (err) {
              console.log("Something Went wrong in controller.." + err);
              response.success = false;
              response.error = err;
              return res.status(422).send(response);
            } else {
              // console.log('Data in controller :: '+resData);
              // make paylod and generate token and send it for shortning
              var payload = {
                _id: resData._id,
                email: resData.email
              };
              var token = tokenGenerator.tokenGeneration(payload);
              console.log("Generator Token in registration Is :: " + token);
              console.log("RESDATA_ID", "registrationToken" + resData._id);

              // var longUrl='http://localhost:4000/userVerification/'+token;
              var longUrl = `${process.env.USER_VERIFICATION_URL}` + token;
              client.set(
                "registrationToken" + resData._id,
                token,
                "EX",
                60 * 60 * 24
              );
              urlShortnerClassObject.urlShortner(
                resData,
                longUrl,
                (err, data) => {
                  if (err) {
                    response.success = false;
                    response.data = resData;
                    response.message = err;
                    console.log("--->", response);
                    return res.status(200).send(response);
                  } else {
                    console.log("HI");
                    response.success = true;
                    response.data = {
                      message:
                        "Registration Successful.. Link has been sent to your register Email,check Your Email for Verification"
                    };
                    // response.data=resData;
                    console.log("--->", response);
                    return res.status(200).send(response);
                  }
                }
              );
            }
          }
        );
      }
    } catch (err) {
      console.log(err);
      // return err;
      return res.status(500).send(err);
    }
  }

  /**
   * @description userVerificaton API for verifying valid user
   * @param {*} req
   * @param {*} res
   */
  userVerificatonInController(req, res) {
    var userVerificationData = {};
    userVerificationData._id = req.decoded._id;
    console.log("----->", userVerificationData);

    return new Promise((resolve, reject) => {
      serviceClassObject
        .userVerificationInService(userVerificationData)
        .then(data => {
          console.log("DATAAA", data);
          const response = {};
          (response.success = true),
            (response.message = "User verification successful..");
          return res.status(200).send(response);
        })
        .catch(err => {
          console.log("ERRRR", err);
          const response = {};

          (response.success = false), (response.message = err);
          return res.status(400).send(response);
        });
    });
  }
  /**
   * @description:login API to login user Using Callback
   * @param {*} req
   * @param {*} res
   */
  login(req, res) {
    console.log("in controller");
    try {
      req.checkBody("email", "Email id should not be empty").notEmpty();
      req.checkBody("email", "Please enter valid email id.").isEmail();
      req.checkBody("password", "Password should not be empty.").notEmpty();
      req
        .checkBody("password", "Password length should be minimum 6.")
        .isLength({ min: 6 });
      var errors = req.validationErrors();
      var response = {};
      if (errors) {
        response.success = false;
        response.error = errors;
        return res.status(400).send(response);
      } else {
        const loginData = {};
        (loginData.email = req.body.email),
          (loginData.password = req.body.password);
        serviceClassObject.userLogin(loginData, (err, data) => {
          console.log("Data In COntroller while send", +data);
          if (err) {
            console.log("Error :: Controller :: " + err);
            let response = {};
            response.success = false;
            response.message = err;

            return res.status(422).send(response);
          } else {
            console.log("data in controller :: " + JSON.stringify(data._id));
            var payload = {
              _id: data._id,
              email: data.email
            };
            console.log("PayLoad Is :: " + JSON.stringify(payload));
            var token = tokenGenerator.tokenGeneration(payload);
            console.log("Generated token is" + token);
            client.set(data._id, token); //'EX', 60 * 60 * 24)

            let response = {};
            response.success = true;
            response.message = "Login Successful...";
            response.token = token;
            return res.status(200).send(response);
          }
        });
      }
    } catch (err) {
      console.log(err);
      return res.status(500).send(err);
    }
  }

  /**
   * @description Forget Password API for user's to change forget password
   * @param {*} req
   * @param {*} res
   */
  forgetPasswordInController(req, res) {
    try {
      req.checkBody("email", "Email id should not be empty").notEmpty();
      req.checkBody("email", "Please enter valid email id.").isEmail();

      var errors = req.validationErrors();

      var response = {};

      if (errors) {
        response.success = false;
        response.error = errors;
        return res.status(400).send(response);
      } else {
        var forgetPasswordData = {};
        forgetPasswordData.email = req.body.email;
        console.log("email in controller :: " + forgetPasswordData.email);

        serviceClassObject.forgetPasswordInService(
          forgetPasswordData,
          (err, data) => {
            if (err) {
              console.log("ERROR in controller :: " + err);
              var response = {};
              response.success = false;
              response.error = "Invalid Email";
              return res.status(422).send(response);
            } else if (data != null) {
              var payload = {
                _id: data._id,
                email: forgetPasswordData.email
              };
              var token = tokenGenerator.tokenGeneration(payload);
              console.log("Generator Token in ForgetPass Is :: " + token);
              // var longUrl='http://localhost:8080/#/resetPassword/'+token;
              client.set("forgetToken" + data._id, token, "EX", 60 * 60 * 24);

              var longUrl = `${process.env.RESET_PASSWORD_URL}` + token;
              console.log(longUrl);

              //nodemailer
              nodeMailerObject.sendMailUsingNodeMailer(
                forgetPasswordData.email,
                longUrl
              );
              var response = {};
              (response.success = true),
                (response.message =
                  "Password reset link has been send to your email id :: " +
                  data.email);
              return res.status(200).send(response);
            } else {
              var response = {};
              response.success = false;
              response.message = "Invalid Email";
              return res.status(400).send(response);
            }
          }
        );
      }
    } catch (err) {
      console.log(err);
      return res.status(500).send(err);
    }
  }

  /**
   * @description:API to reset Usr's Password
   * @param {*} req
   * @param {*} res
   */
  resetPasswordInController(req, res) {
    try {
      console.log('req.body',req.body);
      
      req.checkBody("password", "Password should not be empty.").notEmpty();
      req
        .checkBody("password", "Password length should be minimum 6.")
        .isLength({ min: 6 });

      var errors = req.validationErrors();

      var response = {};
      // console.log("req in data==",req);

      if (errors) {
        console.log("ERROR ", errors);
        response.success = false;
        response.error = errors;
        console.log("error==>", response);
        return res.status(400).send(response);
      } else {
        var resetPasswordData = {};
        resetPasswordData._id = req.decoded._id;
        resetPasswordData.password = req.body.password;
        console.log("----->", resetPasswordData);

        new Promise((resolve, reject) => {
          serviceClassObject
            .resetPasswordInService(resetPasswordData)
            .then(data => {
              console.log("DATAAA", data);
              (response.success = true),
                (response.message = "Password Reset SuccessFully..");
              resolve("Password Reset SuccessFully..");
              return res.status(200).send(response);
            })
            .catch(err => {
              console.log("ERRRR in comntroller ", err);
              (response.success = false), (response.error = err);
              reject(err);
              return res.status(400).send(response);
            });
        });
      }
    } catch (err) {
      console.log(err);
      return res.status(500).send(err);
    }
  }

  /**
   * @description:API to create imageUrl using S3 Bucket And save Url in Database
   * @param {*} req
   * @param {*} res
   */
  imageUpload(req, res) {
    singleUpload(req, res, function(err) {
      if (err) {
        return res.status(422).send({
          errors: [{ title: "File Upload Error", detail: err.message }]
        });
      }
      console.log("FileUrl :::", req.file.location);

      const imageData = {};
      //   imageData.email='adhokshaj108@gmail.com'
      imageData.userId = req.decoded._id;
      console.log("REQ.Id", req.decoded._id);

      // imageData.email=req.body.email;
      imageData.imageUrl = req.file.location;
      const response = {};
      serviceClassObject
        .imageUpload(imageData)
        .then(data => {
          console.log("DATA in controller response :: ", data);

          (response.success = true),
            (response.message = "Image Url saved SuccessFully..");
          // response.ImageUrl=data.imageUrl;
          return res.status(200).send(response);
        })
        .catch(err => {
          (response.success = false), (response.error = err);
          return res.status(400).send(response);
        });
    });
  }
}
module.exports = new ControllerClass();
