import multer from 'multer';

import multerConfig from '../config/multer';

const uploud = multer(multerConfig).single('photo');

class PhotoController {
  async store(req, res) {
    return uploud(req, res, (err) => {
      if (err) {
        return res.status(400).json({
          errors: [err.code],
        });
      }

      return res.json(req.file);
    });
  }
}

export default new PhotoController();
