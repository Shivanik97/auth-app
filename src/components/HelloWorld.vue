<template>
  <div v-if="isAuth" class="q-pa-md q-gutter-sm">
    <div>Welcome {{ user }}!!</div>
    <q-btn @click="logout">Log-Out</q-btn>
  </div>
  <div v-else class="q-pa-md q-gutter-sm">
    <q-btn @click="login">Log-In</q-btn>
  </div>
</template>
<script>
import { myMSALObj } from '../services/aad.js'
import { graphScopes } from '../services/aad.js'
// import jwtDecode from 'jwt-decode';

export default {
  data() {
    return {
      isAuth: false,
      user: null
    }
  },
  methods: {
    async login() {
      try {
        const result = await myMSALObj.loginPopup(graphScopes)
        this.isAuth = true;
        this.getToken();
        sessionStorage.setItem("authToken", result.accessToken);
        console.log("User logged in");
      } catch (err) {
        console.log(err)
      }
    },
    async logout() {
      try {
        await myMSALObj.logout(graphScopes)
        this.isAuth = false;
      } catch (err) {
        console.log(err)
      }
    },
    async getToken() {
      try {
        const response = await myMSALObj.acquireTokenSilent({
          scopes: ['user.read']
        });
        this.user = response.account.name;
        console.log('Token success', response.accessToken)
        sessionStorage.setItem('accessToken', response.accessToken);
        return response.accessToken
      } catch (error) {
        console.log('Token error', error)
        return null
      }
    },
    async isAuthenticated() {
      const authToken = sessionStorage.getItem("authToken");
      return !!authToken;
    }
  }
}
</script>
<style></style>
