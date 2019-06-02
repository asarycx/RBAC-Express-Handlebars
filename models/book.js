'use strict';
module.exports = (sequelize, DataTypes) => {
  const Book = sequelize.define('Book', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey:true
    },
    bookTitle: DataTypes.STRING,
    bookDescription: DataTypes.STRING,
    bookAuthor: DataTypes.INTEGER
  }, {});
  Book.associate = function(models){
    Book.belongsTo(models.User,{
        foreignKey:"id"
    });
  };
  return Book;
};