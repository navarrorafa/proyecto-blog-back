const express = require("express");
const router = express.Router();
const {allNews,newCreate,deleteNews,refreshNews} = require("../controllers/newController");

//GET TODAS 
router.get("/",allNews);

// GET UNA 

//POST CREAR
router.post("/",newCreate);

//PUT EDITAR 
router.put("/:id", refreshNews)


// DELETE 
router.delete("/:id",deleteNews)

module.exports = router

