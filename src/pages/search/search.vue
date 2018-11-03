<template>
  <div class="wrapper" :class="{ 'no-keyword': !searchData }">
    <div class="search-bar">
      <div class="search-bar__form">
        <div class="search-bar__box">
          <i class="icon-search"></i>
          <input class="search-bar__input" v-model="keyword" type="text" placeholder="请搜索商品" auto-focus confirm-type="search" @confirm="search()" />
          <i class="icon-clear"></i>
        </div>
      </div>
      <div class="search-bar__cancel-btn" @click="search()">搜索</div>
    </div>
<!--     <div class="search-box">
      <div class="input">
        <p class="search-icon">
          <i class="search"></i>
        </p>
        <input class="input-box" v-model="keyword" placeholder="请搜索商品" :focus="isFocus" />
      </div>
      <span class="searchBtn" @click="search()">搜索</span>
    </div> -->

    <div class="history-container" v-show="historyList.length && (!keyword.length)">
      <div class="history__hd">
        <div class="history__title">
          <i class="clock-icon"></i>
          <span>历史搜索记录</span>
        </div>
        <!-- <i class="history-clear-icon" @click="handleHistoryClear"></i> -->
      </div>
      <div class="history__list" v-if="historyList.length">
        <span class="history__list-item" v-for="(item, index) in historyList" :key="index" @click="handleHistoryClick(item)">{{ item.message }}</span>
      </div>
    </div>
    <div class="msg" v-if="searchEmptyData">
      <p>换个搜索词试试！</p>
    </div>
    <block v-if="searchData">
      
      <ul class="sortTabs">
        <li class="sortItem" :class="{active : sortTabs==1, fx : sortStyle==0, fs : sortStyle ==1}" @click="sortFn(1,sortTime)">综合</li>
        <li class="sortItem" :class="{active : sortTabs==2, fx : sortStyle==2, fs : sortStyle ==3}" @click="sortFn(2,sortSales)">销量</li>
        <li class="sortItem" :class="{active : sortTabs==3, fx : sortStyle==4, fs : sortStyle ==5}" @click="sortFn(3,sortPrice)">价格</li>
        <li class="sortItem sx" :class="{ 'active': hasFilter }" @click="handleFilterClick">筛选</li>
        <li class="sortItem menu" @click='showType=!showType'></li>
      </ul>
      <div class="goodsList clearfix" v-if="goodsList.length" @click="clickItem(item)">
        <div class="item" v-for="(item,index) in goodsList" :key="index" v-if="showType">
          <div class="img">
            <img v-if="item.image" :src="item.image" alt="" mode="aspectFill">
            <img v-else src="../../assets/img/classify/goods.png" alt="" mode="aspectFill">
          </div>
          <div class="text">
            <p class="title zan-ellipsis" v-text="item.name"></p>
            <p class="intro clearfix">
              <span class="qh">期货:{{item.delivery}}</span>
              <span class="xl">销量:{{item.sellCount==9999 ? '9999+' : item.sellCount }}</span>
            </p>
            <p class="price-btn">
              <span class="price">批货价:￥{{item.sellPrice}}</span>
              <span class="btn">立即采购</span>
            </p>
          </div>
        </div>
        <div class="line-item"  v-for="(item,index) in goodsList" :key="index" v-if="!showType" @click="clickItem(item)">
          <div class="img">
            <img v-if="item.image" :src="item.image" alt="" mode="aspectFill">
            <img v-else src="../../assets/img/classify/goods.png" alt="" mode="aspectFill">
          </div>
          <div class="text">
            <p class="title">{{item.name}}</p>
            <p class="qh">期货:{{item.delivery}}</p>
            <p class="xl">销量:{{item.sellCount==9999 ? '9999+' : item.sellCount }}</p>
            <p class="price-btn clearfix">
              <span class="price">批货价:￥{{item.sellPrice}}</span>
              <span class="btn">立即采购</span>
            </p>
          </div>
        </div>
        <div v-if="loading">
          <zan-loading></zan-loading>
        </div>
      </div>
      <div v-if="nodata">
        <div class="no_goods">
          <div class="no_goods_img"></div>
          <div class="no_goods_tip">没有相关的商品结果哦~~</div>
        </div>
      </div>
    </block>
    <div class="wellMsg" v-show="wellMsgShow">
      {{msg}}
    </div>
    <filter-goods-modal :show="visible" hasLabel @toggle="handleModalToggle" @confirm="handleConfirm" @rest="handleRest" ref="filterRef"></filter-goods-modal>
  </div>
