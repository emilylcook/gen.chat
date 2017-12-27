# gen.chat


What is it?
---------
This is an application made with react and firebase, taking advantage of the real time updates.  A logged in user will be able to add events to the timeline and they will be instantly added to the timeline.  (even those already viewing it)


To-Do?
---------


Road Map
---------
- sorting, searching


Run It
--------
clone the repro
1) npm install
2) npm start
3) add firebase configs to a config.json (exampleconfig with blank values for the repro)

// config.js

var firebaseConfig = {
  apiKey: "",
  authDomain: "",
  databaseURL: "",
  projectId: "",
  storageBucket: ",
  messagingSenderId: "
  "
};



// export it
exports.firebase = firebaseConfig;


setting up firebase
1) firebase init -> check database / hosting

to deploy
1) npm run deploy
2) can use firebase serve to serve locally from build
