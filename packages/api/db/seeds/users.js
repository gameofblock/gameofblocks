import bcrypt from "bcryptjs";
import faker from "faker";

async function encryptPassword(pwd) {
  const salt = bcrypt.genSaltSync();
  const password = await bcrypt.hash(pwd, salt);
  return password;
}

exports.seed = async knex => {
  await knex("user_role").del();
  await knex("user_card").del();
  await knex("user").del();

  const password = await encryptPassword("test");

  const users = [
    {
      username: "remi",
      email: "remiroycourt@gmail.com",
      password,
      phone: "0640232542",
      active: true
    }
  ];

  for (let i = 0; i < 100; i += 1) {
    const username = faker.internet.userName();
    const email = faker.internet.email();
    const phone = faker.phone.phoneNumber();
    // eslint-disable-next-line no-await-in-loop
    users.push({
      username,
      password,
      active: true,
      email,
      phone
    });
  }
  await knex("user").insert(users);
};