</template>
<script>
  import wx from 'wx';
  import API from '@/api/httpShui';
  import filterGoodsModal from '@/components/filter-goods-modal/index';
  export default {
    data () {
      return {
        hasFilter: false,
        searchStr: '',
        visible: false,
        showType: true,
        keyword: '',
        historyList: [],
        wellMsgShow: '',
        msg: '',
        goodsList: [],
        ob: 0,
        sortTabs: 0,
        sortTime: 0,
        sortSales: 2,
        sortPrice: 4,
        sortStyle: null,
        state: 1,
        pageSize: 10,
        pageNumber: 1,
        totalPage: null,
        nodata: false,
        totalRow: 0,
        filterOptions: {},
        isFocus: false,
        searchEmptyData: false,
        searchData: false
      }
    },
    components: {
      'filter-goods-modal': filterGoodsModal
    },
    watch: {
      keyword(val) {
        if (this.searchEmptyData && !val) {
          this.searchEmptyData = false;
        }
        if (!val && this.searchData) {
          this.goodsList = [];
          this.searchData = false;
        }
      }
    },
    methods: {
      // 排序
      sortFn (type, ob) {
        this.sortTabs = type
        if (ob === 0) {
          this.sortTime = this.sortStyle = 1
        }
        if (ob === 1) {
          this.sortTime = this.sortStyle = 0
        }
        if (ob === 2) {
          this.sortSales = this.sortStyle = 3
        }
        if (ob === 3) {
          this.sortSales = this.sortStyle = 2
        }
        if (ob === 4) {
          this.sortPrice = this.sortStyle = 5
        }
        if (ob === 5) {
          this.sortPrice = this.sortStyle = 4
        }
        this.ob = ob;
        this.pageNumber = 1;
        this.setGoodsList()
      },
      // 去商品详情
      clickItem (obj) {
        this.$router.push({path: '/pages/home/details/details', query: {goodsId: obj.id}});
      },
      handleHistoryClick(item) {
        this.keyword = item.message;
        this.search(true);
      },
      // 搜索
      async search (hasHistory = false) {
        if (this.keyword) {
          this.sortTabs = 1;
          this.searchStr = this.keyword;
          this.pageNumber = 1;
          this.filterOptions = {};
          this.hasFilter = false;
          this.$refs.filterRef._reset();
          this.nodata = false;
          if (!hasHistory) {
            API.saveHistory({
              message: this.keyword
            })
          }
          // this.isFocus = false;
          const list = await this.setGoodsList();
          if (!list.length) {
            this.searchEmptyData = true;
          }
        } else {
          wx.showToast({
            title: '请输入关键字',
            icon: 'none'
          })
        }
      },
      handleFilterClick() {

        if (this.hasFilter || this.goodsList.length) {
          this.visible = true;
        }
      },
      handleHistoryClear() {
        API.deleteHistory()
      },
      handleModalToggle(visible) {
        this.visible = visible;
      },
      handleConfirm(e) {
        const { labelId, deliveryId, min, max } = e;
        this.handleModalToggle(false);
        this.filterOptions = {
          labelId,
          deliveryId,
          min,
          max
        };
        this.hasFilter = true;
        this.pageNumber = 1;
        this.setGoodsList();
      },
      handleRest() {
        this.filterOptions = {
        };
        this.pageNumber = 1;
        this.hasFilter = false;
        this.setGoodsList();
      },
      // 设置商品列表
      // state, ob, pageSize, pageNumber, keyword
      async setGoodsList () {
        this.loading = true;
        wx.showLoading({
          title: '正在搜索'
        })

        const { state, ob, pageNumber, searchStr: keyword } = this;

        // 校正删除 input 内容，然后直接操作排序的情况
        if (this.keyword !== keyword) {
          this.keyword = keyword;
        }
        if (pageNumber === 1) {
          this.goodsList = [];
          this.nodata = false;
        }
        const data = await API.getGoods({
          state,
          ob,
          pageSize: 20,
          pageNumber,
          keyword,
          ...this.filterOptions
        })
        wx.hideLoading();
        this.loading = false;
        const { data: { list, lastPage } } = data;
        if (data.code === 1) {
          if (pageNumber === 1 && !list.length) {
            this.nodata = true;
            return Promise.resolve([]);
          }
          if (list.length) {
            this.searchData = true;
          }
          this.goodsList = this.goodsList.concat(list);
          this.pageNumber++;
        }
        return Promise.resolve(list);
      },
      // 定时器弹窗
      mySetTimeout (msg) {
        let that = this
        that.wellMsgShow = true
        that.msg = msg
        setTimeout(function () {
          that.wellMsgShow = false
          that.msg = ''
        }, 1000)
      }
    },
    async mounted () {

      API.selectHistoryPage({
        pageNumber: 1,
        pageSize: 10
      })
        .then(res => {
          const { data: { list } } = res;
          this.historyList = list;
        })
      const { key } = this.$route.query;
      if (key) {
        this.sortTabs = 1;
        this.keyword = key;
        this.searchStr = key;
        this.search();
      } else {
      }


    },
    onUnload() {
      Object.assign(this, this.$options.data());
    }
  }
