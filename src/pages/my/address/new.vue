<template>
  <div class="nav">
    <div class="item">
      <input placeholder-class="placeholder-input" v-model="name" class="name" type="text" placeholder="收货人">
    </div>
    <div class="item">
      <input placeholder-class="placeholder-input" v-model="phone" class="phone" maxlength="11" type="number" placeholder="手机号码">
    </div>
    <div class="item">
      <picker class="region" mode="region" @change="bindRegionChange" :value="region">
        <view class="picker">
          {{region.length > 0 ? region[0] + '-' + region[1] + '-' + region[2] : '所在地址' }}
        </view>
      </picker>
    </div>
    <div class="item">
      <input placeholder-class="placeholder-input" class="address" v-model="address" type="text" placeholder="详细地址">
    </div>
    <div class="tacitly">
      <p class="tacitlyDz">设为默认地址</p>
      <i class="kgk" v-if="(isChoice == 1)" @click="kgk()"></i>
      <i class="kgg" v-if="(isChoice == 0)" @click="kgk()"></i>
    </div>
    <span class="btn" @click="btn()">保存地址</span>
  </div>
</template>
<script>
import wx from "wx";
import API from "@/api/httpJchan";
import mixins from './mixins';
export default {
  components: {},
  mixins: [mixins],
  data() {
    return {
      count: 0,
      region: [],
      customItem: "全部",
      kgkt: 0,
      postcode: "",
      recode: "",
      isChoice: 0,
      hasChoice: false
    };
  },
  methods: {
    bindRegionChange(e) {
      this.region = e.mp.detail.value;
      this.postcode = e.mp.detail.postcode;
      this.recode = e.mp.detail.code;
    },
    kgk() {
      if (this.hasChoice) {
        wx.showToast({
          title: '需要设置一个默认地址',
          icon: 'none'
        })
        return;
      }
      if (this.isChoice == 1) {
        this.isChoice = 0;
      } else if (this.isChoice == 0) {
        this.isChoice = 1;
      }
    },
    btn() {
      if (this.recode.length === 1) {
        this.recode = this.recode[0];
      } else if (this.recode.length === 2) {
        this.recode = this.recode[1];
      } else if (this.recode.length === 3) {
        this.recode = this.recode[2];
      }
      // setTimeout(() => {
      //   const arr = [
      //     {
      //       name: this.name,
      //       plan: 'name'
      //     },
      //     {
      //       name: this.phone,
      //       plan: 'phone'
      //     }
      //   ]
      //   const msg = this.$check.all(arr)
      //   if (msg) {
      //     this.handleError(msg)
      //   }
      // }, 200)
      this.addres();
    },
    async addres() {
      let value = this.region.join(",");
      const data = {
        name: this.name,
        mobile: this.phone,
        address: this.address,
        value: this.region.join(","),
        isChoice: this.isChoice,
        areaId: this.recode
      };
      this.validate(data)
        .then(res => {
          wx.showLoading({
            title: '添加中'
          })
          API.addres(data)
            .then(res => {
              wx.setStorageSync('address_store', {
                type: 'add',
                payload: data
              })
              this.$router.back();
            })
            .catch(err => {
              console.log(err)
            })
            .finally(() => {
              wx.hideLoading();
            })
        })
    }
  },
  mounted() {
    const { count } = this.$route.query;
    this.count = Number(count);
    if (!Number(count)) {
      this.isChoice = 1;
      this.hasChoice = true;
    }
  },
  onUnload() {
    Object.assign(this, this.$options.data())
  }
};
</script>
<style lang='sass' scoped>
@import '~@/assets/css/mixin'
.placeholder-input
  color: #999
.nav
  .item
    height: 107px
    margin-top: 4px
    background: #fff
    line-height: 107px
    padding: 0 23px
    input
      color: #999
    .name
      width: 100%
      display: inline-block
      vertical-align: middle
    .phone
      width: 100%
      display: inline-block
      vertical-align: middle
    .address
      width: 95%
      display: inline-block
      vertical-align: middle
    .img
      +bg-img('home/shanJiao.png')
      width: 16px
      height: 28px
      display: inline-block
      vertical-align: middle
  .tacitly
    height: 107px
    margin-top: 4px
    background: #fff
    line-height: 107px
    padding: 0 23px
    margin-top: 20px
    .tacitlyDz
      display: inline-block
      vertical-align: middle
      margin-right: 55%
    .kgk
      +bg-img('my/kgk.png')
      width: 117px
      height: 52px
      display: inline-block
      vertical-align: middle
    .kgg
      +bg-img('my/kgg.png')
      width: 117px
      height: 52px
      display: inline-block
      vertical-align: middle
  .btn
    display: inline-block
    width: 600px
    height: 90px
    background: #F67C2F
    border-radius: 10px
    color: #fff
    text-align: center
    line-height: 90px
    position: fixed
    bottom: 80px
    left: 75px
  .region
    color: #999
</style>

