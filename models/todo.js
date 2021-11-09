const Sequelize = require('sequelize'),
      db        = require('../db');

const TODO = db.define('todo', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    body: {
        type: Sequelize.STRING,
        allowNull: false
    },
    completed: {
        type: Sequelize.BOOLEAN,
        allowNull: false   
    }
},
{
    updatedAt: false,
    createdAt: false
})

module.exports = TODO