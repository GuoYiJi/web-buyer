<template lang="html">
  <div id="container1">
    <div class="bar" :class="[tag == 1 && 'active' ]" @click="push('/pages/home/home')">
      <i class="icon icon1"></i>
      <p>首页</p>
    </div>
    <div class="bar" :class="[tag == 2 && 'active' ]" @click="push('/pages/classify/classify')">
      <i class="icon icon2"></i>
      <p>分类</p>
    </div>
    <div class="bar" :class="[tag == 3 && 'active' ]" @click="push('/pages/shopping/shopping')">
      <i class="icon icon3"></i>
      <p>购物车</p>
    </div>
    <div class="bar" :class="[tag == 4 && 'active' ] " @click="push('/pages/my/my')">
      <i class="icon icon4"></i>
      <p>我的</p>
    </div>
    <!-- <a href="/pages/home/home" class="bar" :class="[tag == 5 && 'active' ]">
      <i class="icon icon5"></i>
      <p>4</p>
    </a> -->
  </div>
</template>
<script>
export default {
  props: {
    tag: {
      types: Number,
      default: 1
    }
  },
  methods:{
    push(url){
      this.$router.replace(url);
    }
  }
};
</script>

<style lang="sass" scoped>
  @import '~@/assets/css/mixin.sass'
  @mixin icon 
    margin: 0 auto
    text-align: center
    display: block
    // width: .6rem
    // height: .6rem
    background-size: 100%
  @mixin bg-size 
    background-size: 100%
    //高亮字体颜色
  @mixin color  
    color: $main-color
  #container1
    height: 98px
    padding: 2px 0
    position: fixed
    left: 0
    right: 0
    bottom: 0
    display: flex
    flex-wrap: wrap  
    // font-size: .55em
    font-size: 20px
    color: #afc1d7
    border-top: 1px solid $border-color  
    background: #fff!important
    z-index: 999
    text-align: center
    div
      color: #999999
    .active
      color: #EE7527!important
    .bar
      flex: 1
      padding-top: 10px
      p
        margin-top: 4px
      // padding-bottom: 5px;/*no*/
      i
        width: 46px
        height: 46px
      .icon1
        background: url('../assets/img/home/home3.png')
        background-size: 46px 46px
        // width: 42px
        // height: 42px
      .icon2
        +bg-img('home/home1.png')
        // width: 44px
        // height: 44px
      .icon3
        +bg-img('home/home2.png')
        // width: 44px
        // height: 44px
      .icon4
        +bg-img('home/a301.png')
        // width: 38px!important
        // height: 44px!important
      // .icon5
      //   +bg-img('home/footer5.png')
      .icon
        +icon 
      &.active .icon1
        +bg-img('home/home.png')
        +bg-size
      &.active .icon2
        +bg-img('home/fl.png')
        +bg-size
      &.active .icon3
        +bg-img('shopping/gwc.png')
        +bg-size
      &.active .icon4
        +bg-img('home/gr1.png')
        +bg-size

        
</style>


