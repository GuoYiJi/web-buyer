<template>
  <div class="home">
    <div class="sort-select">
      <div class="top-nav">
        <ul class="pro_filter_items">
          <!-- <li :class="[tag === 1 && 'nav-active']" @click="handleTag(1)">综合</li> -->
          <li class="item" :class="[asceSale ? 'item--top' : 'item--bottom', { active: tag === 2 }]" @click="handleTag(2)">
            <span>销量</span>
            <i class="item__arrow">
              <i class="item__arrow-wrapper"><span class="before"></span><span class="after"></span></i>
            </i>
          </li>
          <li class="item" :class="[ascePrice ? 'item--top' : 'item--bottom', { active: tag === 4 }]" @click="handleTag(4)">
            <span>价格</span>
            <i class="item__arrow">
              <i class="item__arrow-wrapper"><span class="before"></span><span class="after"></span></i>
            </i>
          </li>
          <li class="item btn_sf" :class="{ 'active': hasFilter }" @click="handleFilterClick">
            <span>筛选</span>
            <div class="after"></div>
          </li>
          <li class="item menu" @click="handleShowTypeToggle">
            <i></i>
          </li>
          <!-- <li class="item" :class="[tag === 2 && 'nav-active']" @click="handleTag(2)">销量
            <div class="sort-box">
              <i class="sort-top" :class="asceSale && 'sort-active'"></i>
              <i :class="!asceSale && 'sort-active'" class="sort-bottom"></i>
            </div>
            <div class="after"></div>
          </li>
          <li class="item" :class="[tag === 4 && 'nav-active']" @click="handleTag(4)">价格
            <div class="sort-box">
              <i class="sort-top" :class="ascePrice && 'sort-active'"></i>
              <i :class="!ascePrice  && 'sort-active'" class="sort-bottom"></i>
            </div>
          </li>
          <li class="item" :class="{ 'nav-active': hasFilter }" @click="handleFilterClick">筛选
            <div class="sort-box">
              <i class="option-icon"></i>
            </div>
          </li> -->
        </ul>
      </div>
    </div>
    <filter-goods-modal hasLabel :show="showRight1" @toggle="toggleRight1" @confirm="handleConfirm" @rest="handleRest"></filter-goods-modal>
  </div>
</template>
<script>
import wx from "wx";
import scard from "@/components/group_card";
import modList from '@/components/mod_list/index';
import filterGoodsModal from '@/components/filter-goods-modal/index';
import API from '@/api/httpShui';
export default {
  components: {
    'mod-list': modList,
    'filter-goods-modal': filterGoodsModal
  },
  data () {
    return {
      asceSale: true,
      ascePrice: true,
      tag: 1,
      shopNum: 0,
      showRight1: false,
      allCheck: false,
      more1: false,
      labelId: '',
      deliveryId: '',
      hasFilter: false,
      showtype: 0
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
        this.toggleRight1(true)
      }
      this.type = type
      this.$emit('sort', type)
    },
    toggleRight1(visible = false) {
      this.showRight1 = visible;
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
    },
    handleConfirm(e) {
      const { labelId, deliveryId, min, max } = e;
      this.toggleRight1();
      this.$emit('filter', {
        labelId,
        deliveryId,
        min,
        max
      });
      this.hasFilter = true;
    },
    handleRest() {
      this.$emit('rest');
      this.$emit('filter', { labelId: '', deliveryId: '', min: '', max: '' });
      this.hasFilter = false;
    },
    handleModChange(rest, type) {
      const index = rest.length ? rest[0] : 0;
      switch (type) {
        case 0:
          this.labelId = this.tabsList1[index].id;
          break;
        case 1:
          this.deliveryId = this.tabsList2[index].id;
          break;
        case 2:
          break;
      }
    },

    handleFilterClick() {
      this.toggleRight1(true);
    },
    handleShowTypeToggle() {
      const type = this.showtype === 0 ? 1 : 0;
      this.showtype = type;
      this.$emit('showtype', type);
    }
  },
  async mounted() {
    
  }
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
  border-bottom: 1px solid #eee
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
    align-items: center
    font-size: 26px
    height: 77px
    li
      flex: 1
      .sort-box
        display: flex
        flex-direction: column
        position: relative
        padding-left: 10px
        .sort-bottom 
          +goback(1px)
          &:after
            transform: rotate(-45deg)
            border-color: #999
        .sort-top    
          +goback(1px)
          &:after
            transform: rotate(-225deg)
            border-color: #999

// 筛选
.sf_layer_con
  width: 600px
  height: 100vh
</style>
