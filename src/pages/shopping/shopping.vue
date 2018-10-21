<template>
  <div class="nav">
    <div class="kong" v-if="!cardList.length">
      <img class="k_img" src="../../assets/img/shopping/kgwc.png">
      <p class="k_text">你的购物车还没有商品~</p>
      <span class="k_btn" @click="toHome()">去首页逛逛吧</span>
    </div>
    <div class="content" v-else>
      <div class="head">
        <div class="head__hd">
          <i class="xz" :class="{active : checkAll}" @click="clickCheckAll()"></i>
          <span class="h1_text" @click="clickCheckAll()">全选</span>
        </div>
        <div class="head__bd">
          <i class="sc" @click="deleteBtn()" v-if="showBtn"></i>
          <span  @click="delBtn()" v-else>完成</span>
        </div>
        
      </div>
      <div class="kuang">
        <div class="k_head">
          <!--<i class="kh_img" v-if="(xz == 0)"></i>-->
          <!--<i class="kh_wimg" v-if="(xz == 1)"></i>-->
          <div class="kh_text">{{shopName}}</div>
          <!--<i class="kh_img1"></i>-->
        </div>
        <div class="k_content" v-for="(item,index) in cardList" :key="index">
          <div class="item_1" @click="clickCheck(item.id,index)">
            <i class="kc_xz" :class="{active : item.check}"></i>
          </div>
          <div class="item_2">
            <img v-if="item.image" class="kc_img" :src="item.image" mode="aspectFill">
            <img v-else class="kc_img" src="http://www.qckj.link/upload/goods/20180520/1526794348353_160563.jpg">
          </div>
          <div class="item_3">
            <p class="i_title" v-text="item.name"></p>
            <p class="uniform" v-for="(ite,i) in item.skuCode" :key="i">{{ite}}</p>
            <p class="money">¥{{item.disPrice || item.sellPrice}}</p>
            <span class="quantity">x{{item.totalNum}}</span>
            <span class="btn" @click="editOrder(index)">编辑</span>
          </div>
        </div>
      </div>
      <div class="settlement-fixed">
        <div class="settlement">
          <span class="s_btn" v-if="showBtn" @click="Buy()">结算({{selectArr.length}})</span>
          <span class="s_del" v-if="!showBtn" @click="deleteBtn()">删除({{selectArr.length}})</span>
        </div>
      </div>
      <i-modal :visible="visible2" @ok="delCard()" @cancel="visible2 = false">
        <div class="m_tips">确定删除商品</div>
      </i-modal>
    </div>

    <sku :goods="sku.goods" :sku="sku.sku" :visible="visible" @value="handleToggle" @confirm="handleUpdate"></sku>
    <!-- <span class="dian">3</span> -->
    <!--<div class="footer">-->
      <!--<footers :tag="3" />-->
    <!--</div>-->
  </div>
