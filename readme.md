# gen.chat


What is it?
---------
This is an application made with react and firebase, taking advantage of the real time updates.  A logged in user will be able to add events to the timeline and they will be instantly added to the timeline.  (even those already viewing it)


To-Do?
---------

hot:
- firebase deploy

- save to firebase
  - figure out how we want to do images
- pull from firebase (sort order)
- style things
  - bring in less or sass
  - nav 'selected' state
- bring in styling from og genchat
- bring in homepage


Road Map
---------
- some sort of alert for viewing users that an event was added
- sorting, searching
-


Run It
--------
clone the repro
1) npm install
2) npm start
3) add firebase configs to a config.json (todo - add an exampleconfig with blank values for the repro)

setting up firebase
1) firebase init -> check database / hosting

to deploy
1) npm deploy
2) can use firebase serve to serve locally from build
