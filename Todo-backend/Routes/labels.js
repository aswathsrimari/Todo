const express = require('express')
const router = express.Router()

const {addlabel,read,labelByID,remove,list,listBySearch} = require('../Controllers/labels')
const {requireSignin,isAuth,userByID} = require('../Controllers/users')


router.post('/label/create/:userId',requireSignin,isAuth,addlabel)
router.get('/label/:labelId',read);
router.delete('/label/:labelId/:userId',requireSignin,isAuth,remove);
router.get('/labels',list)
router.get('/labels/:userId',listBySearch)


router.param('userId',userByID)
router.param('labelId',labelByID);
module.exports = router;