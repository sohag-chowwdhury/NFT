import firebase from 'firebase/app';
import 'firebase/auth';
import { messaging } from '../../../main';

export default {
    state: {
        pushNotificationAlltoken: []
    },
  
    actions: {
        pushNotificationArrayCreate() {
            console.log('push notification  array create and send from admin panel')
        },
        pushNotificationToken({ dispatch }, payload) {
            messaging.usePublicVapidKey("BLVbgrwNCiSn8eVxN_wnGqy4vUTr0P5XxmFe4lnwn_2XYGilpVH4t8z9uFTSLrw16XTfcbE99FSm9x18vcFgnBk") // 1. Generate a new key pair
            // Request Permission of Notifications
            messaging.requestPermission().then(() => {
                console.log('Notification permission granted.');
                // Get Token
                messaging.getToken().then((token) => {
                    const data = {
                        tokenId: token,
                        userId: payload.uid
                    }
                    //update user token
                    firebase.firestore()
                        .collection('user-tokens').doc(payload.uid)
                        .set(data)
                        .then(() => {
                            //this function will be call from admin panel 
                            dispatch('pushNotificationArrayCreate')
                        })
                }).then
            }).catch((err) => {
                console.log('Unable to get permission to notify.', err);
            })

        },

    },
    getters: {
        pushNotificationAlltoken(state) {
            return state.pushNotificationAlltoken
        },
    }

}
