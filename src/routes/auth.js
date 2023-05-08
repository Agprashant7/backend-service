const express=require('express')

const router=express.Router()
const {signIn,signUp}=require('../controller/auth');
const{isRequestValidated,validateSignInRequest,validateSignUpRequest}
=require('../validators/auth')

router.route('/signin').post(validateSignInRequest,isRequestValidated,signIn)
//middleware,controller
router.route('/signUp').post(validateSignUpRequest,isRequestValidated,signUp)

module.exports=router