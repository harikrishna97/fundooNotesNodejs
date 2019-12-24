const serviceClassObject=require('../services/note')


class ControllerClass {

createNoteIncontroller(req,res){
    // try{
    req.checkBody('userId', 'userId name should not be empty.').notEmpty();
    req.checkBody('content', 'content should not be empty.').notEmpty();
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
        
        // Validate request
        // if(!req.body.content) {
        //     return res.status(400).send({
        //         message: "Note content can not be empty"
        //     });
        // }

        const createNoteData={}
        createNoteData.userId=req.body.userId;
        createNoteData.title=req.body.title;
        createNoteData.content=req.body.content;
    

        //  new Promise((resolve,reject)=>{
            const response={}
            serviceClassObject.createNoteInService(createNoteData)
            .then(data=>{
                resolve(data);
                response.success=true;
                response.message='Note Successfully created';
                response.data=data;
                return res.status(200).send(response);
            })
            .catch(err=>{
                reject(err);
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

// editNoteIncontroller(req,res){
    
//     const editData={}
//     editData.userId=req.body.userId;
//     editData.content=req.body.content;
//     editData.title=req.body.title;

//     serviceClassObject.editNoteInService(editData)
//     .then(data=>{
//         const response={}
//         response.success=true;
//         response.message='Note Successfully created';
//         response.data=data;
//         return res.status(200).send(response);
//     })
//     .catch(err=>{
//         const response={}
//         response.success=false;
//         response.error=err;
//         // response.data=err;
//         return res.status(400).send(response);
        


//     })

// }

// removeNoteIncontroller(req,res){
//     const editData={}
//     editData.userId=req.body.userId;
    

//     serviceClassObject.editNoteInService(editData)
//     .then(data=>{
//         const response={}
//         response.success=true;
//         response.message='Note Successfully deleted';
//         // response.data=data;
//         return res.status(200).send(response);
//     })
//     .catch(err=>{
//         const response={}
//         response.success=false;
//         response.error=err;
//         // response.data=err;
//         return res.status(400).send(response);
        


//     })


// }


}

module.exports=new ControllerClass;