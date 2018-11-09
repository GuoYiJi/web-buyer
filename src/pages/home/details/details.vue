<template>
  <div class="nav" v-if="hasFetch">
    <div class="head">
      <div class="swiper-wrapper">
        <div class="swiper__video-icon" v-if="goodsInfo.video" @click="handlePlayVideo">
          <video class="preview-video-wrapper" id="video-container" :src="goodsInfo.video" direction="0" @fullscreenchange="handleFullscreenchange" v-if="goodsInfo.video" binderror="handleVideoError" bindwaiting="bindVideoWaiting"></video>
          <cover-view></cover-view>
        </div>
        <swiper
          :indicator-dots="imgUrls.length > 1"
          indicatorColor="rgba(255, 255, 255, .4)"
          indicatorActiveColor="#F67C2F"
          :autoplay="autoplay"
          :interval="interval"
          :duration="duration"
        >
          <block v-if="item" v-for="(item,index) in imgUrls" :key="index">
            <swiper-item class="coupon-img" @click="handleSwiper(item)">
              <image :src="item" class="slide-image" mode="aspectFill" lazy-load />
              <!--<i class="h_bf"></i>-->
            </swiper-item>
          </block>
        </swiper>
      </div>
      <p class="title" v-text="goodsInfo.name"></p>
      <div class="text">
        <block v-if="goodsInfo.disPrice">
          <p class="price">折扣价:</p>
          <p class="money">￥{{goodsInfo.disPrice}}</p>
        </block>
        <block v-else>
          <p class="price">批发价:</p>
          <p class="money">￥{{goodsInfo.sellPrice}}</p>
        </block>
        <p class="goods">货期: {{goodsInfo.delivery}}&nbsp;&nbsp;&nbsp;&nbsp;销量: {{goodsInfo.sellCount==9999 ? '9999+' : goodsInfo.sellCount }}</p>
        <!--收藏-->
        <div class="like" @click="Collect()">
          <i class="img_xh" v-if="goodsInfo.isLike"></i>
          <i class="img_xh1" v-else></i>
          <p>喜欢</p>
        </div>
        <span class="xian"></span>
        <!--分享-->
        <div class="share">
          <i class="img_fx"></i>
          <p>分享</p>
          <button open-type="share">分享</button>
        </div>
        <i-modal :visible="visible1" @ok="toClose('visible1')" @cancel="toClose('visible1')">
          <i class="m_img"></i>
          <div class="m_tips">微信好友</div>
        </i-modal>
      </div>
    </div>
    <div class="shop">
      <span class="text">该商品支持转发铺货</span>
      <span class="btn" @click="handleCopyGoods">
        一键铺货
        <button open-type="getPhoneNumber" @getphonenumber="getPhoneNumber"></button> 
      </span>
    </div>
    <i-modal :visible="visible2" @ok="toClose('visible2')" @cancel="toClose('visible2')">
      <div class="m_tips">是否一键转到自己的小程序店铺进行出售？</div>
    </i-modal>

    <div class="group" v-if="!toNew && isPin && goodsInfo.pingOrder && goodsInfo.pingOrder.length">
      <div class="g_head">
        <p class="gh_title">团长正在招募团员，你可以直接参团</p>
        <p class="gh_text" @click="pingOrdersModel = true">查看更多>></p>
      </div>
      <div class="middle" v-for="(item,index) in goodsInfo.pingOrder" v-if='index<=1' :key="index">
        <div class="box" v-for="(ite,i) in item.pingUser" :key="i" v-if="ite.isLeader===1">
          <img v-if="ite.head" class="mh_img" :src="ite.head">
          <img v-else class="mh_img" src="http://www.qckj.link/upload/goods/20180520/1526794348353_160563.jpg" >
          <div class="m_title">{{ite.name ? ite.name : '未填写'}}</div>
          <div class="m_text">
            <p class="mt_1">还差{{item.chaNum}}人成团</p>
            <p class="mt_2">截止{{item.endDate}}</p>
          </div>
          <div class="m_btn" @click="handleGroupClick(index)">去参团</div>
        </div>
      </div>
    </div>
    <div class="instructions">
      <p class="title_1">采购说明</p>
      <p class="text_1" v-text="goodsInfo.buyExplan"></p>
    </div>
    <div class="label" v-if="tags.length">
      <div class="label__items">
        <div class="label__item" v-for="(item, index) in tags" :key="index" v-if="item">
          <span class="btn_1">{{ item.name }}</span>
        </div>
      </div>
      <!--<span class="btn_1">修身</span>-->
    </div>
    <div class="description">
      <p class="title">商品说明</p>
      <div class="description__items">
        <p class="commodity">类别：<span>{{goodsInfo.labelInfo}}</span></p>
        <p class="commodity" v-for="(item, index) in goodsInfo.goodsLabel" :key="index">{{ item.labelKey }}：<span>{{item.labelValue}}</span></p>

        <p class="commodity" v-for="(item,i) in specGroup" :key="i" :style="{ width: '100%' }">{{item.value}}：<span v-for="(val, j) in item.specAttr" :key="j">{{val.name}}</span></p>
      </div>
      <!--<p class="commodity">材料：<span>纯棉</span></p>-->
    </div>
    <div class="picture">
      <p class="title_2">实拍图片</p>
      <div class="list">
        <img v-if="item" v-for="(item,index) in details" :key="index" class="pic_img" :src="item" lazy-load mode="widthFix">
      </div>
      <div class="picture__empty" v-if="!details.length">
        <zan-loadmore type="text" text="暂无商品详情图" />
      </div>
    </div>
    <div class="foot">
      <div class="service">
        <i class="img_kf"></i>
        <p class="xqkf">客服<button open-type="contact">客服</button></p>
      </div>
      <block v-if="!toNew && isPin">
        <div class="cart" @click="popup(2)">单独采购</div>
        <div class="immediately" @click="popup(5)">我要拼团</div>
      </block>
      <block v-else>
        <div class="cart" @click="popup(1)">加入购物车</div>
        <div class="immediately" @click="popup(2)">立即购买</div>
      </block>
    </div>
    <!-- 悬挂按钮 -->
    <div class="suspension" v-if="suspension">
      <div class="top" @click="toTop()">
        <i class="top_img"></i>
        <p class="top_text">顶部</p>
      </div>
      <br/>
      <div class="home" @click="toRoute('/pages/home/home')">
        <i class="home_img"></i>
        <p class="home_text">首页</p>
      </div>
      <br/>
      <div class="shopping" @click="toRoute('/pages/shopping/shopping')">
        <i class="sp_img"></i>
        <p class="sp_text">购物车</p>
        <i class="sp_dian" v-if="shopcardTotal">{{ shopcardTotal }}</i>
      </div>
    </div>
    <zan-popup type="bottom" :show="pingOrdersModel" v-if="goodsInfo.pingOrder">
      <div class="group-more-container">
        <div class="g-head">
          <p class="g-text">{{ goodsInfo.pingOrder.length }}人在招募团员</p>
          <i class="g-img" @click="pingOrdersModel = false"></i>
        </div>
        <scroll-view scroll-y style="height: 100%;">
          <div class="middle" v-for="(item,index) in goodsInfo.pingOrder" :key="index">
            <div class="box" v-for="(ite,i) in item.pingUser" :key="i" v-if="ite.isLeader===1">
              <img v-if="ite.head" class="mh_img" :src="ite.head">
              <img v-else class="mh_img" src="http://www.qckj.link/upload/goods/20180520/1526794348353_160563.jpg" >
              <div class="m_title">{{ite.name ? ite.name : '未填写'}}</div>
              <div class="m_text">
                <p class="mt_1">还差{{item.chaNum}}人成团</p>
                <p class="mt_2">截止{{item.endDate}}</p>
              </div>
              <div class="m_btn" @click="handleGroupClick(index)">去参团</div>
            </div>
          </div>
        </scroll-view>
      </div>
    </zan-popup>
    <!-- 提示语 -->
    <div class="wellMsg" v-show="wellMsgShow">
      {{msg}}
    </div>

    <i-modal :visible="groupVisible" @ok="handleModalActionClick({ confirm: true })" @cancel="handleModalActionClick({ cancel: true })">

      <div class="cT" v-if="goodsInfo.pingdEndDate">
        <p class="c-time">距结束: <block v-if="goodsInfo.pingdEndDate.day > 0">{{ goodsInfo.pingdEndDate.day }}天</block> {{ goodsInfo.pingdEndDate.hours }}时 {{ goodsInfo.pingdEndDate.minute }}分 {{ goodsInfo.pingdEndDate.second }}秒</p>
        <p class="c-title">还差{{wellPingUser.chaNum}}人成团，赶快加入吧！</p>
        <div class="c-imgk" v-for="(item,index) in wellPingUser.heads" :key="index">
          <img v-if="item" class="c-img" :src="item">
          <img v-else class="c-img" src="http://www.qckj.link/upload/goods/20180520/1526794348353_160563.jpg">
        </div>
      </div>
    </i-modal>
    <!-- 弹窗 -->
    <zan-popup type="bottom" :show="popupShow">
      <div class="popup">
        <div class="sku-content">
          <div class="goods">
            <div class="goods-img">
              <img :src="goodsInfo.image" mode="aspectFill" />
            </div>
            <div class="goods-cont">
              <div class="goods-cont__price">
                <block v-if="buyType === 5">
                  <span class="goods-cont__price--default">￥{{goodsInfo.ping.price}}</span>
                  <span class="goods-cont__price--group" style="text-decoration:line-through;">￥{{goodsInfo.sellPrice}}</span>
                </block>
                <block v-else>
                  <block v-if="goodsInfo.disPrice">
                    <span class="goods-cont__price--default">￥{{goodsInfo.disPrice}}</span>
                    <span class="goods-cont__price--group" style="text-decoration:line-through;">￥{{goodsInfo.sellPrice}}</span>
                  </block>
                  <block v-else>
                    <span class="goods-cont__price--default">￥{{goodsInfo.sellPrice}}</span>
                  </block>
                </block>
              </div>
              
              <p class="pop_title zan-ellipsis" v-text="goodsInfo.name"></p>
              <div class="van-sku__close-icon van-icon van-icon-close" @click="popupShow = false"></div>
            </div>
          </div>
          <scroll-view scroll-y class="sku-content--scroll">
            
            <div class="kuang_2">
              <p class="k2_title">颜色</p>
              <div class="k2_btnk">
                <span class="k2_btn" :class="{active : index === colorIndex }" v-for="(item, index) in skuAttr" :key="index" @click="selectColorSpec(index,item.colorVal)">
                  <i>{{item.colorVal}}</i>
                  <strong class="k2_btn_count" v-show="item.sizeNums">{{item.sizeNums}}</strong>
                  <!--<span class="k2_dian">0</span>-->
                </span>
              </div>
            </div>
            <div class="kuang_3">
              <ul class="s_item_box box1">
                <li class="s_item">尺码</li>
                <li class="s_item">购买数量</li>
              </ul>
              <ul class="s_item_box" v-for="(item, index) in skuAttr[colorIndex] ? skuAttr[colorIndex].sizeArray : []" :key="index">
                <li class="s_item">{{item.sizeVal}}</li>
                <li class="s_item">
                  <div class="van-stepper">
                    <button class="van-stepper__minus van-stepper__minus--disabled" @click="minus(colorIndex, index)"></button>
                    <input class="van-stepper__input" type="number" v-model="item.sizeNum" />
                    <button class="van-stepper__plus" @click="add(colorIndex, index)">
                      <span class="before"></span>
                      <span class="after"></span>
                    </button>
                  </div>
