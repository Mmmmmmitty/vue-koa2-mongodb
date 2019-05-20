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
    <!--AD banner area-->
    <div class="ad-banner">
      <img v-lazy="adBanner.PICTURE_ADDRESS" width="100%">
    </div>
    <!--swipwer area-->
    <div class="swiper-area">
      <van-swipe :autoplay="3000">
        <van-swipe-item v-for="(banner,index) in bannerPicArray" :key="index">
          <img class="swipe-item-img" v-lazy="banner.image" width="100%">
        </van-swipe-item>
      </van-swipe>
    </div>
    <div class="type-bar">
      <div v-for="(cate,index) in category" :key="index">
        <img v-lazy="cate.image" width="90%">
        <span>{{cate.mallCategoryName}}</span>
      </div>
    </div>
    <!--Recommend goods area-->
    <div class="recommend-area">
      <div class="recommend-title">商品推荐</div>
      <div class="recommend-body"></div>
    </div>
    <!--swiper-->
    <swiper :options="swiperOption">
      <swiper-slide v-for=" (item ,index) in recommendGoods" :key="index">
        <div class="recommend-item">
          <img :src="item.image" width="80%">
          <div>{{item.goodsName}}</div>
          <div>￥{{item.price | moneyFilter}} (￥{{item.mallPrice | moneyFilter}})</div>
        </div>
      </swiper-slide>
    </swiper>
    <!--floor one area-->
    <floorComponent :floorData="floor1" :floorTitle="floorName.floor1"></floorComponent>
    <floorComponent :floorData="floor2" :floorTitle="floorName.floor2"></floorComponent>
    <floorComponent :floorData="floor3" :floorTitle="floorName.floor3"></floorComponent>
  </div>
</template>

<script>
import axios from "axios";
import url from "@/serviceAPI.config.js";
import "swiper/dist/css/swiper.css";
import { toMoney } from "@/filter/moneyFilter.js";
import { swiper, swiperSlide } from "vue-awesome-swiper";
import floorComponent from "../component/floorComponent";
export default {
  data() {
    return {
      swiperOption: {
        autoplay: false
      },
      bannerPicArray: [],
      adBanner: "",
      recommendGoods: [],
      category: [],
      floor1: [], //楼层1的数据
      floor2: [], //楼层1的数据
      floor3: [], //楼层1的数据
      floorName: {} //楼层名称
    };
  },
  components: {
    swiperSlide,
    swiper,
    floorComponent
  },
  created() {
    axios({
      url: url.getShoppingMallInfo,
      method: "get"
    })
      .then(response => {
        if (response.status == 200) {
          console.log(response.data.data);
          this.adBanner = response.data.data.advertesPicture; //获得广告图片
          this.bannerPicArray = response.data.data.slides; //轮播图片
          this.category = response.data.data.category;
          this.recommendGoods = response.data.data.recommend; //推荐商品
          this.floorName = response.data.data.floorName; //楼层名称
          this.floor1 = response.data.data.floor1; //楼层1数据
          this.floor2 = response.data.data.floor2; //楼层2数据
          this.floor3 = response.data.data.floor3; //楼层3数据
        }
      })
      .catch(error => {});
  },
  filters: {
    moneyFilter(money) {
      return toMoney(money);
    }
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
.swipe-item-img {
  display: inline-block;
  width: 7.5rem;
  height: 4.2rem;
}
.type-bar {
  background-color: #fff;
  margin: 0 0.2rem 0.2rem 0.2rem;
  border-radius: 0.3rem;
  font-size: 0.28rem;
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
}
.type-bar div {
  padding: 0.3rem;
  font-size: 0.24rem;
  text-align: center;
}
.recommend-area {
  background-color: #fff;
  margin-top: 0.1rem;
}
.recommend-title {
  border-bottom: 1px solid #eee;
  font-size: 0.28rem;
  padding: 0.1rem;
  color: #e5017d;
}
.recommend-body {
  border-bottom: 1px solid #eee;
}

.recommend-item {
  width: 99%;
  border-right: 1px solid #eee;
  font-size: 12px;
  text-align: center;
}
</style>
