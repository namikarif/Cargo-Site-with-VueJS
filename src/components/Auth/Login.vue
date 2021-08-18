<template>
  <div class="login-content">
    <div class="background">
      <div class="left-section"></div>
      <div class="right-section"></div>
    </div>
    <div class="login-main">
      <div class="left-section">
        <div class="buttons">
          <div class="login" v-bind:class="{active: tabName === 'login'}" v-on:click="changeTab('login')">Login</div>
          <div class="sign-up" v-bind:class="{active: tabName === 'signup'}" v-on:click="changeTab('signup')">SignUp
          </div>
        </div>
      </div>
      <div class="right-section">
        <div class="login-tab" v-if="tabName === 'login'">
          <div class="form col-md-12 col-sm-12">
            <div class="login-logo">
              <img src="../../assets/img/logo.png" alt="logo">
            </div>
            <div class="col-md-6 col-sm-6">
              <div class="form-group" v-bind:class="{active: activeInput === 'email'}">
                <i class="fa fa-user"></i>
                <input type="text"
                       v-on:focus="activatedInput('email')"
                       v-on:blur="deactivatedInput()"
                       class="form-control form-control-sm"
                       v-model="user.email"
                       name="email"
                       placeholder="Email">
              </div>
            </div>
            <div class="col-md-6 col-sm-6">
              <div class="form-group" v-bind:class="{active: activeInput === 'password'}">
                <i class="fa fa-lock"></i>
                <input type="password"
                       v-on:focus="activatedInput('password')"
                       v-on:blur="deactivatedInput()"
                       class="form-control form-control-sm"
                       v-model="user.password"
                       name="password"
                       placeholder="password">
              </div>
            </div>
            <div class="col-md-6 col-sm-6">
              <button class="btn btn-sm btn-login" v-on:click="login()">Daxil ol</button>
            </div>
            <div class="col-md-6 col-sm-6">
              <div class="line">
                <span>OR</span>
              </div>
            </div>
            <div class="col-md-6 col-sm-6">
              <ul class="social-icons">
                <li><i class="fab fa-facebook-f" @click="logInWithFacebook"></i></li>
                <li><i class="fab fa-twitter"></i></li>
                <li><i class="fab fa-linkedin-in"></i></li>
              </ul>
            </div>
          </div>
        </div>
        <div class="sign-up-tab" v-if="tabName === 'signup'"></div>
      </div>
    </div>
  </div>