<!--                   <span class="minus" @click="minus(colorIndex, index)"></span>
                  <span class="count">{{item.sizeNum}}</span>
                  <span class="add" @click="add(colorIndex, index)"></span> -->
                </li>
              </ul>
            </div>
            <div class="kuang_4">
              <p class="k4_title">已选</p>
              <p class="k4_text" v-for="(item,index) in skuAttr" :key="index">{{item.colorVal}}：<span v-for="(item,i) in item.sizeArray" :key="i">{{item.sizeVal}}/{{item.sizeNum}}件;</span></p>
              <!--<p class="k4_text">红色：S/1件；M/1件</p>-->
            </div>
          </scroll-view>
          <div class="sku-footer">
            <span class="sku-footer__btn" @click="confirmBth()">确定</span>
          </div>
        </div>
        
      </div>
    </zan-popup>
    <zan-popup
      :show="appPopup"
      type="bottom"
      closeOnClickOverlay
      @overlay="toggleAppPopup"
    >
      <div class="app-items">

        <scroll-view class="van-list" scroll-y>
          <div class="van-radio-group">
            <div class="van-cell van-cell--clickable" v-for="(app, index) in apps" :key="index" @click="handleAppToggle(index)">
              <div class="van-cell__value van-cell__value--alone">
                <div class="van-radio">
                  <span class="van-radio__input">
                    <input class="van-radio__control" type="radio" />
                    <i class="van-icon" :class="[ app.select ? 'van-icon-checked' : 'van-icon-check' ]"></i>
                  </span>
                  <span class="van-radio__label">
                    <div class="weui-media-box weui-media-box_appmsg">
                      <div class="weui-media-box__bd">
                        <div class="weui-media-box__title">{{app.name}}</div>
                        <!-- <div class="weui-media-box__desc">小程序简介</div> -->
                      </div>
                    </div>
                  </span>
                </div>
              </div>
            </div>
          </div>
        </scroll-view>

        <div class="van-cell-group van-hairline--top-bottom">
          <div class="van-cell van-field">
            <div class="van-cell__title">
              <span>商品售价</span>
            </div>
            <div class="van-cell__value">
              <div class="van-field__body">
                <input class="van-field__control" disabled placeholder="请填写姓名" type="text" :value=" goodsInfo.disPrice || goodsInfo.sellPrice " />
              </div>
            </div>
          </div>
          <div class="van-cell van-field van-hairline">
            <div class="van-cell__title">
              <span>自定义价格</span>
            </div>
            <div class="van-cell__value">
              <div class="van-field__body">
                <input class="van-field__control" placeholder="请填写价格" type="number" v-model="appCustomPrice" />
              </div>
            </div>
          </div>
        </div>
        <div class="van-button van-button--default van-button--large" @click="handleCopyConfirm">
          <span class="van-button__text">
            一键铺货
          </span>
        </div>
      </div>
    </zan-popup>
  </div>
