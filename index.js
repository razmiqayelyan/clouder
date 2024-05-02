const express = require('express');
const multer = require('multer');
const sharp = require('sharp');
const path = require("path");
const cors = require("cors");

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(cors());

// Serve static files from the 'images' directory
app.use('/images', express.static(path.join(__dirname, 'images')));

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

// Route to get a list of all uploaded images
app.get('/images', (req, res) => {
    // Serve a JSON response with a list of image file names
    const imageFiles = fs.readdirSync(path.join(__dirname, 'images'));
    res.json({ images: imageFiles });
});

app.listen(port, () => {
    console.log('Server is running on port ' + port);
});
