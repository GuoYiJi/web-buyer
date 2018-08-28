<template>
  <div class="nav">
    <div class="kuang" v-for="(item, index) in pageaddresList" :key="index">
      <p class="name">{{item.name}} {{item.mobile}}</p>
      <p class="diZhi">{{item.address}}</p>
      <i class="xian"></i>
      <div class="k2">
        <p @click="dian(item.id)">
          <i class="m_img" v-if="(isChoice == item.id || isChoice == 1)"></i>
          <i class="m_wimg" v-if="(isChoice !=  item.id)"></i>
          <span class="m_text">默认地址</span>
        </p>
        <span class="kong"></span>
        <p>
          <i class="b_img"></i>
          <span class="b_text" @click="bj(item.id)">编辑</span>
        </p>
        <p @click="toOpen('visible2')">
          <i class="s_img"></i>
          <span class="s_text">删除</span>
        </p>
        <i-modal :visible="visible2" @ok="toCloseok('visible2',item.id)" @cancel="toClose('visible2')">
          <div class="m_tips">是否删除？</div>
        </i-modal>
      </div>
    </div>
    <div class="kongt"></div>
    <span class="btn" @click="toRoute()">新增收货地址</span>
  </div>
</template>
<script>
import wx from "wx";
import mixin from "@/mixin";
import API from "@/api/httpJchan";
export default {
  mixins: [mixin],
  components: {},
  data() {
    return {
      xz: "",
      isChoice: "",
      visible2: false,
      pageaddresList: [],
      pageNumber: 1,
      pageSize: 10,
      totalPage: ""
    };
  },
  methods: {
    async dian(id) {
      this.isChoice = id;
      this.xz = id;
      if (this.xz != "") {
        this.xz = 1;
        console.log(this.xz);
        const editddres = await API.editddres({
          isChoice: this.xz,
          addressId: id
        });
        this.onShow();
      }
    },
    toOpen(name) {
      this[name] = true;
    },
    toClose(name) {
      this[name] = false;
    },
    async toCloseok(name, id) {
      console.log(id);
      const deleteddres = await API.deleteddres({ addressId: id });
      this[name] = false;
      this.addrd();
    },
    async bj(id) {
      this.$router.push({
        path: "/pages/my/address/edit",
        query: { id: id }
      });
    },
    toRoute() {
      this.$router.push("/pages/my/address/new");
    },
    async addrd() {
      const pageaddres = await API.pageaddres({
        pageNumber: this.pageNumber,
        pageSize: this.pageSize
      });
      this.pageaddresList = pageaddres.data.list;
    }
  },
  // onPageScroll(e) {
  //   console.log(e);
  // },
  async onPullDownRefresh() {
    const pnumber = 1;
    const pageaddres = await API.pageaddres({
      pageNumber: pnumber,
      pageSize: this.pageSize
    });
    this.pageaddresList = pageaddres.data.list;
  },
  async onReachBottom() {
    this.pageNumber = this.pageNumber + 1;
    console.log(this.pageNumber);
    if (this.pageNumber <= this.totalPage) {
      console.log(this.totalPage);
      const pageaddres = await API.pageaddres({
        pageNumber: this.pageNumber,
        pageSize: this.pageSize
      });
      this.pageaddresList.push(pageaddres.data.list);
    }
  },
  onShow() {
    // `this` 指向 vm 实例
    console.log("a is: " + this.a, "小程序触发的 onshow");
    this.addrd();
  },
  async mounted() {
    const pageaddres = await API.pageaddres({
      pageNumber: this.pageNumber,
      pageSize: this.pageSize
    });
    this.pageaddresList = pageaddres.data.list;
    this.totalPage = pageaddres.data.totalPage;
    if (this.pageaddresList[0].isChoice == 1) {
      this.isChoice = this.pageaddresList[0].id;
    }
  }
};
</script>
<style lang="sass" scoped>
@import '~@/assets/css/mixin'
.kong
  width: 20%
  display: inline-block
.kongt
  height: 300px
  display: inline-block
.nav
  .kuang
    width: 702px
    height: 203px
    background: #fff
    margin: 19px 24px 0
    .name
      font-size: 32px
      color: #000
      padding: 20px 0 5px 30px
    .diZhi
      font-size: 24px
      color: #666
      padding-left: 31px
      margin-bottom: 10px
    .xian
      width: 100%
      border: 1px solid #EAEAEA
    .k2
      height: 80px
      line-height: 80px
      p
       display: inline-block
       vertical-align: middle
       margin: 0 25px
       .m_img
        display: inline-block
        vertical-align: middle
        +bg-img('storeMgr/select.png')
        width: 40px
        height: 40px
        margin-right: 10px
       .m_wimg
        display: inline-block
        vertical-align: middle
        +bg-img('shopping/wxz.png')
        width: 40px
        height: 40px
        margin-right: 10px
       .b_img
        display: inline-block
        vertical-align: middle
        +bg-img('storeMgr/edit-adr.png')
        width: 40px
        height: 40px
        margin-right: 10px
       .s_img
        display: inline-block
        vertical-align: middle
        +bg-img('storeMgr/del-adr.png')
        width: 40px
        height: 40px
        margin-right: 10px
  .btn
    width: 100%
    height: 98px
    background: #F67C2F
    color: #fff
    text-align: center
    line-height: 98px
    position: fixed
    bottom: 0px

</style>

