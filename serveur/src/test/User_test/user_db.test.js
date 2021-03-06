import {
    usernameExist,
    emailExist,
    createUser,
    findUserIdOrFirstname
} from "../../Services/User/User_DB";
import db from "../../Database/models";

async function createusers() {
    return await db.User.create({
        "username": "test",
        "password": "test",
        "email": "test@test.com",
        "PermissionId": 1
    });
}
async function destroyUser(user) {
    user.destroy({ "where": {}, "force": true });
}

describe("User Test", () => {
    /* Username test*/
    it("should see if username already exist in DB", async () => {
        const check = await usernameExist("");

        expect(check).toBe(null);
    });
    it("Throw an error because no username was passed", async () => {
        try {
            const check = await usernameExist("");

            expect(check).toBe(null);
        } catch (e) {
            expect(e.message).toMatch("no username was passed on db ");
        }
    });

    it("should see if user already exist and fail", async () => {
        const test = await createusers();
        const check = await usernameExist("test");

        expect(typeof check === "object").toBe(true);


        await destroyUser(test);
    });
    /* Email test*/
    it("should see if email already exist in DB", async () => {
        const check = await emailExist("");

        expect(check).toBe(null);
    });
    it("Throw an error because no email was passed", async () => {
        try {
            const check = await emailExist();

            expect(check).toBe(null);
        } catch (e) {
            expect(e.message).toMatch("no email was passed on db ");
        }
    });
    it("should see if  email already exist and fail", async () => {
        const check = await emailExist("test@test.com");
        const test = await createusers();

        await destroyUser(test);
        expect(typeof check === "object").toBe(true);
    });
    /* User test*/

    it("should see if user already exist and fail", async () => {
        const username = "test";
        const password = "test";
        const email = "test@test.com";
        const PermissionId = 1;

        const arg = { username, password, email, PermissionId };
        const user = await createUser(arg);

        await destroyUser(user);
        expect(typeof user === "object").toBe(true);
        expect(user.username).toBe(username);
        expect(user.password).toBe(password);
        expect(user.email).toBe(email);
        expect(user.PermissionId).toBe(1);
    });
    it("should throw an error because no username was passed", async () => {
        try {
            const password = "test";
            const email = "test@test.com";
            const PermissionId = 1;
            const user = await createUser({ password, email, PermissionId });

            await user.destroy({ "force": true });
        } catch (e) {
            expect(e.message).toMatch("invalid argument username");
        }
    });
    /* Permission id test*/
    it("should throw an error because no permission id was passed", async () => {
        try {
            const username = "test";
            const password = "test";
            const email = "test@test.com";
            const PermissionId = "erff";
            const user = await createUser({
                username,
                password,
                email,
                PermissionId
            });

            await DestroyUser(user);
        } catch (e) {
            expect(e.message).toMatch("permission not find");
        }
    });
    it("should create a new permission ID", async () => {
        const username = "test";
        const password = "test";
        const email = "test@test.com";
        const PermissionId = 1;
        const user = await createUser({
            username,
            password,
            email,
            PermissionId
        });

        await destroyUser(user);
        expect(typeof user === "object").toBe(true);
        expect(user.username).toBe(username);
        expect(user.password).toBe(password);
        expect(user.email).toBe(email);
        expect(user.PermissionId).toBe(PermissionId);
    });

    it('should find user data with username ', async () => {
        const test = await createusers();
        const user = await findUserIdOrFirstname(test.username);

        expect(typeof user === 'object').toBe(true);
        await destroyUser(test);
    });

    it('should throw an error because no user id was passed', async () => {
        const user = await createusers();
        try {
            await findUserIdOrFirstname();
        } catch (e) {
            await user.destroy({ force: true });
            expect(e.message).toMatch('invalid argument: id');
        }
    });

});
