import bcrypt from "bcrypt";

const Salt_Factor = 10;

export default (connection, DataTypes) => {
    const User = connection.define("User", {
        "id": {
            "type": DataTypes.INTEGER(11),
            "allowNull": false,
            "autoIncrement": true,
            "primaryKey": true
        },
          username: {
            type: DataTypes.STRING(20),
            allowNull: false,
            required: true,
            validate: {
              len: {
                arg: [5, 20],
                message: 'username has to between 2 and 20 characters'
              },

              is: /^[A-Za-z]+$/i,
            }
          },
          email: {
            type: DataTypes.STRING(30),
            lowercase: true,
            trim: true,
            allowNull: true,
            validate: {
              len: {
                arg: [5, 30],
                message: 'username has to between 2 and 30 characters'
              },

              is: /\S+@\S+\.\S+/,
            }
          },

          password: {
            type: DataTypes.STRING(50),
            allowNull: false,
            required: true,

            validate: {
              len: {
                arg: [5, 50],
                message: 'username has to between 2 and 30 characters'
              },
              is:(/^(?=.*[a-z])[A-Za-z\d@$!%*?&]{3,20}$/),

            }
          },
    });

    // Will also add PermissionID to User model
    User.associate = (models) => {
        User.belongsTo(models.Permission);
    };

    /*
Function crypt password.
Returns hash password .
 */

    function cryptPassword(password) {
        return new Promise((resolve, reject) => {
            bcrypt.genSalt(10, (err) => {
                // Encrypt password using bycrpt module
                if (err) {
                    return reject(err);
                }

                bcrypt.hash(password, Salt_Factor).then((hash) => {
                    if (err) {
                        return reject(err);
                    }
                    return resolve(hash);
                });
            });
        });
    }

    /* Node is single threaded + Bcrypt is slow => This will make the server unresponsive for the duration of
     the synchronous functions.  */
    // Method before create user replace crypte password

    if (process.env.NODE_ENV !== "test") {
        User.addHook("beforeCreate", (user) => {
            return cryptPassword(user.dataValues.password)
                .then((success) => {
                    user.password = success;
                })
                .catch((err) => {
                    if (err) {
                        console.log(err);
                    }
                });
        });
    }

    User.addHook("beforeBulkUpdate", (user) => {
        if (user.attributes.password) {
            return cryptPassword(user.attributes.password)
                .then((success) => {
                    user.attributes.password = success;
                })
                .catch((err) => {
                    if (err) {
                        console.log(err);
                    }
                });
        }
    });

    return User;
};
