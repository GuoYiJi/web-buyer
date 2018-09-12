<template>
  <div class="nav">
    <div class="title">
      <span class="title_1">NEW SHOW</span>
      <span class="title_2"> 推荐搭配，高人一等 </span>
      <span class="xian"></span>
      <span class="xian_1"></span>
    </div>
    <div class="content">
      <div v-for="(item, index) in selectMGP" :key="index" class="xK">
        <scroll-view scroll-x="true" style="width: 100%">
          <div class="scroll-x" :style="{width: 445 + 290 * widthArr[index]+ 'rpx'}">
            <div class="left-box">
              <div class="title">
                <i class="icon"></i>
                <span>{{item.title || '未设置标题'}}</span>
              </div>
              <div class="main-img">
                <div class="border">
                  <i class="shop-img" :style="{background: 'url(' + item.matchGoods[0].images + ')'}"></i>
                </div>
                <span class="title">{{item.matchGoods[0].name}}</span>
                <span class="desc"> 货期:{{item.matchGoods[0].delivery}}丨销量:{{item.matchGoods[0].sellCount}}</span>
                <span class="price">
                  <strong>售价:￥{{item.matchGoods[0].sellPrice}}</strong>
                </span>
                <i class="M-img" @click="Tiao(item.matchGoods[0])"></i>
              </div>
            </div>
            <div class="right-box" :style="{width: 290 * widthArr[index] + 50 +'rpx'}">
              <div class="item-img" v-for="(ite, inx) in item.matchGoods" :key="inx" v-if="inx > 0">
                <div class="border">
                  <i class="shop-img" :style="{background: 'url(' + ite.images + ')'}"></i>
                </div>
                <span class="title">{{ite.name}}</span>
                <span class="desc"> 货期:{{ite.delivery}}丨销量:{{ite.sellCount}}</span>
                <span class="price">
                  <strong>售价:￥{{ite.sellPrice}}</strong>
                </span>
                <i class="I-img" @click="TiaoZhuan(ite)"></i>
              </div>
            </div>
          </div>
        </scroll-view>
      </div>
    </div>
    <div class="More">
      <span class="More_text">查看更多</span>
      <i class="img"></i>
    </div>
  </div>
</template>
<script>
import wx from "wx";
import scard from "@/components/group_card";
import API from "@/api/httpJchan";
export default {
  components: { scard },
  data() {
    return {
      selectMGP: []
    };
  },
  computed: {
    widthArr() {
      let arr = [];
      this.selectMGP.forEach((item, index) => {
        arr[index] = Math.round((item.matchGoods.length - 1) / 2);
      });
      return arr;
    }
  },
  methods: {
    Tiao(obj) {
      console.log(obj);
      let objStr = JSON.stringify(obj);
      this.$router.push({
        path: "/pages/home/details/details",
        query: { obj: objStr }
      });
    },
    TiaoZhuan(obj) {
      console.log(obj);
      let objStr = JSON.stringify(obj);
      this.$router.push({
        path: "/pages/home/details/details",
        query: { obj: objStr }
      });
    }
  },
  async mounted() {
    const selectMGP = await API.selectMGP({});
    this.selectMGP = selectMGP.data.list;
    console.log(selectMGP, 123134132);
  }
};
</script>
<style type='text/sass' lang="sass" scoped>
@import '~@/assets/css/mixin'
.xK
  border-bottom: 10px solid #ccc
.nav
  padding-top: 50px
  padding-bottom: 25px
  border-bottom: 1px solid #ccc
  background: #fff
  position: relative
  .title
    position: relative
    top: 0
    left: 0
    height: 120px
    margin-bottom: 50px
    .title_1
      position: absolute
      font-size: 32px
      color: #000000
      left: 37%
    .title_2
      position: absolute
      font-size: 28px
      color: #000000
      top: 75px
      left: 33%
    .xian
      position: absolute
      width: 98px
      height: 4px
      background: #999
      top: 95px
      left: 18%
    .xian_1
      position: absolute
      width: 98px
      height: 4px
      background: #999
      top: 95px
      left: 68%
  .content
    .scroll-x
      display: flex
      width: 100%
      padding: 40px 0
      background-color: #ffffff
      .left-box
        width: 395px
        div.title
          width: 344px
          height: 165px
          margin: 0 25px
          display: flex
          align-items: center
          justify-content: center
          i.icon
            display: inline-block
            width: 34px
            height: 31px
            background: url("~@/assets/img/shopMgr/group_1.png") no-repeat center
            background-size: 100% 100%
            margin: auto 14px
          span
            color: #6EB1F5
            font-size: 32px
        .main-img
          margin: 0 25px
          width: 344px
          overflow: hidden
          display: flex
          flex-wrap: wrap
          position: relative
          .M-img
            +bg-img('home/gwc.png')
            width: 47px
            height: 42px
            position: absolute
            bottom: 0px
            right: 10px
          .border
            width: 344px
            height: 458px
            border: 2px solid #CCCCCC
            padding: 16px 30px
            i.shop-img
              display: inline-block
              width: 100%
              height: 100%
              background-repeat: no-repeat
              background-position: center
              background-size: 100% 100%
          span.title
            width: 100%
            font-size: 30px
            padding-top: 18px
            +singleFile
          span.desc
            width: 100%
            color: #999999
            font-size: 26px
          span.price
            width: 100%
            font-size: 28px
            color: #333333
            +singleFile
            strong
              font-size: 30px
              color: #FF0000
      .right-box
        background-color: #ffffff
        display: flex
        margin-left: 50px
        flex-wrap: wrap
        .item-img
          display: flex
          width: 270px
          overflow: hidden
          flex-wrap: wrap
          margin: 0 10px 20px
          position: relative
          .I-img
            +bg-img('home/gwc.png')
            width: 47px
            height: 42px
            position: absolute
            bottom: 0px
            right: 10px
          .border
            width: 270px
            height: 416px
            border: 2px solid #CCCCCC
            padding: 16px 0
            i.shop-img
              display: inline-block
              width: 100%
              height: 100%
              background-repeat: no-repeat
              background-position: center
              background-size: 100% 100%
          span.title
            width: 100%
            font-size: 26px
            padding-top: 10px
          span.desc
            width: 100%
            color: #999999
            font-size: 22px
          span.price
            width: 100%
            font-size: 22px
            color: #333333
            strong
              font-size: 24px
              color: #FF0000

  .More
    width: 600px
    height: 70px
    border-radius: 4px
    display: flex
    border: 1px solid #999
    margin: 40px 0 0 65px
    .More_text
      padding-left: 240px
      padding-top: 8px
    .img
      +bg-img('home/xiala.png')
      width: 34px
      height: 18px
      margin-top: 25px
      margin-left: 20px
</style>
