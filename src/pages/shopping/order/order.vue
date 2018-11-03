<template>
  <div class="index-view nav">
    <div class="head">
      <span class="delivery" :class="{active: expressWay==0}" @click="Delivery(0)">快速邮寄</span>
      <span class="delivery" :class="{active: expressWay==1}" @click="Delivery(1)">物流到付</span>
    </div>
    <div class="address"  @click="toOpen('addressBox')">
      <i class="dt"></i>
      <p class="add_text">收货人：{{name}}&nbsp;&nbsp;{{phone}}</p>
      <p class="add_text">收货地址：{{addressDetails}}</p>
      <p v-if="addressList.length == 0" class="add_text">添加收货地址</p>
    </div>
    <div class="cap-order-goods">
      <div class="cap-order-goods-header">
        <span>{{ shopName }}</span>
      </div>
      <div class="cap-order-goods-lsit">
        <div class="cap-order-goods-card" v-for="(item,index) in buy_list" :key="index">
          <div class="van-card">
            <div class="van-card__thumb"><img :src="item.image" mode="aspectFill" /></div>
            <div class="van-card__content">
              <div class="van-card__row">
                <div class="van-card__title">{{item.name}}</div>
              </div>
          
              <div class="van-card__row" v-for="(item,i) in item.skuCode" :key="i">
                <div class="van-card__desc">
                  {{item}}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="van-cell">
        <div class="van-cell__title">
          <span class="goods-buy__info">共<span class="goods-buy__num">{{totalPack}}</span>个款  <span class="goods-buy__num">{{totalNum}}</span>件商品  </span>
        </div>
        <div class="van-cell__value">
          <span class="goods-buy__total">合计:</span>
          <span class="goods-buy__price">￥{{totalPrice}}</span>
        </div>
      </div>

      <div class="cap-order-goods-message van-cell van-hairline">
        <div class="van-cell__title"><span>买家留言：</span></div>
        <div class="van-cell__value">
          <input type="textarea" v-model="remark" placeholder="选填（填写内容已和卖家协商确认）">
        </div>
      </div>
      <div class="van-cell van-cell--clickable van-hairline" @click="couponBox = true">
        <div class="van-cell__title">
          <span>优惠券</span>
        </div>
        <div class="van-cell__value">
          <span v-if="couponPrice">-￥{{couponPrice}}</span>
        </div>
        <i class="van-icon van-icon-arrow van-cell__right-icon"></i>
      </div>
      <div class="van-cell van-hairline" v-if="expressWay == 0">
        <div class="van-cell__title">
          <span>运费</span>
        </div>
        <div class="van-cell__value">
          <span>+￥{{calculate}}</span>
        </div>
      </div>
    </div>
    <div class="foot">
      <p class="f_text">合计:
        <span class="ft1">￥{{totalPrice - couponPrice}}</span>
      </p>
      <span class="f_btn" @click="buy()">马上支付</span>
    </div>
    <zan-popup :show="selectAddress" type="center">
      <div class="address-model">
        <div class="address-model__hd">
          <span class="title">收货地址</span>
          <i class="close-icon" @click="toClose('selectAddress')"></i>
        </div>
        <div class="address-model__bd">
          <scroll-view class="address-list">
            <div class="select-cont" style="height: 100%;overflow: auto">
              <div class="address-list__scroll">
                <div class="item"  v-for="(item,index) in addressList" :key="index">
                  <p class="name">{{item.name+ '  ' + item.mobile}}</p>
                  <p class="details">
                    收货地址：{{item.value + item.address}}
                  </p>
                  <div class="select">
                    <span class="check" :class="{active : item.isChoice == 1}" @click="defaultAddress(item.id,index)">默认地址</span>
                    <span class="edit" @click="editAddress(item)">编辑</span>
                  </div>
                </div>
              </div>
            </div>
          </scroll-view>
        </div>
        <div class="address-model__ft">
          <span class="btn" @click="handleAddressAdd()">添加地址</span>
        </div>
      </div>
    </zan-popup>
    <zan-popup :show="addAddress" type="center">
      <div class="address-model">
        <div class="address-model__hd">
          <span class="title">收货地址</span>
          <i class="close-icon" @click="toClose('addAddress')"></i>
        </div>
        <div class="address-model__bd">

          <div class="address-add">
            <p class="tc_text">
              <span class="tc_name group-label-block">收货人:</span>
              <input class="group-input-block tc_namet" v-model="addObj.tc_name" type="text">
            </p>
            <p class="tc_text">
              <span class="tc_phone group-label-block">联系电话:</span>
              <input class="group-input-block tc_phonet" v-model="addObj.tc_phone" type="text">
            </p>
            <p class="tc_text">
              <span class="tc_region group-label-block">所在地址:</span>
              <picker class="group-input-block region" mode="region" @change="bindRegionChange" :value="region">
                <view class="picker">
                  {{region.length > 0 ? region[0] + '-' + region[1] + '-' + region[2] : '所在地址:' }}
                </view>
              </picker>
            </p>
            <p class="tc_text">
              <span class="tc_detailed group-label-block">详细地址:</span>
              <input class="group-input-block tc_detailedt" v-model="addObj.tc_detailedt" type="text">
            </p>
          </div>
        </div>
        <div class="address-model__ft" :style="{ backgroundColor: '#fff' }">
          <span class="btn" @click="popt()">完成</span>
        </div>
      </div>
    </zan-popup>
    <zan-popup :show="couponBox" type="bottom">
      <div class="T-coupon">
        <div class="c-head">
          <p class="c-text" @click="toClose('couponBox')">取消</p>
        </div>
        <scroll-view scroll-y style="height: 100%" bindscrolltolower="handleCouponScroll">
          <div class="van-coupon-list__list">
            <div class="coupon" v-for="(item,index) in couponList" :key="index" @click="selectCoupon(item.id,item.price)">
              <!-- <i class="bg hasCoupon"></i> -->
              <img class="bg hasCoupon" src="../../../assets/img/marketingMgt/yhq.png" mode="aspectFill" />
              <div class="coupon__content">
                <div class="left coupon__content-inner">
                  <p class="money">￥
                    <span class="money1">{{item.price}}</span>
                  </p>
                  <div class="coupon__desc">
                    <p class="discount">{{item.name}}</p>
                    <p class="purchases">购满{{item.limitCount}}可使用</p>
                  </div>
                </div>
                <div class="right">{{ couponId === item.id ? '已使用' : '未使用' }}</div>
              </div>
              <p class="coupon__time">有效期 {{item.startTime}}-{{item.endTime}}</p>
            </div>
