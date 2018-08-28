<template>
  <div class="home">
    <!-- 拼团交易完成状态- 邮寄 版本1 -->
    <!-- <fasiMailto /> -->
    <!-- 拼团交易完成状态- 物流到付 版本1 -->
    <!-- <fasisendMail /> -->
    <!-- 拼团交易完成状态- 邮寄（主订单）版本1 -->
    <!-- <fasiMainsend /> -->
    <!-- 拼团交易完成状态- 邮寄（子订单）版本1 -->
    <!-- <fasisonMail /> -->
    <!-- 拼团交易取消状态- 物流到付1 版本1 -->
    <!-- <fasicanclesend /> -->
    <!-- 拼团交易取消状态- 物流到付2 版本1 -->
    <!-- <fasicancletwo /> -->
    <!-- 拼团交易取消状态- 邮寄1 版本1 -->
    <!-- <fasicancleMail /> -->
    <!-- 拼团交易取消状态-邮寄2 版本1 -->
    <!-- <fasicancleMailTwo /> -->
    <!-- 10.4.1拼团待付款状态 版本1 -->
    <!-- <fasiwaitPay/> -->
    <!-- 10.4.2拼团待付款状态 版本1 -->
    <!-- <fasiwaitPayTwo /> -->
    <!-- 拼团中状态 版本3 -->
    <!-- <fasipinning /> -->
    <!-- 拼团待发货状态 - 邮寄 版本1 -->
    <!-- <waitsend /> -->
    <!-- 拼团待发货状态 - 货到付款 版本1 -->
    <!-- <waitsendTwo /> -->
    <!-- 拼团待发货状态 - 邮寄（主子账单） 版本1 -->
    <!-- <waitsendThree /> -->
    <!-- 拼团待收货状态 - 邮寄 版本1 -->
    <!-- <collectGoods /> -->
    <!-- 拼团待收货状态 - 物流到付 版本1 -->
    <!-- <collectGoodsTwo /> -->
    <!-- 拼团待收货状态 - 邮寄（主订单） 版本1 -->
    <!-- <collectGoodsThree /> -->
    <!-- 拼团待收货状态 -邮寄（子订单） 版本1 -->
    <collectGoodsFour />
  </div>
</template>
<script>
import wx from "wx";
// 完成状态
import fasiMailto from "@/components/p_fasiMailto";
import fasisendMail from "@/components/p_fasisendMail";
import fasiMainsend from "@/components/P_fasiMainsend";
import fasisonMail from "@/components/p_fasisonMail";
// 取消状态
import fasicanclesend from "@/components/p_fasicanclesend";
import fasicancletwo from "@/components/p_fasicancletwo";
import fasicancleMail from "@/components/p_fasicancleMail";
import fasicancleMailTwo from "@/components/p_fasicancleMailTwo";
//待付款状态
import fasiwaitPay from "@/components/p_fasiwaitPay";
import fasiwaitPayTwo from "@/components/p_fasiwaitPayTwo";
//拼团中状态
import fasipinning from "@/components/p_fasipinning";
//待发货状态
import waitsend from "@/components/p_waitsend";
import waitsendTwo from "@/components/p_waitsendTwo";
import waitsendThree from "@/components/p_waitsendThree";
//待收货状态
import collectGoods from "@/components/p_collectGoods";
import collectGoodsTwo from "@/components/p_collectGoodsTwo";
import collectGoodsThree from "@/components/p_collectGoodsThree";
import collectGoodsFour from "@/components/p_collectGoodsFour";


export default {
  components: {
    fasiMailto,
    fasisendMail,
    fasiMainsend,
    fasisonMail,
    fasicanclesend,
    fasicancletwo,
    fasicancleMail,
    fasicancleMailTwo,
    fasiwaitPay,
    fasiwaitPayTwo,
    fasipinning,
    waitsend,
    waitsendTwo,
    waitsendThree,
    collectGoods,
    collectGoodsTwo,
    collectGoodsThree,
    collectGoodsFour

  },
  data() {
    return {};
  },
  methods: {},
  mounted() {}
};
</script>
<style lang="sass" scoped>
@import '~@/assets/css/mixin'
</style>
