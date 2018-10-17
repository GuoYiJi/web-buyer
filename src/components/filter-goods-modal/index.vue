<template>

  <zan-popup type="right" :show="show" @close="handleToggle">
    
    <div class="sf_layer_con">
      <div class="title" @click="handleToggle">
        <i class="zuo"></i>
        <span class="screen">筛选</span>
      </div>
      <div class="item-box">
        <mod-list :list="tabsList1" title="品类" @change="handleModChange(arguments, 0)" v-if="hasLabel" ref="modList1Ref"></mod-list>
        <mod-list :list="tabsList2" title="货期情况" @change="handleModChange(arguments, 1)" ref="modList2Ref"></mod-list>
        <mod-list :list="tabsList3" title="价格区间" type="goods" @change="handleModChange(arguments, 2)" ref="modListPriceRef"></mod-list>
      </div>
      <div class="f_btn">
        <p class="reset" @click="handleRest">重置</p>
        <p class="confirm" @click="handleConfirm">确定</p>
      </div>
    </div>
  </zan-popup>
</template>
<script>
  import modList from '@/components/mod_list/index';
  import API from '@/api/httpShui';
  export default {
    props: {
      show: {
        type: Boolean,
        default: false
      },
      hasLabel: {
        type: Boolean,
        default: false
      }
    },
    components: {
      'mod-list': modList
    },
    data() {
      return {
        labelId: '',
        deliveryId: '',
        tabsList1: [], // 一级分类
        tabsList2: [], // 货期情况
        tabsList3: []
      }
    },
    methods: {
      handleConfirm() {
        const { labelId, deliveryId } = this;
        const { min, max } = this.$refs.modListPriceRef.choice;
        if (labelId || deliveryId || min) {
          this.$emit('confirm', {
            labelId,
            deliveryId,
            min, max
          });
        }
        this.handleToggle();
      },
      _reset() {
        if (this.hasLabel) {
          this.$refs.modList1Ref.current = -1;
        }
        this.$refs.modList2Ref.current = -1;
        this.$refs.modListPriceRef.choice = { min: null, max: null };
      },
      handleRest() {
        // this.handleToggle();
        if (this.hasLabel) {
          this.$refs.modList1Ref.current = -1;
        }
        this.labelId = '';
        this.deliveryId = '';
        this.min = null;
        this.max = null;
        
        this.$refs.modList2Ref.current = -1;
        this.$refs.modListPriceRef.currentChoice = -1;
        this.$refs.modListPriceRef.choice = { min: null, max: null };
        this.$emit('rest');
      },
      handleModChange(rest, type) {
        const index = rest.length ? rest[0] : 0;
        switch (type) {
          case 0:
            this.labelId = this.tabsList1[index].id;
            break;
          case 1:

            this.deliveryId = this.tabsList2[index].id;
            break;
          case 2:
            break;
        }
      },
      handleToggle() {
        this.$emit('toggle', !this.show);
      }
    },
    mounted() {
      const { hasLabel } = this;
      if (hasLabel) {
        API.getTabs({types: '2'})
          .then(res => {
            this.tabsList1 = res.data;
          })
      }
      API.getTabs({types: '4'})
        .then(res => {
          this.tabsList2 = res.data;
        })
    }
  }
</script>