<style lang="scss" scoped>
  .van-cell-group {
    margin-top: 20px;
  }
  .avatar {
    $size: 80px;
    width: $size;
    height: $size;
  }
</style>
<template>
  <div v-if="isFetch">
    <div class="van-cell-group van-hairline--top-bottom">
      <div class="van-cell van-cell--clickable" @click="handlePreview">
        <div class="van-cell__title">
          <span>店铺头像</span>
        </div>
        <div class="van-cell__value">
          <img class="avatar" :src="info.img" alt="">
        </div>
        <i class="van-icon van-icon-arrow van-cell__right-icon"></i>
      </div>
    </div>
    <div class="van-cell-group van-hairline--top-bottom">
      <div class="van-cell">
        <div class="van-cell__title">
          <span>店铺名称</span>
        </div>
        <div class="van-cell__value">
          <span>{{ info.name }}</span>
        </div>
      </div>
      <div class="van-cell van-hairline">
        <div class="van-cell__title" :style="{ maxWidth: '90px' }">
          <span>店铺简介</span>
        </div>
        <div class="van-cell__value">
          <span  :style="{ textAlign: 'left' }">{{ info.remark }}</span>
        </div>
      </div>
    </div>
    <div class="van-cell-group van-hairline--top-bottom">
      <div class="van-cell">
        <div class="van-cell__title">
          <span>公司名称</span>
        </div>
        <div class="van-cell__value">
          <span>{{ info.companyName }}</span>
        </div>
      </div>
      <div class="van-cell van-hairline">
        <div class="van-cell__title">
          <span>所在地区</span>
        </div>
        <div class="van-cell__value">
          {{ info.sheng }}-{{ info.shi }}-{{ info.qu }}
        </div>
      </div>
      <div class="van-cell van-hairline">
        <div class="van-cell__title">
          <span>详细地址</span>
        </div>
        <div class="van-cell__value">
          {{ info.address }}
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  import API from '@/api/httpJchan';
  import wx from 'wx';
  export default {
    data() {
      return {
        isFetch: false,
        info: {

        }
      }
    },
    methods: {
      handlePreview() {
        wx.previewImage({
          urls: [this.info.img]
        })
      }
    },
    async mounted() {
      wx.showLoading({title: '加载中'})
      const { data } = await API.getShopInfo();
      wx.hideLoading();
      this.isFetch = true;
      this.info = data;
    }
  }
</script>