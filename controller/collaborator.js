/******************************************************************************
 *  @Execution       :   1. default node              cmd> node server.js 
 *                      2. if nodemon installed   cmd> nodemon server.js
 * 
 *  @Purpose         : Fundoo-Notes APP backend server
 * 
 *  @description    : Controllers process incoming requests, handle user input
 *                    and interactions, and execute appropriate application logic

 * 
 *  @file              : collaborator.js
 *  @overview      :  Controllers process incoming requests, handle user input
 *                    and interactions, and execute appropriate application logic
 *  @module        : 
 *  @author         : Shailesh Borase
 *  @version        : npm -3.5.2  node v13.5.0 
 *  @since           : 08-1-2020
 *
 ******************************************************************************/
const collaboratorService = require("../services/collaborator");
const logger = require("../config/winston");

class ControllerClass {
  /**
   * @description API to add Collaborator in a note
   * @param {*} req
   * @param {*} res
   */
  addCollaborator(req, res) {
    const response = {};
// logger.info('controll goes here1')
    try {
      // logger.info('controll goes here2 '+req.params.noteId+" "+req.params.collaboratorId)
const a=true
      if (
        collaboratorService.checkMongooseId(req.params.noteId) == false ||
        collaboratorService.checkMongooseId(req.params.collaboratorId) == false ||
        collaboratorService.checkMongooseId(req.decoded._id) == false
      ) {
        logger.info('controll goes here3')

        console.log("1");

        response.success = false;
        response.error = "Invalid Id";
        return res.status(400).send(response);
      } else {
        logger.info("1211111111111");

        // req.checkBody('remainder', 'Remainder  should have Proper Date Format.').isDate();
        const collaboratorData = {};
        collaboratorData.noteId = req.params.noteId;
        collaboratorData.collaboratorId = req.params.collaboratorId;
        collaboratorData.userId = req.decoded._id;
        collaboratorService.addCollaborator(collaboratorData)
          .then(data => {
            // logger.info("DATA :: "+data);

            response.success = true;
            response.message = "Note Collaborate successfully";
            response.data = data;
            return res.status(200).send(response);
          })
          .catch(err => {
            response.success = false;
            response.error = err;
            response.data=err;
            return res.status(400).send(response);
          });
      }
    } catch (err) {
      // logger.info("err"+err);
      response.success = false;
      response.message = "Some1thing went Bad.."+err;
      return res.status(500).send(response);
    }
  }

  /**
     * @description API to remove collaborated note
     * @param {*} req

    * @param {object} res
    **/
  removeCollaborator(req, res) {
    try {
      // let isValid = mongoose.Types.ObjectId.isValid(req.params.noteId);
      if (
        collaboratorService.checkMongooseId(req.params.collaboratorId) == false
      ) {
        // ||
        // collaboratorService.checkMongooseId(req.decoded._id) == false
        // ) {
        const response = {};
        response.success = false;
        response.error = "Invalid NoteId";
        return res.status(400).send(response);
      } else {
        const collaboratorData = {};
        collaboratorData.collaboratorId = req.params.collaboratorId;
        // collaboratorData.userId = req.decoded._id;
        const response = {};
        collaboratorService
          .removeCollaborator(collaboratorData)
          .then(data => {
            response.success = true;
            response.message = "collaborator removed successfully";
            // response.data=data;
            return res.status(200).send(response);
          })
          .catch(err => {
            response.success = false;
            response.error = "Error while deleting";
            response.data = err;
            // response.data=err;
            return res.status(400).send(response);
          });
      }
    } catch (err) {
      logger.info(err);
      const response = {};
      response.success = false;
      response.message = "Something went Bad..";
      return res.status(500).send(response);
    }
  }
}
module.exports = new ControllerClass();