</script>
<style type="text/sass" lang="sass" scoped>
  @import '~@/assets/css/mixin'
  @import './index'
  .no-keyword
    background-color: #fff
  .clearfix:after
    content: ""
    display: block
    height: 0
    clear: both
    visibility: hidden

  .clearfix
    /* 触发 hasLayout */
    zoom: 1

  .search-box
    padding: 30px 0
    background: #fff
    width: 100%
    height: 60px
    .input
      float: left
      display: inline-block
      width: 616px
      height: 60px
      padding: 0 28px
      .search
        +bg-img('home/search.png')
        +icon(38px)
        margin-top: 20px
      .search-icon
        position: absolute
        left: 60px
      .input-box
        background-color: #f5f5f5
        border-radius: 4px
        /*width: 100%*/
        text-align: left
        padding: 8px 85px
        border: none
        color: #999999
    .searchBtn
      float: left
      display: inline-block
      height: 60px
      line-height: 60px
  .sortTabs
    width: 100%
    height: 80px
    line-height: 80px
    background: #ffffff
    display: -webkit-flex
    display: flex
    justify-content: space-around
    .sortItem
      width: 25%
      line-height: 80px
      font-size: 28px
      color: #666666
      text-align: center
      background: url('../../assets/img/classify/fx@2x.png') no-repeat 95% center
      background-size: 16px 10px
    .sortItem.active
      color: #F6752F
    .sortItem.fx
      background: url('../../assets/img/classify/fx@2x.png') no-repeat 95% center
      background-size: 16px 10px
    .sortItem.fs
      background: url('../../assets/img/classify/fs@2x.png') no-repeat 95% center
      background-size: 16px 10px
    .sortItem.sx
      background: url('../../assets/img/classify/sx@2x.png') no-repeat 95% center
      background-size: 20px 21px
    .sortItem.menu
      background: url('../../assets/img/classify/menu.png') no-repeat center
      background-size: 27px 27px

  .goodsList
    padding: 28px 20px 0 20px
    .item
      float: left
      width: 345px
      height: 610px
      background: #ffffff
      margin-right: 20px
      margin-bottom: 20px
      .img
        width: 100%
        height: 410px
        img
          width: 100%
          height: 100%
      .text
        height: 200px
        padding: 0 10px
        .title
          color: #333333
          font-size: 28px
          font-weight: 900
          margin-top: 20px
        .intro
          color: #999999
          font-size: 24px
          margin-top: 20px
          .qh
            float: left
          .xl
            float: right
        .price-btn
          height: 50px
          line-height: 50px
          margin-top: 20px
          .price
            float: left
            color: #EE3D27
            font-size: 24px
          .btn
            float: right
            display: inline-block
            width: 130px
            height: 50px
            line-height: 50px
            background: url('../../assets/img/classify/130_50@2x.png') no-repeat
            background-size: 130px 50px
            color: #ffffff
            font-size: 24px
            text-align: center
    .item:nth-child(even)
      margin-right: 0
    .line-item
      height: 240px
      padding-left: 260px
      background: #fff
      position: relative
      margin-bottom: 15px
      .img
        width: 240px
        height: 240px
        position: absolute
        top: 0
        left: 0
        img
          width: 100%
          height: 100%
      .text
        padding: 10px 10px 0 0
        .title
          height: 68px
          line-height: 34px    
          font-size: 30px
          color: #000
          margin-bottom: 30px
          overflow : hidden
          text-overflow: ellipsis
          display: -webkit-box
          -webkit-line-clamp: 2
          -webkit-box-orient: vertical
        .qh,.xl
          font-size: 26px
          color: #999
          line-height: 35px
        .price-btn
          heigth: 45px
          line-height: 45px
          .price
            font-size: 30px
            color: #FF0000
          .btn
            float: right
            padding: 5px 15px
            text-align: center
            font-size: 26px
            color: #fff
            background: #EE7527
            border-radius: 10px
  .msg
    position: absolute
    top: 524px
    width: 100%
    text-align: center
    color: #999
    font-size: 28px
    text-align: center
  .wellMsg
    position: absolute
    left: 0
    right: 0
    top: 0
    bottom: 0
    margin: auto
    width: 305px
    height: 114px
    line-height: 114px
    border-radius: 10px
    background: rgba(0,0,0,.8)
    color: #ffffff
    font-size: 30px
    text-align: center
    z-index: 9999
</style>
