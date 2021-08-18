<template>
  <div>
    <Loading v-if="loading"/>
    <div v-if="!loading" class="wshipping-content-block">
      <div class="">
        <div class="balancesheet">
          <div class="col-lg-4 col-md-12" v-on:click="router('balance')">
            <div class="row">
              <div class="latest-news-section" style="margin-top:0;">
                <a title="">
                  <div class="news-date">{{ userDetail.tl_balance }} <span>TL</span></div>
                  <h5>Balans (SİFARİŞLƏR)</h5>
                  <div class="news-post-by">Son əməliyyat <span>2020-12-04 00:52:21</span></div>
                  <p></p>
                </a>
              </div>
            </div>
          </div>
          <div class="col-lg-4 col-md-12" v-on:click="router('balance-service')">
            <div class="row">
              <div class="latest-news-section" style="margin-bottom:15px;">
                <a title="">
                  <div class="news-date">{{ userDetail.azn_balance }}<span>AZN</span></div>
                  <h5>Balans (XİDMƏTLƏR)</h5>
                  <div class="news-post-by">Son əməliyyat <span>2020-11-28 00:14:11</span></div>
                  <p></p>
                </a>
              </div>
            </div>
          </div>
          <div class="col-lg-4 col-md-12" v-on:click="router('orders')">
            <div class="row">
              <div class="latest-news-section" style="margin-bottom:15px;margin-top:0">
                <a href="owl-item/myorders" title="">
                  <div class="news-date" style="padding:15px 0px 0px;"> {{ userDetail.usd_balance }} $
                    <span style="height:45px; line-height:45px;font-size:20px"># </span></div>
                  <h5>Son bir aylıq sifarişlər</h5>
                  <div class="news-post-by">Son əməliyyat <span></span></div>
                  <p></p>
                </a>
              </div>

            </div>

          </div>
        </div>
        <hr>
        <div class="row">
          <div class="col-md-3 col-sm-4 col-lg-3">
            <div class="col-md-12">
              <div class="row">
                <a class="col-md-12 custom-btn cbtn-yellow  cbtn-shadow"
                   style="padding: 9px 0;" v-on:click="router('create-order')">Sifariş et</a>
                <a class="col-md-12 custom-btn cbtn-yellow  cbtn-shadow"
                   v-on:click="router('create-package')"
                   style="padding: 9px 0; margin-top:10px !important;margin-bottom:10px !important">Bəyan et</a>
              </div>
            </div>
            <div class="right-block left-menu menu-with-title " style="">
              <div class="col-md-12">
                <div class="row">
                  <ul>
                    <li v-bind:class="{active: routerName === 'addresses'}" v-on:click="router('addresses')"><a
                        title="">Xaricdəki Ünvanlarım</a></li>
                    <li v-bind:class="{active: routerName === 'orders'}" v-on:click="router('orders')"><a title="">Sifarişlərim</a>
                    </li>
                    <li v-bind:class="{active: routerName === 'packages'}" v-on:click="router('packages')"><a title="">Bağlamalarım</a>
                    </li>
                    <li v-bind:class="{active: routerName === 'settings'}" v-on:click="router('settings')"><a title="">Profil
                      Tənzimləmə</a></li>
                    <li v-bind:class="{active: routerName === 'balance'}" v-on:click="router('balance')"><a title="">Sifariş
                      tarixçəsi</a></li>
                    <li v-bind:class="{active: routerName === 'balance-service'}"
                        v-on:click="router('balance-service')"><a title="">Balans xidmətləri</a></li>
                    <li v-on:click="logout()"><a title="">Çıxış</a></li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
          <div class="col-md-9 col-sm-8 col-lg-9">
            <router-view></router-view>
          </div>
        </div>
      </div>
      <!-- Right sidebar end -->
      <!--      <div class="row ">-->
      <!--        -->
      <!--      </div>-->
    </div>
  </div>
</template>

<script>
import {setUser} from "@/service/explorer.service";
import Loading from "@/components/Public/Loading";
import {get} from "@/service/api.service";

export default {
  name: "UserProfile",
  components: {
    Loading
  },
  methods: {
    router: function (routerLink) {
      if (this.$route.path !== routerLink) {
        this.$router.push(routerLink);
        this.routerName = routerLink;
      }
    },
    logout: function () {
      get('oauth/logout').then(() => {
        localStorage.clear();
        location.reload();
      });
    }
  },
  mounted() {
    const routerName = this.$route.path;
    const routerNameArray = routerName.split('/');
    this.routerName = routerNameArray[2] ? routerNameArray[2] : '';
    this.loading = true;
    get('user/my').then(response => {
      setTimeout(() => this.loading = false, 1500);
      this.userDetail = response;
      setUser(response);
    }).catch(() => {
      localStorage.clear();
      this.$router.push('/login');
      this.loading = false;
    });
  },
  data() {
    return {
      userDetail: Object,
      loading: false,
      routerName: 'addresses'
    }
  },
  metaInfo() {
    return {
      title: `${this.userDetail.name} - Epiloge`,
      meta: [
        {
          name: 'description',
          content: 'Connect and follow ' + this.userDetail.name + ' on Epiloge - ' + this.userDetail.tagline
        },
        {
          property: 'og:title',
          content: this.userDetail.name + ' - Epiloge'
        },
        {
          property: 'og:site_name',
          content: 'Epiloge'
        },
        {
          property: 'og:description',
          content: 'Connect and follow ' + this.userDetail.name + ' on Epiloge - ' + this.userDetail.tagline
        },
        {
          property: 'og:type',
          content: 'profile'
        },
        {
          property: 'og:url',
          content: 'https://epiloge.com/@' + this.userDetail.username
        },
        {
          property: 'og:image',
          content: this.aws_url + '/users/' + this.userDetail.profileurl + '-main.jpg'
        }
      ]
    }
  }
}
</script>

<style scoped>
ul li:hover > ul, ul li ul:hover {
  visibility: visible;
  opacity: 1;
  display: block;
}

.p-dropdown-content li a {
  color: black;
}

.p-dropdown-content li a:hover {
  color: black;
}

.balancesheet {
  display: flex;
}

.tracking-block {
  width: 706px;
  margin-left: 14px;
}

@media only screen and (max-width: 1200px) and (min-width: 990px) {
  .tracking-block {
    width: 590px;
  }
}

@media only screen and (max-width: 990px) {
  .balancesheet {
    display: block;
  }

  .latest-news-section {
    margin-bottom: 15px;
    width: 95%;
  }

  .left-menu ul {
    margin: 0px;
    padding: 0px;
    list-style-type: none;
    width: 658px;
  }

  .margin-top-left {
    margin-top: 471px;
    margin-left: 35px;
    margin-right: 35px;
  }

  .tracking-block {

    width: 655px;
    margin-left: auto;
    margin-right: auto;
  }
}

@media only screen and (max-width: 770px) {
  .margin-top-left {
    margin-top: 471px;

    margin-bottom: 325px;
  }

  .tracking-block {

    width: 483px;
    margin-left: auto;
    margin-right: auto;
  }
}

@media only screen and (max-width: 600px) {

  .tracking-block {

    max-width: 508px;
    margin-left: -33px;
    margin-right: -33px;
    width: auto;
  }

}

.nav-tabs > li > a.active, .nav-tabs > li > a.active:focus, .nav-tabs > li > a.active:hover {
  background-color: #f6f6f6 !important;
}

.latest-news-section h5 {
  font-family: A2 Arial AzLat;
}
</style>
