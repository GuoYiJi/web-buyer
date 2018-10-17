<template>
<!-- 我的拼团  首页 -->
<div class="home">

  <zan-tab
    :list="navData"
    :selected-id="selectedId"
    @tabchange="handleZanTabChange"
  />
  <!-- <div class="nav">
    <div class="list">
      <span v-for="(item,idx) in navData" :key="idx" class="item" :class="{ 'active': tag === idx }" @click="handleNav(idx)">{{item.text}}</span>
      <div class="line" :style="{left: (tag-1)*16.6 + '%'}"></div>
    </div>
  </div> -->
  <div class="content">
    <div v-for="(item, index) in navData" v-if="(selectedId === item.id)" :key="index">
      <fasiAll :ordersValueList="item.list" :skuCodeList="item.skuCodeList"/>
      <div v-show="loading">
        <zan-loading />
      </div>
      <div v-if="!item.list.length && item.lastPage">
        <zan-loadmore type="text" text="暂无数据" />
      </div>
      <div v-if="item.list.length && item.lastPage">
        <zan-loadmore type="text" />
      </div>
      
    </div>
   <!--  <div v-if="tag == 1">
      <fasiAll :ordersValueList="ordersValueList" :skuCodeList="skuCodeList"/>
    </div>
    <div v-else-if="tag == 2">
      <fasiAll :ordersValueList="ordersValueList" />
    </div>
    <div v-else-if="tag == 3">
      <fasiAll :ordersValueList="ordersValueList" />
    </div>
    <div v-else-if="tag == 4">
      <fasiAll :ordersValueList="ordersValueList" :skuCodeList="skuCodeList"/>
    </div>
    <div v-else-if="tag == 5">
      <fasiAll :ordersValueList="ordersValueList" />
    </div>
    <div v-else-if="tag == 6">
      <fasiAll :ordersValueList="ordersValueList" />
    </div> -->
  </div>
</div>
</template>
<script>
import wx from 'wx';
import fasiAll from '@/components/p_fasiAll';
import api from '@/api/httpJchan';
import cloneDeep from '@/assets/js/cloneDeep';
export default {
  components: {
    fasiAll
  },
  data () {
    return {
      tag: 0,
      skuCodeList: [],
      loading: false,
      navData: [
        {
          id: 'all',
          pageNumber: 1,
          state: null,
          title: '全部',
          list: []
        },
        {
          id: 'topay',
          pageNumber: 1,
          state: 1,
          title: '待付款',
          list: []
        },
        {
          id: 'ping',
          pageNumber: 1,
          state: 9,
          title: '拼团中',
          list: []
        },
        {
          id: 'tosend',
          pageNumber: 1,
          state: 5,
          title: '待发货',
          list: []
        },
        {
          id: 'sign',
          pageNumber: 1,
          state: 6,
          title: '待收货',
          list: []
        },
        {
          id: 'done',
          pageNumber: 1,
          state: 7,
          title: '已完成',
          list: []
        }
      ],
      selectedId: '',
      ordersValueList: []
    }
  },
  methods: {
    handleZanTabChange(e) {
      let { detail: selectedId } = e.mp;
      if (selectedId === this.selectedId) return;
      this._initFetch(selectedId);
      this.selectedId = selectedId;
      this.fetch();
    },
    // 获取相应拼单订单
    async fetch() {
      return new Promise(async (resolve, reject) => {
        
        const currentIndex = this.navData.findIndex(item => item.id === this.selectedId);
        const current = this.navData[currentIndex];
        const { state } = current;
        if (this.loading || current.lastPage) return;
        this.loading = true;
        const { code, data: { list, lastPage } } = await api.myorder({
          pageNumber: current.pageNumber,
          pageSize: 20,
          state,
          isPing: 1
        })
        this.loading = false;
        if (code === 1) {

          let skuCodeList = [];
          list.forEach((Pitem, Pindex) => {
            skuCodeList[Pindex] = []
            Pitem.goodsList[0].skuList.forEach((Citem, Cindex) => {
              let color = Citem.skuCode.split(',')[0]
              let size = Citem.skuCode.split(',')[1]
              skuCodeList[Pindex][Cindex] = [color, size, Citem.num, Citem.num - Citem.remainNum, Citem.remainNum]
            })
          })
          console.log(list)
          // this.navData = newVal;
          this.navData.splice(currentIndex, 1, {
            ...current,
            lastPage,
            skuCodeList,
            list: current.list.concat(list),
            pageNumber: current.pageNumber + 1
          })
          resolve();
        } else {
          reject();
        }
      })
    },
    _initFetch(selectedId) {
      const index = this.navData.findIndex(item => item.id === selectedId);
      this.navData.splice(index, 1, {
        ...this.navData[index],
        list: [],
        skuCodeList: [],
        lastPage: false,
        pageNumber: 1
      })
    }
  },
  onPullDownRefresh() {
    this._initFetch(this.selectedId);
    this.fetch()
      .finally(() => {
        wx.stopPullDownRefresh();
      })
  },
  onReachBottom() {
    this.fetch();
  },

  mounted () {
    this.selectedId = this.navData[this.tag].id;
    this.fetch()
  },
  onUnload() {
    Object.assign(this, this.$options.data())
  }
}
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
      flex: 0 0 16.6%
      line-height: 70px
      box-sizing: border-box
.line
  display: block
  height: 1px
  width: 10%
  border-radius: 8px
  background-color: #F67C2F
  position: absolute
  bottom: 23px
  margin: 0 3.3%
  transition: left .3s ease-in

</style>
