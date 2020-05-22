import { userSearch } from "../../Services/User/User_Services";
import bcrypt from "bcrypt";

const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;

passport.use(
    new LocalStrategy((username, password, done) => {
        userSearch(username)
            .then((user, err) => {
                if (err) {
                    return done(err);
                }
                if (!user) {
                    return done({ "message": "username incorrect" });
                }

                bcrypt.compare(password, user.password).then((match) => {
                    if (match) {
                        return done(null, user);
                    }
                    return done({ "message": "password incorrect" });
                });
            })
            .catch((err) => done({ "message": "username incorrect" }));
    })
);
