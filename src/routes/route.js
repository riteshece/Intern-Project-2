const express = require('express');
const router = express.Router();
const controller= require("../controller/controller");

router.get("/test-me", function (req, res) {
    res.send("My first ever api!")
})

router.post('/createCollege',controller.createCollege);
router.post('/createIntern',controller.createIntern);
router.get('/getCollegeDetails',controller.getCollegeDetails);


module.exports = router;
