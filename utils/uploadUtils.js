const multer = require('multer');
const path = require('path');

const uploadImagem = multer({
  storage: multer.diskStorage({
    destination: './public/uploads/',
    filename: (req, file, cb) => {
      const ext = path.extname(file.originalname);
      cb(null, file.fieldname + '-' + Date.now() + ext);
    }
  })
})

module.exports = {
  uploadImagem
};