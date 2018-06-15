<template>
	<div class="bookDs">
		<div class="bookDe">
			<div class="books">
				<div class="bLeft">
					<img :src="obj.cover | staticUrl" class="bImg">
				</div>
				<div class="bRight">
					<div>{{obj.title}}</div>
					<div class="sugge">{{obj.author}}</div>
					<div class="sugge">{{obj.minorCate}}</div>
					<div class="sugge">
						<div class="star-rating">
							<div class="star-rating-top" ref="star">
								<span>★</span>
								<span>★</span>
								<span>★</span>
								<span>★</span>
								<span>★</span>
							</div>
							<div class="star-rating-bottom">
								<span>★</span>
								<span>★</span>
								<span>★</span>
								<span>★</span>
								<span>★</span>
							</div>
						</div>
					</div>
					<div class="sugge"><span>{{obj.wordCount | convert}}</span></div>
				</div>
			</div>
		</div>
		<div class="nav">
			<div class="item3">
				<p class="p1">人气</p>
				<p>{{obj.latelyFollower}}</p>
			</div>
			<div class="item3">
				<p class="p1">留存率</p>
				<p>{{obj.retentionRatio+'%'}}</p>
			</div>
			<div class="item3">
				<p class="p1">日更/字</p>
				<p>{{obj.serializeWordCount}}</p>
			</div>
		</div>
		<div class="synopsis">
			<p>简介</p>
			<p class="p2" :style="bindDis" @click="slide">{{obj.longIntro}}</p>
			<i @click="slide" v-show="showDown" class="mintui mintui-xiangxia"></i>
		</div>
		<div class="content">
			<mt-cell title="目录" is-link class="mt-cell" @click.native="goRead(true)">
				<span>连载至{{obj.chaptersCount}}章</span>&nbsp;
				<span>更新于{{obj.updated | fmtDate('yyyy-MM-dd')}}</span>
			</mt-cell>
		</div>
	</div>
</template>
<script>
import { Indicator } from 'mint-ui';
import api from '../../api/api';
import { mapState, mapMutations } from 'vuex';
export default {
	name: 'bookDs',
	props: {
		bId: String
	},
	inject: ['goRead'],
	data() {
		return {
			obj: {},
			showDown: true,
			bindDis:{
				'display':'-webkit-box'
			}
		}
	},
	created() {
		this.getBook();
	},
	computed: {
		...mapState([
			'curBook'
		])
	},
	methods: {
		...mapMutations([
			'SET_CUR_BOOK',
			'ADD_BROWSE_RECORDS',
		]),
		getBook() {
			Indicator.open();
			api.getBook(this.bId)
				.then((res) => {
					Indicator.close();
					this.obj = res.data;
					let book = this.curBook;
					book.title = this.obj.title;
					book.author = this.obj.author;
					book.updated = this.obj.updated;
					book.cover = this.obj.cover;
					book.lastChapter = this.obj.lastChapter;
					book.longIntro = this.obj.longIntro;
					this.SET_CUR_BOOK(book);
					this.ADD_BROWSE_RECORDS(book);
					this.updated = this.obj.lastChapter + '   ' + this.obj.updated;
					this.getStar(res.data.rating.score);
				})
				.catch((error) => {
					console.log(error);
				})
		},
		slide() {
      if (this.showDown) {
        this.bindDis.display = 'block';
      } else {
        this.bindDis.display = '-webkit-box';
      }
      this.showDown = !this.showDown;
    },
		getStar(rating) {
			var star = this.$refs.star;
			star.style.width = (rating / 10) * 100 + '%';
		},
	}
}

</script>
<style lang="less" scoped>
.synopsis {
	background-color: #fff;
	padding: 1rem;
	text-align: left;
	margin-bottom: 0.5rem;
	i {
		position: relative;
		float: right;
		right: -13px;
		top: -21px;
	}
}

.bookDe {
	background-color: #000;
	padding-top: 2.5rem;
}

</style>
