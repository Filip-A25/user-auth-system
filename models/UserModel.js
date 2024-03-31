const {Sequelize, DataTypes, Model} = require("sequelize");
const {connection} = require("../config/Database");

const sequelize = new Sequelize(connection, {
    quoteIdentifiers: false,
    freezeTableName: true
});

class User extends Model {
    async createUser(email, username, password) {
        try {
            return await User.create({
                email: email,
                username: username,
                password: password,
                role: "default"
            });
        } catch (err) {
            throw new Error(err);
        }
    }

    async updateUserWithId(id, data){
        try {
            return await User.update(data, {
                where: {
                    id: id
                }
            }); 
        } catch (err) {
            throw new Error(err);
        }
    }

    async updateUserWithEmail(email, data) {
        try {
            return await User.update(data, {
                where: {
                    email: email
                }
            }); 
        } catch (err) {
            throw new Error(err);
        }
    }

    async deleteUserWithId(id) {
        try {
            await User.destroy({
                where: {
                   id: id 
                }
            })
        } catch (err) {
            throw new Error(err);
        }
    }

    async deleteUserWithEmail(email) {
        try {
            await User.destroy({
                where: {
                   email: email 
                }
            })
        } catch (err) {
            throw new Error(err);
        }
    }
}

// Initialize User and set model attributes.
User.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: true
        }
    },
    username: {
        type: DataTypes.STRING(16),
        allowNull: false,
        validate: {
            notEmpty: true
        }
    },
    password: {
        type: DataTypes.CHAR(97),
        allowNull: false,
        validate: {
            notEmpty: true
        }
    },
    role: {
        type: DataTypes.STRING(7),
        allowNull: false,
        validate: {
            notEmpty: true
        }
    }
}, {
    sequelize,
    modelName: "User",
    tableName: "user",
    timestamps: false
})

module.exports = {User, sequelize};