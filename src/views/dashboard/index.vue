<template>
  <div class="dashboard-container">
    <!-- <div class="dashboard-text">name:{{ name }}</div>
    <div class="dashboard-text">roles:<span v-for="role in roles" :key="role">{{ role }}</span></div> -->
    <democard :demos="demos"></democard>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import democard from '@/components/democard/index'

export default {
  name: 'Dashboard',
  components:{ democard },
  data(){
    return{
      demos:[
          {
              'img':'static/images/王者荣耀角色.jpg',
              'alt':'img04',
              'url':'/demo/gameImg',
              'title':'王者荣耀的人物与场景检测',
              'details1':'高效检测游戏画面中出现的',
              'details2':'角色和场景并且直观展示'
          },
          {
              'img':'static/images/portfolio_pic3.jpg',
              'alt':'img04',
              'url':'/demo/gameImg',
              'title':'游戏视频的人物与场景检测(内部使用)',
              'details1':'复杂游戏数据展示',
              'details2':'快与我们取得联系，获得测试资格'
          },
          {
              'img':'static/images/food2.jpg',
              'alt':'img04',
              'url':'/demo/gameImg',
              'title':'食谱检测',
              'details1':'分析图像中出现的食物',
              'details2':'并且直观展示'

          },
          {
              'img':'static/images/portfolio_pic5.jpg',
              'alt':'img04',
              'url':'/demo/gameImg',
              'title':'安全帽检测',
              'details1':'准确高效的检测图像中出现的',
              'details2':'安全帽佩戴情况并且直观展示'

          }
      ]
    }
  },
  computed: {
    ...mapGetters([
      'name',
      'roles'
    ])
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.dashboard {
  &-container {
    margin: 30px;
  }
  &-text {
    font-size: 30px;
    line-height: 46px;
  }
}
</style>
