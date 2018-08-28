<template>
  <div class="home">
    <div class="search-box" >
      <div class="input">
        <p class="search-icon"><i class="search"></i></p>
        <input class="input-box" v-model="keyword" placeholder="请输入您要搜索的内容"  />
        <p class="confirm" @click="keywordBut">确认</p>
      </div>
    </div>
  </div>
</template>
<script>
import wx from 'wx'
import API from '@/api/httpShui'
export default {
  components: {},
  data () {
    return {
      keyword: ''
    }
  },
  methods: {
    async keywordBut () {
    // const L_selectOrder = await this.$API.L_selectOrderPage({
    //   keyword: this.keyword,
    //   orderType: 1
    // })
    // console.log(L_selectOrder)
    }
  },
  mounted () {}
}
</script>
<style type="text/sass" lang="sass" scoped>
@import '~@/assets/css/mixin'
.confirm
  line-height: 60px
  padding-left: 20px
  width: 15%!important
.search-box
  padding: 30px 0
  background: #fff
  .input
    display: flex
    padding: 0 35px
    p
      width: 10%
      .search
        +bg-img('home/search.png')
        +icon(38px)
        margin-top: 7px
    .search-icon
      position: absolute
      left: 60px
    .input-box
      background-color: #f5f5f5
      border-radius: 4px
      width: 80%
      text-align: left
      padding: 8px 85px
      border: none
      color: #999999


</style>
