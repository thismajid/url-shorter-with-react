import multer from 'multer';
import path from 'path';

// Image Upload
const avatarStorage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, '../../public/uploads/avatars'));
  },
  filename: (req, file, cb) => {
    cb(
      null,
      req.user.username + '_' + Date.now() + path.extname(file.originalname)
    );
  },
});

const avatarUpload = multer({
  storage: avatarStorage,
  limits: {
    fileSize: 3 * 1024 * 1024,
  },
  fileFilter(req, file, cb) {
    if (!file.originalname.match(/\.(png|jpg)$/)) {
      // upload only png and jpg format
      return cb(new Error('Please upload a Image'));
    }
    cb(undefined, true);
  },
});

export { avatarUpload };
