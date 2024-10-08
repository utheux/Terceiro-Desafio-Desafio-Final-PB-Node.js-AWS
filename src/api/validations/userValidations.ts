import Joi from 'joi';

export const createUserSchema = Joi.object({
    name: Joi.string().required(),
    cpf: Joi.string().pattern(/^\d{3}\.\d{3}\.\d{3}-\d{2}$/).required(), 
    birth: Joi.date().required(),
    cep: Joi.string().required(),  
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required(), 
});

export const updateUserSchema = Joi.object({
    name: Joi.string(),
    cpf: Joi.string().pattern(/^\d{3}\.\d{3}\.\d{3}-\d{2}$/),
    birth: Joi.date(),
    cep: Joi.string(),
    email: Joi.string().email(),
    password: Joi.string().min(6),
});