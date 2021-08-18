<template>
  <div id="app">
    <Loader v-if="loading"></Loader>
    <Header v-if="!loading" v-bind="$attrs" v-bind:user-detail="userDetail ? userDetail : null"/>
    <Navbar v-if="!loading" v-bind="$attrs" v-bind:user-detail="userDetail ? userDetail : null"/>
    <router-view></router-view>
    <Footer/>
  </div>
</template>

<script>
import {get} from "./service/api.service";
import Header from "@/components/Main/Header";
import Loader from "@/components/Public/Loader";
import Navbar from "@/components/Main/Navbar";
import {setUser} from "@/service/explorer.service";
import Footer from "@/components/Main/Footer";

export default {
  name: 'App',
  data: function () {
    return {
      loading: false,
    }
  },
  props: {
    userDetail: Object
  },
  components: {
    Footer,
    Navbar,
    Loader,
    Header,
  },
  mounted() {
    this.loading = true;
    get('user/my').then(response => {
      setTimeout(() => this.loading = false, 1500);
      this.userDetail = response;
      setUser(response);
    }).catch(() => {
      setUser({});
      this.loading = false;
    });
  }
}
</script>
<style lang="scss">
@import 'node_modules/bootstrap/scss/bootstrap.scss';
@import 'node_modules/bootstrap-vue/src/index.scss';
@import '../node_modules/@grapecity/wijmo.styles/wijmo.css';
//@import './assets/css/bootstrap/bootstrap.min.css';
@import './assets/css/responsive.css';
@import './assets/scss/style.scss';
@import './assets/font-awesome/css/all.min.css';
@import './assets/css/style.css';
@import './assets/css/login.css';
@import './assets/css/tabs.css';
@import './assets/css/main.css';
@import './assets/css/loading.css';
@import './assets/css/user-style.css';
@import './assets/css/slicknav.min.css';
/*@import './assets/css/flexslider.css';*/
</style>
