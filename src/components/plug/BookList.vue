<template>
  <div>
    <div class="books" v-for="(b,index) in bookList" @click="goDetails(b)">
      <div class="bLeft">
         <img :src="b.book ? b.book.cover : b.cover | staticUrl" :class="[imgClass]">
      </div>
      <div class="sug tf">
        <div :class="[wdClass]">{{b.book ? b.book.title : b.title}}</div>
        <div class="word" :class="[wdClass]">{{b.book ? b.book.shortIntro : b.shortIntro}}</div>
        <div class="wsp" :class="[wdClass]">
          <span class="at">
            <i class="mintui mintui-zuozhe"></i>{{b.book ? b.book.author : b.author}}
          </span>
          <span class="sca">
            <span>{{b.book ? b.book.majorCate :  b.majorCate}}</span>
            <span>{{b.book ? b.book.latelyFollower : b.latelyFollower | convert}}人气</span>
          </span>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  export default {
    props:{
      bookList:Array,
      imgClass:String,
      wdClass:String
    },
    methods:{
      goDetails(obj) {
        let id = obj.book ? obj.book._id : obj._id;
        this.$router.push({
          name: 'bookDetails',
          params: { id: id}
        });
      },
    }
  }
</script>
