<template>
  <div>
    <Loading v-if="loading"/>
    <div class="container" v-if="!loading">
      <div class="row none">
        <div class="col-lg-2 col-md-4 col-sm-4 col-xs-12 shop" v-for="store in storeList" v-bind:key="store.id">
          <a :href="store.url" target="_blank">
            <img :src="'https://namikarifoglu.com/storage/websites/' + store.thumb_img" class="shop-img">
            <label class="shop-name">{{ store.name_az }}</label>
          </a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {post} from "../../service/api.service";
import Loading from "@/components/Public/Loading";

export default {
  name: "Stores",
  components: {Loading},
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
.shop {
  margin-top: 15px;
  height: 120px;
}

.shop a {
  height: 85px;
}

.shop-img {
  margin: auto;
  width: 100%;
  height: 55px;
}

.shop-name {
  color: #ff9e13;
  background: #1c1c1b;
  width: 100%;
  text-align: center;
  font-size: 17px;
}
</style>
