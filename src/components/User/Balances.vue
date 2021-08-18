<template>
<div class="container">
  <Tabs tab-list="[]">
    <Tab name="Services" :selected="true">
      <h1>What we do</h1>
    </Tab>
    <Tab name="Pricing">
      <h1>How much we do it for</h1>
    </Tab>
  </Tabs>
</div>
</template>

<script>
import Tabs from "@/components/Public/Tabs";
import Tab from "@/components/Public/Tab";
export default {
name: "Balances",
  components: {Tab, Tabs}
}
</script>

<style scoped>

</style>
