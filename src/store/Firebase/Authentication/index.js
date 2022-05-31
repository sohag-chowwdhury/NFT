import firebase from 'firebase/app';
import 'firebase/auth';
import { firestoreAction } from 'vuexfire'

export default {

  state: {
    userItems: [],
    user: null,
    error:null
   
  },
 mutations:{
  setError(state, payload) {
    state.error = payload
  }
 },

  actions: {
    // user data fetch  this.state.Authentication.user.id
    userDataFetch: firestoreAction(({ bindFirestoreRef, dispatch }, payload) => {
      dispatch('userItemsFunc', {
        id: payload.id
      })
      return bindFirestoreRef('user', firebase.firestore().collection('user-data').doc(payload.id))
    }),
    userItemsFunc: firestoreAction(({ bindFirestoreRef }, payload) => {
      return bindFirestoreRef('userItems', firebase.firestore().collection('user-gallery').doc(payload.id).collection('gallery').where('published', '==', false))
    }),

    // user data update
    userDataUpdate: firestoreAction((state, payload) => {
      let user = {
        id: payload.id,
        userPhoto: payload.userPhoto,
        email: payload.email,
        name: payload.name
      }

      return firebase.firestore()
        .collection('user-data')
        .doc(user.id)
        .set(user)
        .then(() => {
          console.log('successfully update')
        })
    }),

    //   signn in & signup with google
    signInWithGoogle({ commit, dispatch }) {

      const provider = new firebase.auth.GoogleAuthProvider();
      firebase.auth().signInWithPopup(provider).then((result) => {
        var user = result.user;
        if (user) {
          //if user signup then update

          if (result.additionalUserInfo.isNewUser === true) {
            let newUser = {
              id: user.uid,
              userPhoto: user.photoURL,
              name: user.displayName,
              email: user.email
            }

            // update function call 

            dispatch('userDataUpdate', newUser)
          }
          else {

            dispatch('userDataFetch', {
              id: user.uid
            })

          }
        }
      }).catch(error => {
        commit('setError', error.message)
      });
    },

    //   signn in & signup with facebook

    signInWithFacebook({ commit, dispatch }) {
   
      const provider = new firebase.auth.FacebookAuthProvider()
      firebase.auth().signInWithPopup(provider).then((result) => {
        var user = result.user;
        if (user) {
          console.log(result)
          //if user signup then update
          if (result.additionalUserInfo.isNewUser === true) {
            let newUser = {
              id: user.uid,
              userPhoto: result.additionalUserInfo.profile.picture.data.url,
              name: user.displayName,
              email: user.email
            }

            // update function call 

            dispatch('userDataUpdate', newUser)
          }
          else {

            dispatch('userDataFetch', {
              id: user.uid
            })
          }
        }
      }).catch(error => {
        commit('setError', error.message)
      })
    },

    //   signn in & signup with twitter


    signInWithTwitter({ commit, dispatch }) {
     
      var provider = new firebase.auth.TwitterAuthProvider();
      firebase
        .auth()
        .signInWithPopup(provider)
        .then((result) => {
          var user = result.user;
          if (user) {
            //if user signup then update
            if (result.additionalUserInfo.isNewUser === true) {
              let newUser = {
                id: user.uid,
                userPhoto: user.photoURL,
                name: user.displayName,
                email: user.email
              }

              // update function call 

              dispatch('userDataUpdate', newUser)
            }
            else {
              dispatch('userDataFetch', {
                id: user.uid
              })
            }
          }
        }).catch((error) => {
          commit('setError', error.message)
        });

    },
    //if user allready sing in

    autoSignIn({ dispatch }, payload) {
      dispatch('userDataFetch', {
        id: payload.uid
      })

    },
    //logout


    logOut: firestoreAction(({ unbindFirestoreRef }) => {
      firebase.auth().signOut()
      unbindFirestoreRef('user', null)
      unbindFirestoreRef('useritems', null)
    }),



  },
  getters: {
    user(state) {
      return state.user
    },
    userItems(state) {
      return state.userItems
    },
    error(state) {
      return state.error
    },
  }
}

// const app = createApp({ /* your root component */ })
// Install the store instance as a plugin
// app.use(store)