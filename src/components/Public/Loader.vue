<template>
  <div>
    <Load
        :object="object"
        :color1="color"
        :color2="color2"
        :size="size"
        :speed="speed"
        :bg="bgcolor"
        :objectbg="objectbg"
        :opacity="opacity"
        :disableScrolling="disableScrolling"></Load>
  </div>
</template>

<script>
import Load from "@/components/Public/Load";

export default {
  name: "Loader",
  components: {
    Load,
  },
  data() {
    return {
      object: '#ff910d',
      color: '#ffffff',
      color2: '#17fd3d',
      objectbg: '#ff910d',
      opacity: 100,
      bgcolor: '#1c1c1b',
      size: 24,
      speed: 2,
      disableScrolling: false,
    }
  }
}
</script>

<style scoped>
body.overflowHidden {
  overflow: hidden !important;
}
</style>
