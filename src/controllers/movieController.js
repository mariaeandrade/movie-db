import * as model from '../models/movieModel.js';

export const getAll = async (req, res) => {
    try {
        const movies = await model.findAll(req.query);

        if (!movies || movies.length === 0) {
            return res.status(200).json({
                message: 'Nenhum registro encontrado.',
            });
        }
        res.json(movies);
    } catch (error) {
        console.error('Erro ao buscar:', error);
        res.status(500).json({ error: 'Erro ao buscar registros' });
    }
};



export const create = async (req, res) => {
    try {
        if (!req.body || Object.keys(req.body).length === 0) {
            return res.status(400).json({
                error: 'Corpo da requisição vazio. Envie os dados do exemplo!',
            });
        }

        const { title, duration, genre, rating, description, available } = req.body;

        const genero = [
            'Ação', 'Drama', 'Comédia', 'Terror', 'Romance', 'Animação', 'Ficção Científica', 'Suspense'
                ]
        if (!title) return res.status(400).json({ error: 'O titulo (title) é obrigatório!' });
        if (!duration) return res.status(400).json({ error: 'A duração (duration) é obrigatória!' });
        if (!rating) return res.status(400).json ({ error: 'As avaliações são obrigatórias'})
        if (!genre) return res.status(400).json({ error: 'O gênero (genre) é obrigatório!' });
        if (title.length <= 3) return res.status(400).json({ error: 'O titulo deve ter mais de 3 caracteres' });
        if (!description) return res.status(400).json({ error: 'A descrição é obrigatória' });
        if (description.length <= 10) return res.status(400).json({ error: 'A descrição deve ter mais de 10 caracteres' });
        if (duration < 0) return res.status(400).json({ error: 'A duração do filme não pode ter um valor negativo' });
        if (duration > 300) return res.status(400).json({ error: 'Um filme com duração excedente a 300 minutos não pode ser registrado' });
        if (!genero.includes(genre)) return res.status(400).json({ error: `O genero so pode ser um dos valores: ${genero}` });
        if (rating <= 0 || rating > 10) return res.status(400).json({ error: 'Deve estar entre 0 e 10' });
        if (available != true) return res.status(400).json({ error: 'O filme tem que estar disponivel' });

        const data = await model.create({
            title,
            description,
            duration: parseInt(duration),
            genre
        });

        res.status(201).json({
            message: 'Registro cadastrado com sucesso!',
            data,
            rating,
        });
    } catch (error) {
        console.error('Erro ao criar:', error);
        res.status(500).json({ error: 'Erro interno no servidor ao salvar o registro.' });
    }
};



export const getById = async (req, res) => {
    try {
        const { id } = req.params;

        if (isNaN(id)) {
            return res.status(400).json({ error: 'O ID enviado não é um número válido.' });
        }

        const data = await model.findById(id);
        if (!data) {
            return res.status(404).json({ error: 'Registro não encontrado.' });
        }
        res.json({ data });
    } catch (error) {
        console.error('Erro ao buscar:', error);
        res.status(500).json({ error: 'Erro ao buscar registro' });
    }
};

export const update = async (req, res) => {
    try {
        const { id, available } = req.params;

        if (!req.body || Object.keys(req.body).length === 0) {
            return res.status(400).json({
                error: 'Corpo da requisição vazio. Envie os dados do exemplo!',
            });
        }

        if (available == false) {
            return res.status(400).json({
                error: 'O filme tem que estar disponivel para ser editado'
            })
        }


            if (isNaN(id)) return res.status(400).json({ error: 'ID inválido.' });

        const exists = await model.findById(id);
        if (!exists) {
            return res.status(404).json({ error: 'Registro não encontrado para atualizar.' });
        }

        const data = await model.update(id, req.body);
        res.json({
            message: `O registro "${data.title}" foi atualizado com sucesso!`,
            data,
        });
    } catch (error) {
        console.error('Erro ao atualizar:', error);
        res.status(500).json({ error: 'Erro ao atualizar registro' });
    }
};

export const remove = async (req, res) => {
    try {
        const { id } = req.params;

        if (isNaN(id)) return res.status(400).json({ error: 'ID inválido.' });

        const exists = await model.findById(id);
        if (!exists) {
            return res.status(404).json({ error: 'Registro não encontrado para deletar.' });
        }

        if (rating >= 9) {
            return res.status(404).json({
                error: 'Filmes com notas acima de 9 não podem ser apagados'
            })
        }
        await model.remove(id);
        res.json({
            message: `O registro "${exists.title}" foi deletado com sucesso!`,
            deletado: exists,
        });
    } catch (error) {
        console.error('Erro ao deletar:', error);
        res.status(500).json({ error: 'Erro ao deletar registro' });
    }
};
