/**
 * Mock of user database. Maps username to password.
 */
const userDB: Record<string, { password: string }> = {
  test01: { password: '1234' },
  test02: { password: 'asdf' },
};

export const signIn = async (
  username: string,
  password: string
): Promise<string | void> => {
  return new Promise((resolve, reject) => {
    if (!username) {
      return reject('Username cannot be empty');
    } else if (!password) {
      return reject('Password cannot be empty');
    } else if (!userDB[username] || password !== userDB[username].password) {
      return reject('Wrong username and password combination');
    } else {
      return resolve();
    }
  });
};
