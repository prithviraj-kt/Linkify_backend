// module.exports = (sequelize, DataTypes) => {
//     const Posts = sequelize.define("Posts", {
//         title: {
//             type: DataTypes.STRING,
//             allowNull : false
//         },
//         postText: {
//             type: DataTypes.STRING,
//             allowNull : false
//         },
//         username: {
//             type: DataTypes.STRING,
//             allowNull : false
//         }
//     })

//     return Posts
// }
// const sequelize = require('sequelize')
// const { DataTypes } = require("sequelize/dist");
module.exports = (sequelize, DataTypes) => {
  const Posts = sequelize.define("NEWPOST", {
    id: {
      type: DataTypes.STRING,
      primaryKey: true
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    postText: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });

  return Posts;
};