</template>
<script>
import wx from 'wx';
import API from '@/api/httpShui';
import config from '@/config.js';
import sku from '@/components/sku';
import EventBus from '@/assets/js/EventBus';
export default {
  components: {
    sku
  },
  data () {
    return {
      shopName: '',
      visible: false,
      sessionId: '',
      kong: true,
      showBtn: true,
      msg: '',
      count: 0,
      popup: false,
      value1: 1,
      value2: 1,
      xz: 0,
      del: 1,
      visible2: false,
      checkAll: false,
      check: false,
      cardList: [],
      selectArr: [],
      skuAttr: [],
      colorIndex: 0,
      orderIndex: 0,
      sku: {
        goods: {},
        sku: {}
      }
    }
  },
  methods: {
    handleToggle(visible) {
      this.visible = visible;
    },
    toOpen (name) {
      this[name] = true
    },
    toClose (name) {
      this[name] = false
    },
    // 去首页
    toHome () {
      wx.switchTab({
        url: '/pages/home/home'
      })
    },
    // 编辑(保存当前编辑商品的下标)
    editOrder(index) {
      this.orderIndex = index
      // this.popup = true;
      const current = this.cardList[index];
      this.sku = {
        goods: {
          image: current.image,
          name: current.name,
          sellPrice: current.sellPrice
        },
        sku: current.skuAttr,
        skuList: current.skuList
      }
      this.handleToggle(true);
    },
    async handleUpdate(newSkuVal, oldSkuVal) {

      let skuList = this.sku.skuList;
      let goodsCard = [];
      newSkuVal.forEach((newSku, index) => {
        let oldSku = oldSkuVal[index];
        newSku.sizeArray.forEach((skuItem, skuIndex) => {

          let obj = {
            num: skuItem.sizeNum - oldSku.sizeArray[skuIndex].sizeNum
          };
          let colorId = newSku.color;
          let sizeId = skuItem.sizeId;
          let attrIds = colorId + ',' + sizeId;
          skuList.forEach(item => {
            if (item.attrIds === attrIds) {
              obj.skuId = item.skuId;
            }
          })
          goodsCard.push(obj);
        })
      })
      // skuAttr.forEach((skuItem, skuIndex) => {
      //   let sizeArray = skuItem.sizeArray;
      //   sizeArray.forEach((sizeItem, sizeIndex) => {
      //     let newNum = sizeArray.sizeNum;
      //     let sizeNum = oldSku[skuIndex].sizeArray[sizeIndex].sizeNum;
      //     let editNum = newNum - sizeNum;
      //     let obj = {};
      //     let colorId = skuItem.color;
      //     let sizeId = sizeItem.sizeId;
      //     let attrIds = colorId + ',' + sizeId;
      //     skuList.forEach(item => {
      //       if (item.attrIds === attrIds) {
      //         obj.skuId = item.skuId;
      //       }
      //     })
      //     goodsCard.push(obj);
      //     // obj.num = editNum
      //     // goodsCard.push(obj);
      //     // for (let g = 0; g < skuList.length; g++) {
      //     //   if (skuList[g].attrIds === attrIds) {
      //     //     obj.skuId = skuList[g].skuId
      //     //   }
      //     // }
      //     // obj.num = editNum
      //     // goodsCard.push(obj);
      //   })
      // })
      // for (let i = 0; i < skuAttr.length; i++) {
      //   let sizeArray = skuAttr[i].sizeArray
      //   for (let k = 0; k < sizeArray.length; k++) {
      //     console.log(sizeArray[k])
      //     // let editNum = sizeArray[k].editNum
      //     let newNum = sizeArray[k].newNum
      //     let sizeNum = sizeArray[k].sizeNum
      //     let editNum = newNum - sizeNum
      //     let obj = {}
      //     let colorId = skuAttr[i].color
      //     let sizeId = sizeArray[k].sizeId
      //     let attrIds = colorId + ',' + sizeId
      //     for (let g = 0; g < skuList.length; g++) {
      //       if (skuList[g].attrIds === attrIds) {
      //         obj.skuId = skuList[g].skuId
      //       }
      //     }
      //     obj.num = editNum
      //     goodsCard.push(obj)
      //   }
      // }
      wx.showLoading({
        title: '更新中'
      })
      const { code, data, desc } = await API.addGoodsCard({
        goodsCard
      })
      wx.hideLoading();
      if (code === 1) {
        wx.showToast({
          title: '修改成功',
          icon: 'none',
          duration: 3000
        })
        setTimeout(() => {
          this.getCard();
        }, 3000);
      } else {
        wx.showToast({
          title: desc,
          icon: 'none'
        })
      }
    },
    // 删除按钮切换
    delBtn () {
      // this.count = this.selectArr.length
      // if (this.showBtn) {
      //   this.showBtn = false
      // } else {
      //   this.showBtn = true
      // }
    },
    // 单选
    clickCheck (id, index) {
      let that = this
      if (that.cardList[index].check) {
        that.count--
        that.cardList[index].check = false
        for (let i = 0; i < that.selectArr.length; i++) {
          if (that.selectArr[i].id === id) {
            that.selectArr.splice(i, 1)
          }
        }
      } else {
        that.count++
        that.cardList[index].check = true
        that.selectArr.push({id: id})
      }
    },
    // 全选
    clickCheckAll () {
      let that = this
      that.selectArr = []
      if (that.checkAll) {
        that.checkAll = false
        that.cardList.forEach(function (item) {
          item.check = false
        })
        that.count = 0
      } else {
        that.checkAll = true
        that.cardList.forEach(function (item) {
          item.check = true
          that.selectArr.push({id: item.id})
        })
        that.count = that.selectArr.length
      }
    },
    deleteBtn () {
      let that = this
      if (that.selectArr.length > 0) {
        wx.showModal({
          title: '删除商品',
          content: '确定要删除该商品么？',
          success: res => {
            if (res.confirm) {
              this.delCard();
            }
          }
        })
      } else {
        this.showToast('请选择要删除的商品')
      }
    },
    // 删除购物车
    async delCard (name) {
      let that = this
      let idStr = []
      that.selectArr.forEach(function (item) {
        idStr.push(item.id)
      })
      wx.showLoading();
      const data = await API.deleteCard({ids: idStr.join(',')})
      wx.hideLoading();
      if (data.code === 1) {
        this.showToast('删除成功')
        for (let i = 0; i < idStr.length; i++) {
          for (let k = 0; k < that.selectArr.length; k++) {
            if (idStr[i] === that.selectArr[k].id) {
              that.selectArr.splice(k, 1)
            }
          }
        }
        idStr.forEach(id => {
          const index = this.cardList.findIndex(item => item.id === id);
          this.cardList.splice(index, 1);
        })
        if (!this.cardList.length) {
          this.kong = true;
        }
      } else {
        this.showToast(data.data);
      }
    },
    // 去支付
    Buy () {
      if (this.selectArr.length > 0) {
        let goods = []
        let totalPrice = 0
        let totalNum = 0
        let cardIds = []
        // 获取选中的商品信息,并计算价格数量
        for (let i = 0; i < this.selectArr.length; i++) {
          for (let j = 0; j < this.cardList.length; j++) {
            if (this.selectArr[i].id === this.cardList[j].id) {
              let price = this.cardList[j].disPrice || this.cardList[j].sellPrice
              let num = this.cardList[j].totalNum
              totalPrice += Math.floor((price * num) * 100) / 100
              totalNum += num
              this.cardList[j].skuList.forEach(item => {
                cardIds.push({ id: item.id });
              })
              // for (let k = 0; k < this.cardList[j].skuList.length; k++) {
              //   let id = this.cardList[j].skuList[k].id
              //   cardIds.push({id: this.cardList[j].id})
              // }
              goods.push(this.cardList[j])
            }
          }
        }
        let dataObj = {
          goods: goods,
          skuList: cardIds,
          totalPrice: totalPrice.toFixed(2),
          totalNum: totalNum
        }
        wx.setStorageSync('cart', dataObj);
        this.$router.push({path: '/pages/shopping/order/order'});
      } else {
        this.showToast('请选择商品')
      }
    },
    // 获取购物车列表
    async getCard () {
      let that = this
      wx.showLoading({ title: '努力加载中' });
      const data = await API.getCardList();
      wx.hideLoading();
      if (data.code === 1) {
        // console.log('购物车列表', data)
        let { data: list } = data;
        if (list && list.length) {

          that.kong = false;
          for (let k = 0; k < list.length; k++) {
            list[k].check = false
            let skuList = list[k].skuList
            let skuAttr = []
            // 定义规格数组
            for (let i = 0; i < skuList.length; i++) {
              let sku = skuList[i]
              let obj = {}
              let attrIds = sku.attrIds.split(',')
              let attrVal = sku.skuCode.split(',')
              obj.color = attrIds[0]
              obj.colorVal = attrVal[0]
              let sizeArray = []
              let sizeObj = {}
              sizeObj.sizeId = attrIds[1]
              sizeObj.sizeVal = attrVal[1]
              sizeObj.sizeNum = sku.num
              sizeObj.newNum = sku.num
              sizeObj.editNum = 0
              sizeArray.push(sizeObj)
              obj.sizeArray = sizeArray
              let isHas = false
              for (let j = 0; j < skuAttr.length; j++) {
                if (skuAttr[j].color === obj.color) {
                  skuAttr[j].sizeArray.push(sizeObj)
                  isHas = true
                  break
                }
              }
              if (!isHas) {
                skuAttr.push(obj)
              }
            }
            list[k].skuAttr = skuAttr
            // 处理规格数据
            let skuCode = []
            let totalNum = 0
            for (let a = 0; a < skuAttr.length; a++) {
              let sizeNums = 0;
              for (let b = 0; b < skuAttr[a].sizeArray.length; b++) {
                let obj = {}
                if (skuAttr[a].sizeArray[b].sizeNum === 0) {
                  continue
                }
                let colorVal = skuAttr[a].colorVal
                let sizeVal = skuAttr[a].sizeArray[b].sizeVal
                // let colorId = skuAttr[a].color
                // let sizeId = skuAttr[a].sizeArray[b].sizeId
                let num = skuAttr[a].sizeArray[b].sizeNum
                // let attrIds = colorId + ',' + sizeId
                totalNum += Number(num)
                sizeNums += Number(num)
                // 处理规格文字
                let ishas = false
                let skuVal = ''
                for (let c = 0; c < skuCode.length; c++) {
                  let str = skuCode[c].substring(0, 1)
                  if (str === colorVal) {
                    skuCode[c] += sizeVal + '/' + num + '件;'
                    ishas = true
                    break
                  }
                }
                if (!ishas) {
                  skuVal = colorVal + ': ' + sizeVal + '/' + num + '件;'
                  skuCode.push(skuVal)
                }
              }
              skuAttr[a].sizeNums = sizeNums;
            }
            list[k].skuCode = skuCode
            list[k].totalNum = totalNum;
          }

          this.selectArr.forEach(selected => {
            list = list.map(item => {
              if (item.id === selected.id) {
                item.check = true;
              }
              return item;
            })
          })
          this.cardList = list
        } else {
          this.cardList = [];
          this.selectArr = [];
        }
      }
    },
    // 定时器弹窗
    showToast(title) {
      wx.showToast({
        title,
        icon: 'none',
        duration: 1500
      })
    }
  },
  onShow() {
    this.getCard()
  },
  async mounted () {
    this.shopName = await wx.getStorageSync('shopName');
    EventBus.$on('pay-success', () => {
      this.selectArr = [];
    });
  },

  onUnload() {
    EventBus.$off('pay-success');
  },
  watch: {
    // 全选数组监听
    selectArr: {
      handler () {
        let cardListlen = this.cardList.length
        let selectArrlen = this.selectArr.length
        if (cardListlen > 0 && selectArrlen > 0) {
          if (selectArrlen === cardListlen) {
            this.checkAll = true
          } else {
            this.checkAll = false
          }
        } else {
          this.checkAll = false
        }
      },
      deep: true
    }
  }
}
</script>
<style type="text/sass" lang="sass" scoped>
@import '~@/assets/css/mixin'
.m_tips
  height: 80px
  padding: 20px
