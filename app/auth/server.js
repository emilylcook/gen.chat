import {hashSync, genSaltSync, compareSync} from 'bcryptjs'

// firebase
import firebase from 'firebase';


const server = {
  /**
  * Populates the users, similar to seeding a database in the real world
  */
  init () {
  {/*  if (localStorage.users === undefined || !localStorage.encrypted) {
      // Set default user
      const juan = 'juan'
      const juanSalt = genSalt(juan)
      const juanPass = hashSync('password', juanSalt)

      users = {
        [juan]: hashSync(juanPass, salt)
      }

      localStorage.users = JSON.stringify(users)
      localStorage.encrypted = true
    } else {
      users = JSON.parse(localStorage.users)
    } */}
  },
 /**
 * Pretends to log a user in
 *
 * @param  {string} username The username of the user
 * @param  {string} password The password of the user
 */
  login (email, password) {

    return new Promise((resolve, reject) => {

      firebase.auth().signInWithEmailAndPassword(email, password)
      .then(function(firebaseUser) {
        // Success
          resolve({
          authenticated: true
        })
        }).catch(function(error) {
          // Handle Errors here.
          var errorCode = error.code;
          var errorMessage = error.message;

          reject(new Error(errorMessage))

        });
    })
  },
 /**
 * Pretends to register a user
 *
 * @param  {string} username The username of the user
 * @param  {string} password The password of the user
 */
  register (username, password) {
    return new Promise((resolve, reject) => {
      // If the username isn't used, hash the password with bcrypt to store it in localStorage
      if (!this.doesUserExist(username)) {
        users[username] = hashSync(password, salt)
        localStorage.users = JSON.stringify(users)

        // Resolve when done
        resolve({registered: true})
      } else {
        // Reject with appropiate error
        reject(new Error('Username already in use'))
      }

      {/*firebase.auth().createUserWithEmailAndPassword("emailm", "pass").catch(function(error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;

        console.log(error);
        // ...
      });*/}

    })
  },
 /**
 * Pretends to log a user out and resolves
 */
  logout () {
    return new Promise(resolve => {
      localStorage.removeItem('token')
      resolve(true)
    })
  },
 /**
 * Checks if a username exists in the db
 * @param  {string} username The username that should be checked
 */
  doesUserExist (username) {
    return true;
  //  return !(users[username] === undefined)
  }
}

server.init()

export default server
