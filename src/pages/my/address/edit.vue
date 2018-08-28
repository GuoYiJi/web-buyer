<template>
  <div class="nav">
    <block v-for="(item, index) in pageaddresList" :key="index" v-if="(item.id == tid)">
      <div class="item">
        <input v-model.lazy="name" class="name" :value=item.name type="text" placeholder="收货人">
      </div>
      <div class="item">
        <input v-model.lazy="mobile" class="phone" :value="item.mobile" type="text" placeholder="手机号码">
      </div>
      <div class="item">
        <picker class="region" mode="region" @change="bindRegionChange" :value="region" :custom-item="customItem">
          <view class="picker">
            {{region.length > 0 ? region[0] + '-' + region[1] + '-' + region[2] : '所在地址:' }}
          </view>
        </picker>
      </div>
      <div class="item">
        <input class="address" v-model="address" :value="item.address" type="text" placeholder="详细地址">
        <i class="img"></i>
      </div>
      <div class="tacitly">
        <p class="tacitlyDz">设为默认地址</p>
        <i class="kgk" v-if="(item.isChoice == 1)" @click="kgk()"></i>
        <i class="kgg" v-if="(item.isChoice == 0)" @click="kgk()"></i>
      </div>
    </block>
    <span class="btn" @click="btn()">保存地址</span>
  </div>
</template>
<script>
import wx from "wx";
import API from "@/api/httpJchan";
export default {
  components: {},
  data() {
    return {
      region: [],
      pageaddresList: [],
      customItem: "全部",
      kgkt: 0,
      postcode: "",
      recode: "",
      isChoice: 0,
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
      // setTimeout(() => {
      //   const arr = [
      //     {
      //       name: this.name,
      //       plan: "name"
      //     },
      //     {
      //       name: this.phone,
      //       plan: "phone"
      //     }
      //   ];
      //   const msg = this.$check.all(arr);
      //   if (msg) {
      //     this.handleError(msg);
      //   }
      // }, 200);
      this.editddres();
      setTimeout(() => {
        wx.navigateBack({ data: 1 });
      }, 200);
    },
    async editddres() {
      const editddres = await API.editddres({
        name: this.name,
        mobile: this.phone,
        address: this.address,
        value: this.region.join(","),
        isChoice: this.isChoice,
        areaId: this.recode
      });
      this.editddres = editddres.data.list;
      console.log(addres.data);
      console.log(this.address);
    }
  },
  async mounted() {
    // console.log(this.$mp.query.id);
    this.tid = this.$mp.query.id;
    const pageaddres = await API.pageaddres({ pageNumber: 1, pageSize: 99 });
    this.pageaddresList = pageaddres.data.list;
    for (var i = 0; i < this.pageaddresList.length; i++) {
      if (this.tid == this.pageaddresList[i].id) {
        console.log(this.pageaddresList[i]);
        this.name = this.pageaddresList[i].name;
        this.phone = this.pageaddresList[i].mobile;
        this.address = this.pageaddresList[i].address;
        this.region = this.pageaddresList[i].value.split(",");
      }
    }
  }
};
</script>
<style lang="sass" scoped>
@import '~@/assets/css/mixin'
.nav
  .item
    height: 107px
    margin-top: 4px
    background: #fff
    line-height: 107px
    padding: 0 23px
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

