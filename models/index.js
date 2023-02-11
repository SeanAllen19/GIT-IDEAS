const User = require('./User');
const Notes = require('./Notes');

User.hasMany(Notes, {
  foreignKey: 'user_id',
  onDelete: 'CASCADE'
});

Notes.belongsTo(User, {
  foreignKey: 'user_id'
});

module.exports = { User, Notes };