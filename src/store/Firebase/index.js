import { createApp } from 'vue'
import { createStore } from 'vuex'
import Authentication from './Authentication'
import Share from './Share'
import PushNotification from './PushNotification'

//vuexfire will be use without authentication for data update delete set
//import { vuexfireMutations, firestoreAction } from 'vuexfire'
//import { auth } from '@/main'

export const store = createStore({
    modules: {
        Authentication: Authentication,
        Share: Share,
        PushNotification: PushNotification

    }
})


const app = createApp({})

app.use(store)