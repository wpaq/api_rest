import multer from 'multer';
import multerConfig from '../config/multer';

import Photo from '../models/Photo';

const uploud = multer(multerConfig).single('photo');

class PhotoController {
  store(req, res) {
    return uploud(req, res, async (err) => {
      if (err) {
        return res.status(400).json({
          errors: [err.code],
        });
      }

      try {
        const { originalname, filename } = req.file;
        const { aluno_id } = req.body;
        const photo = await Photo.create({ originalname, filename, aluno_id });

        return res.json(photo);
      } catch (e) {
        return res.status(400).json({
          errors: ['Aluno não existe'],
        });
      }
    });
  }
}

export default new PhotoController();
