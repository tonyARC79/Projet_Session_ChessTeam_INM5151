module.exports = (sequelize, DataTypes) => {
    const Game = sequelize.define('game', {
        // Model attributes are defined here
        game_id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        player1: {
            type: DataTypes.STRING,
            allowNull: false
        },
        player2: {
            type: DataTypes.STRING,
            allowNull: false
        },
        start_date: {
            field: 'start_date',
            type: DataTypes.DATE,
            defaultValue: DataTypes.NOW
        },
        status : {
            type: DataTypes.STRING,
            allowNull: false,
            defaultValue: 'pending'
        },
        winner: {
            field: 'winner',
            type: DataTypes.STRING,
            defaultValue: ''
        },
        fen: {
            type: DataTypes.STRING,
            defaultValue: ''
        }
        
    }, {
        sequelize,
        timestamps: false,
        freezeTableName: true
    });

    //Game.sync()
    //Game.sync({ force: true })
return Game;
};