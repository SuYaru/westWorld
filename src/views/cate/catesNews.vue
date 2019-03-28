<template>
  <div class="catesNews">
    <router-view></router-view>
      这里是新闻

  </div>
</template>

<script>
export default {
    methods:{
			navigateToHome(){
				this.$router.push({name:'cate'});
			}
		}
}
</script>
