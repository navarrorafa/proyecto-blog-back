/** Require o Schema de noticias para criar en la base de datos */
const New = require("../models/newsModel");
const jwt = require('jsonwebtoken');
const  {uploadImagem} = require('../utils/uploadUtils')

//POST CREAR NOTICIAS
// const newCreate = async (req, res) => {
//     try {

//       // Requer o token da cookie
//       const token =  req.header('x-auth-token');
  
//       // Verifica se existe cookie
//       if (!token) {
//         return res.status(401).json({
//           ok: false,
//           msg: 'Acesso não autorizado',
//         });
//       }
  
//       // Decodifica o token
//       const decoded = jwt.verify(token, process.env.SECRET_KEY);
//       console.log(decoded)
//       console.log(decoded.role)
  
//       // Verifica se o usuário é um editor
//       if (decoded.role === 'editor') {
//         const newBlog = new New(req.body);
//         const { title } = newBlog;
  
//         // Verifica se a notícia já existe pelo título
//         const existe = await New.findOne({ title: title });
  
//         if (existe) {
//           return res.status(400).json({
//             msg: 'Notícia existente ou publicada',
//           });
//         }
  
//         // Crie a notícia
//         const saveNews = await newBlog.save();
  
//         return res.status(201).json({
//           ok: true,
//           msg: 'Notícia criada com sucesso',
//           news: saveNews,
//         });
//       } else {
//         // Se o usuário não for um editor, retorne um erro de acesso não autorizado
//         return res.status(403).json({
//           ok: false,
//           msg: 'Apenas editores podem criar notícias',
//         });
//       }
//     } catch (error) {
//       console.error(error);
//       return res.status(500).json({
//         ok: false,
//         msg: 'Entre em contato com o administrador',
//       });
//     }
//   };

const newCreate = async (req, res) => {
    try {
      // Requer o token da cookie
      const token = req.header('x-auth-token');
  
      // Verifica se existe cookie
      if (!token) {
        return res.status(401).json({
          ok: false,
          msg: 'Acesso não autorizado',
        });
      }
  
      // Decodifica o token
      const decoded = jwt.verify(token, process.env.SECRET_KEY);
      console.log(decoded);
      console.log(decoded.role);
  
      // Verifica se o usuário é um editor
      if (decoded.role === 'editor') {
        // Crie a notícia
        const newBlog = new New({
          title: req.body.title,
          text: req.body.text,
          resume: req.body.resume,
          author: req.body.author,
          image: req.body.image, // Aqui está o nome do arquivo da imagemfile.filename
        });
        const { title } = newBlog;
  
        // Verifica se a notícia já existe pelo título
        const existe = await New.findOne({ title: title });
  
        if (existe) {
          return res.status(400).json({
            msg: 'Notícia existente ou publicada',
          });
        }
  
        // Crie a notícia
        const saveNews = await newBlog.save();
  
        return res.status(201).json({
          ok: true,
          msg: 'Notícia criada com sucesso',
          news: saveNews,
        });
      } else {
        // Se o usuário não for um editor, retorne um erro de acesso não autorizado
        return res.status(403).json({
          ok: false,
          msg: 'Apenas editores podem criar notícias',
        });
      }
    } catch (error) {
      console.error(error);
      return res.status(500).json({
        ok: false,
        msg: 'Entre em contato com o administrador',
      });
    }
  };
  
  

//POST UPDATE
const refreshNews = async(req,res) => {
    const id = await req.params.id;

    try {
       const token = req.cookies.miToken

       if (!token) {
          return res.status(401).json({
            ok:false,
        msg:"aceso no autorizado"})
       }

       const decoded = jwt.verify(token, process.env.SECRET_KEY);

       

       if (decoded.role === 'editor') {
        const existe = await New.find({_id:id});
        const refresh = await New.findByIdAndUpdate(req.params.id, req.body);

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
            
        });}

        return res.status(403).json({
            ok:false,
            msg: 'Somente editores podem editar'
        })
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
const nombreNews = async (req,res) => {
    const title = await req.params.title
    try {
        const existe = await New.findOne({title:title});

        if (existe) {
            return res.status(200).json({
                ok:true,
                data:existe 
            });
        }

        return res.status(400).json({
            ok:false,
            msg:"News inexistente"
        })
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            ok:false,
            msg: "Contacto con el admin"
        });
    }
}

//DELETE NEWS

const deleteNews = async (req,res) => {
    const id = await req.params.id;

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