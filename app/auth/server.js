// server.js

// firebase
import firebase from 'firebase'

const server = {
  /**
  * Populates the users, similar to seeding a database in the real world
  */
  init () {
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
      .then(function (firebaseUser) {
        // Success
        resolve({
          authenticated: true
        })
      }).catch(function (error) {
        // Handle Errors here.
        // var errorCode = error.code
        var errorMessage = error.message

        reject(new Error(errorMessage))
      })
    })
  },
 /**
 * Pretends to register a user
 *
 * @param  {string} username The username of the user
 * @param  {string} password The password of the user
 */
  register (username, password) {
    // not available
  },
 /**
 * Pretends to log a user out and resolves
 */
  logout () {
    // not done
    console.log('no logout')
  }
}

server.init()

export default server
