<template>
  <div>
    <van-button type="primary" size="large" @click="onclick">点击</van-button>
    <vTestChild v-if="step==1" ref="testchild"></vTestChild>
  </div>
</template>

<script>
import vTestChild from '../component/testChild'
export default {
  data () {
    return {
      step:0
    }
  },
  components: {
    vTestChild
  },
  methods:{
    onclick(){
      this.step = 1
      this.$nextTick(function(){
        this.$refs.testchild.onShow('aaa')
      })
      
    }
  }
}
</script>

<style>

</style>
