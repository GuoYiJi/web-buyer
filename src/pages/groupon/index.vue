<style lang="scss" scoped>
  @import './index.scss';
</style>
<template>
  <div class="container " style="min-height: 667px;" v-if="isFetch">
    <div class="content">
      <div class="js-groupon-guide guide-container clearfix">
        <div class="guide-step guide-step1 tuan-guide-step1">
          <p class="guide-text">1.选择商品开团/参团</p>
        </div>
        <div class="guide-step guide-step2 tuan-guide-step2">
          <p class="guide-text">2.邀请好友参团</p>
        </div>
        <div class="guide-step guide-step3 tuan-guide-step3">
          <p class="guide-text">3.人满成团</p>
        </div>
      </div>
      <div class="block-list block">
        <a class="block-item name-card goods-name-card" href="https://h5.youzan.com/v2/showcase/goods?alias=36e1gyltvyg3p&amp;groupon=1g9f5m7bd" v-for="(item, index) in order.goodsList" :key="index">
          <div class="thumb ">
            <img  class="js-lazy" :src="item.image" mode="aspectFill">
          </div>

          <div class="detail">
            <h3 class="l2-ellipsis font-size-14" style="height: 34px;">{{ item.name }}</h3>
            <div class="price-tag" :style="{ opacity: 0 }">
              <p class="title">原价</p>
              <p class="price center">
                <span class="c-gray-darker">¥<span class="font-size-16"> 0.01 </span></span>
                起/件
              </p>
            </div>
            <div class="price-tag red">
              <p class="title c-black">{{ order.ping.num }}人团</p>
              <p class="price center">
                <span class="c-red-ff574e">¥<span class="font-size-16"> {{ order.ping.price }} </span></span>
                起/件
              </p>
            </div>
          </div>
        </a>
      </div>
      <div class="tuan-info block center">
        <p class="info-tips font-size-14">
          <span class="inprogress icon"></span>
          <span>已开团，离成团还差  <span class="c-red font-size-16">{{ order.ping.num - order.pingUser.length }}</span>  人</span>
        </p>
        <p class="font-size-12">
          剩<span class="js-time-count" data-seconds="24650"><i class="time-wrap">06</i> 时<i class="time-wrap">41</i> 分<i class="time-wrap">03</i></span>结束
        </p>
        <p class="font-size-12 c-gray">
          快去邀请好友参团吧！
        </p>
      </div>
      <div class="block block-list tuan-member-list">
        <div class="title c-gray font-size-12">
          参团记录
        </div>
        <div class="block-item name-card tuan-member-card" v-for="(user, index) in order.pingUser" :key="index">
          <img :src="user.head" class="thumb">
          <div class="detail font-size-12">
            <h3>{{ user.name }}<span class="tag tag-member" v-if="user.isLeader > 0">团长大人</span></h3>
            <p>{{ user.createTime }} 开团 </p>
          </div>
        </div>
      </div>
      <div class="tuan-bottom bottom-fix">
        <div class="btn-1-1">
          <view class="js-open-share btn btn-red">邀请好友参团</view>
        </div>
<!--         <div class="btn-2-1">
          <a class="tag tag-red font-size-14" href="https://h5.youzan.com/v2/trade/order/result?order_no=E20181022233433081600004">查看订单详情</a> </div> -->
      </div>
      <div id="js-share-guide" class="js-fullguide fullscreen-guide tuan-fullscreen-guide hide" style="font-size: 16px; line-height: 35px; color: #fff; text-align: center;">
        <div class="guide-arrow"></div>
        <div class="action-button center">
          <button class="tag tag-red tag-big font-size-16">
            我知道啦
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  import API from '@/api/httpShui';
  import moment from 'moment';
  const orderId = '504452321749499904';
  export default {
    data() {
      return {
        isFetch: false,
        order: {

        }
      };
    },
    async mounted() {
      const { data } = await API.getOrderDetails({orderId});
      this.order = data;
      this.isFetch = true;

    }
  }

</script>
