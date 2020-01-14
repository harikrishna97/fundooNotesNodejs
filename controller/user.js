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
const logger = require("../config/winston");
// const client = redis.createClient();

class ControllerClass {
  /**
   * @description: registration API to create new User or register user Using callback
   * @param {object} req
   * @param {object} res
   * @return {object} response
   */
  registration(req, res) {
    try {
      logger.info("in control registration");
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
        logger.info(userRegistrationData);
        serviceClassObject.userRegistration(
          userRegistrationData,
          (err, resData) => {
            // logger.info('Data In Controller :: '+resData);
            if (err) {
              logger.info("Something Went wrong in controller.." + err);
              response.success = false;
              response.error = err;
              return res.status(422).send(response);
            } else {
              // logger.info('Data in controller :: '+resData);
              // make paylod and generate token and send it for shortning
              var payload = {
                _id: resData._id,
                email: resData.email
              };
              var token = tokenGenerator.tokenGeneration(payload);
              logger.info("Generator Token in registration Is :: " + token);
              logger.info("RESDATA_ID", "registrationToken" + resData._id);

              // var longUrl='http://localhost:4000/userVerification/'+token;
              var longUrl = `${process.env.USER_VERIFICATION_URL}` + token;
              client.set("registrationToken" + resData._id, token); //,
              // "EX",
              // 60 * 60 * 24
              // );
              urlShortnerClassObject.urlShortner(
                resData,
                longUrl,
                (err, data) => {
                  if (err) {
                    response.success = false;
                    response.data = resData;
                    response.message = err;
                    logger.info("--->" + response);
                    return res.status(200).send(response);
                  } else {
                    logger.info("HI");
                    response.success = true;
                    response.data = {
                      message:
                        "Registration Successful.. Link has been sent to your register Email,check Your Email for Verification"
                    };
                    // response.data=resData;
                    logger.info("--->" + response);
                    return res.status(200).send(response);
                  }
                }
              );
            }
          }
        );
      }
    } catch (err) {
      logger.info(err);
      // return err;
      return res.status(500).send(err);
    }
  }

  /**
   * @description userVerificaton API for verifying valid user
   * @param {object} req
   * @param {object} res
   */
  userVerificatonInController(req, res) {
    var userVerificationData = {};
    userVerificationData._id = req.decoded._id;
    logger.info("----->" + userVerificationData);

    return new Promise((resolve, reject) => {
      serviceClassObject
        .userVerificationInService(userVerificationData)
        .then(data => {
          logger.info("DATAAA" + data);
          const response = {};
          (response.success = true),
            (response.message = "User verification successful..");
          return res.status(200).send(response);
        })
        .catch(err => {
          logger.error("ERRRR" + err);
          const response = {};

          (response.success = false), (response.message = err);
          return res.status(400).send(response);
        });
    });
  }
  /**
   * @description:login API to login user Using Callback
   * @param {object} req
   * @param {object} res
   */
  login(req, res) {
    logger.info("in controller");
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
          logger.info("Data In COntroller while send", +data);
          if (err) {
            logger.error("Error :: Controller :: " + err);
            let response = {};
            response.success = false;
            response.message = err;

            return res.status(422).send(response);
          } else {
            logger.info("data in controller :: " + JSON.stringify(data._id));
            var payload = {
              _id: data._id,
              email: data.email
            };
            logger.info("PayLoad Is :: " + JSON.stringify(payload));
            var token = tokenGenerator.tokenGeneration(payload);
            logger.info("Generated token is" + token);
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
      logger.error(err);
      return res.status(500).send(err);
    }
  }

  /**
   * @description Forget Password API for user's to change forget password
   * @param {object} req
   * @param {object} res
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
        logger.info("email in controller :: " + forgetPasswordData.email);

        serviceClassObject.forgetPasswordInService(
          forgetPasswordData,
          (err, data) => {
            if (err) {
              logger.error("ERROR in controller :: " + err);
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
              logger.info("Generator Token in ForgetPass Is :: " + token);
              // var longUrl='http://localhost:8080/#/resetPassword/'+token;
              client.set("forgetToken" + data._id, token); //, "EX", 60 * 60 * 24);

              var longUrl = `${process.env.RESET_PASSWORD_URL}` + token;
              logger.info(longUrl);

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
      logger.info(err);
      return res.status(500).send(err);
    }
  }

  /**
   * @description:API to reset Usr's Password
   * @param {object} req
   * @param {object} res
   */
  resetPasswordInController(req, res) {
    try {
      logger.info("req.body", req.body);

      req.checkBody("password", "Password should not be empty.").notEmpty();
      req
        .checkBody("password", "Password length should be minimum 6.")
        .isLength({ min: 6 });

      var errors = req.validationErrors();

      var response = {};
      // logger.info("req in data==",req);

      if (errors) {
        logger.info("ERROR ", errors);
        response.success = false;
        response.error = errors;
        logger.info("error==>", response);
        return res.status(400).send(response);
      } else {
        var resetPasswordData = {};
        resetPasswordData._id = req.decoded._id;
        resetPasswordData.password = req.body.password;
        logger.info("----->", resetPasswordData);

        new Promise((resolve, reject) => {
          serviceClassObject
            .resetPasswordInService(resetPasswordData)
            .then(data => {
              logger.info("DATAAA", data);
              (response.success = true),
                (response.message = "Password Reset SuccessFully..");
              resolve("Password Reset SuccessFully..");
              return res.status(200).send(response);
            })
            .catch(err => {
              logger.info("ERRRR in comntroller ", err);
              (response.success = false), (response.error = err);
              reject(err);
              return res.status(400).send(response);
            });
        });
      }
    } catch (err) {
      logger.info(err);
      return res.status(500).send(err);
    }
  }

  /**
   * @description:API to create imageUrl using S3 Bucket And save Url in Database
   * @param {object} req
   * @param {object} res
   */
  imageUpload(req, res) {
    // if((/\.(jpeg|png)$/i).test(req.file.name)==false){
    //   const response={}
    //   response.success=false
    //   response.error="invalid Image type, only png and jpeg allow"
    //   return res.status(400).send(response);
    // }else{

    singleUpload(req, res, function(err) {
      if (err) {
        return res.status(422).send({
          errors: [{ title: "File Upload Error", detail: err.message }]
        });
      }
      logger.info("FileUrl :::", req.file.location);

      const imageData = {};
      //   imageData.email='adhokshaj108@gmail.com'
      imageData.userId = req.decoded._id;
      logger.info("REQ.Id", req.decoded._id);

      // imageData.email=req.body.email;
      imageData.imageUrl = req.file.location;
      const response = {};
      serviceClassObject
        .imageUpload(imageData)
        .then(data => {
          logger.info("DATA in controller response :: ", data);

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
    // }
  }
}
module.exports = new ControllerClass();
