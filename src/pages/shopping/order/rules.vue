<template>
  <div class="nav">
    <p>{{value}}</p>
  </div>
</template>
<script>
import wx from "wx";
import API from "@/api/httpJchan";
export default {
  components: {},
  data() {
    return {
      value: ""
    };
  },
  methods: {},
  async mounted() {
    const tabsList = await API.rules({ name: "freightRule" });
    console.log(tabsList);
    this.value = tabsList.data.value;
  }
};
</script>
<style lang="sass" scoped>
@import '~@/assets/css/mixin'
.nav
  font-size: 28px
  color: #000
  padding: 29px 40px
</style>