</template>
<script>
import wx from 'wx'
import config from '@/config.js'
import API from '@/api/httpShui'
import moment from 'moment';
export default {
  components: {},
  data () {
    return {
      isPin: false,
      pingOrdersModel: false,
      hasFetch: false,
      sessionId: '',
      imgUrls: [],
      indicatorDots: true,
      autoplay: true,
      interval: 5000,
      duration: 1000,
      suspension: false,
      isLike: 0,
      appCustomPrice: '',
      visible1: false,
      popupShow: false,
      msg: '',
      wellMsgShow: false,
      buyType: '', // 加入购物车or立即购买
      goodsInfo: {
        pingOrder: []
      }, // 商品信息
      tags: [], // 标签
      details: [], // 详情图片
      specGroup: '', // 规格列表
      skuList: '', // 规格组合列表
      colorIndex: 0, // 是否选中状态,及其下标
      skuAttr: [], // 处理可用的规格数组
      toptips: {
        duration: 1500
      },
      apps: [],
      toNew: false, // 今日上新的拼团商品还是走普通购买
      groupVisible: false,
      wellPingUser: {},
      shopcardTotal: 0,
      appPopup: false
    }
  },
  onPageScroll (e) {
    if (e.scrollTop > 300) {
      this.suspension = true
    } else if (e.scrollTop < 300) {
      this.suspension = false
    }
  },
  watch: {
    popupShow(val) {
      if (!val) {
        console.log('关闭了')
        this.skuAttr = this.skuAttr.map(item => {
          item.sizeNums = 0;
          item.sizeArray = item.sizeArray.map(item => {
            item.sizeNum = 0;
            return item;
          });
          return item;
        })
      }
    }
  },
  methods: {
    toggleAppPopup() {
      console.log(1)
      this.appPopup = !this.appPopup;
    },
    // 回到顶部
    toTop () {
      wx.pageScrollTo({
        scrollTop: 0
      })
    },
    // 跳转
    toRoute (path) {
      wx.switchTab({
        url: path
      })
    },
    // 打开分享
    toOpen (name) {
      this[name] = true
    },
    // 关闭分享
    toClose (name) {
      this[name] = false
    },
    // 收藏
    async Collect () {
      try {
        wx.showLoading();
        if (this.goodsInfo.isLike) {
          const data = await API.deleteCollect({goodsId: this.goodsInfo.id})
          if (data.code === 1) {
            this.goodsInfo.isLike = false
          } else {
            new Error({ errMsg: '操作失败' })
          }
        } else {
          const data = await API.addCollect({goodsId: this.goodsInfo.id})
          if (data.code === 1) {
            this.goodsInfo.isLike = true
          } else {
            new Error({ errMsg: '操作失败' })
          }
        }
      } catch(res) {
        wx.showToast({
          title: res.errMsg,
          icon: 'none'
        })
      } finally {
        wx.hideLoading();
      }
    },
    // 打开选择规格弹窗
    popup (type) {
      this.popupShow = true
      this.buyType = type;
      // if (type === 1) {
      //   // 加入购物车
      //   this.buyType = 1
      // }
      // if (type === 2) {
      //   // 立即购买
      //   this.buyType = 2
      // }
    },

    // 去参团
    handleGroupClick(index) {
      this.groupVisible = true;
      const pingOrder = this.goodsInfo.pingOrder[index];
      let obj = {}
      let pingUser = pingOrder.pingUser
      obj.id = pingOrder.id
      obj.endTime = pingOrder.endTime
      obj.chaNum = pingOrder.chaNum
      obj.heads = []
      for (let i = 0; i < pingUser.length; i++) {
        if (pingUser[i].head === null) {
          obj.heads.push(' ')
        } else {
          obj.heads.push(pingUser[i].head)
        }
      }
      this.wellPingUser = obj
    },
    handleModalActionClick(res) {
      this.groupVisible = false;
      if (res.confirm) {
        this.popup(3);
      } else {
        this.wellPingUser = {};
      }
    },
    chakanT(index) {
      this.pingOrdersModel = false;
      const pingOrder = this.goodsInfo.pingOrder[index];
      let obj = {}
      let pingUser = pingOrder.pingUser
      obj.id = pingOrder.id
      obj.endTime = pingOrder.endTime
      obj.chaNum = pingOrder.chaNum
      obj.heads = []
      for (let i = 0; i < pingUser.length; i++) {
        if (pingUser[i].head === null) {
          obj.heads.push(' ')
        } else {
          obj.heads.push(pingUser[i].head)
        }
      }
      this.wellPingUser = obj;
      this.popup(3);
    },

    // 确定按钮
    confirmBth () {
      let data = {};
      let that = this
      // 规格ID数量数组
      let skuAttr = []
      // 规格文字拼接数组
      let skuCode = []
      // 总数
      let totalNum = 0
      // 单价
      let price = that.goodsInfo.disPrice || that.goodsInfo.sellPrice
      // 总价
      let totalPrice = 0
      for (let i = 0; i < that.skuAttr.length; i++) {
        for (let j = 0; j < that.skuAttr[i].sizeArray.length; j++) {
          let obj = {}
          if (that.skuAttr[i].sizeArray[j].sizeNum === 0) {
            continue
          }
          let colorVal = that.skuAttr[i].colorVal
          let colorId = that.skuAttr[i].color
          let sizeVal = that.skuAttr[i].sizeArray[j].sizeVal
          let sizeId = that.skuAttr[i].sizeArray[j].sizeId
          let num = that.skuAttr[i].sizeArray[j].sizeNum
          let attrIds = colorId + ',' + sizeId
          let skuVal = ''
          let ishas = false
          for (let g = 0; g < skuCode.length; g++) {
            let str = skuCode[g].substring(0, 1)
            if (str === colorVal) {
              skuCode[g] += sizeVal + '/' + num + '件;'
              ishas = true
              break
            }
          }
          if (!ishas) {
            skuVal = colorVal + ': ' + sizeVal + '/' + num + '件;'
            skuCode.push(skuVal)
          }
          totalNum += Number(num)
          for (let k = 0; k < that.skuList.length; k++) {
            if (that.skuList[k].attrIds === attrIds) {
              obj.skuId = that.skuList[k].id
            }
          }
          obj.num = num
          skuAttr.push(obj)
        }
      }
      // console.log(skuAttr)
      // console.log(skuCode)
      totalPrice = (totalNum * price).toFixed(2);
      // 加入购物车
      if (totalNum <= 0) {
        wx.showToast({
          title: '请选择购买数量',
          icon: 'none'
        })
        return
      }
      let pingId, pingPrice, pingOrderId;
      if (this.goodsInfo.ping) {
        pingPrice = this.goodsInfo.ping.price;
      }
      if (this.goodsInfo.ping && this.goodsInfo.ping.id) {
        pingId = this.goodsInfo.ping.id;
      }
      this.popupShow = false;
      /**
       * 1: 购物车
       * 2：立即购买
       * 3：参团
       * 4：单独采购
       * 5：开团
       */
      switch (this.buyType) {
        case 1:
          const TEST_URL = config.url
          const BASE_URL = config.url
          const URL = process.env.NODE_ENV === 'development' ? TEST_URL : BASE_URL

          const account = wx.getAccountInfoSync();
          const { miniProgram: { appId } } = account;
          let obj = {
            sessionId: this.sessionId,
            appId,
            goodsCard: skuAttr
          }
          wx.showLoading({
            title: '添加中'
          })
          API.addGoodsCard(obj)
            .then(res => {
              const { code, desc } = res;
              if (code === 1) {
                wx.showToast({
                  title: '已加入购物车',
                  icon: 'none',
                  duration: 3000
                })
                that.popupShow = false;
                this.shopcardTotal++;
              } else {
                return Promise.reject(desc);
              }
            })
            .catch(err => {
            })
            .finally(() => {
              wx.hideLoading();
            })
          // wx.request({
          //   method: 'POST',
          //   url: URL + '/api/goods/card/addGoodsCard',
          //   data: JSON.stringify(obj),
          //   header: {
          //     'content-type': 'application/json' // 默认值
          //   },
          //   success: function (res) {
          //     if (res.data.code === 1) {
          //       wx.showToast({
          //         title: '已加入购物车',
          //         icon: 'none',
          //         duration: 3000
          //       })
          //       that.popupShow = false
          //     }
          //   }
          // })
          break;
        case 2:

          data = {
            goods: this.goodsInfo,
            skuObj: skuAttr,
            skuCode,
            totalPrice,
            totalNum
          }
          this.$router.push({
            path: '/pages/shopping/order/order',
            query: {details: JSON.stringify(data)}
          })
          that.popupShow = false;
          break;
        case 3:
          pingOrderId = this.wellPingUser.id;
        case 5:
          totalPrice = (totalNum * pingPrice).toFixed(2);
          data = {
            goods: that.goodsInfo,
            skuObj: skuAttr,
            skuCode,
            totalPrice,
            totalNum,
            pingId,
            pingOrderId
          }
          that.$router.push({path: '/pages/shopping/order/order', query: {group: JSON.stringify(data)}})
          break;
      }
    },
    // 选择规格
    selectColorSpec (index) {
      this.colorIndex = index
    },
    // 减
    minus (colorIndex, sizeIndex) {
      // console.log(colorIndex, sizeIndex)
      let num = this.skuAttr[colorIndex].sizeArray[sizeIndex].sizeNum
      if (num === 0) {
        return false
      } else {
        this.skuAttr[colorIndex].sizeArray[sizeIndex].sizeNum--
      }
      this.skuAttr[colorIndex].sizeNums = this.skuAttr[colorIndex].sizeArray.reduce((prev, current) => {
        return prev + current.sizeNum;
      }, 0)
    },
    // 加
    add (colorIndex, sizeIndex) {
      // console.log(colorIndex, sizeIndex)
      let num = this.skuAttr[colorIndex].sizeArray[sizeIndex].sizeNum
      if (num === 100) {
        return false
      } else {
        this.skuAttr[colorIndex].sizeArray[sizeIndex].sizeNum++
      }
      this.skuAttr[colorIndex].sizeNums = this.skuAttr[colorIndex].sizeArray.reduce((prev, current) => {
        return prev + current.sizeNum;
      }, 0)
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
    handleAppToggle(index) {
      this.$set(this.apps[index], 'select', !this.apps[index].select);
    },
    handleCopyGoods() {
      if (!this.phoneNumber) return;
      wx.showModal({
        content: '是否一键转到自己的小程序店铺进行出售？',
        success: res => {
          if (res.confirm) {
            // API.copyGoods()
          }
        }
      })
    },

    // 预览轮播图大图
    handleSwiper(current) {
      wx.previewImage({
        urls: this.imgUrls,
        current
      })
    },
    
    handleVideoError(e) {
      console.log('err', e);
    },
    bindVideoWaiting(e) {
      console.log('wait', e)
    },
    handlePlayVideo() {
      if (!this.VideoContext) {
        this.VideoContext = wx.createVideoContext('video-container');
      }

      // const VideoContext = wx.createVideoContext('video-container');
      this.VideoContext.requestFullScreen({
        direction: 0
      })

      this.VideoContext.play();
    },
    handleFullscreenchange(e) {
      const { detail } = e.mp;
      // 退出全屏
      if (!detail.fullScreen) {
        this.VideoContext.pause();
      }
    },
    getPhoneNumber(e) {
      const { target } = e;
      if (target.encryptedData && target.iv) {
        const { encryptedData, iv } = target;
        this.phoneNumberData = {
          encryptedData,
          iv
        }

        API.selectAccountShopList({
          encryptedDataPhone: encryptedData,
          ivPhone: iv
        })
          .then(res => {
            console.log(res);
            const { code, data, desc } = res;
            if (code === 1 && data && data.length) {
              this.apps = data.map(item => ({...item, select: true}));
              this.appCustomPrice = this.goodsInfo.disPrice || this.goodsInfo.sellPrice;
              this.appPopup = true;
            } else {
              wx.showToast({
                title: desc,
                icon: 'none',
                duration: 3000
              })
            }
            // API.copyGoods({
            //   shopIds: this.apps.filter(item => item.select).map(item => item.id).join(','),
            //   goodsId: this.$route.query.goodsId,
            //   price: 1
            // })
          })
        // wx.showModal({
        //   content: '是否一键转到自己的小程序店铺进行出售？',
        //   success: res => {
        //     if (res.confirm) {
        //       // API.copyGoods({
        //       //   encryptedDataPhone: encryptedData,
        //       //   ivPhone: iv,
        //       //   goodsId: this.$route.query.goodsId
        //       // })
        //     }
        //   }
        // })
      }
    },
    handleCopyConfirm() {
      console.log(1);
      API.copyGoods({
        shopIds: this.apps.filter(item => item.select).map(item => item.id).join(','),
        goodsId: this.$route.query.goodsId,
        price: this.appCustomPrice
      })
        .then(res => {
          const { data: { code, desc } } = res;
          wx.showToast({
            title: desc,
            icon: 'none',
            duration: 3000
          })
        })
        .catch(err => {
          wx.showToast({
            title: '网络出错',
            icon: 'none',
            duration: 3000
          })
        })
        .finally(() => {
          this.appPopup = false;
        })
    }
  },
  onShareAppMessage() {
    const { goodsInfo } = this
    return {
      title: goodsInfo.name,
      path: `/pages/home/details/details?goodsId=${goodsInfo.id}`,
      imageUrl: goodsInfo.image
    }
  },
  async mounted() {
    const { goodsId, toNew, isPin } = this.$route.query;
    this.isPin = !!isPin;
    if (toNew) {
      this.toNew = toNew;
    }
    wx.showLoading({title: '努力加载中'})
    const { code, data } = await API.selectGoodsDetail({ goodsId });
    wx.hideLoading();
    this.hasFetch = true;
    if (code === 1) {

      this.popupShow = false
      this.sessionId = await wx.getStorageSync('sessionId')
      // 商品信息
      // this.goodsInfo = JSON.parse(this.$route.query.obj);
      if (data.pingOrder && data.pingOrder.length) {
        data.pingOrder = data.pingOrder.map(item => {
          return {
            ...item,
            endTime: data.ping.endTime,
            chaNum: data.ping.num - item.pingUser.length
          }
        })
      }
      this.goodsInfo = {
        ...data,
        pingdEndDate: (data.ping && data.ping.endTime) ? this.format(+moment(data.ping.endTime) - Date.now()) : null,
        pingOrder: data.pingOrder ? data.pingOrder.map(item => {
          return {
            ...item,
            endDate: moment(item.endTime).format('YYYY-MM-DD')
          };
        }) : []
      };
      // 图片列表
      this.imgUrls = this.goodsInfo.images.split(',');
      // 标签列表
      this.tags = this.goodsInfo.tagsList;
      // 详情列表
      this.details = this.goodsInfo.content.split(',').filter(item => !!item);
      // 规格数组
      this.specGroup = this.goodsInfo.sku.specGroup;
      // 规格组合数组
      this.skuList = this.goodsInfo.sku.skuList;
      // 规格文字
      // let specGroup = this.goodsInfo.sku.specGroup
      // 规格id
      let skuList = this.goodsInfo.sku.skuList
      let attrArray = []
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
        sizeObj.sizeNum = 0
        sizeArray.push(sizeObj)
        obj.sizeArray = sizeArray
        let isHas = false
        for (let j = 0; j < attrArray.length; j++) {
          if (attrArray[j].color === obj.color) {
            // let skuSize = attrArray[j]
            attrArray[j].sizeArray.push(sizeObj)
            isHas = true
            break
          }
        }
        if (!isHas) {
          attrArray.push(obj)
        }
      }
      this.skuAttr = attrArray
      if (this.$route.query.pingOrderId) {
        const index = this.goodsInfo.pingOrder.findIndex(item => item.id === this.$route.query.pingOrderId);
        if (index !== -1) {
          this.handleGroupClick(index);
        }
      }
      try {
        API.getCardList()
          .then(res => {
            console.log(res);
            const { data } = res;
            if (data) {
              this.shopcardTotal = data.length;
            }
          });
      } catch (err) {
        console.log(err);
      }
    }
  },
  onUnload() {
    Object.assign(this, this.$options.data());
    this.VideoContext = null;
  }
}
</script>
<style type="text/sass" lang="sass" scoped>
@import '../../../assets/css/mixin'
@import './index.scss'
.m_img
  //+bg-img('home/wx.png')
  margin: 0 auto
  width: 90px
  height: 90px
  border: 1px solid red

