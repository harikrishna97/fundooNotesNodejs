/******************************************************************************
 *  Execution       :   1. default node              cmd> node server.js
 *                      2. if nodemon installed   cmd> nodemon server.js
 *
 *  Purpose         : fundoo-notes backend server
 *
 *  @description    : "Routes" to forward the supported requests
 *                    (and any information encoded in request URLs) to the
 *                     appropriate controller functions.
 *
 *  @file              : routes.js
 *  @overview      :  "Routes" to forward the supported requests.
 *  @module        :
 *  @author         : Shailesh Borase
 *  @version        : npm -3.5.2  node v8.10.0
 *  @since           :
 *
 ******************************************************************************/
const express = require("express");
const controllerClassObject = require("../controller/user");
const tokenObject = require("../utility/tokenVerification");
const model = require("../app.js/model/user");
const noteController = require("../controller/note");
const labelControllerClassObject = require("../controller/label");
const modelClassObject = new model.ModelClass();
const collaboratorController = require("../controller/collaborator");
const routes = express.Router();

routes.post("/user", controllerClassObject.registration);
routes.post("/login", controllerClassObject.login);
routes.post(
  "/forgetPassword",
  controllerClassObject.forgetPasswordInController
);
routes.post(
  "/resetPassword",
  tokenObject.tokenVerification,
  controllerClassObject.resetPasswordInController
);

routes.get("/userVerify/:url", (req, res) => {
  //localhost:4000
  modelClassObject.findOne({ urlCode: req.params.url }, (err, data) => {
    if (err) {
      return res.status(404).send("Invalid Url");
    } else if (data == null) {
      return res.status(400).send("Invalid Url");
    } else {
      return res.redirect(data.longUrl);
    }
  });
});
routes.post(
  "/userVerification/:token",
  tokenObject.tokenVerification,
  controllerClassObject.userVerificatonInController
);
// routes.post('/userVerification/:token',tokenObject.userVerification,controllerClassObject.userVerificatonInController);

routes.post("/note", tokenObject.tokenVerification, noteController.createNote);
routes.get("/note", tokenObject.tokenVerification, noteController.getAllNotes);

routes.delete(
  "/note/:noteId",
  tokenObject.tokenVerification,
  noteController.removeNote
);
routes.put(
  "/imageUpload",
  tokenObject.tokenVerification,
  controllerClassObject.imageUpload
);

routes.post(
  "/remainder/:noteId",
  tokenObject.tokenVerification,
  noteController.addRemainder
);
routes.delete(
  "/remainder/:noteId",
  tokenObject.tokenVerification,
  noteController.removeRemainder
);

routes.get(
  "/trash",
  tokenObject.tokenVerification,
  noteController.getAllTrashNotes
);
routes.get(
  "/archive",
  tokenObject.tokenVerification,
  noteController.getAllArchives
);
routes.get(
  "/pin",
  tokenObject.tokenVerification,
  noteController.getAllPinnedNotes
);
routes.put(
  "/flag/:noteId/:flag",
  tokenObject.tokenVerification,
  noteController.updateFlag
);

routes.post(
  "/collaborator/:noteId/:collaboratorId",
  tokenObject.tokenVerification,
  collaboratorController.addCollaborator
);
routes.delete(
  "/collaborator/:collaboratorId",
  tokenObject.tokenVerification,
  collaboratorController.removeCollaborator
);
routes.get(
  "/search/:searchKey",
  tokenObject.tokenVerification,
  noteController.search
);

routes.post(
  "/label",
  tokenObject.tokenVerification,
  labelControllerClassObject.createLabel
);
routes.get(
  "/label",
  tokenObject.tokenVerification,
  labelControllerClassObject.getAllLabels
);
routes.put(
  "/label/:labelId",
  tokenObject.tokenVerification,
  labelControllerClassObject.editLabel
);
routes.delete(
  "/label:labelId",
  tokenObject.tokenVerification,
  labelControllerClassObject.removeLabel
);

routes.put(
  "/note/:noteId",
  tokenObject.tokenVerification,
  noteController.updateNote
);

module.exports = routes;
