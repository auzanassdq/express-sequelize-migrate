'use strict';
module.exports = (sequelize, DataTypes) => {
  const postImage = sequelize.define('postImage', {
    name: DataTypes.STRING,
    path: DataTypes.STRING,
    postId: DataTypes.INTEGER
  }, {});
  postImage.associate = function(models) {
    postImage.belongsTo(models.post)
  };
  return postImage;
};