<!--             <div class="yhq van-coupon-item" v-for="(item,index) in couponList" :key="index" @click="selectCoupon(item.id,item.price)">
              <img class="y-img" src="../../../assets/img/marketingMgt/yhq.png">
              <div class="left">
                <p class="money">￥
                  <span class="money1">{{item.price}}</span>
                </p>
                <p class="discount">优惠券</p>
                <p class="purchases">购满{{item.limitCount}}可使用</p>
                <p class="time">有效期{{item.startTime}} - {{item.endTime}}</p>
              </div>
              <div class="right">未使用</div>
            </div> -->
          </div>
        </scroll-view>
      </div>
    </zan-popup>
  </div>
</template>
<script>
import wx from 'wx'
import config from '@/config.js'
import API from '@/api/httpShui'
import API2 from "@/api/httpJchan";
import addressMixins from '@/pages/my/address/mixins';
import EventBus from '@/assets/js/EventBus';
export default {
  mixins: [addressMixins],
  components: {},
  data () {
    return {
      buyType: null,
      selectAddressId: '',
      region: [],
      customItem: '全部',
      couponBox: false,
      selectAddress: false,
      addAddress: false,
      addressBox: false,
      remark: '',
      goodsInfo: {},
      buy_list: [],
      name: '',
      phone: '',
      addressDetails: '',
      totalPack: 0,
      totalPrice: 0,
      totalNum: 0,
      expressWay: 0,
      addressId: '',
      addressList: [],
      skuObj: '',
      skuCode: '',
      couponId: '',
      couponList: [],
      pageNumber: 1,
      couponPrice: '',
      sessionId: '',
      pingId: null,
      pingOrderId: null,
      addObj:{tc_name:"",tc_phone:"",tc_detailedt:""},
      calculate: '0.00',
      shopName: ''
    }
  },
  methods: {
    toOpen (parent) {
      this[parent] = true
      if(this.addressList.length>0){
        this.addAddress=false;
        this.selectAddress=true;
      } else {
        this.addAddress=true;
        this.selectAddress=false;
      }
    },
    toClose (name) {
      this[name] = false;
      this.getAddress();
    },
    //添加地址,保存
    async popt(){
      try {
        if (this.addObj.addressId) {
          wx.showLoading({
            title: '更新中'
          })
          await this.editres();
        } else {
          wx.showLoading({
            title: '添加中'
          })
          await this.addres();
        }
        await this.getAddress();
        wx.hideLoading();
        this.addObj={tc_name:"",tc_phone:"",tc_detailedt:""};
      } catch (err) {
      }
    },
    async addres() {
      return new Promise(async (resolve, reject) => {
        let value = this.region.join(",");
        console.log('this.recode', this.recode)
        const data = {
          name: this.addObj.tc_name,
          mobile: this.addObj.tc_phone,
          address: this.addObj.tc_detailedt,
          value: this.region.join(","),
          isChoice: 1,
          areaId: this.recode,
        };
        this.validate(data)
          .then(async res => {
            const addres = await API2.addres(data);
            if (addres.code === 1) {
              wx.showToast({
                title: '添加成功',
                duration: 1500,
                icon: 'none'
              })
              setTimeout(() => {
                this.addAddress = false;
                resolve();
              }, 1500)
              
            } else {
              reject();
            }
          })
          .catch(err => {
            reject();
          })
      })
      // this.addresList = addres.data.list;
      // console.log(addres.data);
      // console.log(this.address);
    },
    editres(){
      return new Promise(async (resolve, reject) => {
        const data = {
          name: this.addObj.tc_name,
          mobile: this.addObj.tc_phone,
          address: this.addObj.tc_detailedt,
          value: this.region.join(","),
          isChoice: 1,
          areaId: this.recode,
          addressId: this.addObj.addressId,
        };
        this.validate(data)
          .then(async res => {
            const editddres = await API2.editddres(data);
            if (editddres.code === 1) {
              wx.showToast({
                title: '更新地址成功',
                icon: 'none',
                mask: true,
                duration: 1500
              })
              setTimeout(() => {
                this.addAddress = false;
                resolve();
              }, 1500)
            }
          })
      })
    },
    //编辑地址
    editAddress(e){
      this.selectAddress=false;
      this.addAddress=true;
      this.addObj.tc_name=e.name;
      this.addObj.tc_phone=e.mobile;
      this.addObj.tc_detailedt=e.address;
      this.region=e.value.split(",");
      this.addObj.addressId=e.id;
    },
    handleAddressAdd() {
      this.addObj = { tc_name: '', tc_phone: '', tc_detailedt: '' };
      this.selectAddress=false;
      this.addAddress=true;
    },
    // 选择地址
    async defaultAddress (id, index) {
      let that = this;
      if (this.selectAddressId === index) {
        return;
      }
      const address = this.addressList[index];
      for (let i = 0; i < that.addressList.length; i++) {
        if (i === index) {
          that.addressList[i].isChoice = 1
        } else {
          that.addressList[i].isChoice = 0
        }
      }

      const res = await API2.editddres({
        name: address.name,
        mobile: address.mobile,
        address: address.address,
        value: address.value,
        isChoice: 1,
        addressId: address.id
      });
      if (res.code === 1) {
        this.addressBox = false;
        that.selectAddressId = id
        wx.showLoading();
        await this.getAddress();
        wx.hideLoading();
      } else {
        console.log(res);
      }
    },
    // 确定选择地址
    async confirm () {
      const data = await API.editAddress({addressId: this.selectAddressId, isChoice: 1})
      if (data.code === 1) {
        this.getAddress()
      }
      this.addressBox = false
    },
    // 配送方式
    Delivery (type) {
      this.expressWay = type
    },
    bindRegionChange(e) {
      this.region = e.mp.detail.value;
      this.recode = e.mp.detail.code[2];
    },
    // 默认地址
    // 添加地址
    // 获取收货地址
    getAddress () {
      return new Promise(async (resolve) => {
        const data = await API.address({ pageNumber: 1, pageSize: 5 })
        let list = data.data.list
        this.addressList = list
        // 加载显示默认地址
        for (var i = 0; i < list.length; i++) {
          if (list[i].isChoice === 1) {
            this.addressId = list[i].id
            this.name = list[i].name
            this.phone = list[i].mobile
            let val = list[i].value
            this.addressDetails = val.split(',').join('') + list[i].address;

            API.calculateFreight({ addressId: list[i].id, skuList: this.skuObj })
              .then(res => {
                console.log(res);
                if (res.code === 1) {
                  this.calculate = res.data;
                }
              })
          } else {
            this.addressId = list[0].id
            this.name = list[0].name
            this.phone = list[0].mobile
            let val = list[0].value
            this.addressDetails = val.split(',').join('') + list[0].address
          }
        }
        if(list.length==0){
            this.addressId = ""
            this.name =""
            this.phone =""
            this.addressDetails =""
        }
        resolve();
      })
    },
    async handleCouponScroll() {
      wx.showLoading({
        title: '加载中'
      })
      await this.getCoupon();
      wx.hideLoading();
    },
    // 获取优惠券
    async getCoupon () {
      const { pageNumber } = this;
      let { data: { list }, code } = await API.coupon({
        isExchange: 0,
        state: 1,
        pageSize: 5,
        pageNumber
      })
      if (code === 1) {
        list = list.map(item => ({
          ...item,
          startTime: item.startTime.split(' ')[0].toString(),
          endTime: item.endTime.split(' ')[0].toString()
        }))
        // for (let i = 0; i < myCoupon.data.list.length; i++) {
        //   myCoupon.data.list[i].startTime = myCoupon.data.list[i].startTime.split(' ')[0].toString()
        //   myCoupon.data.list[i].endTime = myCoupon.data.list[i].endTime.split(' ')[0].toString()
        // }
        this.pageNumber++;
        this.couponList = this.couponList.concat(list);
      } else {
        wx.showToast({
          title: '加载失败',
          icon: 'none'
        })
      }

    },
    // 选择优惠卷
    selectCoupon (id, price) {
      if (id === this.couponId) {
        this.couponId = '';
        this.couponPrice = '';
      } else {
        this.couponId = id;
        this.couponPrice = price;
      }
      this.couponBox = false;
    },
    // 立即购买
    async buy () {
      let that = this
      const TEST_URL = config.url
      const BASE_URL = config.url
      const URL = process.env.NODE_ENV === 'development' ? TEST_URL : BASE_URL

      const account = wx.getAccountInfoSync();
      const { miniProgram: { appId } } = account;
      let obj = {
        sessionId: this.sessionId,
        appId: appId,
        addressId: this.addressId,
        remark: this.remark,
        skuList: this.skuObj,
        couponId: this.couponId,
        expressWay: this.expressWay
      }
      if (!this.addressId) {
        wx.showToast({
          title: '请先添加一个地址',
          duration: 3000,
          icon: 'none'
        })
        return;
      }
      new Promise((resolve, reject) => {
        try {
          switch (this.buyType) {
            // 拼团购买
            case 3:
              if (this.pingId != null) {
                obj.pingId = this.pingId
              }
              if (this.pingOrderId != null) {
                obj.pingOrderId = this.pingOrderId
              }
              wx.request({
                method: 'POST',
                url: URL + '/api/order/createPingOrder',
                data: JSON.stringify(obj),
                header: {
                  'content-type': 'application/json' // 默认值
                },
                success: function (res) {
                  const { data, code, desc } = res.data;
                  if (code === 1) {
                    resolve([data.id, 2]);
                  } else {
                    reject({ errMsg: desc });
                  }
                  
                  // that.wxSign(res.data.data.id, 2)
                },
                fail: err => {

                  reject({ errMsg: '下单失败' });
                }
              })
              break;
            // 普通购买
            case 1:
            case 2:
              wx.request({
                method: 'POST',
                url: URL + '/api/order/createOrder',
                data: JSON.stringify(obj),
                header: {
                  'content-type': 'application/json' // 默认值
                },
                success: function(res) {
                  const { data, code, desc } = res.data;
                  if (code === 1) {
                    resolve([data.id, 1])
                    // that.wxSign(res.data.data.id, 1)
                  } else {
                    reject({ errMsg: desc });
                  }
                },
                fail: res => {
                  reject({ errMsg: '下单失败' });
                }
              })
              break;
          }
        } catch (err) {
          reject({ errMsg: '发生错误' });
        }
      })
        .then(res => {
          that.wxSign(...res);
        })
        .catch(res => {
          wx.showToast({
            title: res.errMsg || '下单失败',
            icon: 'none',
            duration: 2000
          })
        })
    },
    // 微信支付
    async wxSign(orderId, type) {
      let that = this
      wx.showLoading({ title: '请求支付中' });
      const data = await API.wxSign({ orderId: orderId });
      wx.hideLoading();
      if (data.code === 1) {
        let obj = data.data
        wx.requestPayment({
          timeStamp: obj.timeStamp,
          nonceStr: obj.nonceStr,
          package: obj.package,
          signType: obj.signType,
          paySign: obj.paySign,
          success: function (res) {
            EventBus.$emit('pay-success');
            if (res.errMsg === 'requestPayment:ok') {
              if (type === 1) {
                that.$router.replace({
                  path: '/pages/my/order/myorder',
                  query: { tag: 1 }
                })
              }
              if (type === 2) {
                that.$router.replace({
                  path: '/pages/groupon/index',
                  query: {
                    orderId
                  }
                })
              }
            }
          },
          fail: function (res) {
            console.log('支付失败返回结果', res)
            if (res.errMsg === 'requestPayment:fail cancel' || res.errMsg === 'requestPayment:fail (detail message)') {
              if (type === 1) {
                that.$router.replace({
                  path: '/pages/my/order/myorder',
                  query: { tag: 1 }
                })
              }
              if (type === 2) {
                that.$router.replace({
                  path: '/pages/my/myget/get'
                })
              }
            }
          }
        })
      }
    },
    
    // 计算邮费
    geCalculateFreight() {

    }
  },
  async mounted () {
    this.shopName = wx.getStorageSync('shopName');

    // 获取sessionId
    this.sessionId = await wx.getStorageSync(`${process.env.NODE_ENV}_sessionId`)
    // 详情过来
    if (this.$route.query.details) {
      this.buyType = 1
      let goods = JSON.parse(this.$route.query.details);
      // goods.goods.skuCode = goods.skuCode;
      console.log(goods);
      this.buy_list.push({
        ...goods.goods,
        skuCode: goods.skuCode
      });
      // this.goodsInfo = goods.goods
      this.skuObj = goods.skuObj
      this.skuCode = goods.skuCode
      this.totalPrice = goods.totalPrice
      this.totalNum = goods.totalNum
      this.totalPack = 1;
    }
    // 购物车过来
    const cart = wx.getStorageSync('cart');
    if (cart) {
      wx.removeStorageSync('cart');
      this.buyType = 2
      this.buy_list = cart.goods;
      // this.goodsInfo = goods.goods
      this.skuObj = cart.skuList;
      this.totalPrice = cart.totalPrice;
      this.totalNum = cart.totalNum;
      this.totalPack = cart.goods.length;
      this.skuCode = cart.goods.map(item => item.skuCode);
    }
    // 拼团过来
    if (this.$route.query.group) {
      let goods = JSON.parse(this.$route.query.group)
      if (goods.pingId !== undefined) {
        this.buyType = 3
        this.pingId = goods.pingId
        if (goods.pingOrderId !== undefined) {
          this.pingOrderId = goods.pingOrderId
        }
      } else {
        this.buyType = 1
      }
      this.buy_list.push(goods.goods);
      // this.goodsInfo = goods.goods
      this.skuObj = goods.skuObj
      this.skuCode = goods.skuCode
      this.totalPrice = goods.totalPrice
      this.totalNum = goods.totalNum
      this.totalPack = 1
      console.log('拼团过来', this.goodsInfo)
    }
    this.getAddress()
      .then(res => {
        const { addressId, skuObj: skuList } = this;
      })
      .catch(err => {
      })
    this.getCoupon()

  },
  onUnload() {
    Object.assign(this, this.$options.data())
  }

}
</script>
<style type="text/sass" lang="sass" scoped>
@import '~@/assets/css/mixin'
@import './index.scss'
.nav
  .head
    height: 80px
    line-height: 80px
    background: #fff
    border-top: 1px solid #E5E5E5
    border-bottom: 1px solid #E5E5E5
    .delivery
      display: inline-block
      /*width: 136px*/
      height: 48px
      padding: 0 10px
      background: #fff
      font-size: 28px
      color: #333
      text-align: center
      line-height: 48px
      border: 1px solid #ccc
      border-radius: 4px
      margin: 0 20px
    .delivery.active
      background: #EE7527
      border: 1px solid #EE7527
      color: #fff
  .address
    /*height: 120px*/
    padding: 28px 33px 28px 83px
    background: #F9F9F9 url('../../../assets/img/shopping/shanJiao.png') no-repeat 95% center
    background-size: 14px 25px
    position: relative
    .dt
      position: absolute
      top: 40px
      left: 33px
      width: 26px
      height: 32px
      +bg-img('shopping/s3.png')
      vertical-align: middle
      display: inline-block
    .add_text
      font-size: 28px
      color: #000
      vertical-align: middle
      display: inline-block
  .content
    .c_title
      height: 82px
      font-size: 28px
      color: #000
      background: #fff
      line-height: 82px
      padding-left: 33px
    .c_nav
      display: flex
      .cn_img
        width: 160px
        height: 160px
        display: inline-block
        border-radius: 10px
        margin: 20px 32px
      .cn_text
        margin-top: 20px
        display: inline-block
        width: 518px
        position: relative
        .cn_t1
          +moreLine(2)
          font-size: 28px
          color: #000
        .cn_t2
          font-size: 24px
          color: #999
        .cn_sj
          position: absolute
          +bg-img('shopping/shanJiao.png')
          width: 14px
          height: 25px
          top: 90px
          right: 20px
    .settlement
      height: 82px
      background: #fff
      line-height: 82px
      padding: 0 30px
      font-size: 24px
      color: #000
      border-bottom: 1px solid #E5E5E5
      .s_text1
        display: inline-block
        vertical-align: middle
        .st1
          color: #F67C2F
          font-size: 28px
      .s_text2
        display: inline-block
        vertical-align: middle
        padding-left: 20px
        .st2
          color: #F67C2F
          font-size: 28px
      .s_text3
        float: right
        display: inline-block
        vertical-align: middle
        .st3
          font-size: 32px
          color: #FF0000
          .st4
            font-size: 24px
            color: #FF0000
    .message
      height: 82px
      background: #fff
      line-height: 82px
      padding: 0 30px
      font-size: 24px
      color: #000
      border-bottom: 1px solid #E5E5E5
      .m_text
        /*width: 120px*/
        display: inline-block
        vertical-align: middle
      .m_input
        width: 420px
        display: inline-block
        vertical-align: middle
        font-size: 28px
    .coupon
      height: 82px
      line-height: 82px
      padding: 0 50px 0 30px
      font-size: 24px
      color: #000
      background: #fff url('../../../assets/img/shopping/shanJiao.png') no-repeat 96% center
      background-size: 14px 25px
      .c_text
        font-size: 28px
        color: #000
        display: inline-block
        vertical-align: middle
      .r_text
        float: right
        font-size: 28px
        color: #EE7527
        display: inline-block
        vertical-align: middle
  .foot
    height: 99px
    background: #fff
    line-height: 99px
    display: flex
    width: 100%
    position: fixed
    z-index: 5
    bottom: 0
    border-top: 2px solid #E5E5E5
    .f_text
      flex: 3
      padding-left: 32px
      .ft1
        color: #FF0000
    .f_btn
      flex: 1
      background: #EE7527
      text-align: center
      color: #fff
  .tan
    width: 100%
    height: 100%
    position: fixed
    top: 0
    left: 0
    background: rgba(0,0,0,.3)
    z-index: 99
    .t_nav
      width: 650px
      height: 680px
      background: #fff
      border-radius: 10px
      position: absolute
      top: 0
      left: 0
      right: 0
      bottom: 0
      margin: auto
      .head
        box-sizing: border-box
        width: 650px
        height: 58px
        line-height: 58px
        border-bottom: 1px solid #E5E5E5
        display: inline-block
        vertical-align: middle
        font-size: 28px
        color: #000
        padding: 0 33px
        .title
          font-size: 28px
          color: #000
        .close
          float: right
          display: inline-block
          vertical-align: middle
          +bg-img('shopping/gb.png')
          width: 23px
          height: 23px
          margin-top: 18px
