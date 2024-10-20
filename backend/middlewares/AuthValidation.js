import Joi from "joi";

import { ApiError } from "../utils/ApiError.js";

const signupValidation = (req, res, next) => {
    const schema = Joi.object({
        name: Joi.string().min(3).max(40).required().messages({
            'string.empty': 'Name is required',
            'string.min': 'Name must be at least 3 characters long',
            'string.max': 'Name must be less than 40 characters',
        }),
        PhoneNum: Joi.string()
            .pattern(/^[0-9]{10}$/)
            .required()
            .messages({
                'string.pattern.base': 'Phone number must be 10 digits long',
                'string.empty': 'Phone number is required',
            }),
        password: Joi.string().min(4).max(20).required().messages({
            'string.empty': 'Password is required',
            'string.min': 'Password must be at least 4 characters long',
            'string.max': 'Password must be less than 20 characters',
        }),
        ComapanyName: Joi.string().min(3).max(40).required().messages({
            'string.empty': 'Company name is required',
            'string.min': 'Company name must be at least 3 characters long',
            'string.max': 'Company name must be less than 40 characters',
        }),
        email: Joi.string().email().required().messages({
            'string.email': 'Please provide a valid email address',
            'string.empty': 'Email is required',
        }),
        employeeSize: Joi.number().min(1).required().messages({
            'number.base': 'Employee size must be a number',
            'number.min': 'Employee size must be at least 1',
            'any.required': 'Employee size is required',
        })
    });

    const { error } = schema.validate(req.body);

    if (error) {
        console.log(error)
        throw new ApiError(400, `Signup Validation failed: ${error.details[0].message}`);
    }

    next();
};
const loginValidation = (req, res, next) => {
    const schema = Joi.object({
        email: Joi.string().email().required().messages({
            'string.email': 'Please provide a valid email address',
            'string.empty': 'Email is required',
        }),
        password: Joi.string().min(4).max(30).required().messages({
            'string.min': 'Password must be at least 4 characters long',
            'string.max': 'Password must be less than 30 characters long',
            'string.empty': 'Password is required',
        }),
    });

    const { error } = schema.validate(req.body);

    if (error) {
        console.log(error)
        throw new ApiError(400, `Login Validation failed: ${error.details[0].message}`);
    }

    next();
};

const Sendinterviewfrom = (req, res, next) => {
    const schema = Joi.object({
      JobTitle: Joi.string().min(3).max(100).required().messages({
        'string.empty': 'Job title is required',
        'string.min': 'Job title must be at least 3 characters long',
        'string.max': 'Job title must be less than 100 characters',
      }),
      JobDescription: Joi.string().min(10).max(1000).required().messages({
        'string.empty': 'Job description is required',
        'string.min': 'Job description must be at least 10 characters long',
        'string.max': 'Job description must be less than 1000 characters',
      }),
      Experiencelevel: Joi.string()
        .valid('Entry-level', 'Intermediate', 'Mid-level', 'Senior-level')
        .required()
        .messages({
          'any.only': 'Experience level must be one of Entry-level, Intermediate, Mid-level, or Senior-level',
          'string.empty': 'Experience level is required',
        }),
      candidate: Joi.array()
        .items(Joi.string().email().required())
        .min(1)
        .messages({
          'array.min': 'At least one candidate email is required',
          'string.email': 'Each candidate must be a valid email address',
        }),
      lastdate: Joi.date().iso().required().messages({
        'date.base': 'Last date must be a valid date',
        'date.format': 'Last date must be in ISO format',
        'string.empty': 'Last date is required',
      }),
    });
  
    const { error } = schema.validate(req.body);
  
    if (error) {
      console.log(error);
      throw new ApiError(400, `Send Interview Form Validation failed: ${error.details[0].message}`);
    }
  
    next();
  };


export {
    signupValidation,
    loginValidation,
    Sendinterviewfrom
}