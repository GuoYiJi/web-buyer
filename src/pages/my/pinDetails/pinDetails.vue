<template>
  <div class="home">
    <fasiMailto />
  </div>
</template>
<script>
import wx from "wx";
import api from "@/api/httpJchan"
import fasiMailto from "@/components/p_fasiMailto";

export default {
  components: {
    fasiMailto,
  },
  data() {
    return {};
  },
  methods: {
    // 获取订单详情
    getOrderDeatil() {
      api.obligation({
        orderId: this.$route.query.orderId
      }).then(response => {
        console.log(response);
      })
    }
  },
  mounted() {
    this.getOrderDeatil();
  }
};
</script>
<style lang="sass" scoped>
@import '~@/assets/css/mixin'
</style>
