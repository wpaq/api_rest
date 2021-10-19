import Aluno from '../models/Aluno';

class HomeController {
  async index(req, res) {
    const novoAluno = await Aluno.create({
      nome: 'Mason',
      sobrenome: 'Wick',
      email: 'mason@email.com',
      idade: 23,
      peso: 63,
      altura: 170,
    });
    res.json(novoAluno);
  }
}

export default new HomeController();
