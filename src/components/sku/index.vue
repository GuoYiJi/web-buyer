<template>
  
  <zan-popup type="bottom" :show="visible">
    <div class="sku">
      <div class="sku-content">
        <div class="goods">
          <div class="goods-img">
            <img :src="goods.image"  mode="aspectFill" />
          </div>
          <div class="goods-cont">
            <div class="goods-cont__price">
              <span class="goods-cont__price--default">￥{{goods.sellPrice}}</span>
              <span class="goods-cont__price--group" v-if="goods.ping && goods.ping.price">拼团价:￥{{goods.ping.price}}</span>
            </div>
            
            <p class="pop_title zan-ellipsis" v-text="goods.name"></p>
            <div class="van-sku__close-icon van-icon van-icon-close" @click="handleToggle"></div>
          </div>
        </div>
        <scroll-view scroll-y class="sku-content--scroll">
          
          <div class="kuang_2">
            <p class="k2_title">颜色</p>
            <div class="k2_btnk">
              <span class="k2_btn" :class="{active : index === colorIndex }" v-for="(item, index) in skuAttr" :key="index" @click="selectColorSpec(index,item.colorVal)">
                <i>{{item.colorVal}}</i>
                <strong class="counts" v-show="item.sizeNums">{{item.sizeNums}}</strong>
                <!--<span class="k2_dian">0</span>-->
              </span>
            </div>
          </div>
          <div class="kuang_3">
            <ul class="s_item_box box1">
              <li class="s_item">尺码</li>
              <li class="s_item">购买数量</li>
            </ul>
            <ul class="s_item_box" v-for="(item, index) in skuAttr[colorIndex] ? skuAttr[colorIndex].sizeArray : []" :key="index">
              <li class="s_item">{{item.sizeVal}}</li>
              <li class="s_item">
                <span class="minus" @click="handleMinusClick(colorIndex, index)"></span>
                <span class="count">{{item.sizeNum}}</span>
                <span class="add" @click="handleAddClick(colorIndex, index)"></span>
              </li>
            </ul>
          </div>
          <div class="kuang_4">
            <p class="k4_title">已选</p>
            <p class="k4_text" v-for="(item,index) in sku" :key="index">{{item.colorVal}}：<span v-for="(item, i) in item.sizeArray" :key="i">{{item.sizeVal}}/{{item.sizeNum}}件;</span></p>
            <!--<p class="k4_text">红色：S/1件；M/1件</p>-->
          </div>
        </scroll-view>
        <div class="sku-footer">
          <span class="sku-footer__btn" @click="handleConfirmClick()">确定</span>
        </div>
      </div>
      
    </div>
  </zan-popup>
</template>
<script>
  import cloneDeep from '@/assets/js/cloneDeep';
  export default {
    props: {
      visible: {
        type: Boolean,
        default: false
      },
      goods: {
        type: Object,
        default: () => {
        }
      },
      sku: {
        type: Array,
        default: () => []
      }
    },
    watch: {
      sku(val) {
        this.skuAttr = cloneDeep(val);
      }
    },
    data() {
      return {
        colorIndex: 0,
        skuAttr: [],
        hasAction: false
      }
    },
    methods: {
      handleToggle() {
        this.$emit('value', false);
      },
      handleMinusClick(colorIndex, sizeIndex) {
        let num = this.skuAttr[colorIndex].sizeArray[sizeIndex].sizeNum
        if (num === 0) {
          return false
        } else {
          this.skuAttr[colorIndex].sizeArray[sizeIndex].sizeNum--
        }
        this.hasAction = true;
        this.skuAttr[colorIndex].sizeNums--;
      },
      handleAddClick(colorIndex, sizeIndex) {
        let num = this.skuAttr[colorIndex].sizeArray[sizeIndex].sizeNum;
        if (num >= 100) {
          return false
        } else {
          this.skuAttr[colorIndex].sizeArray[sizeIndex].sizeNum++;
        }
        this.hasAction = true;
        this.skuAttr[colorIndex].sizeNums++;
      },
      handleConfirmClick() {
        this.$emit('confirm', this.skuAttr, this.sku);
        this.handleToggle();
      },
      selectColorSpec(index) {
        this.colorIndex = index;
      }
    }
  }
</script>