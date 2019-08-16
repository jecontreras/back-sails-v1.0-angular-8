/**
 * RolController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {
    query: function(req, res){
        var 
            params = req.allParams()
        ;
        Rol.find(params)
        .exec(
        function(err, result){
            if (err) {
                return res.badRequest(err);
            }
            return res.ok({status: 200, data: result});
        });
    }

};

