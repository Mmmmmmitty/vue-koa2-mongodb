<template>
  <div>{{msg}}</div>
</template>

<script>
export default {
  data () {
    return {
      msg:'222'
    }
  },
  created(){
    console.log('created',this.msg)
  },
  methods:{
    onShow(msg){
      this.$nextTick(function(){
        this.msg = msg
      })
      
      console.log('onShow',this.msg)
    }
  }
}
</script>

<style>

</style>
