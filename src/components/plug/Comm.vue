<template>
	<div class="content" style="background-color:#fff;">
		<mt-cell title="书评" :value="totalCount+'人评论'" is-link class="mt-cell">
		</mt-cell>
		<div class="comments">
			<div class="comment" v-for="(r,index) in reviews" v-if="index < 3" @click="commentDetails(r)">
				<div class="bCom">
					<img :src="r.author.avatar | staticUrl">
				</div>
				<div class="rCom">
					<p style="color:#2399bf">{{r.author.nickname}}</p>
					<p class="p2">{{r.content}}</p>
					<p class="wsp">
						<span>{{r.commentCount}}回复</span>
						<span>{{r.created | fmtDate('yyyy-MM-dd')}}</span>
					</p>
				</div>
			</div>
		</div>
	</div>
</template>
<script>
import { Indicator } from 'mint-ui';
import api from '../../api/api';
export default {
	name: 'bookDs',
	props: {
		bId: String
	},
	data(){
		return {
			reviews: [],
      totalCount: '',
		}
	},
	created(){
		this.getHotReview();
	},
	methods:{
		getHotReview() {
      api.getHotReview(this.bId)
        .then((res) => {
          this.reviews = res.data.reviews;
          this.totalCount = res.data.total;
        });
    },
    commentDetails(r) {
    	console.log(r)
      this.$router.push({
        name: 'comment',
        params: { cid: r._id }
      });
    },
	}
}

</script>
<style lang="less" scoped>
.wsp {
	font-size: 12px;
	color: #666;
	padding-bottom: 0.5rem;
	span:first-child {
		padding-right: 0.5rem;
	}
}

.comment {
	clear: both;
	overflow: hidden;
}

.bCom {
	float: left;
	padding-left: 1rem;
	width: 18%;
	img {
		width: 3rem;
		height: 3rem;
		border-radius: 1.5rem;
	}
}

.rCom {
	float: right;
	font-size: 14px;
	border-bottom: 1px solid #ddd;
	margin-bottom: 1rem;
	width: 75%;
	p {
		width: 226px;
		word-break: break-all;
	}
}

</style>
