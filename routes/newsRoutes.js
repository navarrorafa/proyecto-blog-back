const express = require("express");
const router = express.Router();
const {allNews,newCreate,deleteNews,refreshNews} = require("../controllers/newController");
// const { checkUserRole } = require('../middleware/authMiddleware');
const {validarJWT}  = require('../middleware/validatorJWT')

//GET TODAS 
router.get("/",allNews);

// GET UNA 

//POST CREAR
router.post("/",validarJWT, newCreate);

//PUT EDITAR 
router.put("/:id",validarJWT, refreshNews)


// DELETE 
router.delete("/:id",deleteNews)

module.exports = router

