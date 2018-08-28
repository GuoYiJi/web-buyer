<template>
  <div class="home">
    <div class="nav">
      <div class="list">
        <span v-for="(item,idx) in navData" :key="idx" class="item" :class="[tag === item.id && 'active']" @click="handleNav(item.id)">{{item.text}}</span>
        <div class="line" :style="{left: (tag-1)*20 + '%'}"></div>
      </div>
    </div>
    <div class="content">
      <div v-if="tag == 1">
        <fasiAll />
      </div>
      <div v-else-if="tag == 2">
        <fasiPay />
      </div>
      <div v-else-if="tag == 3">
        <fasiPin />
      </div>
      <div v-else-if="tag == 4">
        <fasiPu />
      </div>
      <div v-else-if="tag == 5">
        <fasiWaitcheck />
      </div>
      <div v-else-if="tag == 6">
        <fasiOk />
      </div>
    </div>
  </div>
</template>
<script>
import wx from "wx";
import fasiAll from "@/components/p_fasiAll";
import fasiPay from "@/components/p_fasiPay";
import fasiPin from "@/components/p_fasiPin";
import fasiPu from "@/components/p_fasiPu";
import fasiWaitcheck from "@/components/p_fasiWaitcheck";
import fasiOk from "@/components/p_fasiOk";
export default {
  components: {
    fasiAll,
    fasiPay,
    fasiPin,
    fasiPu,
    fasiWaitcheck,
    fasiOk
  },
  data() {
    return {
      tag: 1,
      navData: [
        {
          id: 1,
          text: "全部"
        },
        {
          id: 2,
          text: "待付款"
        },
        {
          id: 3,
          text: "拼团中"
        },
        {
          id: 4,
          text: "待发货"
        },
        {
          id: 5,
          text: "待收货"
        },
        {
          id: 6,
          text: "已完成"
        }
      ]
    };
  },
  methods: {
    handleNav(tag) {
      this.tag = tag;
    }
    // toRoute(path) {
    //   this.$router.push('/pages/home/' + path)
    // }
  },
  mounted() {}
};
</script>
<style lang="sass" scoped>
@import '~@/assets/css/mixin'

.content
  // height: 60%
.home
  height: 100%
.search-box
  padding: 30px 0
  background: #fff
  .input
    display: flex
    padding: 0px 35px
    p
      width: 10%
      .search
        +bg-img('home/search.png')
        +icon(38px)
        margin-top: 7px
    .search-icon
      position: absolute
      left: 60px
    .input-box
      background-color: #f5f5f5
      border-radius: 4px
      width: 100%
      text-align: left
      padding: 8px 85px
      border: none
      color: #999999

.active
  color: #F67C2F
  // font-weight: 600
.nav
  overflow: hidden
  text-align: center
  background: #f5f5f5
  height: 70px
  width: 100%
  padding-top: 1px
  box-shadow: 0px 4px 6px 0px rgba(0, 69, 162, 0.06)
  .list
    font-size: 26px
    color: #000
    background: #f5f5f5
    overflow-y: hidden
    overflow-x: auto
    height: 90px
    position: relative
    display: flex
    width: 100%
    .item
      flex: 0 0 20%
      line-height: 70px
      box-sizing: border-box
.line
  display: block
  height: 1px
  width: 8%
  border-radius: 8px
  background-color: #F67C2F
  position: absolute
  bottom: 23px
  margin: 0 6%
  transition: left .3s ease-in

</style>