.address-add
  padding: 13px 58px;
  background: #ffffff;
  box-sizing: border-box;
  .tc_text
    display: flex;
    margin-top: 32px
    align-items: center
    // margin-left: 58px
    .group-label-block
      margin-right: 33px
      width: 125px

    .group-input-block
      flex: 1
      height: 48px
      line-height: 48px
      box-sizing: border-box
    .tc_name
      vertical-align: middle
      font-size: 28px
      color: #000
    .tc_namet
      vertical-align: middle
      height: 48px
      border: 1px solid #999
    .tc_phone
      vertical-align: middle
      font-size: 28px
      color: #000
    .tc_phonet
      vertical-align: middle
      height: 48px
      border: 1px solid #999
    .tc_region
      vertical-align: middle
      font-size: 28px
      color: #000
    .region
      vertical-align: middle
      height: 48px
      border: 1px solid #999
      overflow: hidden
      .picker
        display: block
        vertical-align: middle
        line-height: 46px
        padding-left: 10px
    .tc_detailed
      vertical-align: middle
      font-size: 28px
      color: #000
    .tc_detailedt
      vertical-align: middle
      height: 48px
      border: 1px solid #999
  .btn
          display: inline-block
          width: 538px
          height: 64px
          background: #EE7527
          color: #fff
          font-size: 28px
          text-align: center
          line-height: 64px
          border-radius: 8px
          position: absolute
          bottom: 20px
          left: 56px