.m_tips
  height: 80px
  padding: 20px
.nav
  padding-bottom: 100px
  background: #F9F9F9
  .head
    swiper
      height: 1000px
    .coupon-img
      position: relative
      .slide-image
        height: 1000px
        width: 100%
      .h_bf
        //+bg-img('home/xqbf.png')
        position: absolute
        bottom: 27px
        right: 32px
        border: 1px solid red
        width: 96px
        height: 96px
    .title
      font-size: 32px
      line-height: 36px
      padding: 17px 9px 0 23px
      color: #000
      +moreLine(2)
      background: #fff
    .text
      position: relative
      height: 139px
      padding-bottom: 10px
      border-bottom: 1px solid #EAEAEA
      background: #fff
      .price
        position: absolute
        font-size: 26px
        color: #000
        top: 55px
        left: 26px
      .money
        position: absolute
        font-size: 36px
        color: #FF0000
        top: 47px
        left: 130px
      .goods
        position: absolute
        font-size: 24px
        color: #999
        top: 96px
        left: 26px
      .like
        position: absolute
        top: 45px
        left: 535px
        .img_xh
          +bg-img('home/xqxh.png')
          width: 46px
          height: 42px
          margin-left: 7px
        .img_xh1
          +bg-img('home/xqxh1.png')
          width: 46px
          height: 42px
          margin-left: 7px
      .xian
        position: absolute
        top: 25px
        left: 618px
        display: inline-block
        width: 2px
        height: 100px
        background: #EAEAEA
      .share
        position: absolute
        top: 45px
        left: 635px
        button
          position: absolute
          left: 0
          right: 0
          bottom: 0
          top: 0
          opacity: 0
          z-index: 5
        .img_fx
          +bg-img('home/xqfx.png')
          width: 46px
          height: 42px
          margin-left: 7px
  .shop
    display: flex
    padding: 0 25px
    height: 100px
    align-items: center
    background: #fff
    .text
      flex: 1
      font-size: 24px
      color: #999
    .btn
      position: relative
      z-index: 1
      display: inline-block
      width: 140px
      height: 60px
      font-size: 24px
      color: #fff
      background: #F67C2F
      border-radius: 8px
      text-align: center
      line-height: 60px
      button
        position: absolute
        left: 0
        top: 0
        width: 100%
        height: 100%
        opacity: 0
  .instructions
    background: #fff
    margin-top: 10px
    padding: 15px 22px
    .title_1
      font-size: 30px
      color: #010101
    .text_1
      font-size: 28px
      color: #666666
      padding-top: 10px
  .label
    margin-top: 10px
    padding: 20px 0
    background: #fff
    color: #F67C2F;
    overflow: hidden
    &__items
      margin-bottom: -20px
      margin-right: -36px
      padding-left: 24px
      &:after
        display: block
        clear: both
        content: ""
    &__item
      float: left
      width: 25%;
      padding-right: 60px
      margin-bottom: 20px
      height: 60px
      line-height: 60px
      box-sizing: border-box
    .btn_1
      display: block
      background: #FFE8D9
      height: 100%
      border: 1px solid #F67C2F
      border-radius: 30px
      text-align: center
  .description
    padding: 30px 23px
    font-size: 30px
    color: #666
    background: #fff
    margin-top: 10px
    /*height: 184px*/
    &__items
      margin-bottom: -19px
      &:after
        display: block
        content: ""
        clear: both
    .title
      color: #000
      margin-bottom: 20px
    .commodity
      width: 50%
      float: left
      font-size: 30px
      color: #666
      box-sizing: border-box
      margin-bottom: 19px
      span
        margin-right: 10px
  .picture
    margin: 10px 0
    background-color: #fff
    .list
      padding: 0 24px
    .title_2
      padding: 34px 22px 26px
    .pic_img
      width: 100%
    &__empty
      padding: 20px 0
  .foot
    display: flex
    position: fixed
    bottom: 0px
    width: 100%
    height: 98px
    z-index: 10
    .service
      flex: 1
      background: #fff
      .img_kf
        +bg-img('home/xqkf.png')
        width: 46px
        height: 42px
        margin-top: 10px
        margin-left: 100px
      .xqkf
        position: relative
        padding-left: 95px
        button
          position: absolute
          left: 0;
          top: 0;
          right: 0;
          bottom: 0;
          opacity: 0
    .cart
      flex: 1
      background: #FFA56C
      color: #fff
      font-size: 30px
      text-align: center
      line-height: 98px
    .immediately
      flex: 1
      background: #F67C2F
      color: #fff
      font-size: 30px
      text-align: center
      line-height: 98px
  .suspension
    position: fixed
    width: 96px
    right: 30px
    text-align: center
    font-size: 22px
    color: #666
    bottom: 200px
    z-index: 5
    .top
      display: inline-block
      background: rgba(234,234,234,1)
      border-radius: 50%
      width: 96px
      height: 76px
      overflow: hidden
      margin-top: 20px
      padding: 10px 0
      .top_img
        +bg-img('home/xqtb.png')
        width: 38px
        height: 40px
        margin: 0 auto
    .home
      display: inline-block
      background: rgba(234,234,234,1)
      border-radius: 50%
      width: 96px
      height: 76px
      overflow: hidden
      margin-top: 20px
      padding: 10px 0
      .home_img
        +bg-img('home/home3.png')
        width: 45px
        height: 40px
        margin: 0 auto
    .shopping
      display: flex
      align-items: center
      justify-content: center
      flex-direction: column
      background: rgba(234,234,234,1)
      border-radius: 50%
      width: 96px
      height: 96px
      position: relative
      margin-top: 20px
      .sp_img
        +bg-img('home/xqgwc.png')
        width: 45px
        height: 40px
        margin: 0 auto
      .sp_dian
        position: absolute
        top: 3px
        right: 14px
        width: 28px
        height: 28px
        line-height: 28px
        display: inline-block
        background: #FF0018
        color: #fff
        border-radius: 50px
        text-align: center
        font-size: 14px
  .popup
    width: 100vw
    background: #fff
    .kuang_1
      width: 100%
      position: relative
      .pop_img
        width: 190px
        height: 190px
        padding: 10px
        background: #fff
        border-radius: 10px
      .pop_money
        font-size: 34px
        color: #FF0101
      .pop_title
        font-size: 30px
        color: #000
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
      padding: 0 24px
      .k2_title
        font-size: 24px
        color: #000
        padding-bottom: 30px
      .k2_btnk
        .k2_btn
          display: inline-block
          position: relative
          width: 140px
          height: 60px
          background: #EAEAEA
          margin-right: 30px
          border: 1px solid transparent
          border-radius: 10px
          text-align: center
          line-height: 60px
          position: relative
          &_count
            $size: 34px
            position: absolute
            right: 0
            top: 0
            transform: translate(50%, -50%)
            width: $size
            height: $size
            line-height: $size
            background-color: #FF0018
            border-radius: 50%
            color: #fff;
            text-align: center
            font-size: 18px
        .k2_btn.active
          border: 1px solid #F67C2F
          color: #F67C2F
          background-color: #fff
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
      // height: 230px
      padding-bottom: 30px
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
          background: url('../../../assets/img/shopping/minus.png') no-repeat center
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
          background: url('../../../assets/img/shopping/add.png') no-repeat center
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
      display: block
      margin: 90px auto 0
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

