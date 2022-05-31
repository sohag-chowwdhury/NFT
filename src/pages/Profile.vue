<template>
  <div class="page-wrap">
    <!-- header  -->
    <header
      v-if="user != null"
      class="header-section has-header-main bg-pattern-3"
    >
      <!-- Header main -->
      <HeaderDashboard></HeaderDashboard>
      <!-- hero -->
      <AuthorHero
        avatarSize="avatar-3"
        :isCopyInput="true"
        :coverimg="SectionData.authorPersonalData.coverImg"
        :img="user.userPhoto"
        :title="user.email"
        :username="user.name"
        :btntext="SectionData.authorPersonalData.btnText"
        :btnlink="SectionData.authorPersonalData.btnLink"
      ></AuthorHero>
    </header>
    <!-- Author section  -->
    <ProfileSection :items="userItems"></ProfileSection>
    <!-- Footer  -->
    <Footer classname="bg-dark on-dark"></Footer>
  </div>
  <!-- end page-wrap -->
</template>

<script>
// Import component data. You can change the data in the store to reflect in all component
import SectionData from "@/store/store.js";
export default {
  name: "Profile",
  data() {
    return {
      SectionData,
    };
  },

  computed: {
    user() {
      return this.$store.getters.user;
    },
    userItems() {
      return this.$store.getters.userItems;
    },
  },
};
</script>