.nav
  width: 100%
  height: 100%
  .kong
    position: relative
    width: 100%
    height: 100%
    background: #fff
    .k_img
      position: absolute
      width: 264px
      height: 258px
      top: 30%
      left: 30%
    .k_text
      position: absolute
      top: 54%
      left: 29%
      font-size: 28px
      color: #999
    .k_btn
      position: absolute
      top: 60%
      left: 33.5%
      display: inline-block
      font-size: 28px
      color: #EE7527
      width: 220px
      height: 60px
      border-radius: 8px
      text-align: center
      line-height: 60px
      border: 1px solid #EE7527
  .content
    padding-bottom: 98px
    margin: 0 20px
    .head
      position: relative
      padding: 33px 0
      width: 711px
      display: flex
      align-items: center
      font-size: 28px
      line-height: 44px
      color: #999
      &__hd
        flex: 1
      &__bd
        font-size: 28px
        color: #999
        span
          display: inline-block
          height: 44px
      .xz
        display: inline-block
        width: 44px
        height: 44px
        vertical-align: middle
        +bg-img('shopping/wxz.png')
      .xz.active
        +bg-img('shopping/xz.png')
        width: 44px
        height: 44px
      .h1_text
        margin-left: 9px
        display: inline-block
      .sc
        +bg-img('shopping/sc.png')
        display: block
        width: 38px
        height: 42px
    .kuang
      width: 711px
      border-radius: 10px
      background: #fff
      .k_head
        background: #fff
        color: #999
        .kh_img
          display: inline-block
          width: 44px
          height: 44px
          +bg-img('shopping/xz.png')
          vertical-align: middle
          margin-left: 24px
        .kh_wimg
          display: inline-block
          width: 44px
          height: 44px
          +bg-img('shopping/wxz.png')
          vertical-align: middle
          margin-left: 24px
        .kh_text
          font-size: 28px
          color: #999
          display: inline-block
          vertical-align: middle
          margin-left: 18px
        .kh_img1
          +bg-img('home/shanJiao.png')
          display: inline-block
          width: 17px
          height: 28px
          vertical-align: middle
          margin-left: 13px
      .k_content
        display: flex
        padding: 20px 0
        border-bottom: 1px solid #F5F5F5
        background: #fff
        .item_1
          margin: 70px 20px
          .kc_xz
            width: 44px
            height: 44px
            +bg-img('shopping/wxz.png')
          .kc_xz.active
            width: 44px
            height: 44px
            +bg-img('shopping/xz.png')
        .item_2
          $size: 200px
          width: $size
          height: $size
        .item_3
          padding-left: 37px
          flex: 2
          position: relative
          .i_title
            padding-right: 53px
            font-size: 26px
            color: #333
            +moreLine(2)
          .uniform
            font-size: 24px
            color: #999
          .money
            font-size: 32px
            color: #FF3434
          .quantity
            position: absolute
            font-size: 24px
            color: #333
            top: 30%
            right: 30px
          .btn
            position: absolute
            font-size: 20px
            color: #999
            display: inline-block
            width: 80px
            height: 40px
            border-radius: 20px
            border: 1px solid #999
            bottom: 0px
            right: 30px
            text-align: center
            line-height: 40px
    .settlement
      &-fixed
        position: fixed
        left: 0
        bottom: 0
        padding: 0 20px
        width: 100%
        background-color: #F5F5F5
        box-sizing: border-box
      height: 98px
      background: #fff
      border-radius: 10px
      .s_btn
        background: #EE7527
        display: inline-block
        width: 160px
        height: 64px
        border-radius: 40px
        text-align: center
        line-height: 64px
        color: #fff
        position: absolute
        top: 15px
        right: 30px
      .s_del
        background: #EE7527
        display: inline-block
        width: 160px
        height: 64px
        border-radius: 40px
        text-align: center
        line-height: 64px
        color: #fff
        position: absolute
        top: 15px
        right: 30px
  .dian
    position: fixed
    display: inline-block
    background: red
    color: #fff
    border-radius: 50px
    text-align: center
    line-height: 32px
    width: 32px
    height: 32px
    font-size: 24px
    bottom: 6%
    right: 33%
    z-index: 999
  .popup
    width: 100%
    position: fixed
    height: 957px
    bottom: 0
    left: 0px
    background: #fff
    padding-bottom: 30px
    overflow-y: auto
    z-index: 1000
    .kuang_1
      height: 170px
      position: relative
      .pop_img
        width: 190px
        height: 190px
        padding: 10px
        background: #fff
        border-radius: 10px
        position: absolute
        top: -20px
        left: 30px
      .pop_money
        position: absolute
        font-size: 34px
        color: #FF0101
        top: 45px
        left: 260px
      .pop_title
        position: absolute
        font-size: 30px
        color: #000
        top: 90px
        left: 260px
        +moreLine(1)
      .gb
        +bg-img('home/gb.png')
        width: 44px
        height: 44px
        position: absolute
        top: 20px
        right: 24px
    .kuang_2
      margin-top: 35px
      padding-left: 24px
      .k2_title
        font-size: 24px
        color: #000
        margin-bottom: 30px
      .k2_btnk
        .k2_btn
          display: inline-block
          width: 140px
          height: 60px
          background: #EAEAEA
          margin-right: 30px
          border-radius: 10px
          text-align: center
          line-height: 60px
          position: relative
        .k2_btn.active
          border: 1px solid #F67C2F
          .k2_dian
            display: inline-block
            width: 34px
            height: 34px
            background: red
            color: #fff
            border-radius: 50px
            position: absolute
            top: -5px
            right: -5px
            font-size: 20px
            line-height: 34px
            text-align: center
    .kuang_3
      padding-bottom: 20px
      border-bottom: 1px solid #EAEAEA
      .s_item_box
        display: flex
        text-align: center
        line-height: 60px
        margin-top: 30px
      .box1
        height: 60px
        background: #EAEAEA
      .s_item
        flex: 1
        .minus
          display: inline-block
          width: 30px
          height: 40px
          margin-top: 10px
          text-align: center
          background: url('../../assets/img/shopping/minus.png') no-repeat center
          background-size: 30px 40px
        .count
          display: inline-block
          position: relative
          top: -10px
          width: 70px
          height: 38px
          margin: 0 10px
          text-align: center
          line-height: 38px
          border: 1px solid #ccc
        .add
          display: inline-block
          width: 30px
          height: 40px
          margin-top: 10px
          text-align: center
          background: url('../../assets/img/shopping/add.png') no-repeat center
          background-size: 30px 40px
    .kuang_4
      .k4_title
        padding: 29px 0 0 25px
        font-size: 28px
        color: #000
        margin-bottom: 20px
      .k4_text
        font-size: 26px
        color: #666
        padding: 19px 0 0 25px
    .btn
      position: absolute
      bottom: 10px
      left: 10%
      width: 600px
      height: 90px
      text-align: center
      line-height: 90px
      background: #F67C2F
      color: #fff
      border-radius: 8px
      font-size: 32px
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
