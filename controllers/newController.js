/** Require o Schema de noticias para criar en la base de datos */
const New = require("../models/newsModel");

//POST CREAR NOTICIAS

const newCreate = async (req, res) => {
    const newBlog = new New(req.body);
    
    try {
        const {title} = newBlog
        const existe = await New.findOne({title:title})

        if (existe) {
            return res.status(400).json({
                msg: "Noticia existente o publicada"
            })
        };

        const saveNews = await newBlog.save()
        return res.status(201).json({
            ok:true,
            msg: "New Save",
            news: saveNews


        })
        
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            ok:false,
            msg:"Contacte el admin"
        });
        
    };
};

//POST UPDATE
const refreshNews = async(req,res) => {
    const id = await req.params.id;

    try {
        const existe = await New.find({_id:id});
        const refresh = await New.findByIdAndUpdate(req.params.id, reqbody);

        if(!existe) {
            return res.status(400).json({
                ok:false,
                msg:"No existe esta News"
            });
        };

        return res.status(200).json({
            ok:true,
            msg:"New editada",
            new: refresh
            
        });
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            ok:false,
            msg:"Contacte el Admin"
        });
        
    };
};





//GET TODAS
const allNews = async (req,res) => {
    try {
        const newBlog = await New.find();
        return res.status(200).json({
            ok:true,
            msg:"News",
            data: newBlog
        });
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            ok:false,
            msg: "Contacto con el admin"
        })
    };
};

//GET NOMBRE


//DELETE NEWS

const deleteNews = async (req,res) => {
    

    try {
        const existe = await New.findByIdAndDelete(id);
        if(existe){
            return res.status(200).json({
                ok:true,
                msg: "News Delete"
            })
        };

        return res.status(400).json({
            ok:false,
            msg:"No existe esta News"
        })

    } catch (error) {
        console.log(error)
        return res.status(500).json({
            ok:false,
            msg: "Contacto con el admin"
        })
        
    }
}


module.exports = {
    allNews,
    newCreate,
    deleteNews,
    refreshNews
}