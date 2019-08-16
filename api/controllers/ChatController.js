/**
 * ChatController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {
  addConv: function(req, res) {
    var data_from_client = req.params.all();
    if (req.isSocket && req.method === ‘POST’) {
      // This is the message from connected client
      // So add new conversation
      Chat
        .create(data_from_client)
        .exec(function(error, data_from_client) {
          console.log(data_from_client);
          Chat.publishCreate({
            id: data_from_client.id,
            message: data_from_client.message,
            user: data_from_client.user
          });
        });
    } else if (req.isSocket) {
      // subscribe client to model changes
      Chat.watch(req.socket);
      console.log(‘User subscribed to ‘ + req.socket.id);
    }
  }

};
