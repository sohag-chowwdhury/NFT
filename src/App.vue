<template>
  <router-view :key="$route.path" />
</template>

<script>
import firebase from "firebase/app";
import "firebase/auth";
export default {
  name: "App",
  data() {
    return {
      deferredPrompt: null,
    };
  },
  computed: {
    user() {
      return this.$store.getters.user;
    },
  },
  created() {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.$store.dispatch("autoSignIn", user);
        this.$store.dispatch("pushNotificationToken", user);
      }
    });
    window.addEventListener("beforeinstallprompt", (e) => {
      e.preventDefault();
      // Stash the event so it can be triggered later.
      this.deferredPrompt = e;
    });
  },
  methods: {
    async install() {
      this.deferredPrompt.prompt();
    },
  },
};
</script>
