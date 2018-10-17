<template>
  <div class="wrapper">
    <zan-popup type="right" :show="filterVisible" @close="handleToggleModal(false)">
      <div class="sf_layer_con">
        <div class="title" @click="handleToggleModal(false)">
          <i class="zuo"></i>
          <span class="screen">筛选</span>
        </div>
        <div class="item-box">
          <mod-list :list="tabsList1" title="品类" @change="handleModChange(arguments, 0)" v-if="hasLabel"></mod-list>
          <mod-list :list="tabsList2" title="货期情况" @change="handleModChange(arguments, 1)" ref="modList2Ref"></mod-list>
          <mod-list ref="modListPriceRef" :list="tabsList3" title="价格区间" type="goods"></mod-list>
        </div>
        <div class="f_btn">
          <p class="reset" @click="handleRest">重置</p>
          <p class="confirm" @click="handleConfirm">确定</p>
        </div>
      </div>
    </zan-popup>

    <div class="search-bar">
      <div class="search-bar__form">
        <div class="search-bar__box">
          <i class="icon-search"></i>
          <input class="search-bar__input" v-model="keyword" type="text" placeholder="请搜索商品" confirm-type="search" @confirm="search()" />
        </div>
      </div>
      <div class="search-bar__cancel-btn" @click="search()">搜索</div>
    </div>
    <ul class="sortTabs">
      <li class="sortItem" :class="{active : sortTabs==1, fx : sortStyle==0, fs : sortStyle ==1}" @click="sortFn(1,sortTime)">综合</li>
      <li class="sortItem" :class="{active : sortTabs==2, fx : sortStyle==2, fs : sortStyle ==3}" @click="sortFn(2,sortSales)">销量</li>
      <li class="sortItem" :class="{active : sortTabs==3, fx : sortStyle==4, fs : sortStyle ==5}" @click="sortFn(3,sortPrice)">价格</li>
      <li class="sortItem sx" :class="{ 'active': hasFilter }" @click="handleFilterClick">筛选</li>
      <li class="sortItem menu" @click="showType = !showType"></li>
    </ul>
    <div class="goodsList clearfix">
      <div class="item" v-for="(item,index) in goodsList" :key="index" v-if="showType" @click="clickItem(item)">
        <div class="img">
          <img v-if="item.image" :src="item.image" alt="" mode="aspectFill">
          <img v-else src="../../assets/img/classify/goods.png" alt="">
        </div>
        <div class="text">
          <p class="title zan-ellipsis--l2" v-text="item.name"></p>
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
          <img v-else src="../../assets/img/classify/goods.png" alt="">
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
    </div>

    <div v-if="!(loading) && !goodsList.length && lastPage">
      <div class="no_goods">
        <div class="no_goods_img"></div>
        <div class="no_goods_tip">没有相关的商品结果哦~~</div>
      </div>
    </div>
    <div v-show="loading">
      <zan-loading />
    </div>
    <div class="wellMsg" v-show="wellMsgShow">
      {{msg}}
    </div>
  </div>
</template>
<script>
  import wx from 'wx';
  import API from '@/api/httpShui';
  import modList from '@/components/mod_list/index';
  export default {
    components: {
      modList
    },
    data () {
      return {
        lastPage: false,
        loading: false,
        showType: true,
        keyword: '',
        wellMsgShow: false,
        msg: '',
        goodsList: [],
        sortTabs: 0,
        sortTime: 0,
        sortSales: 2,
        sortPrice: 4,
        sortStyle: null,
        state: 1,
        pageSize: 10,
        pageNumber: 1,
        totalPage: null,
        filterVisible: false,
        hasFilter: false,
        labelId: null,
        deliveryId: null,
        choice: {},
        tabsList1: [], // 一级分类
        tabsList2: [], // 货期情况
        tabsList3: [{ name: '0-70' }, { name: '3-5天' }, { name: '6-10天' }]
      }
    },
    methods: {
      // 排序
      sortFn (type, ob) {

        // 综合不能排序
        if (type === 1) return;
        if (!this.goodsList.length) return
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
        this.getGoodsAsync();
        // this.setGoodsList(this.$route.query.id, this.state, ob, this.pageSize, this.pageNumber)
      },
      clickItem (obj) {
        console.log(obj)
        this.$router.push({
          path: '/pages/home/details/details',
          query: {
            goodsId: obj.id
          }
        })
      },
      // 搜索
      search () {
        if (this.keyword) {
          this.$router.push({path: '/pages/search/search', query: {key: this.keyword}})
        } else {
          this.mySetTimeout('请输入关键词')
        }
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
      },

      handleFilterClick() {
        if (this.hasFilter || this.goodsList.length) {
          this.handleToggleModal(true);
        }
        
      },

      handleToggleModal(visible) {
        this.filterVisible = visible;
      },
      

      handleConfirm() {
        const { labelId, deliveryId } = this;
        this.hasFilter = true;
        this.handleToggleModal(false);
        // console.log(this.$refs.modListPriceRef);
        this.choice = this.$refs.modListPriceRef.choice;
        this.pageNumber = 1;
        this.getGoodsAsync({ labelId, deliveryId });
      },
      handleRest() {
        this.hasFilter = false;
        this.deliveryId = null;
        this.pageNumber = 1;
        this.choice = { min: null, max: null };
        this.getGoodsAsync();
        this.$refs.modList2Ref.current = -1;
        this.$refs.modList3Ref.currentChoice = -1;
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
      async getGoodsAsync(payload) {
        const { id: labelId } = this.$route.query;
        const { state, ob, pageSize, pageNumber, deliveryId } = this;
        const { min, max } = this.choice;
        const params = {
          labelId,
          state,
          ob,
          pageSize,
          pageNumber,
          min,
          max,
          deliveryId
        }
        if (pageNumber === 1) {
          this.lastPage = false;
          this.goodsList = [];
        }
        this.loading = true;
        const data = await API.getGoods(params);
        this.loading = false;
        if (data.code === 1) {
          const { data: { list, lastPage } } = data;
          // console.log('商品列表', data.data)
          this.goodsList = this.goodsList.concat(list);
          this.lastPage = lastPage;
          this.pageNumber++;
        }
      }
    },
    onReachBottom() {
      if (!this.lastPage) {
        this.getGoodsAsync();
      }
      
    },
    async mounted () {
      this.sortTabs = 1
      if (this.$route.query.id) {
        this.isSearch = false
        this.ob = this.sortTime;
        this.getGoodsAsync();
        // this.setGoodsList(this.$route.query.id, this.state, this.sortTime, this.pageSize, this.pageNumber)
      }
      API.getTabs({types: '4'})
        .then(res => {
          this.tabsList2 = res.data;
        })
    },
    onUnload() {
      Object.assign(this, this.$options.data());
    }
  }
</script>
<style type="text/sass" lang="sass" scoped>
  @import '~@/assets/css/mixin'
  .clearfix:after
    content: ""
    display: block
    height: 0
    clear: both
    visibility: hidden

  .clearfix
    /* 触发 hasLayout */
    zoom: 1
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
        padding: 0 10px
        .title
          color: #333333
          font-size: 28px
          max-height: 28 * 2px
          line-height: 28px;
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
</style>