.address-list
  height: 622px
  background: #f1f1f1
  overflow: hidden
  .item
    box-sizing: border-box
    padding: 10px 32px 0 32px
    /*height: 208px*/
    background: #ffffff
    margin-top: 24px
    .name,.details
      width: 100%
      overflow-x: hidden
    .name
      line-height: 50px
      font-size: 28px
      color: #000
    .details
      line-height: 45px
      font-size: 24px
      color: #999
    .select
      height: 79px
      line-height: 80px
      border-top: 1px solid #ccc
      .check
        float: left
        display: inline-block
        height: 80px
        font-size: 24px
        color: #666
        padding-left: 53px
        background: url('../../../assets/img/my/check.png') no-repeat left center
        background-size: 28px 28px
      .check.active
        background: url('../../../assets/img/my/checked.png') no-repeat left center
        background-size: 28px 28px
      .edit
        float: right
        display: inline-block
        height: 80px
        font-size: 24px
        color: #666
        padding-left: 40px
        background: url('../../../assets/img/my/del-adr.png') no-repeat left center
        background-size: 28px 28px
  &__scroll
  &__action
    position: absolute
    left: 0;
    right: 0;
    bottom: 0;
    height: 128px;
    background-color: #f1f1f1
    .btn
      position: absolute
      left: 50%;
      top: 50%;
      transform: translate(-50%, -50%)
      width: 538px
      height: 64px
      background: #EE7527
      color: #fff
      font-size: 28px
      text-align: center
      line-height: 64px
      border-radius: 8px
.T-coupon
  width: 750px
  bottom: 0
  left: 0
  background: #F9F9F9
  height: 800px
  z-index: 999
  .c-head
    background-color: #fff;
    height: 78px
    line-height: 78px
    padding-left: 20px
    .c-text
      font-size: 28px
      color: #666
  .yhq
    text-align: center
    position: relative
    .y-img
      display: block
      height: 223px
    .left
      position: absolute
      top: 62px
      left: 0px
      color: #fff
      .money
        width: 300px
        color: #fff
        position: absolute
        top: -30px
        discount: inline-block
        .money1
          font-size: 60px
      .discount
        width: 200px
        position: absolute
        display: inline-block
        top: -30px
        left: 220px
        font-size: 35px
      .purchases
        width: 200px
        position: absolute
        display: inline-block
        color: #FECF8F
        top: 20px
        left: 220px
        font-size: 26px
      .time
        width: 500px
        position: absolute
        top: 100px
        left: 90px
        color: #EE7527
    .right
      position: absolute
      top: 50px
      right: 47px
      color: #fff
      font-size: 40px

</style>
