import { validUserExist } from "../../Services/User/User_Services";
import db from "../../Database/models";

async function createUser() {
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

describe('User Test', () => {
    it('should see if user already exist and fail', async () => {
      const test = await createUser();
      const check = await validUserExist('test', 'test@test.com');


      expect( check.username === 'test').toBe(true);
      await destroyUser(test);
    });
    it('should throw an error because no params validUserExist ', async () => {
      try {
        const check = await validUserExist();
        const test = await createUser();

        await destroyUser(test);
        expect(typeof check === 'object').toBe(true);
      } catch (e) {
        expect(e.message).toMatch('username is empty');
      }
    });
  });

