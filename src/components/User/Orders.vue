<template>
  <div>
    <div class="loading-container" v-if="loading">
      <div class="semipolar-spinner">
        <div class="ring"></div>
        <div class="ring"></div>
        <div class="ring"></div>
        <div class="ring"></div>
        <div class="ring"></div>
      </div>
    </div>
    <div class="container" v-if="!loading">
      <Tabs :tabList="statuses" @selectTab="selectTab($event)">
        <Tab :name="status.name_az" :selected="routerLink === status.name_az" v-for="status of statuses"
             v-bind:key="status.id">
          <div class="loader" v-if="tabLoading">
            <div class="loader__element">
              <div class="before" id="beforeNm"></div>
            </div>
          </div>
          <div class="table100 ver4 mt-2 m-b-110">
            <div class="table100-head">
              <table>
                <thead>
                <tr class="row100 head">
                  <th style="width: 20px; padding: 0 10px;">
                    <div class="checkbox">
                      <input type="checkbox" name="order-check" v-on:change="selectAll()"
                             id="selectAll" class="css-checkbox">
                      <label for="selectAll" class="css-label"> </label>
                    </div>
                  </th>
                  <th class="cell100 column1">Link</th>
                  <th class="cell100 column2">Type</th>
                  <th class="cell100 column3">Hours</th>
                  <th class="cell100 column4">Trainer</th>
                  <th class="cell100 column5">Spots</th>
                </tr>
                </thead>
              </table>
            </div>
            <div class="table100-body js-pscroll ps ps--active-y" v-if="!tabLoading">
              <table>
                <tbody>
                <tr class="row100 body" v-for="item of orderList" v-bind:key="item.id">
                  <td style="width: 20px; padding: 0 10px;">
                    <div class="checkbox">
                      <input type="checkbox" name="order-check" v-model="item.select"
                             :id="'selectOrder' + item.id" class="css-checkbox">
                      <label :for="'selectOrder' + item.id" class="css-label"> </label>
                    </div>
                  </td>
                  <td class="cell100 column1">
                    {{ item.link }}
                  </td>
                  <td class="cell100 column2">
                    {{ item.quantity }}
                  </td>
                  <td class="cell100 column3">
                    {{ item.color }}
                  </td>
                  <td class="cell100 column4">
                    {{ item.price }}
                  </td>
                  <td class="cell100 column5">
                    {{ item.count_items }}
                  </td>
                </tr>
                </tbody>
              </table>
            </div>
          </div>
        </Tab>
      </Tabs>
    </div>
  </div>
</template>

<script>
import Tab from "@/components/Public/Tab";
import Tabs from "@/components/Public/Tabs";
import {get, post} from "@/service/api.service";

export default {
  name: 'Orders',
  components: {Tab, Tabs},
  props: {
    item: {
      name_az: String,
      id: Number,
    }
  },
  data() {
    return {
      routerLink: '',
      statuses: [],
      orderList: [],
      loading: false,
      tabLoading: false
    }
  },
  mounted() {
    this.loading = true;
    get('order/statuses').then(response => {
      this.statuses = response;
      this.loading = false;
      if (this.statuses[0]) {
        this.routerLink = this.statuses[0].name_az;
        this.selectTab(this.statuses[0]);
      }
    }).catch(() => this.loading = false);
  },
  methods: {
    selectAll: function () {
      this.orderList.forEach(order => {
        return order.select = true;
      });
    },
    selectOrder: function (order, event) {
      order.select = event.target.checked;
    },
    router: function (routerLink) {
      console.log('view profile with id:', routerLink)
    },
    selectTab: function (status) {
      this.tabLoading = true;
      this.routerLink = status.name_az;
      post('order/list', {
        status: status.id
      }).then(response => {
        this.orderList = response;
        setTimeout(() => {
          this.tabLoading = false;
        }, 100);
      }).catch(() => this.tabLoading = false);
    },
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.loader {
  background-color: transparent;
  overflow: hidden;
  height: 100%;
  position: absolute;
  right: 15px;
  top: 0;
  left: 15px;
  display: flex;
  align-items: center;
  align-content: center;
  justify-content: flex-start;
  z-index: 100000;
}

.loader__element {
  height: 3px;
  width: 100%;
  background: #f5be83;

}

.loader__element .before {
  content: '';
  display: block;
  background-color: #ff910d;
  height: 3px;
  width: 0;
}
</style>
