const Sequelize = require('sequelize');
const db = require('../db');

const Student = db.define("student", {

  firstname: {
    type: Sequelize.STRING,
    allowNull: false
  },

  lastname: {
    type: Sequelize.STRING,
    allowNull: false
  },

  email: {
    type: Sequelize.STRING,
    allowNull: false
  },

  imageUrl: {
    type: Sequelize.STRING,
    defaultValue: ""
  },

  campusname:{
    type: Sequelize.STRING,
    allowNull: false
  },

  gpa: {
    type: Sequelize.DECIMAL,
    validate: {
      min:0.0,
      max:4.0
    }
  },

  id:{
    type:Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey:true
  }


});

module.exports = Student;