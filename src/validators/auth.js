const { check, validationResult } = require("express-validator");
const { StatusCodes } = require("http-status-codes");

const validateSignUpRequest=[
    check('firstName').notEmpty().withMessage('First Name Required'),
    check('lastName').notEmpty().withMessage('Last Name Required'),
    check('email').notEmpty().withMessage('Email Required'),
    check('contactNo').notEmpty().withMessage('Contact No Required'),
    check('password').isLength({min:4}).withMessage('Password must be 6 or more char '),
   
]

const validateSignInRequest=[
    check('email').notEmpty().withMessage('Email Required'),
    check('password').notEmpty().withMessage('Password Required')
   
]

const isRequestValidated = (req, res, next) => {
    const errors = validationResult(req);
   
    if (errors.array().length > 0) {
        return res
                .status(StatusCodes.BAD_REQUEST)
                .json({ error: errors.array()[0].msg });
    }
    // It will run or execute the code after all the middleware function is finished.
    next();
  };

  module.exports = {
    validateSignUpRequest,
    isRequestValidated,
    validateSignInRequest,
  };