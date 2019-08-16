/**
 * UserController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */
var Passwords = require('machinepack-passwords');
module.exports = {
    query: function(req, res){
        var
            params = req.allParams()
        ;
        User.find(params)
        .exec(
        function(err, result){
            if (err) {
                return res.badRequest(err);
            }
            return res.ok({status: 200, data: result});
        });
    },
    register: function(req, res){
        var
          params = req.allParams()
        ;
        // sails.log.info(26, params);
        if(params.password === params.confirpassword && params.username && params.email){
          Passwords.encryptPassword({
              password: params.password,
            }).exec({
              error: function (err){
                return res.serverError(err);
              },
              success: function (password) {
                // sails.log.info(35, password);
                params.password = password;
                return Rol
                .findOne({
                  where:{
                    rol: "usuario"
                  }
                })
                .then(function(rol){
                  // sails.log.info(41, rol);
                  if (rol) {
                    params.rol = rol.id;
                    // sails.log.info(44, params);
                    createuser();
                  }else{
                    return Rol
                    .create({
                      rol: "usuario",
                      description: "rol del usuario"
                    })
                    .then(function(rol) {
                      // sails.log.info(52, rol);
                      if(rol){
                        params.rol = rol.id;
                        createuser();
                      }else{
                        return res.ok({status: 400, data: "error al crear el rol"});
                      }
                    })
                    ;
                  }
                })
                ;
                function createuser() {
                  return User
                  .findOne({
                    where:{
                      username: params.username
                    }
                  })
                  .then(function(user) {
                    if (!user) {
                      return User
                      .create(params)
                      .then(function(rta){
                        // sails.log.info(77, rta);
                        return User
                        .findOne({
                          where:{
                            username: params.username
                          }
                        })
                        .then(function(response){
                          if(response){
                            return res.ok({status: 200, data: response});
                          }else{
                            return res.ok({status: 400, data: "Usuario no Registrado"});
                          }
                        })
                      }).catch(function(err){
                        return res.badRequest(err);
                      })
                      ;
                    }else{
                      return res.ok({status: 400, data: "error el username ya se encuentra registrado"});
                    }
                  })
                }
              }
          });
        }else{
          return res.ok({status: 400, data: "error en el envio de los datos"});
        }

    },
    login: function(req, res){
      var
        params = req.allParams()
      ;
      if(params.where){
        params = params.where;
      }
      // sails.log.info(109, params);
      return User.findOne({
        where:{
          username: params.username
        }
      })
      .populate("rol")
      .exec(function(err, user){
        // sails.log.info(109, user);
          if(err) return res.send({'success': false,'message': 'Peticion fallida','data': err});
          if(!user) return res.send({'success': false,'message': 'Usuario no encontrado','data': user});
          Passwords.checkPassword({
              passwordAttempt: params.password,
              encryptedPassword: user.password,
              }).exec({
              error: function (err) {
                  return res.send({'success': false,'message': 'Eror del servidor','data': err});
              },
              incorrect: function () {
                  return res.send({'success': false,'message': 'Contraseña incorrecta'});
              },
              success: function () {
                  user.password = '';
                  // sails.log('User '+ user +' has logged in.');
                  // sails.log(137, user);
                  return res.send({
                  'success': true,
                  'message': 'Peticion realizada',
                  'data': user
                  });

              },
              });
          })
  },

};
