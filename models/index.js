// required models / tables
const User = require("./User");
const Notes = require("./Notes");
const Tags = require("./Tags");

// A user can have many notes; if user is deleted, delete all of user's notes
User.hasMany(Notes, {
  foreignKey: "user_id",
  onDelete: "CASCADE",
});

Notes.belongsTo(User, {
  foreignKey: "user_id",
});

// A tag can be applied to many notes; deleting the tag DOES NOT delete the note
Tags.hasMany(Notes, {
  foreignKey: "tag_id",
  onDelete: "SET NULL",
});

Notes.belongsTo(Tags, {
  foreignKey: "tag_id",
});

// A user can create many tags; deleting the user deletes all of the user's tags
User.hasMany(Tags, {
  foreignKey: "user_id",
  onDelete: "CASCADE",
});

Tags.belongsTo(User, {
  foreignKey: "user_id",
});

module.exports = { User, Notes, Tags };
