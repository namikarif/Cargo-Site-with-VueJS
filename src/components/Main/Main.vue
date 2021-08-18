<template>
  <div>
    <Slider/>
    <section class="content">
      <div class="categories-area ">
        <div class="container">
          <div class="row justify-content-sm-center">
            <div class="cl-xl-7 col-lg-8 col-md-10">
              <div class="section-tittle text-center mb-30 mt-30">
                <h2>3 addımda sifariş</h2>
              </div>
            </div>
          </div>
          <div class="row">
            <div class="col-lg-4 col-md-12 col-sm-12">
              <img src="../../assets/img/cst.png" class="shopping" alt="shopping">
            </div>
            <div class="col-lg-4 col-md-12 col-sm-12">
              <img src="../../assets/img/step.png" class="shopping" alt="shopping">
            </div>
            <div class="col-lg-4 col-md-12 col-sm-12">
              <img src="../../assets/img/6.png" class="shopping" alt="shopping">
            </div>
          </div>
        </div>
      </div>
    </section>
    <section class="content bg-db">
      <div class="popular-course">
        <div class="container">
          <div class="row justify-content-sm-center">
            <div class="cl-xl-7 col-lg-8 col-md-10">
              <div class="section-tittle text-center mb-30 mt-30">
                <h2>Nə üçün CargoDiem?</h2>
              </div>
            </div>
          </div>
          <div class="row">
            <div class="col-xl-4 col-lg-4 col-md-6">
              <div class="single-course mb-40">
                <div class="course--img">
                  <img src="../../assets/img/1.png" alt="">
                </div>
              </div>
            </div>
            <div class="col-xl-4 col-lg-4 col-md-6">
              <div class="single-course mb-40">
                <div class="course--img">
                  <img src="../../assets/img/2.png" alt="">
                </div>
              </div>
            </div>
            <div class="col-xl-4 col-lg-4 col-md-6">
              <div class="single-course mb-40">
                <div class="course--img">
                  <img src="../../assets/img/3.png" alt="">
                </div>

              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
    <MainTariffs/>
    <MainFaqs/>
    <MainStores/>
  </div>
</template>

<script>
import Slider from "@/components/Main/Slider";
import MainTariffs from "@/components/Main/MainTariffs";
import MainFaqs from "@/components/Main/MainFaqs";
import MainStores from "@/components/Main/MainStores";
import {get} from "@/service/api.service";
import {setUser} from "@/service/explorer.service";

export default {
  name: "Main",
  components: {
    MainStores,
    MainFaqs,
    MainTariffs,
    Slider
  },
  mounted() {
    this.loading = true;
    get('user/my').then(response => {
      setTimeout(() => this.loading = false, 1500);
      this.userDetail = response;
      setUser(response);
    }).catch(() => {
      this.loading = false;
    });
  }
}
</script>

<style scoped>

</style>
