<template>
	<div class="content" style="margin-bottom:3rem;">
		<mt-cell title="同类推荐"  class="mt-cell">
		</mt-cell>
		<div style="overflow:hidden">
			<div class="boxs sx" style="margin-bottom: -6px;overflow-x: scroll;">
				<div class="box pdr" v-for="(b,index) in bookList" @click="details(b)">
					<div>
						<img :src="b.cover | staticUrl">
					</div>
					<div>
						{{b.title}}
					</div>
				</div>
			</div>
		</div>
	</div>
</template>
<script>
import api from '../../api/api';
export default {
	props: {
		bId: String
	},
	data() {
		return {
			bookList:[]
		}
	},
	created() {
		this.getRecommend();
	},
	methods: {
		getRecommend() {
			api.getRecommend(this.bId)
				.then((res) => {
					this.bookList = res.data.books;
				});
		},
		details(b) {
      this.$router.push({
        name: 'bookDetails',
        params: { id: b._id }
      });
    }
	}
}

</script>
<style lang="less" scoped>


</style>
