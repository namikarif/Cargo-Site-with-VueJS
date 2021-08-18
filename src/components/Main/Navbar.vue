<template>
  <div>
    <nav class="navbar navbar-expand-lg navbar-light bg-light">
      <div class="container">
        <div class="left-navbar">
          <div>
            <a class="navbar-brand" v-on:click="router('/')">
              <img src="../../assets/img/logo.png" width="170" class="mylogo"></a>
          </div>
          <div>
            <b-button v-b-toggle="'collapse-2'" class="m-1" v-if="isMobile()">
              <span class="navbar-toggler-icon"></span>
            </b-button>
          </div>
        </div>
        <div class="collapse navbar-collapse" id="navbarResponsive2" v-if="!isMobile()">
          <ul class="navbar-nav ml-auto">
            <li class="nav-item active">
              <a class="nav-link" v-on:click="router('/')">Əsas səhifə
                <span class="sr-only">(current)</span>
              </a>
            </li>
            <li class="nav-item">
              <a class="nav-link" v-on:click="router('/tariffs')">Tariflər</a>
            </li>
            <li class="nav-item">
              <a class="nav-link" v-on:click="router('/stores')">Mağazalar</a>
            </li>
            <li class="nav-item">
              <a class="nav-link" v-on:click="router('/rules')">Şərtlər</a>
            </li>
            <li class="nav-item">
              <a class="nav-link" v-on:click="router('/contact')">Əlaqə</a>
            </li>
            <li class="nav-item">
              <a href="http://cargodiem.az/make-order" class="col-md-12 custom-btn cbtn-yellow  cbtn-shadow">Sifariş
                et</a>
            </li>
            <b-dropdown id="dropdown-1" :text="userDetail.name + ' ' + userDetail.surname"
                        class="m-md-2 user-dropdown" v-if="userDetail">
              <b-dropdown-item v-on:click="router('/profile')">
                <i class="fal fa-globe" aria-hidden="true"></i>Xaricdəki ünvanlarım
              </b-dropdown-item>
              <b-dropdown-item v-on:click="router('/profile/orders')">
                <i class="fal fa-shopping-bag"></i>Sifarişlərim
              </b-dropdown-item>
              <b-dropdown-item v-on:click="router('/profile/packages')">
                <i class="fal fa-box-heart"></i>Bağlamalarım
              </b-dropdown-item>
              <b-dropdown-item v-on:click="router('/profile/settings')">
                <i class="fal fa-cogs" aria-hidden="true"></i>Tənzimləmələr
              </b-dropdown-item>
              <b-dropdown-item v-on:click="router('/profile/balance-transactions')">
                <i class="fal fa-history" aria-hidden="true"></i>Sifariş tarixçəsi
              </b-dropdown-item>
              <b-dropdown-item v-on:click="router('/profile/balance-service')">
                <i class="fal fa-wallet" aria-hidden="true"></i>Balans xidmətləri
              </b-dropdown-item>
              <b-dropdown-item v-on:click="logout()">
                <i class="fal  fa-sign-out-alt" aria-hidden="true"></i>Çıxış
              </b-dropdown-item>
            </b-dropdown>
          </ul>
        </div>
        <b-collapse id="collapse-2" v-if="isMobile()">
          <div class="navbar-collapse"
               id="navbarResponsive">
            <ul class="navbar-nav ml-auto">
              <li class="nav-item active">
                <a class="nav-link" v-on:click="router('/')">Əsas səhifə
                  <span class="sr-only">(current)</span>
                </a>
              </li>
              <li class="nav-item">
                <a class="nav-link" v-on:click="router('/tariffs')">Tariflər</a>
              </li>
              <li class="nav-item">
                <a class="nav-link" v-on:click="router('/stores')">Mağazalar</a>
              </li>
              <li class="nav-item">
                <a class="nav-link" v-on:click="router('/rules')">Şərtlər</a>
              </li>
              <li class="nav-item">
                <a class="nav-link" v-on:click="router('/contact')">Əlaqə</a>
              </li>
              <li class="nav-item">
                <a href="http://cargodiem.az/make-order" class="col-md-12 custom-btn cbtn-yellow  cbtn-shadow">Sifariş
                  et</a>
              </li>
              <b-dropdown id="dropdown-1" :text="userDetail.name + ' ' + userDetail.surname"
                          class="m-md-2 user-dropdown" v-if="userDetail">
                <b-dropdown-item v-on:click="router('/profile')">
                  <i class="fal fa-globe" aria-hidden="true"></i>Xaricdəki ünvanlarım
                </b-dropdown-item>
                <b-dropdown-item v-on:click="router('/profile/orders')">
                  <i class="fal fa-shopping-bag"></i>Sifarişlərim
                </b-dropdown-item>
                <b-dropdown-item v-on:click="router('/profile/packages')">
                  <i class="fal fa-box-heart"></i>Bağlamalarım
                </b-dropdown-item>
                <b-dropdown-item v-on:click="router('/profile/settings')">
                  <i class="fal fa-cogs" aria-hidden="true"></i>Tənzimləmələr
                </b-dropdown-item>
                <b-dropdown-item v-on:click="router('/profile/balance-transactions')">
                  <i class="fal fa-history" aria-hidden="true"></i>Sifariş tarixçəsi
                </b-dropdown-item>
                <b-dropdown-item v-on:click="router('/profile/balance-service')">
                  <i class="fal fa-wallet" aria-hidden="true"></i>Balans xidmətləri
                </b-dropdown-item>
                <b-dropdown-item v-on:click="logout()">
                  <i class="fal  fa-sign-out-alt" aria-hidden="true"></i>Çıxış
                </b-dropdown-item>
              </b-dropdown>
            </ul>
          </div>
        </b-collapse>
      </div>
    </nav>
  </div>
</template>

<script>
import {get} from "@/service/api.service";
import {getUser} from "@/service/explorer.service";

export default {
  name: "Navbar",
  methods: {
    isMobile() {
      return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    },
    router: function (routerLink) {
      if (this.$route.path !== routerLink) {
        this.$router.push(routerLink);
      }
    },
    logout: function () {
      get('oauth/logout').then(() => {
        localStorage.clear();
        location.reload();
      });
    }
  },
  data() {
    return {
      collapsing: false,
      collapse: false,
      setHeight: false
    }
  },
  props: {
    userDetail: Object
  },
  mounted() {
    getUser().subscribe(response => {
      if (response !== undefined) {
        if (response !== null) {
          if (response.close) {
            this.userDetail = null;
          } else {
            this.userDetail = JSON.parse(JSON.stringify(response));
          }
        }
      }
    });
  },
}
</script>

<style scoped>
i {
  margin-right: 10px;
}

.user-li {
  display: flex;
}

.list {
  margin: auto;
}

.p-dropdown {
  margin-right: 10px;
  list-style: none;
  cursor: pointer;
  font-size: 15px;
}

.left-navbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.p-dropdown-content {
  margin-top: 45px !important;
  right: 40px !important;
}

.setHeight {
  height: 253px;
}
</style>
