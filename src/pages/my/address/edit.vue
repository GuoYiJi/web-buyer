<template>
  <div class="nav">
    <block>
      <div class="item">
        <input placeholder-class="placeholder-input" v-model="name" class="name" type="text" placeholder="收货人">
      </div>
      <div class="item">
        <input placeholder-class="placeholder-input" v-model="phone" class="phone" maxlength="11" type="number" placeholder="手机号码">
      </div>
      <div class="item">
        <picker class="region" mode="region" @change="bindRegionChange" :value="region">
          <view class="picker">
            {{region.length > 0 ? region[0] + '-' + region[1] + '-' + region[2] : '所在地址:' }}
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
    </block>
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
      region: [],
      pageaddresList: [],
      customItem: "全部",
      kgkt: 0,
      postcode: "",
      recode: "",
      isChoice: 0,
      hasChoice: false,
      tid: "",
      name: "",
      phone: "",
      address: ""
    };
  },
  methods: {
    bindRegionChange(e) {
      console.log(e);
      this.region = e.mp.detail.value;
      this.postcode = e.mp.detail.postcode;
      this.recode = e.mp.detail.code;
    },
    kgk() {

      // 如果修改的地址是默认地址
      if (this.hasChoice) {
        wx.showToast({
          title: '需设定一个默认地址',
          icon: 'none',
          duration: 1500
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
      if (this.recode.length == 1) {
        this.recode = this.recode[0];
      } else if (this.recode.length == 2) {
        this.recode = this.recode[1];
      } else if (this.recode.length == 3) {
        this.recode = this.recode[2];
      }
      this.editddres();
    },
    async editddres() {
      console.log(this.recode);
      const data = {
        name: this.name,
        mobile: this.phone,
        address: this.address,
        value: this.region.join(","),
        isChoice: this.isChoice,
        areaId: this.recode,
        addressId: this.tid
      }
      this.validate(data)
        .then(res => {
          wx.showLoading({
            title: '正在保存...'
          })
          API.editddres(data)
            .then(res => {
              wx.showToast({
                title: '更新成功',
                icon: 'none'
              })

              wx.setStorageSync('address_store', {
                type: 'update',
                payload: data
              })
              setTimeout(() => {
                this.$router.back();
              }, 1500)
              
            })
            .finally(() => {
              wx.hideLoading();
            });
        })
    }
  },
  async mounted() {
    // console.log(this.$mp.query.id);
    this.tid = this.$mp.query.id;
    wx.showLoading({
      title: '加载中'
    })
    const pageaddres = await API.pageaddres({ pageNumber: 1, pageSize: 99 });
    wx.hideLoading();
    pageaddres.data.list.some(item => {
      if (this.tid === item.id) {
        this.name = item.name;
        this.phone = item.mobile;
        this.address = item.address;
        this.region = item.value.split(",");
        this.isChoice = item.isChoice;

        if (item.isChoice === 1) {
          this.hasChoice = true;
        }
        return true;
      }
    })
    // this.pageaddresList = pageaddres.data.list;

    // for (var i = 0; i < this.pageaddresList.length; i++) {
    //   if (this.tid == this.pageaddresList[i].id) {
    //     this.name = this.pageaddresList[i].name;
    //     this.phone = this.pageaddresList[i].mobile;
    //     this.address = this.pageaddresList[i].address;
    //     this.region = this.pageaddresList[i].value.split(",");
    //   }
    // }
  },
  
  onUnload() {
    Object.assign(this, this.$options.data())
  }
};
</script>
<style lang="sass" scoped>
@import '~@/assets/css/mixin'

.placeholder-input, .region
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
</style>

