/******************************************************************************
 *  @Execution       :   1. default node              cmd> node server.js
 *                      2. if nodemon installed   cmd> nodemon server.js
 *
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
 *
 ******************************************************************************/
const mongoose = require("mongoose"),
  logger = require("../../config/winston");
Schema = mongoose.Schema;

var NoteSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true
    },
    description: {
      type: String,
      required: true
    },
    userId: {
      type: String,
      required: true
      // type:Schema.Types.ObjectId,
      // ref: 'User',
      // required:true,
      // trim:true,
    },
    email: {
      type: String
      // required:true
    },
    remainder: {
      type: String,
      default: null
    },
    isArchive: {
      type: Boolean,
      default: false
    },
    color: {
      type: String,
      default: null
    },
    isPinned: {
      type: Boolean,
      default: false
    },
    isTrash: {
      type: Boolean,
      default: false
    },
    // label: [
    //   {
    //     type: Schema.Types.ObjectId,
    //     ref: "Label"
    //   }
    // ],
    label: {
      type: String
    },
    collaboratorId: {
      type: [],
      default: null
    }
  },
  { timestamps: true }
);
// NoteSchema.index({'$**': 'text'});
// NoteSchema.index({title: 'text', description: 'text',color:'text',label:'text'});

const note = mongoose.model("Note", NoteSchema);

class ModelClass {
  /**
   * @description: create to new note and save to database
   * @param {object} createData
   */
  createNote(createData) {
    let noteData = new note({
      userId: createData.userId,
      title: createData.title,
      description: createData.description
    });
    /** @description save() methods are used to update document into a collection.
                            save() method replaces the existing document with the document
                            passed in save() method.*/

    return new Promise((resolve, reject) => {
      noteData
        .save()
        .then(data => {
          resolve(data);
        })
        .catch(err => {
          reject(err);
        });
    });
  }
  /**
   * @description : read All notes From database
   * @param {*} findData
   * @param {*} filterData
   */
  readNotes(findData, filterData) {
    return new Promise((resolve, reject) => {
      note
        .find(findData, filterData)
        .then(data => {
          // console.log("in found DAta",JSON.stringify(data));
          if (data !== null) {
            resolve(data.reverse());
          } else {
            // console.log(' readnotes null ',data);
            reject(data);
          }
        })
        .catch(err => {
          // console.log('error in read notes :: 120',err);
          reject(err);
        });
    });
  }

  /**
   * @descriptioon : update Function to update Note to database
   * @param {object} updateData
   * @param {object} dataToBeUpadted
   */
  updateNote(updateData, dataToBeUpadted) {
    console.log("===>", updateData);
    return new Promise((resolve, reject) => {
      console.log("In Promise");
      //useFind both Id's
      note
        .findByIdAndUpdate(updateData, dataToBeUpadted, { new: true })
        .then(data => {
          // console.log('in data',data);
          if (data != null) {
            resolve(data);
          } else {
            reject("invalid NoteId");
          }
        })
        .catch(err => {
          // console.log('in err',err);
          reject(err);
        });
    });
  }
  /**
   * @description: Function to delete note forever from database
   * @param {object} deleteData
   */
  deleteNote(deleteData) {
    return new Promise((resolve, reject) => {
      note
        .findOneAndRemove(deleteData)
        .then(data => {
          console.log("Data in delete note", data);

          if (data != null) {
            resolve(data);
          } else if (data == null) {
            reject(data);
          }
        })
        .catch(err => {
          reject(err);
        });
    });
  }
  /**
   * @description : find function to find note from database
   * @param {object} findData
   */
  findOne(findData) {
    return new Promise((resolve, reject) => {
      note
        .findOne(findData)
        .then(data => {
          console.log("DAta in find One :: ", data);
          resolve(data);
        })
        .catch(err => {
          reject(err);
          console.log("err in find One :: ", err);
        });
    });
  }

  /**
   * @description : read All notes From database
   * @param {*} query
   */
  search(query) {
    logger.info("hkhk");

    return new Promise((resolve, reject) => {
      note
        .find({
          $and: [
            {
              $or: [
                { title: { $regex: query.searchKey, $options: "i" } },
                { description: { $regex: query.searchKey, $options: "i" } },
                { reminder: { $regex: query.searchKey, $options: "i" } },
                { color: { $regex: query.searchKey, $options: "i" } }
                // { label: { $regex: query.searchKey, $options: "i" } }
              ]
            },
            { userId: query.userId }
          ]
        })
        .populate("label")
        // note.find(findData,filterData)
        // note.find({$text: {$search: query.searchKey}},{'title':1,'description':1,'color':1,'label':1})
        // .skip(20)
        // note.findOne({
        //     $or: [
        //         {title:{$regex: query.searchKey},//,$options:'i'},
        //         // {description:{$regex: query.searchKey}//,//$options:'i'},
        //         // { color:{$regex: query.searchKey},//$options:'i'},
        //         // {label:{$regex: query.searchKey}//,$options:'i'}
        //     ]
        // })
        // // {'title':1,'description':1,'color':1,'label':1})
        // {
        //     $or: [
        //       { _id: { $regex: failureRegex } },
        //       { name: { $regex: failureRegex } }
        //     ]
        //   }
        .limit(10)
        // .exec((err,data)=>{
        //     if(err){
        //         console.log('error:: ',err);

        //     }else{
        //         console.log('DAta :: ',data);

        //     }
        // })
        .then(data => {
          logger.info("in found DAta", JSON.stringify(data));
          if (data !== null) {
            resolve(data.reverse());
          } else {
            console.log(" readnotes null ", data);
            reject(data);
          }
        })
        .catch(err => {
          console.log("error in read notes :: 120", err);
          reject(err);
        });
    });
  }
}

module.exports = new ModelClass();
