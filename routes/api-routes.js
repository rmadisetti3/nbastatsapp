const Player = require('../models/Player');

module.exports = function (app) {

  app.get('/api/player', function (req, res) {
    Player.find({})
      .then(function (data) {
        res.json(data);
      })
      .catch(function (err) {
        res.json(err);
      });
  });


  app.post('/api/player', function (req, res) {
    Player.create(req.body)
      .then(function (data) {
        res.json(data);
      })
      .catch(function (err) {
        res.json(err);
      });
  });

  app.delete('/api/player/:id', function (req, res) {
    Player.findOneAndDelete(req.params.id)
      .then(data => res.json({ success: true }))
      .catch(err => res.json(err))
  })
}