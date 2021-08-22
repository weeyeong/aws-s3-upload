const express = require('express');
const fileUpload = require('express-fileupload');
const app = express();
const path = require('path');
const router = express.Router();

router.get('/',function(req,res){
    res.sendFile(path.join(__dirname+'/index.html'));
    //__dirname : It will resolve to your project folder.
});
  
//add the router
app.use('/', router);

app.use(fileUpload());

var AWS = require('aws-sdk');

app.post('/upload', async(req, res) => {
    AWS.config.update({
        // weeyeong bucket
        // accessKeyId: "ASIAUWVK4OOSX7G7QILD",
        // secretAccesskey: "vaEYi4hOOSYD1KAATdqMOh2io88sLgV5F7OBPU5J",
        // HH bucket
        accessKeyId: "ASIA4HB7VQP2NRPD4IYZ",
        secretAccesskey: "LYWOJJ7bXldXBQc18B/QNnO5LU9OphHChQVW59e5",
        region: "us-east-1"
    })

    const s3 = new AWS.S3();
    const fileContent = Buffer.from(req.files.data.data,'binary')

    const params = {
//        Bucket: 'group1-upload',
        Bucket: 'sdccism-group1-upload',
        Key: req.files.data.name,
        Body: fileContent
    }

    s3.upload(params, (err, data) => {
        if(err){
            throw err;
        }
        res.send({
            "response_code": 200,
            "resonse_message": "Success",
            "response_data": data
        });
    })
})

app.listen(4000, () => {
    console.log("Listen on port 4000");
})