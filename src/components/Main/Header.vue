<template>
  <div>
    <header>
      <div class="container">
        <div class="row">
          <div class="container-fluid">
            <div class="reg">

              <div class="login">
                <a href="https://www.facebook.com/cargodiem.baku" target=”_blank”><i class="fab fa-facebook-f"></i></a>
                <a href="https://www.instagram.com/cargo.diem " target=”_blank”><i class="fab fa-instagram"></i></a>
                <a href="https://www.linkedin.com/company/cargodiem" target=”_blank”><i class="fab fa-linkedin-in"></i></a>
                <a class="phone " href="" style="margin-left:15px"> <i class="fa fa-phone" style="margin: 10px;"></i>+994(51)
                  564 5190 </a>
              </div>

              <ul class="register">
                <li>
                  <router-link v-if="userDetail" to="/profile"><b style="color:white;">Müştəri nömrəsi:</b>
                    {{ userDetail.customer_number }}
                  </router-link>
                </li>
                <li>
                  <router-link v-if="!userDetail" to="/login">Daxil ol</router-link>
                </li>
                <li>
                  <router-link v-if="!userDetail" to="/register">Qeydiyyatdan keç</router-link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </header>
  </div>
</template>

<script>

import {getUser} from "@/service/explorer.service";

export default {
  name: "Header",
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
  }
}
</script>
<style>
a {
  cursor: pointer;
}
</style>
