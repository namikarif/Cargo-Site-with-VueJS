<template>
  <div>
    <div class="tabs">
      <ul>
        <li v-for="tab in tabs" :class="{ 'is-active': tab.isActive }" v-bind:key="tab.id">
          <a :href="tab.href" @click="selectTab(tab)">{{ tab.name }}</a>
        </li>
      </ul>
    </div>

    <div class="tabs-details">
      <slot></slot>
    </div>
  </div>
</template>

<script>

export default {
  name: "tabList",
  props: {tabList: {required: true}},
  data() {
    return {
      tabs: []
    };
  },
  created() {
    this.tabs = this.$children;
  },
  methods: {
    selectTab(selectedTab) {
      const index = this.findIndex(this.tabList, 'name_az', selectedTab.name);
      if (index !== -1) {
        this.$emit('selectTab', this.tabList[index]);
      }

      this.tabs.forEach(tab => {
        tab.isActive = (tab.name === selectedTab.name);
      });
    },
    findIndex: (values, key, findValue) => {
      let selectedIndex = -1;
      values.forEach((value, index) => {
        if (value[key] === findValue) {
          selectedIndex = index;
        }
      });
      return selectedIndex;
    }
  }
}
</script>

<style scoped>

</style>
