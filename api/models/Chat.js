/**
 * Chat.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {
    // Both fields are set to required
    user:{
      type:’string’,
      required:true
    },
    message:{
      type:’string’,
      required:true
    }
  }

};
