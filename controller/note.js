const serviceClassObject=require('../services/note')
const upload = require('../services/s3');
const singleUpload = upload.single('image');

// const saveImageUrlInController = upload.single('image');

class ControllerClass {

    createNoteIncontroller(req,res){
        // try{
        req.checkBody('email', 'email should not be empty.').notEmpty();
        req.checkBody('title', 'title should not be empty.').notEmpty();
        req.checkBody('description', 'description should not be empty.').notEmpty();
        var errors = req.validationErrors();
        var response = {};
        if(errors)
        {
            response.success = false;
            response.error = errors
            return res.status(400).send(response);
        }
        else{ 
        
            console.log('REquest in Controller',req.body);
            
            // Validate request
            // if(!req.body.description) {
            //     return res.status(400).send({
            //         message: "Note description can not be empty"
            //     });
            // }

            const createNoteData={}
            createNoteData.email=req.body.email;
            createNoteData.title=req.body.title;
            createNoteData.description=req.body.description;
        

            //  new Promise((resolve,reject)=>{
                const response={}
                serviceClassObject.createNoteInService(createNoteData)
                .then(data=>{
                    // resolve(data);
                    response.success=true;
                    response.message='Note Successfully created';
                    response.data=data;
                    return res.status(200).send(response);
                })
                .catch(err=>{
                    // reject(err);
                    response.success=true;
                    response.message=' Error while creating Note';
                    response.data=data;
                    return res.status(400).send(response);
                })
            // })
        }  
        // }catch(err){
        //     console.log(err);
        //     return res.status(500).send(response);
            
        // }   
    }

    getAllNotesIncontroller(req,res){

        serviceClassObject.getAllNotesInService({})
        .then(data=>{
            const response={}
            response.success=true;
            // response.message='';
            response.data=data;
            return res.status(200).send(response);
        })
        .catch(err=>{
            const response={}
                    response.success=false;
                    response.error=err;
                    // response.data=err;
                    return res.status(400).send(response);
        })
    }

    editNoteIncontroller(req,res){
        console.log('heoolljfjdklf');
        
        // req.checkBody('_id', '_id should not be empty.').notEmpty();
        req.checkBody('_id', 'NoteID should not be empty.').notEmpty();
        req.checkBody('description', 'description should not be empty.').notEmpty();
        req.checkBody('title', 'title should not be empty.').notEmpty();
    console.log('3849343');

        var errors = req.validationErrors();
        var response = {};
        if(errors)
        {
            console.log('Validataion err');
            response.success = false;
            response.error = errors[0].msg;
            return res.status(400).send(response);
        }
        else{ 
            console.log('Controller Data req',req.body._id);

            const editData={}
            editData._id=req.body._id;
            editData.description=req.body.description;
            editData.title=req.body.title;

            console.log('Controller Data req2',req.body._id);
            
            serviceClassObject.editNoteInService(editData)
            .then(data=>{
                console.log('DAta in Controller :: edit');
                
                const response={}
                response.success=true;
                response.message='Note Successfully Updated';
                response.data=data;
                return res.status(200).send(response);
            })
            .catch(err=>{
                console.log('err in Controller :: edit');
                // const response={}
                response.success=false;
                response.error=err;
                // response.data=err;
                return res.status(400).send(response);
            })
        }    
    }

    removeNoteIncontroller(req,res){
        req.checkBody('userId', 'userId name should not be empty.').notEmpty();
        var errors = req.validationErrors();
        var response = {};
        if(errors)
        {
            response.success = false;
            response.error = errors[0].msg;
            return res.status(400).send(response);
        }
        else{ 
        
            console.log('REquest in Controller',req.body);
            
            const removeData={}
            removeData.userId=req.body.userId;
            
            new Promise((resolve, reject)=>{
                serviceClassObject.removeNoteInService(removeData)
                .then(data=>{
                    console.log('Data in EDIT Controller',data);
                    
                    const response={}
                    response.success=true;
                    response.message='Note Successfully deleted';
                    // response.data=data;
                    resolve(data)
                    return res.status(200).send(response);
                })
                .catch(err=>{
                    console.log('error in EDIT Controller',err);

                    const response={}
                    response.success=false;
                    response.error=err;
                    reject(data)

                    // response.data=err;
                    return res.status(400).send(response);
            })

            })
        }    
    }

  
}

module.exports=new ControllerClass;