<template>
  <section class="content bg-db">
    <div class="section-tittle text-center mb-30">
      <h2>Mağazalar</h2>
    </div>
    <carousel :autoplay="true"
              :perPageCustom="[[560, 3], [768, 4], [1024, 5]]"
              :scrollPerPage="false"
              :pagination-enabled="false"
              :loop="true">
      <slide v-for="store in storeList" v-bind:key="store.id">
        <a :href="store.url" target="_blank" class="store-item my-3">
          <div class="img-wrap d-flex align-items-center justify-content-center">
            <img :src="'https://cargodiem.az/storage/websites/' + store.thumb_img" :alt="store.name_az">
          </div>
          <p>{{ store.name_az }}</p>
        </a>
      </slide>
    </carousel>
    <carousel :autoplay="true" :nav="false">

    </carousel>
    <div class="shops">
      <a href="/stores">
        <button class="col-md-12 custom-btn cbtn-yellow  cbtn-shadow text-center">Bütün mağazalar</button>
      </a>
    </div>
  </section>
</template>

<script>
import {post} from "@/service/api.service";
import {carousel, slide} from 'vue-carousel';

export default {
  name: "MainStores",
  comments: {
    carousel,
    slide
  },
  mounted() {
    this.loading = true;
    post('stores', {
      "country_id": "15"
    }).then(response => {
      this.storeList = response;
      this.loading = false;
    }).catch(() => {
      this.loading = false;
    });
  },
  data() {
    return {
      storeList: [],
      loading: false
    }
  }
}
</script>

<style scoped>
.shops {
  margin-top: 15px;
}

.store-item {
  width: 155px;
  height: 95px;
  position: relative;
  display: grid;
}

.store-item img {
  width: 150px;
  height: 55px;
}

.store-item p {
  background: #1c1c1b;
  color: #ff9e13;
  width: 100%;
  border-radius: 4px;
  font-size: 18px;
  font-weight: 700;
  text-align: center;
  margin: auto auto 0 auto;
  height: 30px;
}
</style>
