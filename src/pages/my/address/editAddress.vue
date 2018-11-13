<template>
  <div class="nav">
    <div class="kuang" v-for="(item, index) in pageaddresList" :key="item.id">
      <p class="name">{{item.name}} {{item.mobile}}</p>
      <p class="diZhi">{{item.address}}</p>
      <div class="k2">
        <p @click="dian(item, index)">
          <i :class="{ m_img: item.isChoice, m_wimg: !item.isChoice }"></i>
          <span class="m_text">默认地址</span>
        </p>
        <span class="kong"></span>
        <p>
          <i class="b_img"></i>
          <span class="b_text" @click="bj(item.id)">编辑</span>
        </p>
        <p @click="toOpen(item.id)">
          <i class="s_img"></i>
          <span class="s_text">删除</span>
        </p>
      </div>
    </div>
    <div v-if="loading">
      <zan-loading />
    </div>
    <div v-if="!pageaddresList.length && lastPage">
      <zan-loadmore type="text" text="暂无数据" />
    </div>
    <div v-if="pageaddresList.length && lastPage">
      <zan-loadmore type="text" />
    </div>
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
      totalPage: "",
      lastPage: false,
      loading: false
    };
  },
  methods: {
    async dian(item, index) {
      console.log(item)
      if (item.isChoice) return;

      const { code, desc } = await API.editddres({
        isChoice: 1,
        addressId: item.id
      });
      wx.showToast({
        title: desc,
        icon: 'none',
        duratioin: 1500
      })
      if (code === 1) {
        wx.startPullDownRefresh();
      }
    },
    async toOpen(id) {
      var that = this;
      wx.showModal({
        title: "提示",
        content: "是否删除？",
        success: function(res) {
          if (res.confirm) {
            that.del(id);
          } else if (res.cancel) {
            console.log("用户点击取消");
          }
        }
      });
    },
    async del(addressId) {
      const { code } = await API.deleteddres({ addressId });
      if (code === 1) {
        wx.showToast({
          title: '删除成功',
          icon: 'none',
          duration: 1500
        })
        setTimeout(() => {
          wx.startPullDownRefresh();
        }, 1500)
      }
    },
    async bj(id) {
      this.$router.push({
        path: "/pages/my/address/edit",
        query: { id: id }
      });
    },
    toRoute() {
      this.$router.push({
        path: '/pages/my/address/new',
        query: {
          count: this.pageaddresList.length
        }
      });
    },
    async addrd() {
      const pageaddres = await API.pageaddres({
        pageNumber: this.pageNumber,
        pageSize: this.pageSize
      });
      this.pageaddresList = pageaddres.data.list;
    },
    async fetch() {
      if (this.loading || this.lastPage) return;
      this.loading = true;
      const { data: { list, lastPage } } = await API.pageaddres({
        pageNumber: this.pageNumber,
        pageSize: this.pageSize
      });
      this.loading = false;
      this.pageNumber++;
      this.lastPage = lastPage;
      this.pageaddresList = this.pageaddresList.concat(list);
      return Promise.resolve();
    }
  },
  async onPullDownRefresh() {
    this.pageNumber = 1;
    this.lastPage = false;
    this.pageaddresList = [];
    await this.fetch()
    wx.stopPullDownRefresh();
  },
  async onReachBottom() {
    this.fetch();
  },
  onShow() {
    const address_store = wx.getStorageSync('address_store');
    if (address_store) {
      wx.removeStorageSync('address_store');
      this.pageaddresList = [];
      this.lastPage = false;
      this.pageNumber = 1;
      this.fetch();
    }
  },
  async mounted() {
    await this.fetch();
  },
  onUnload() {
    Object.assign(this, this.$options.data())
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
  padding-bottom: 98px;
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
    .k2

      border-top: 1px solid #EAEAEA
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

