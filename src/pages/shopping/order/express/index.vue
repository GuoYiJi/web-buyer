<style lang="scss" scoped>
  @import './index.scss';
</style>
<template>
  <div class="self-fetch-address">
    <div class="van-list">
      <div class="van-radio-group">
        <div class="van-cell van-cell--clickable" v-for="(item, index) in list" :key="index">
          <div class="van-cell__value van-cell__value--alone">
            <div class="van-radio">
              <span class="van-radio__input">
                <input class="van-radio__control" type="radio" />
                <i class="van-icon van-icon-check"></i>
              </span>
              <span class="van-radio__label">
                <div class="self-fetch-address__title">
                  <span>{{ item.name }}</span>
                </div>
                <div class="self-fetch-address__detail">
                  {{ item.value }}
                </div>
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  import API from '@/api/httpShui';
  export default {
    data() {
      return {
        list: [],
        loading: true
      }
    },
    methods: {
      fetch() {
        this.loading = true;
        API.selectTakeList()
          .then(res => {
            const { data } = res;
            this.list = data;
          })
          .finally(() => {
            this.loading = false;
          })
      }
    },
    mounted() {
      this.fetch();
    } 
  }
</script>