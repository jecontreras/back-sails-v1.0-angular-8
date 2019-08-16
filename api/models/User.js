/**
 * User.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {
    foto:{
      type: 'string',
      defaultsTo: "https://publi-click.herokuapp.com/images/chico.png"
    },
    username:{
      type: 'string'
    },
    name:{
      type: 'string'
    },
    sexo:{
      type: 'string',
      enum:[
        'masculino',
        'femenino'
      ]
    },
    password:{
      type: 'string'
    },
    email:{
      type: 'string'
    },
    rol:{
      model: 'rol'
    }
  },
  customToJSON: function(){
    return _.omit(this, ['password']);
  }
};
