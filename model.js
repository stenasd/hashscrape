const colors = require('colors');
const { Sequelize, DataTypes } = require('sequelize');
// Option 2: Passing parameters separately (other dialects)
const sequelize = new Sequelize('movies', 'root', 'root', {
    host: 'localhost',
    dialect: 'mysql',
    logging: msg => console.log(msg.magenta)
});
async function run() {
    await sleep(1000)
    try {
        await sequelize.authenticate();
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
}
exports.run =run()
function sleep(ms) {
    return new Promise((resolve) => {
      setTimeout(resolve, ms);
    });
  } 
run()
const movieList = sequelize.define('movieList', {
    // Model attributes are defined here
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    name: {
        type: DataTypes.STRING,
    },
    path: {
        type: DataTypes.STRING,
    },
    magnet: {
        type: DataTypes.TEXT,

    },
    image: {
        type: DataTypes.STRING,
    },
    genreArray: {
        type: DataTypes.STRING,
    },
    moviedataurl: {
        type: DataTypes.STRING,
        unique:true
    },
}, {
    freezeTableName: true

});
const todownload = sequelize.define('todownload', {
    // Model attributes are defined here
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: false,
        primaryKey: true,
    },
}, {
    freezeTableName: true

});
const nodownload = sequelize.define('nodownload', {
    // Model attributes are defined here
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: false,
        primaryKey: true,
    },
}, {
    freezeTableName: true

});
nodownload.sync({ alter: true })
todownload.sync({ alter: true })
movieList.sync({ alter: true })
exports.movieList = movieList
exports.todownload = todownload