.group
  height: 380px
  background: #fff
  margin-top: 10px
  padding: 0 26px
  .g_head
    line-height: 30px
    padding-top: 28px
    padding-bottom: 18px
    vertical-align: middle
    display: flex
    justify-content: space-between
    .gh_title
      font-size: 30px
      color: #010101
      display: inline-block
    .gh_text
      font-size: 24px
      color: #F67C2F
      display: inline-block
  .middle
    /*width: 702px*/
    height: 120px
    line-height: 120px
    background: #F9F9F9
    margin-top: 10px
    .box
      width: 100%
      height: 100%
      display: flex
      justify-content: space-between
      .mh_img
        display: inline-block
        width: 80px
        height: 80px
        border-radius: 50%
        margin: 20px 20px
      .m_title
        display: inline-block
        line-height: 120px
        font-size: 28px
        color: #000
      .m_text
        height: 120px
        display: inline-block
        text-align: right
        /*margin: 27px 0 0 0*/
        flex: 2
        .mt_1
          line-height: 60px
          font-size: 24px
          color: #F67C2F
        .mt_2
          line-height: 60px
          font-size: 24px
          color: #666
      .m_btn
        float: right
        display: inline-block
        width: 100px
        height: 120px
        line-height: 120px
        background: #F67C2F
        color: #fff
        font-size: 24px
        text-align: center
        margin-left: 25px

