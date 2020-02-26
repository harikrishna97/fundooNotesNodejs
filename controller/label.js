/******************************************************************************
 *  @Execution       :   1. default node              cmd> node server.js
 *                      2. if nodemon installed   cmd> nodemon server.js
 *  @Purpose         : Fundoo-Notes APP  backend server
 *
 *  @description    : Model represents domain specific data and business
 *                    logic in MVC architecture. It maintains the data of the
 *                    application. Model objects retrieve and store model state
 *                    in the persistance store like a database. Model class holds
 *                    data in public properties.
 *  @file              : user.js
 *  @overview      :  Model objects retrieve and store model state
 *                    in the persistance store like a database.
 *  @module        :
 *  @author         : Shailesh Borase
 *  @version        : npm -3.5.2  node v13.3.0
 *  @since           : 18-12-2019
 ******************************************************************************/
const serviceClassObject = require("../services/label");
const logger = require("../config/winston");
class ControllerClass {
  /**
   * @description : API to create label
   * @param {object} req
   * @param {object} res
   */

  createLabel(req, res) {
    try {
      // req.checkBody("userId", "UserId should not be empty.").notEmpty();
      req.checkBody("label", "Label should not be empty.").notEmpty();
      var errors = req.validationErrors();
      var response = {};
      if (errors) {
        response.success = false;
        response.error = errors;
        return res.status(400).send(response);
      } else {
        logger.info("REquest in Controller" + req.body);

        const createLabelData = {};
        createLabelData.userId = req.decoded._id;
        createLabelData.label = req.body.label;
        logger.info("In Create Label" + createLabelData);

        //  new Promise((resolve,reject)=>{
        const response = {};
        serviceClassObject
          .createLabel(createLabelData)
          .then(data => {
            logger.info("In Create Label data " + data);

            // resolve(data);
            response.success = true;
            response.message = "Label Successfully created";
            response.data = data;
            return res.status(200).send(response);
          })
          .catch(err => {
            logger.error("In Create Label data " + err);

            // reject(err);
            response.success = true;
            response.message = " Error while creating Label";
            response.data = data;
            return res.status(400).send(response);
          });
        // })
      }
    } catch (err) {
      logger.error(err);
      return res.status(500).send(response);
    }
  }
  /**
   * @description API to getallNotes from database
   * @param {object} req
   * @param {object} res
   */
  getAllLabels(req, res) {
    // req.checkBody('email', 'UserId should not be empty.').notEmpty();
    // req.checkBody('email', 'UserId is invalid..').isEmail();
    const getAllNoteData = {};
    // getAllNoteData.email=req.body.email;
    getAllNoteData.userId = req.decoded._id;

    serviceClassObject
      .getAllLabels(getAllNoteData)
      .then(data => {
        const response = {};
        response.success = true;
        // response.message='';
        response.data = data;
        return res.status(200).send(response);
      })
      .catch(err => {
        const response = {};
        response.success = false;
        response.error = err;
        // response.data=err;
        return res.status(400).send(response);
      });
  }
  /**
   * @description API to edit note
   * @param {object} req
   * @param {object} res
   */
  editLabel(req, res) {
    logger.info("heoolljfjdklf");

    // req.checkBody('_id', '_id should not be empty.').notEmpty();
    req.checkBody("labelId", "LableId should not be empty.").notEmpty();
    req.checkBody("label", "Label should not be empty.").notEmpty();

    var errors = req.validationErrors();
    var response = {};
    if (errors) {
      logger.error("Validataion err");
      response.success = false;
      response.error = errors[0].msg;
      return res.status(400).send(response);
    } else {
      logger.info("Controller Data req" + req.body.labelId);

      const editData = {};
      editData.labelId = req.body.labelId;
      editData.label = req.body.label;

      logger.info("Controller Data req2" + req.body.userId);

      serviceClassObject
        .editLabel(editData)
        .then(data => {
          logger.info("DAta in Controller :: edit");

          const response = {};
          response.success = true;
          response.message = "Label Successfully Updated";
          response.data = data;
          return res.status(200).send(response);
        })
        .catch(err => {
          logger.error("err in Controller :: edit");
          // const response={}
          response.success = false;
          // response.message="something went bad";
          response.error = err;
          return res.status(400).send(response);
        });
    }
  }
  /**
   * @description API to remove note
   * @param {object} req
   * @param {object} res
   */
  removeLabel(req, res) {
    
    var errors = req.validationErrors();
    var response = {};
    if (errors) {
      response.success = false;
      response.error = errors[0].msg;
      return res.status(400).send(response);
    } else {
      // logger.info('REquest in Controller'+req.body);
      const removeData = {};
      removeData.labelId = req.params.labelId;
      new Promise((resolve, reject) => {
        serviceClassObject
          .removeLabel(removeData)
          .then(data => {
            logger.info("Data in remove Controller" + data);

            const response = {};
            response.success = true;
            response.message = "Label Successfully deleted";
            // response.data=data;
            resolve(data);
            return res.status(200).send(response);
          })
          .catch(err => {
            logger.error("error in EDIT Controller" + err);

            const response = {};
            response.success = false;
            if (err == null) {
              response.error = "Invalid labelId";
            } else {
              response.error = err;
            }
            reject(err);

            // response.data=err;
            return res.status(400).send(response);
          });
      });
    }
  }
}

module.exports = new ControllerClass();
