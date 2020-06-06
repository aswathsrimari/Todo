const express = require('express')
const router = express.Router()
const {addtask,read,taskByID,remove,update,list,listBySearch,listByEmail,listByLabel,listBySearchEmail} = require('../Controllers/tasks')
const {requireSignin,isAuth,userByID} = require('../Controllers/users')


router.get('/task/:taskId',read);
router.post('/task/create/:userId',requireSignin,isAuth,addtask);
router.delete('/task/:taskId/:userId',requireSignin,isAuth,remove);
router.put('/task/:taskId/:userId',requireSignin,isAuth,update);
router.get('/tasks',list)
router.get('/tasks/search',listBySearch);
router.get('/tasks/:userId',listByEmail);
router.get('/tasks/labels/:userId',listByLabel);
router.get('/tasks/search/:userId',listBySearchEmail);





router.param('userId',userByID);
router.param('taskId',taskByID);


module.exports = router;