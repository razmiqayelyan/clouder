const express = require('express');
const multer = require('multer');
const sharp = require('sharp');
const path = require("path");
const cors = require("cors");

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(cors());
app.use('/static', express.static(path.join(__dirname, 'images')));

const upload = multer({
    limits: {
        fileSize: 1000000 // 1MB file size limit
    },
    fileFilter(req, file, cb) {
        if (!file.originalname.match(/\.(jpg|jpeg|png)$/)) {
            return cb(new Error('Please upload a valid image file'));
        }
        cb(null, true);
    }
});

app.post('/image', upload.single('upload'), async (req, res) => {
    try {
        await sharp(req.file.buffer).resize({ width: 250, height: 250 }).png().toFile(path.join(__dirname, 'images', req.file.originalname));
        console.log('Image uploaded successfully');
        res.status(201).send('Image uploaded successfully');
    } catch (error) {
        console.error(error);
        res.status(400).send(error.message);
    }
});

app.listen(port, () => {
    console.log('Server is running on port ' + port);
});
