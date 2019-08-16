/**
 * ArticuloController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {
    query: function(req, res){
        var
            params = req.allParams()
        ;
        params.sort= 'createdAt DESC';
        Articulo.find(params)
        .populate("user")

        .exec(
        function(err, result){
            if (err) {
                return res.badRequest(err);
            }
            return res.ok({status: 200, data: result});
        });
    },
    file: function(req, res){
    var
      params = req.allParams()
    ;
    req.file('file').upload({
        dirname: require('path').resolve(sails.config.appPath, '.tmp/public/images')
    },function (err, uploadFiles) {
        if(err){
            return reject(err);
        }
        sails.log.info(32, "<<<<<<<---", uploadFiles);
        res.ok(uploadFiles);
    })
    ;
  },
  deletefile: function(req, res){
    const fs = require('fs');
    var
      params = req.allParams()
    ;
    if(params.name){
      // fs.unlinkSync("./assets/images/34456d48-f8c4-4997-845c-7e5c3ae9b8bd.jpg");
      fs.unlinkSync("./tmp/public/images"+params.name);
      res.ok({
        'msg': 'Eliminado'
      });
    }
  },
};
