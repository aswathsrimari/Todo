const express = require('express')
const router = express.Router()
const {signup,signin,signout,userByID,requireSignin,isAuth} = require('../Controllers/users')



router.post('/signup',signup);
router.post('/signin',signin);
router.get('/signout',signout); 

router.get('/secret/:userId',requireSignin,isAuth,(req,res)=>{
    res.json({
        user: req.profile
    })
})

router.param('userId',userByID);

module.exports = router;