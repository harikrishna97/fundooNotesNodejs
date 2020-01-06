
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
const express=require('express')
const controllerClassObject=require('../controller/user')
const tokenObject=require('../utility/tokenVerification')
const model=require('../app.js/model/user')
const noteControllerClassObject=require('../controller/note')
const labelControllerClassObject=require('../controller/label')
const modelClassObject=new model.ModelClass

const routes=express.Router()

routes.post('/user',controllerClassObject.registration);
routes.post('/login',controllerClassObject.login);
routes.post('/forgetPassword',controllerClassObject.forgetPasswordInController);
routes.post('/resetPassword/:token',tokenObject.tokenVerification,controllerClassObject.resetPasswordInController);

routes.get('/userVerify/:url',(req,res)=>{//localhost:4000
    modelClassObject.findOne({"urlCode":req.params.url},(err,data)=>{
        if(err){
            return res.status(404).send('Invalid Url')
        }else if(data==null){
            return res.status(400).send('Invalid Url')           
        }else{            
            return res.redirect(data.longUrl)
        }
    })
})
routes.post('/userVerification/:token',tokenObject.tokenVerification,controllerClassObject.userVerificatonInController);
// routes.post('/userVerification/:token',tokenObject.userVerification,controllerClassObject.userVerificatonInController);

routes.post('/note/',tokenObject.tokenVerification,noteControllerClassObject.createNote);
routes.get('/note',tokenObject.tokenVerification,noteControllerClassObject.getAllNotes)
routes.put('/note/:noteId',tokenObject.tokenVerification,noteControllerClassObject.editNote)
routes.delete('/note/:noteId',tokenObject.tokenVerification,noteControllerClassObject.removeNote)
routes.put('/imageUpload',tokenObject.tokenVerification,controllerClassObject.imageUpload)


routes.post('/remainder/:noteId',tokenObject.tokenVerification,noteControllerClassObject.addRemainder)
routes.delete('/remainder/:noteId',tokenObject.tokenVerification,noteControllerClassObject.removeRemainder)

routes.put('/archive/:noteId',tokenObject.tokenVerification,noteControllerClassObject.archiveNote)
routes.put('/pin/:noteId',tokenObject.tokenVerification,noteControllerClassObject.pinNote)
// routes.put('/trash/:noteId',tokenObject.tokenVerification,noteControllerClassObject.trashNote)
routes.get('/trash',tokenObject.tokenVerification,noteControllerClassObject.getAllTrashNotes)
routes.get('/archive',tokenObject.tokenVerification,noteControllerClassObject.getAllArchives)
routes.get('/pin',tokenObject.tokenVerification,noteControllerClassObject.getAllPinnedNotes)













routes.post('/label',tokenObject.tokenVerification,labelControllerClassObject.createLabelIncontroller)
routes.get('/label',tokenObject.tokenVerification,labelControllerClassObject.getAllLabelsIncontroller)
routes.put('/label',tokenObject.tokenVerification,labelControllerClassObject.editLabelIncontroller)
routes.delete('/label',tokenObject.tokenVerification,labelControllerClassObject.removeLabelIncontroller)









module.exports = routes;




