<template>
  <div class="shopping-mall">
    <!--search bar layout-->
    <div class="search-bar">
      <van-row>
        <van-col span="3">
          <img src="../../assets/images/location.png" width="80%" class="location-icon">
        </van-col>
        <van-col span="16">
          <input type="text" class="search-input">
        </van-col>
        <van-col span="5">
          <van-button size="mini">查找</van-button>
        </van-col>
      </van-row>
    </div>
    <!--swipwer area-->
    <div class="swiper-area">
      <van-swipe :autoplay="3000">
        <van-swipe-item v-for="(banner,index) in bannerPicArray" :key="index">
          <img class="swipe-item-img" v-lazy="banner.imageUrl" width="100%">
        </van-swipe-item>
      </van-swipe>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import swipe1 from "../../assets/images/swipe/swipe1.jpg";
import swipe2 from "../../assets/images/swipe/swipe2.jpg";
import swipe3 from "../../assets/images/swipe/swipe3.jpg";
export default {
  data() {
    return {
      bannerPicArray: [
        {
          imageUrl: swipe1
        },
        {
          imageUrl: swipe2
        },
        {
          imageUrl: swipe3
        }
      ]
    };
  },
  created(){
    axios({
        url: 'https://www.easy-mock.com/mock/5cd1577f6011ab3ddac90971/SmileVue/index',
        method: 'get',
    })
    .then(response => {
        console.log(response)
    })
    .catch((error) => {     
    })
  }
};
</script>

<style scoped>
.shopping-mall {
  font-size: 0.28rem;
}
.search-bar {
  height: 0.88rem;
  background-color: #e5017d;
  line-height: 0.88rem;
}
.search-input {
  width: 100%;
  height: 0.52rem;
  border-top: 0px;
  border-left: 0px;
  border-right: 0px;
  border-bottom: 1px solid 1px !important ;
  background-color: #e5017d;
  color: #fff;
}
.location-icon {
  display: inline-block;
  vertical-align: middle;
}
.swiper-area {
  width: 100%;
  clear: both;
}
.swipe-item-img{
  display: inline-block;
  width: 7.5rem;
  height: 4.2rem;
}
</style>
