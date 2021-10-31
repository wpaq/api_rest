import Aluno from '../models/Aluno';
import Photo from '../models/Photo';

class AlunoController {
  async index(req, res) {
    const alunos = await Aluno.findAll({
      attributes: [
        'id',
        'nome',
        'sobrenome',
        'email',
        'idade',
        'peso',
        'altura',
      ],
      order: [
        ['id', 'DESC'],
        [Photo, 'id', 'desc'],
      ],
      include: {
        model: Photo,
        attributes: ['url', 'filename'],
      },
    });
    res.json(alunos);
  }

  // Store
  async store(req, res) {
    try {
      const newStudent = await Aluno.create(req.body);
      const { id, nome, email, idade, peso, altura } = newStudent;
      return res.json({ id, nome, email, idade, peso, altura });
    } catch (e) {
      return res.status(400).json({
        errors: e.errors.map((err) => err.message),
      });
    }
  }

  // Show
  async show(req, res) {
    try {
      const { id } = req.params;

      if (!id) {
        return res.status(400).json({
          errors: ['Missing ID'],
        });
      }

      const aluno = await Aluno.findByPk(id, {
        attributes: [
          'id',
          'nome',
          'sobrenome',
          'email',
          'idade',
          'peso',
          'altura',
        ],
        order: [
          ['id', 'DESC'],
          [Photo, 'id', 'desc'],
        ],
        include: {
          model: Photo,
          attributes: ['url', 'filename'],
        },
      });

      if (!aluno) {
        return res.status(404).json({
          errors: ['Student does not exist'],
        });
      }

      return res.json(aluno);
    } catch (e) {
      return res.status(400).json({
        errors: e.errros.map((err) => err.messages),
      });
    }
  }

  // Delete
  async delete(req, res) {
    try {
      const { id } = req.params;

      if (!id) {
        return res.status(400).json({
          errors: ['Missing ID'],
        });
      }

      const aluno = await Aluno.findByPk(id);

      if (!aluno) {
        return res.status(404).json({
          errors: ['Student does not exist'],
        });
      }

      await aluno.destroy();
      return res.json({
        deleted: true,
      });
    } catch (e) {
      return res.status(400).json({
        errors: e.errros.map((err) => err.messages),
      });
    }
  }

  // Update
  async update(req, res) {
    try {
      const { id } = req.params;

      if (!id) {
        return res.status(400).json({
          errors: ['Missing ID'],
        });
      }

      const aluno = await Aluno.findByPk(id);

      if (!aluno) {
        return res.status(404).json({
          errors: ['Student does not exist'],
        });
      }

      const newStudent = await aluno.update(req.body);
      return res.json(newStudent);
    } catch (e) {
      return res.status(400).json({
        errors: e.errros.map((err) => err.messages),
      });
    }
  }
}

export default new AlunoController();