.group-more-container
  .g-head
    height: 98px
    display: flex
    position: relative
    .g-text
      font-size: 32px
      line-height: 98px
      padding-left: 20px
    .g-img
      +bg-img('home/gb.png')
      width: 44px
      height: 44px
      position: absolute
      top: 27px
      right: 20px
  .middle
    /*width: 702px*/
    height: 120px
    line-height: 120px
    background: #F9F9F9
    margin-top: 10px
  .box
    width: 100%
    height: 100%
    display: flex
    justify-content: space-between
    .mh_img
      display: inline-block
      width: 80px
      height: 80px
      border-radius: 50%
      margin: 20px 20px
    .m_title
      display: inline-block
      line-height: 120px
      font-size: 28px
      color: #000
    .m_text
      height: 120px
      display: inline-block
      text-align: right
      /*margin: 27px 0 0 0*/
      flex: 2
      .mt_1
        line-height: 60px
        font-size: 24px
        color: #F67C2F
      .mt_2
        line-height: 60px
        font-size: 24px
        color: #666
    .m_btn
      float: right
      display: inline-block
      width: 100px
      height: 120px
      line-height: 120px
      background: #F67C2F
      color: #fff
      font-size: 24px
      text-align: center
      margin-left: 25px
.cT
  .c-time
    font-size: 25px
    color: #F67C2F
    position: relative
  .c-title
    margin-top: 18px
    margin-bottom: 33px
    font-size: 32px
    color: #000
  .c-imgk
    display: inline-block
    position: relative
    .c-img
      width: 84px
      height: 84px
      margin: 0 10px
</style>
