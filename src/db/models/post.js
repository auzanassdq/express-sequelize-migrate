'use strict';
module.exports = (sequelize, DataTypes) => {
  const post = sequelize.define('post', {
    title: DataTypes.STRING,
    content: DataTypes.STRING,
    userId: DataTypes.INTEGER
  }, {});
  post.associate = function(models) {
    post.belongsTo(models.user)
    post.hasOne(models.postImage)
  };
  return post;
};