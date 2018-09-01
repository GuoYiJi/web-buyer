<template>
  <div class="nav">
    <div class="content">
      <scroll-view scroll-y>
        <div class="item_b">
          <scroll-view class="scroll-view_H" scroll-x style="width: 100%">
            <div class="g_box clearfix" :style="{width: 242*4 + 384 + 'rpx'}">
              <div class="g_left">
                <div class="left_box" v-for="(item, index) in selectMGP" :key="index">
                  <div class="title">
                    <p>
                      <i class="i_new"></i>{{item.title}}系列</p>
                  </div>
                  <div class="card_box shop-card" v-for="(ite, inde) in item.matchGoods" :key="inde" v-if="inde == 0">
                    <div class="img_box">
                      <p class="img_1"><img v-if="inde == 0" :src="ite.image"></p>
                    </div>
                    <div class="desc" v-if="inde == 0">
                      <p class="d_text">{{ite.name}}</p>
                      <p class="d_time">货期:{{ite.delivery}}丨销量:{{ite.sellCount}}</p>
                    </div>
                    <p class="price">
                      <span>售价:￥{{ite.sellPrice}}</span>
                      <i class="sell"></i>
                    </p>
                  </div>
                </div>
              </div>
              <div class="g_right">
                <div class="scard_box" :style="{width: 242*4 + 'rpx'}">
                  <div class="scard_box" v-for="(item, i) in selectMGP" :key="i">
                    <div class="p_card" v-for="(ite, j) in item.matchGoods" :key="j">
                      <div class="g_boxs">
                        <div class="card_boxs shop-cards">
                          <div class="img_box">
                            <p class="img_1"><img :src="ite.images"></p>
                          </div>
                          <div class="descs">
                            <p class="d_texts">{{ite.name}}</p>
                            <p class="d_times">货期:{{ite.delivery}}丨销量:{{ite.sellCount}}</p>
                          </div>
                          <p class="price">
                            <span>售价:￥{{ite.sellPrice}}</span>
                            <span class="sell"></span>
                          </p>
                          <i class="cancel_shop" v-if="cancel"></i>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </scroll-view>
        </div>
      </scroll-view>
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
  methods: {},
  async mounted() {
    const selectMGP = await API.selectMGP({});
    this.selectMGP = selectMGP.data.list;
    // console.log(selectMGP);
  }
};
</script>
<style type='text/sass' lang="sass" scoped>
@import '~@/assets/css/mixin'
.nav
  padding-bottom: 25px
  border-bottom: 1px solid #999
  background: #fff
  position: relative
  .title
    position: relative
    top: 0
    left: 0
    height: 100px
    margin-bottom: 90px
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
      left: 66%
  .content
    .item_b
      +border(10px,top,#F5F5F5)
    .item_b:first-child
      border: none
    .left_box
      position: relative
      top: 0
      left: 20px
      width: 344px
    .scard_box
      display: flex
      flex-wrap: wrap
      .p_card
        height: 444px
        padding-right: 26px
        padding-bottom: 20px
        width: 216px
        .g_boxs
          height: 422px
          width: 216px
        .card_boxs
          padding-bottom: 4px
          .img_box
            +border(2px,all, #ccc)
            padding: 16px 0px
            .img_1
              height: 300px
              width: 212px
        .d_name
          color: #e3e3e3
          font-size: 14px
        .shop-cards
          position: relative
          img
            width: 100%
            border-radius: 4px
        .descs
          margin: 5px 0
          font-size: 20px
        .d_texts
          color: #000
          font-size: 24px
          +singleFile
        // .price
        //   color: #FF0000
        //   font-weight: bold
        //   font-size: 24px
        //   padding-top: 10px
        //   height: 24px
        //   line-height: 24px
        //   +singleFile
        //   text-align: left
          // .sell
          //   color: #333
          //   font-size: 22px
          //   font-weight: 500
        .d_times
          font-size: 20px
          color: #999
          +singleFile
          text-align: left
    .g_box
      padding-top: 60px
      background: #fff
      .g_left
        float: left
        width: 384px
        height: 900px
        position: relative
        .title
          color: #6EB1F5
          height: 205px
          line-height: 205px
          text-align: center
          .i_new
            +icon(34px)
            +bg-img('home/d1.png')
            margin-right: 14px
        .title_1
          color: #CF6E98
          height: 205px
          line-height: 205px
          text-align: center
          .i_new_1
            +icon(34px)
            +bg-img('home/d2.png')
            margin-right: 14px
        .title_2
          height: 205px
          line-height: 205px
          text-align: center
          color: #F5B76E
          .i_new_2
            +icon(34px)
            +bg-img('home/d3.png')
            margin-right: 14px
        .title_3
          height: 205px
          line-height: 205px
          text-align: center
          color: #40C452
          .i_new_3
            +icon(34px)
            +bg-img('home/d4.png')
            margin-right: 14px
        .title_4
          height: 205px
          line-height: 205px
          text-align: center
          color: #6E6EF5
          .i_new_4
            +icon(34px)
            +bg-img('home/d5.png')
            margin-right: 14px
        .card_box
          .img_box
            +border(2px,all, #ccc)
            padding: 16px 30px
            .img_1
              height: 425px
              width: 283px

      .g_right
        float: left
    .d_name
      color: #e3e3e3
      font-size: 14px
    .shop-card
      position: relative
      img
        width: 100%
        border-radius: 4px
      .desc
        overflow: hidden
        margin: 5px 0
        font-size: 25px
        +desc
        .d_text
          +singleFile()
          color: #000
          font-size: 28px

    .price
      color: #FF0000
      font-weight: bold
      font-size: 28px
      padding-top: 10px
      height: 24px
      line-height: 24px
      position: relative
      display: flex
      .sell
        +bg-img('home/gwc.png')
        width: 47px
        height: 42px
        position: absolute
        right: 20px
        top: 0px
    .d_time
      font-size: 24px
      color: #999
      +singleFile

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