</template>
<script>
import {login} from "@/service/api.service";
import {setUser} from "@/service/explorer.service";
import {alertErrorMessage} from "@/service/util.service";
export default {
  name: 'Login',
  methods: {
    changeTab: function (tabName) {
      this.tabName = tabName;
    },
    activatedInput: function (input) {
      this.activeInput = input;
    },
    deactivatedInput: function () {
      this.activeInput = '';
    },
    handleError: function (error) {
      this.alertMessage = alertErrorMessage(error);
      this.alertShow = true;
      this.loading = false;
    },
    showSingUp: function () {
      this.showModal = true;
    },
    login() {
      login('oauth/login', {
        email: this.user.email,
        language: "az",
        password: this.user.password,
      }).then(response => {
        localStorage.setItem('access_token', response.access_token);
        setUser(response.user);
        location.reload();
      }).catch(error => this.handleError(error));
    },
    async logInWithFacebook() {
      await this.loadFacebookSDK(document, "script", "facebook-jssdk");
      await this.initFacebook();
      window.FB.login(function (response) {
        if (response.authResponse) {
          alert("You are logged in &amp; cookie set!");
          console.log('response : ', response);
        } else {
          alert("User cancelled login or did not fully authorize.");
        }
      });
      return false;
    },
    async initFacebook() {
      window.fbAsyncInit = function () {
        window.FB.init({
          appId: "2378009042229950",
          cookie: true,
          version: "v13.0"
        });
      };
    },
    async loadFacebookSDK(d, s, id) {
      let js,
          fjs = d.getElementsByTagName(s)[0];
      if (d.getElementById(id)) {
        return;
      }
      js = d.createElement(s);
      js.id = id;
      js.src = "https://connect.facebook.net/en_US/sdk.js";
      fjs.parentNode.insertBefore(js, fjs);
    }
  },
  data() {
    return {
      showModal: false,
      alertShow: false,
      alertMessage: '',
      activeInput: '',
      tabName: 'login',
      user: {
        email: '',
        password: ''
      }
    };
  }
}
</script>
<style lang="scss">
.login-content {
  position: relative;
  display: flex;
  width: 100vw;
  height: 75vh;

  .background {
    position: absolute;
    display: flex;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;

    .left-section {
      background: -webkit-linear-gradient(left, #ff910d, #f5ac56);
      width: 35%;
      height: 100%;
    }

    .right-section {
      background-color: #ffffff;
      height: 100%;
      width: 65%;
    }
  }

  .login-main {
    position: relative;
    display: flex;
    margin: auto 12.5vw;
    width: 75vw;
    height: 75%;
    border-radius: 10px;
    -webkit-box-shadow: 0 0 98px 17px rgba(28, 28, 27, 0.64);
    -moz-box-shadow: 0 0 98px 17px rgba(28, 28, 27, 0.64);
    box-shadow: 0 0 98px 17px rgba(28, 28, 27, 0.64);

    .left-section {
      position: relative;
      display: flex;
      background: -webkit-linear-gradient(left, #ff910d, #f5ac56);
      width: 30%;
      height: 100%;
      border-top-left-radius: 10px;
      border-bottom-left-radius: 10px;

      .buttons {
        margin: auto 0 auto auto;

        div {
          padding: 10px;
          background-color: transparent;
          color: #1c1c1b;
          cursor: pointer;

          &.active {
            border-top-left-radius: 10px;
            border-bottom-left-radius: 10px;
            border: 1px solid white;
            background-color: white;
            border-right: none;
            color: #ff910d;
          }
        }
      }
    }

    .right-section {
      position: relative;
      background-color: #ffffff;
      height: 100%;
      width: 70%;
      border-top-right-radius: 10px;
      border-bottom-right-radius: 10px;

      .login-tab {
        text-align: center;
        position: relative;
        height: 100%;
        width: 100%;
        display: flex;

        .form {
          padding: 25px 0 10px 0 !important;

          .login-logo {
            width: 100%;
            height: 80px;

            img {
              width: 180px;
              height: 80px;
            }
          }

          .col-md-6 {
            margin-left: 25%;
            margin-right: 25%;

            .form-group {
              padding: 0;
              margin: 25px 0;
              width: 100%;
              display: flex;
              justify-content: center;
              border-bottom: 1px solid #e4e7e9;

              &.active {
                border-bottom: 1px solid #ff910d;
                color: #ff910d;
              }

              i {
                margin: auto 5px auto 0;
                color: #525c5f;
              }

              input {
                width: 100%;
                border: none;
                margin-left: 5px;

                &:focus {
                  background-color: #fff;
                  border: none !important;
                  outline: 0;
                  box-shadow: none !important;
                }
              }
            }

            .line {
              border-bottom: 1px solid #e4e7e9;
              line-height: 0;
              margin: 20px 5px;

              span {
                background: #ffffff;
                padding: 0 10px;
              }
            }

            .btn-login {
              height: 40px !important;
              min-height: 31px !important;
              background: #ff910d;
              padding: 11px 0;
              margin: 10px 0 25px;
              border-radius: 6px;
              width: 100%;
            }

            .social-icons {
              display: flex;
              margin-top: 20px;
              text-align: center;

              li {
                margin: 10px auto;
                color: #ff910d;
              }
            }
          }
        }
      }
    }
  }
}

@media (max-width: 767px) {
  .login-content {
    .login-main {
      margin: auto 6.5vw;
      width: 87vw;

      .left-section {
        width: 33% !important;
      }

      .right-section {
        width: 67% !important;

        .login-tab {
          .form {
            padding: 25px 0 10px 0 !important;

            .login-logo {
              width: 100%;
              height: 50px;

              img {
                width: 150px;
                height: 50px;
              }
            }

            .col-md-6 {
              margin: 0 !important;

              .btn-login {
                height: 38px !important;
                padding: 5px 0;
                margin: 10px 0;
              }
            }
          }
        }
      }
    }
  }
}
</style>
