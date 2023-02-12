const User = require('./User');
const Notes = require('./Notes');
const Tags = require('./Tags');

User.hasMany(Notes, {
  foreignKey: 'user_id',
  onDelete: 'CASCADE'
});

Notes.belongsTo(User, {
  foreignKey: 'user_id'
});

Tags.hasMany(Notes, {
  foreignKey: 'tag_id',
  onDelete: 'SET NULL'
});

Notes.belongsTo(Tags, {
  foreignKey: 'tag_id'
});

User.hasMany(Tags, {
  foreignKey: 'user_id',
  onDelete: 'CASCADE'
});

Tags.belongsTo(User, {
  foreignKey: 'user_id'
});

module.exports = { User, Notes, Tags };