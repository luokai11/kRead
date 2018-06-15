<template>
	<div class="flex fixed items">
		<div class="item2 bs" @click="goRead(false)">
			<p>立即阅读</p>
		</div>
		<div class="item2 bs" @click="add" v-show="!isAdd">
			<i class="mintui mintui-jiarushujia"></i>
			<p>加入书架</p>
		</div>
		<div class="item2 bs opa" v-show="isAdd">
			<i class="mintui mintui-jiarushujia"></i>
			<p>已加入</p>
		</div>
	</div>
</template>
<script>
import api from '../../api/api';
import { mapState, mapMutations } from 'vuex';
export default {
	inject: ['goRead'],
	data() {
		return {
			isAdd: false
		}
	},
	created() {
		this.isAdd = this.curBook.isShelf;
	},
	computed: {
		...mapState([
			'curBook'
		])
	},
	methods: {
		...mapMutations([
			'SET_CUR_BOOK',
			'ADD_SHELF',
			'DEL_BROWSE_RECORDS'
		]),
		add() {
			let book = this.curBook;
			book.isShelf = true;
			this.isAdd = true;
			this.SET_CUR_BOOK(book);
			this.ADD_SHELF(book);
			this.DEL_BROWSE_RECORDS(book.id);
		},
	},
	watch: {
		'$route': function() {
			this.isAdd = this.curBook.isShelf;
		}
	}
}

</script>
<style lang="less" scoped>
.opa {
	opacity: 0.5;
}

</style>
