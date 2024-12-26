const express= require('express')
const router= express.Router()
const {body} = require('express-validator')
const {captainRegister}= require('../Controller/captain.controller')


router.route('/register').post([
    body('firstName').isLength({min:3}).withMessage('First Name must be greater than 3 charectors'),
    body('email').isEmail().isLength({min:6}).withMessage('Email must be greater than 6 charectors'),
    body('password').isLength({min:6}).withMessage('password must be greater than 6 charectors'),
    body('color').isLength({min:3}).withMessage('color must be greater than 3 charectors'),
    body('plate').isLength({min:3}).withMessage('plate must be greater than 3 charectors'),
    body('capacity').isLength({min:1}).withMessage('capacity must be greater than 1 charectors'),
    body('vehicalType').isLength({min:1}).withMessage("Car", "Motercycle", "Auto"),
],captainRegister)

module.exports= router