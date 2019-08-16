/**
 * Articulo.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {
    titulo:{
      type: 'string'
    },
    foto:{
      type: 'string'
    },
    user:{
      model: 'user'
    },
    description:{
      type: 'string'
    },
    comentarios:{
      collection: 'comentario',
      via: 'articulo'
    }

  },

};
