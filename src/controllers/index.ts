import express, { Request, Response } from 'express'

import PedidoType from '../interfaces/pedido'

import User from '../models/pedido'

const router = express.Router();

router.get('/user', async (request: Request, response: Response) => {
    try {
        const usersList: PedidoType[] = await User.find()

        return response.send(usersList);
    } catch (error) {
        return response.status(500).send({ error: `Internal server error => ${error}`})
    }
})

router.get('/user/:_id', async (request: Request, response: Response) => {
    try {
        const user = await User.findById(request.params._id) as PedidoType

        return response.send(user);
    } catch (error) {
        return response.status(500).send({ error: `Internal server error => ${error}`})
    }
})

router.post('/user', async (request: Request, response: Response) => {
    try {
        const reqUser = request.body as PedidoType;

        if (await User.findOne({ email: reqUser.email }))
        return response.status(400).send({ error: 'User already exists' });

        const savedUser = await User.create(reqUser) as PedidoType;

        savedUser.password = undefined;

        return response.send({
            savedUser
        })
    } catch(error) {
        return response.status(500).send({ error: `Internal server error => ${error}`})
    }
})

router.delete('/user/:_id', async (request: Request, response: Response) => {
    try {
        await User.findByIdAndRemove(request.params._id)

        return response.send(`Deleted User => ${request.params._id}`)
    } catch(error) {
        return response.status(500).send({ error: `Internal server error => ${error}`})
    }
})

router.put('/user/:_id', async (request: Request, response: Response) => {
    try {
        const { name, lastName, email, birthday, password } = request.body as PedidoType;

        const savedUser = await User.findByIdAndUpdate(request.params._id, {
            name,
            lastName,
            email,
            birthday,
            password
        })

        return response.send({ savedUser })
    } catch(error) {
        return response.status(500).send({ error: `Internal server error => ${error}`})
    }
})

export default router;