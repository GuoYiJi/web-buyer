<style lang="scss">
  @import '~@/assets/css/mixin';
  .mod-list {
    li {
      position: relative;
      padding: 40px 32px 20px;
    }
    .li_line {
      font-size: 28px;

      color: #333;
    }
    .tags_selection {
      padding-left: 32px;
      &:after {
        display: block;
        content: "";
        clear: both;
      }
    }
    .option {
      box-sizing: border-box;
      float: left;
      width: 25%;
      padding-right: 26px;
      height: 44px;
      line-height: 44px;
      margin-bottom: 20px;
      font-size: 24px;
      overflow: hidden;
      text-align: center;
      a {
        position: relative;
        display: block;
        padding: 0 5px;
        color: #666;
        background-color: #F2F2F2;
        border-radius: 2px;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
      &.selected a {
        color: #fff;
        background-color: #EE7527;
      }
    }

    .loadmore {
      margin-top: 20px;
      border-top: 1px solid #E5E5E5;
      border-bottom: 1px solid #E5E5E5;
      height: 54px;
      line-height: 54px;
      text-align: center;
      color: #666;
      font-size: 24px;
      &__icon {

        @include bg-img('home/xiala.png');
        display: inline-block;
        vertical-align: middle;
        width: 18px;
        height: 11px;
      }
    }

    .filterlayer_price {
      padding: 0 32px;
      &_choices {
        display: flex;
      }
      &_choice {
        flex: 1;
        margin-right: 26px;
        height: 44px;
        line-height: 44px;
        margin-bottom: 20px;
        font-size: 24px;
        overflow: hidden;
        text-align: center;
        color: #666;
        background-color: #F2F2F2;
        &:last-child {
          margin-right: 0;
        }
        &.active {

          color: #fff;
          background-color: #EE7527;
        }
      }
    }
    .filterlayer_price_area {
      display: flex;
      input {
        padding: 0 10px;
        flex: 1;
        height: 44px;
        line-height: 44px;
        font-size: 24px;
        color: #333;
        background-color: #F2F2F2;
        text-align: center;
      }
      &_hyphen {
        position: relative;
        height: 44px;
        width: 60px;
        &:after {
          content: "";
          position: absolute;
          top: 50%;
          left: 50%;
          margin-left: -10px;
          width: 20px;
          height: 2px;
          background-color: #e5e5e5;
        }
      }
    }
  }
</style>
<template>
  <ul class="mod-list">
    <li>
      <div class="list_inner li_line">
        <div class="big">{{title}}</div>
      </div>
    </li>
    <li class="filterlayer_price" v-if="type === 'goods'">
      <div class="filterlayer_price_choices">
        <div class="filterlayer_price_choice" :class="{ 'active': currentChoice === index }" v-for="(choice, index) in choices" :key="index" @click="handleChoiceClick(index)">
          <block v-if="choice.section">
            {{choice.min}}以上
          </block>
          <block v-else>
            {{choice.min}}-{{choice.max}}
          </block>
          
        </div>
      </div>
      <div class="filterlayer_price_area">
        <input type="number" placeholder="最低价" :value="choice.min" v-model="choice.min" @input="handleInputChange">
        <div class="filterlayer_price_area_hyphen"></div>
        <input type="number" placeholder="最高价" :value="choice.max" v-model="choice.max" @input="handleInputChange">
      </div>
    </li>
    <div class="tags_selection" v-else>
      <div class="option" v-for="(item, index) in list" :key="index" @click="handleItemClick(index)" :class="{ 'selected': current === index }" v-show="!(index > 7)"><a>{{ item.name }}</a></div>
    </div>

    <div class="loadmore" v-if="list.length > 8">
      <span v-if="!hasMoreClick">查看更多
        <i class="loadmore__icon"></i>
      </span>
      <span v-else>点击收起</span>
    </div>
  </ul>
</template>
<script>
  export default {
    props: {
      type: String,
      title: String,
      list: {
        type: Array,
        default: () => []
      }
    },
    data() {
      return {
        hasMoreClick: false,
        current: -1,
        currentChoice: -1,
        choice: {
          min: '',
          max: ''
        },
        choices: [
          { min: '0', max: '70' },
          { min: '70', max: '150' },
          { min: '150', max: '', section: true }
        ]
      }
    },
    methods: {
      handleItemClick(e) {
        if (e === this.current) {
          e = -1;
        }
        this.current = e;
        console.log(e);
        this.$emit('change', e);
      },
      handleChoiceClick(index) {
        if (index === this.currentChoice) {
          index = -1
        }
        this.currentChoice = index;
        this.choice = index === -1 ? { min: '', max: '' } : {
          ...this.choices[index]
        }

        this.$emit('change', index);
      },
      handleInputChange(e) {
        this.currentChoice = -1;
      }
    }
  }
</script>