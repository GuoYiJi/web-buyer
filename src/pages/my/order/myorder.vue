<template>
  <div class="home">
    <zan-tab
      :list="navData"
      :selected-id="selectedId"
      @tabchange="handleZanTabChange"
    />

<!--     <div class="nav">
      <div class="list">
        <span v-for="(item,idx) in navData" :key="idx" class="item" :class="[tag === item.id && 'active']" @click="refreshOrder(item.id)">{{item.text}}</span>
        <div class="line" :style="{left: (tag-1)*20 + '%'}"></div>
      </div>
    </div> -->
    <div class="content">
      <div v-for="(item, index) in navData" v-if="(selectedId === item.id)" :key="index">
        <orderItem v-for="(order, orderIndex) in item.list" :item="order" @refreshOrder="refreshOrder" :shopName="shopName" :key="order.orderNo" @confirm="handleConfirm"></orderItem>
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
      <!-- <orderItem v-for="(item,idx) in orderList" :key="idx" :item="item" @refreshOrder="refreshOrder" :shopName="shopName"></orderItem> -->
    </div>
  </div>
</template>
<script>
import wx from 'wx'
import orderItem from '@/components/o_orderItem'
import API from '@/api/httpShui'
export default {
  components: {
    orderItem
  },
  data () {
    return {
      tag: null,
      orderList: [],
      shopName: '',
      selectedId: 'all',
      loading: false,
      navData: [
        {
          id: 'all',
          list: [],
          pageNumber: 1,
          title: '全部'
        },
        {
          id: 'pay',
          list: [],
          pageNumber: 1,
          state: 1,
          title: '待付款'
        },
        {
          id: 'tosend',
          list: [],
          pageNumber: 1,
          state: 5,
          title: '待发货'
        },
        {
          id: 'sign',
          list: [],
          pageNumber: 1,
          state: 6,
          title: '待收货'
        },
        {
          id: 'done',
          list: [],
          pageNumber: 1,
          state: 7,
          title: '已完成'
        }
      ]
    }
  },
  methods: {
    refreshOrder (tag) {
      if (tag) {
        this.tag = tag
      }
      this.getOrder(this.navData[this.tag - 1].state)
    },
    // toRoute(path) {
    //   this.$router.push('/pages/home/' + path)
    // }
    myTag () {
      let type = this.$route.query.tag
      this.tag = type
    },
    // 获取订单
    async getOrder (state) {
      let param = {
        isPing: 0,
        pageSize: 10
      }
      if (state) {
        param.state = state
      }
      const Myorder = await API.myOrder(param)
      console.log(Myorder)
      this.orderList = Myorder.data.list
      // 规格显示
      for (let i = 0; i < this.orderList.length; i++) {
        for (let j = 0; j < this.orderList[i].goodsList.length; j++) {
          let sizeTextArray = []
          for (let g = 0; g < this.orderList[i].goodsList[j].skuList.length; g++) {
            let sku = this.orderList[i].goodsList[j].skuList[g]
            let skuObj = {}
            let attrVal = sku.skuCode.split(',')
            skuObj.colorVal = attrVal[0]
            skuObj.text = attrVal[0] + ':' + attrVal[1] + '/' + sku.num + '件'
            let ishasColor = false
            for (let a = 0; a < sizeTextArray.length; a++) {
              if (sizeTextArray[a].colorVal === attrVal[0]) {
                sizeTextArray[a].text += ';' + attrVal[1] + '/' + sku.num + '件'
                ishasColor = true
                break
              }
            }
            if (!ishasColor) {
              sizeTextArray.push(skuObj)
            }
          }
          this.orderList[i].goodsList[j].sizeTextArray = sizeTextArray
        }
      }
    },

    // 取消、删除
    handleConfirm(payload) {
      const currentIndex = this.navData.findIndex(item => item.id === this.selectedId);
      const current = this.navData[currentIndex];

      let list = [];
      const itemIndex = current.list.findIndex(item => item.id === payload.id);

      if (payload.delete) {
        list = current.list.filter(item => item.id !== payload.id);
      }
      if (payload.cancel) {

        // 全部 tab 里更新，其他 tab 移除
        if (currentIndex === 0) {
          list = current.list.map((item, index) => {
            if (index === itemIndex) {
              item.state = 2;
            }
            return item;
          })
          
        } else {
          list = current.list.filter(item => item.id !== payload.id);
        }
      }
      this.navData.splice(currentIndex, 1, {
        ...current,
        list
      })
    },
    fetch() {
      return new Promise(async (resolve, reject) => {
        const currentIndex = this.navData.findIndex(item => item.id === this.selectedId);
        if (currentIndex === -1) {
          reject();
          return;
        };
        const current = this.navData[currentIndex];
        const { state, pageNumber } = current;
        let params = {
          isPing: 0,
          pageSize: 10,
          state,
          pageNumber
        }
        if (this.loading || current.lastPage) return;
        this.loading = true;
        const { data: { list, lastPage } } = await API.myOrder(params);
        this.loading = false;
        this.orderList = list;
        // 规格显示
        list.forEach((item, index) => {
          item.goodsList.forEach((subItem, subIndex) => {
            let sizeTextArray = [];
            subItem.skuList.forEach((skuItem, skuIndex) => {
              let sku = skuItem;
              let skuObj = {};
              let attrVal = sku.skuCode.split(',');
              skuObj.colorVal = attrVal[0]
              skuObj.text = attrVal[0] + ':' + attrVal[1] + '/' + sku.num + '件'
              let ishasColor = false;
              for (let a = 0; a < sizeTextArray.length; a++) {
                if (sizeTextArray[a].colorVal === attrVal[0]) {
                  sizeTextArray[a].text += ';' + attrVal[1] + '/' + sku.num + '件'
                  ishasColor = true
                  break
                }
              }
              if (!ishasColor) {
                sizeTextArray.push(skuObj)
              }
            })
            list[index].goodsList[subIndex].sizeTextArray = sizeTextArray
          })
        })
        for (let i = 0; i < list.length; i++) {
          for (let j = 0; j < this.orderList[i].goodsList.length; j++) {
            let sizeTextArray = []
            for (let g = 0; g < this.orderList[i].goodsList[j].skuList.length; g++) {
              let sku = this.orderList[i].goodsList[j].skuList[g]
              let skuObj = {}
              let attrVal = sku.skuCode.split(',')
              skuObj.colorVal = attrVal[0]
              skuObj.text = attrVal[0] + ':' + attrVal[1] + '/' + sku.num + '件'
              let ishasColor = false
              for (let a = 0; a < sizeTextArray.length; a++) {
                if (sizeTextArray[a].colorVal === attrVal[0]) {
                  sizeTextArray[a].text += ';' + attrVal[1] + '/' + sku.num + '件'
                  ishasColor = true
                  break
                }
              }
              if (!ishasColor) {
                sizeTextArray.push(skuObj)
              }
            }
            this.orderList[i].goodsList[j].sizeTextArray = sizeTextArray
          }
        }
        // const newVal = this.navData.slice();


        // newVal[currentIndex] = {
        // };
        // this.navData.splice(currentIndex, 1, {
        //   ...current,
        //   lastPage,
        //   list: current.list.concat(list),
        //   pageNumber: current.pageNumber + 1
        // })
        
        this.navData.splice(currentIndex, 1, {
          ...current,
          lastPage,
          list: current.list.concat(list),
          pageNumber: current.pageNumber + 1
        })
        resolve();
      })
    },
    handleRefresh(selectedId, cb) {
      const index = this.navData.findIndex(item => item.id === selectedId);
      // const newVal = this.navData.slice();
      // newVal[index] = {
      //   ...newVal[index],
      //   list: [],
      //   lastPage: false,
      //   pageNumber: 1
      // };
      this.navData.splice(index, 1, {
        ...this.navData[index],
        list: [],
        lastPage: false,
        pageNumber: 1
      })
      this.fetch()
        .finally(() => {
          cb();
        });
    },
    handleZanTabChange(e) {

      let { detail: selectedId } = e.mp;
      this.selectedId = selectedId;
      this.handleRefresh(selectedId);
    }
  },
  onPullDownRefresh() {
    this.handleRefresh(this.selectedId, () => {
      wx.stopPullDownRefresh();
    });
  },
  onReachBottom() {
    this.fetch();
  },
  onShow() {
    const isOrderDelete = wx.getStorageSync('isOrderDelete');
    if (isOrderDelete) {
      wx.removeStorageSync('isOrderDelete');
      wx.startPullDownRefresh()
    }
  },
  mounted() {
    let selectedId = this.$route.query.selectedId
    if (selectedId) {
      this.selectedId = selectedId;
    }
    this.fetch()
    let that = this
    wx.getStorage({
      key: 'shopName',
      success: function (res) {
        that.shopName = res.data
      }
    })
  },
  onUnload() {
    Object.assign(this, this.$options.data())
  }
}
</script>
<style type="text/sass" lang='sass' scoped>
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
