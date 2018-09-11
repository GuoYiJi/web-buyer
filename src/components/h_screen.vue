<template>
  <div class="home">
    <div class="sort-select">
      <div class="top-nav">
        <ul>
          <!-- <li :class="[tag === 1 && 'nav-active']" @click="handleTag(1)">综合</li> -->
          <li :class="[tag === 2 && 'nav-active']" @click="handleTag(2)">销量
            <div class="sort-box">
              <i class="sort-top" :class="asceSale && 'sort-active'"></i>
              <i :class="!asceSale && 'sort-active'" class="sort-bottom"></i>
            </div>
          </li>
          <li :class="[tag === 4 && 'nav-active']" @click="handleTag(4)">价格
            <div class="sort-box">
              <i class="sort-top" :class="ascePrice && 'sort-active'"></i>
              <i :class="!ascePrice  && 'sort-active'" class="sort-bottom"></i>
            </div>
          </li>
          <li :class="[tag === 5 && 'nav-active']" @click="handleTag(5)">筛选
            <div class="sort-box">
              <i class="option-icon"></i>
            </div>
          </li>
        </ul>
      </div>
      <i-drawer mode="right" :visible="showRight1" @close="toggleRight1">
        <div class="demo-container">
          <div class="title">
            <i class="zuo"></i>
            <span class="screen">筛选</span>
          </div>
          <div class="item-box">
            <div class="item">
              <p class="i_title">品类</p>
              <ul class="s_item_box">
                <li class="s_item">一级分类</li>
                <li class="s_item">一级分类</li>
                <li class="s_item">一级分类</li>
                <li class="s_item">一级分类</li>
                <li class="s_item">一级分类</li>
                <li class="s_item">一级分类</li>
              </ul>
              <!-- <ul v-if="more1" class="s_item_box">
                <li class="s_item">档口1</li>
                <li class="s_item">档口2</li>
                <li class="s_item">档口3</li>
              </ul> -->
              <p class="more">
                <span @click="toOpen('more1')" v-if="!more1">查看更多
                  <i class="goback"></i>
                </span>
                <span @click="toClose('more1')" v-else>点击收起</span>
              </p>
            </div>
            <div class="item">
              <p class="i_title">货期情况</p>
              <ul class="s_item_box">
                <li class="s_item">现货</li>
                <li class="s_item">3-5天</li>
                <li class="s_item">6-10天</li>
                <li class="s_item">订货</li>
                <li class="s_item">11-15天</li>
                <li class="s_item">一个月内</li>
              </ul>
            </div>
            <div class="item">
              <p class="i_title">价格区间</p>
              <ul class="s_item_box">
                <li class="s_item">0-70</li>
                <li class="s_item">3-5天</li>
                <li class="s_item">6-10天</li>
                <li class="s_item">
                  <input type="text" placeholder="最低价">
                </li>
                --
                <li class="s_item">
                  <input type="text" placeholder="最高价">
                </li>
              </ul>
            </div>
          </div>
          <div class="f_btn">
            <p class="reset">重置</p>
            <p class="confirm">确定</p>
          </div>
        </div>
      </i-drawer>
    </div>
  </div>
</template>
<script>
import wx from "wx";
export default {
  components: {},
  data () {
    return {
      asceSale: true,
      ascePrice: true,
      tag: 1,
      shopNum: 0,
      showRight1: false,
      allCheck: false,
      more1: false
    }
  },
  methods: {
    handleTag (tag) {
      this.tag = tag
      let type
      this.shopNum = 0
      if (tag === 2) {
        // 对销量sort
        this.asceSale = !this.asceSale
        type = this.asceSale ? 2 : 3
      }
      if (tag === 4) {
        this.ascePrice = !this.ascePrice
        type = this.ascePrice ? 4 : 5
      }
      if (tag === 5) {
        this.toggleRight1()
      }
      this.type = type
    },
    toggleRight1 () {
      this.showRight1 = !this.showRight1
    },
    toOpen (name) {
      this[name] = true
    },
    toClose (name) {
      this[name] = false
    },
    selectAll () {
      this.allCheck = !this.allCheck
      this.$refs.scard.selectAll(this.allCheck)
    }
  },
  mounted () {}
}
</script>
<style lang="sass" scoped>
@import '~@/assets/css/mixin'
.f_btn
  position: absolute
  bottom: 0
  left: 0
  right: 0
  height: 98px
  display: flex
  justify-content: flex-end
  text-align: center
  background: #fff
  line-height: 98px
  .confirm
    background: #EE7527
    color: #fff
    flex: 1
  .reset
    background: #fff
    color: #999
    flex: 1
    border-top: 1px solid #E5E5E5
.demo-container
	width: 568px
	height: 100px
	background: #fff
  font-size: 28px
  box-shadow: 1px 0px 13px rgba(8,0,0,0.17)
  position: relative
.title
  // padding: 8px 30px
  background: #fff
  position: relative
  height: 80px
  border-bottom: 1px solid #E5E5E5
  .screen
    position: absolute
    font-size: 30px
    top: 20px
    left: 60px
  .zuo
    position: absolute
    +bg-img('home/zuo.png')
    width: 18px
    height: 33px
    top: 26px
    left: 30px

.more
  color: #999
  text-align: center
  position: relative
  padding: 20px 0 20px 0
  font-size: 24px
  +border(1px,bottom,#ccc)
  border-top: 1px solid #ccc
  .goback
    // +goback(1px)
    // vertical-align: top
    +bg-img('home/xiala.png')
    width: 18px
    height: 11px
    position: absolute
    top: 37px;
    left: 340px;

// 筛选


.item-box
  color: #333
  height: 85%
  overflow: auto
  .i_title
    padding: 30px 20px
  .s_item_box
    padding: 0 20px 20px
    display: flex
    flex-wrap: wrap
    justify-content: space-between
    .s_item
      width: 160px
      height: 70px
      line-height: 70px
      background: #F5F5F5
      text-align: center
      border-radius: 6px
      margin-bottom: 20px
 
.box
  padding: 2% 0 110px 0%
.home
  // position: relative
  height: 100%
  border-bottom: 1px solid #999
.footer
  position: absolute
  bottom: 0
  left: 0
  right: 0
  height: 98px
  line-height: 98px
  display: flex
  justify-content: flex-end
  color: #fff
  background: #fff
  p
    width: 220px
    text-align: center
  .style1
    background: #FFB658
  .style2
    background: #F67C2F
  .all-btn
    background: #fff
    color: #999999
    text-align: left
    width: 230px

    .select
      +select()
      left: 24px
    .active
      +select-active
.scroll-box
  // padding: 10px 0
  height: 900px
  overflow: auto
  p
    margin: 5px 0
.option-icon
  +bg-img('shopMgr/option.png')
  +icon(32px)
.sort-active
  &:after
    border-color: #EE7527!important
.nav-active
  color: #EE7527!important
.sort-select
  height: 100%
.top-nav
  // left: 0
  // right: 0
  // top: 180px
  background: #fff
  // z-index: 9999
  text-align: center
  ul 
    display: flex
    font-size: 26px
    height: 92px
    line-height: 92px
    li
      flex: 1
      .sort-box
        display: inline
        position: relative
        padding-left: 10px
        .sort-bottom 
          +goback(1px)
          position: absolute
          top: -23px
          &:after
            transform: rotate(-45deg)
            border-color: #999
        .sort-top    
          +goback(1px)
          position: absolute
          bottom: -23px
          &:after
            transform: rotate(-225deg)
            border-color: #999   
</style>
