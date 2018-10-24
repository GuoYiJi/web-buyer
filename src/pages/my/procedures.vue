<template>
  <div class="nav">
    <!-- <form> -->
<!--       <input class="name" v-model.lazy="name" type="text" placeholder="请输入您的称呼">
      <input class="phone" v-model.lazy="phone" type="number" placeholder="请输入您的电话">
      <input class="identity" v-model.lazy="identity" type="text" placeholder="请输入您的身份">
      <input class="referrer" v-model.lazy="referrer" type="number" placeholder="请输入推荐人电话"> -->
      <!-- <span class="btn" @click="prosave()">申请小程序</span> -->
    <!-- </form> -->
    <div class="before-submit">
      <form class="form-tel">
        <p class="introduce">填写你的联系方式，我们会主动与你联系</p>

        <input v-model.lazy="name" type="text" placeholder="请输入您的称呼">
        <input v-model.lazy="phone" type="number" placeholder="请输入您的电话">
        <input v-model.lazy="identity" type="text" placeholder="请输入您的身份">
        <input v-model.lazy="referrer" type="number" placeholder="请输入推荐人电话">
        <!-- <input type="text" name="name" placeholder="姓名"> -->
        <!-- <input type="text" name="tel" placeholder="手机号码" id="tel"> -->
        <input type="text" name="company" placeholder="公司名称（选填）">
        <button type="button" @click="prosave()">申请小程序</button>
      </form>
    </div>
  </div>
</template>
<script>
import wx from "wx";
import API from "@/api/httpJchan";
export default {
  components: {},
  data() {
    return {
      name: "",
      phone: "",
      identity: "",
      referrer: ""
    };
  },
  methods: {
    async prosave() {
      if (
        this.name != "" &&
        this.phone != "" &&
        this.identity != "" &&
        this.referrer != ""
      ) {
        var prosave = await API.prosave({
          name: this.name,
          mobile: this.phone,
          formMetaId: this.identity,
          tmobile: this.referrer
        });
        wx.showToast({
          title: "申请成功",
          icon: "success",
          duration: 2000
        });
      } else if (
        this.name == "" &&
        this.phone == "" &&
        this.identity == "" &&
        this.referrer == ""
      ) {
        wx.showToast({
          title: "请填写内容",
          icon: "loading",
          duration: 2000
        });
      }
      console.log(prosave);
      // this.prosaveList = prosave.data.list;
    }
  },

  onShareAppMessage: function (res) {
    return {
      title: '申请小程序',
      path: '/pages/my/procedures',
      imageUrl: 'http://brpublic.beautifulreading.com/a56f119ae3490f104eae3a237edec4f7'
    }
  },
  async mounted() {
    const prometaList = await API.prometaList({ type: 2 });
  }
};
</script>
<style lang="sass" scoped>
@import '~@/assets/css/mixin'
.before-submit
  margin: 0 auto;
  padding-top: 50px;
  width: 600px;
  .form-tel
    input
      position: relative;
      margin-top: 15px * 2;
      width: 100%;
      box-sizing: border-box;
      font-size: 14px * 2;
      line-height: 80px;
      height: 80px;
      color: #999;
      padding: 10px;
      outline: none;
      border: none;
      &:after
        position: absolute;
        left: 0;
        top: 0;
        content: "";
        width: 100%;
        height: 100%;
        border: 1px solid #bbb;
        box-sizing: border-box;
        border-radius: 2px;
    button
      background: #F67C2F;
      border-radius: 4px;
      width: 100%;
      height: 80px;
      line-height: 80px;
      font-size: 28px;
      color: #fff;
      text-align: center;
      outline: none;
      border: none;
      margin-top: 70px;
      &:after
        display: none
.nav
  position: fixed;
  left: 0;
  top: 0;
  width: 100vw;
  height: 100vh;
  background-color: #fff;
  .text
    padding-bottom: 97px
    font-size: 30px
    text-align: justify;
    color: #333
  .name
    height: 70px
    border: 1px dashed #999
    font-size: 28px
    padding-left: 20px
  .phone
    height: 70px
    border: 1px solid #999
    font-size: 28px
    padding-left: 20px
    margin-top: 30px
  .identity
    height: 70px
    border: 1px solid #999
    font-size: 28px
    padding-left: 20px
    margin-top: 30px
  .referrer
    height: 70px
    border: 1px solid #999
    font-size: 28px
    padding-left: 20px
    margin-top: 30px
  .btn
    display: inline-block
    position: fixed
    bottom: 80px
    left: 75px
    text-align: center
    line-height: 90px
    width: 600px
    height: 90px
    color: #fff
    background: #F67C2F
</style>
