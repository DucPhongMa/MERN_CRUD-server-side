const path = require('path');
const express = require('express');
const router = express.Router();
const checkAuth = require('../middleware/check-auth')
const multer = require('multer')

const productController = require('../app/controllers/ProductController')

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, path.join(__dirname, '../../../client/public/uploads/'))
    },
    filename: function (req, file, cb) {
      cb(null, file.originalname)
    }
});


const upload = multer({ storage: storage });

router.get('/', productController.index);
router.get('/details/:id', productController.details);

router.post('/create',upload.single('Image'), productController.create);

router.delete('/delete/:id', productController.remove);

router.put('/edit/:id', upload.single('Image'), productController.update);




module.exports = router;