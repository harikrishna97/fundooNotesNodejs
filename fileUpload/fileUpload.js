var aws = require('aws-sdk')
var express = require('express')
var multer = require('multer')
var multerS3 = require('multer-s3')
 
aws.config.update({
    secretAccessKey: `${process.env.AWS_SECRET_ACCESS_KEY}`,
    accessKeyId: `${process.env.AWS_ACCESS_KEY_ID}`,
    region: 'us-east-1'//keep it in .env file
  });



var s3 = new aws.S3({})

const fileFilter = (req, file, cb) => {
    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
        cb(null, true)
    } else {
        cb(new Error('Invalid Mime Type, only JPEG and PNG'), false);
    }
  }
 
var upload = multer({
  storage: multerS3({
    s3: s3,
    bucket: 'some-bucket',//keep it in .env file
    acl: 'public-read',
    metadata: function (req, file, cb) {
      cb(null, {fieldName: 'TESTING_METADATA'});//file.fieldname 
    },
    key: function (req, file, cb) {
      cb(null, Date.now().toString())
    }
  })
})

module.exports=upload;