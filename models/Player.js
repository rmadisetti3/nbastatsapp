const mongoose = require("mongoose");

// Save a reference to the Schema constructor
const Schema = mongoose.Schema;

// Using the Schema constructor, create a new TweetSchema object
const PlayerSchema = new Schema({
  content: {
    type: String,
    required: "You must include some content in the input field"
  },
  jersey: {
    type: String
  },
  pos: {
    type: String
  },
  playerTeamName: {
    type: String
  },
  college: {
    type: String
  },
  country: {
    type: String
  },
  yearsPro: {
    type: String
  },
  ppg: {
    type: String
  },
  apg: {
    type: String
  },
  rpg: {
    type: String
  },
  fgp: {
    type: String
  },
  ftp: {
    type: String
  },
  tpp: {
    type: String
  },
  spg: {
    type: String
  },
  tpg: {
    type: String
  },
  bpg: {
    type: String
  },
  playerPic: {
    type: String
  }
});

// This creates our model from the above schema, using Mongoose's model method
var Player = mongoose.model("Player", PlayerSchema);

// Export the Tweet model
module.exports = Player;
