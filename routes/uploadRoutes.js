const AWS = require('aws-sdk');
const uuid = require('uuid/v1');
const keys = require('../config/keys');
const requireLogin = require('../middlewares/requireLogin');

const s3 = new AWS.S3({
    accessKeyId: keys.accessKeyIdS3,
    secretAccessKey: keys.secretAccessKeyS3,
    signatureVersion: 'v4',
    region: 'us-east-2'
});

module.exports = (app) => {
  app.get('/api/upload', requireLogin, (req, res) => {
    const key = `${req.user.id}/${uuid()}.jpeg`;  
    s3.getSignedUrl('putObject', {
        Bucket: 'my-blog-bucket-579',
        ContentType: 'image/jpeg',
        Key: key
    }, (err, url) => res.send({ key, url }));
  });
};