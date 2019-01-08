<template>
 <div class="components-container">
  <split-pane split="horizontal" @resize="resize">
    <template slot="paneL">
      <split-pane split="vertical">
        <template slot="paneL">
          <div class="top-container">
            <tableSelect :results="results" :listLoading="listLoading" @changesrc="changesrc"></tableSelect>
            <pagination align="center" v-show="total>0" :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.limit" @pagination="fetchData" />
          </div>
        </template>
        <template slot="paneR">
          <div class="bottom-container">
            <video controls autoplay class="deep-video" :src="url"></video>
          </div>
        </template>
      </split-pane>
    </template>
    <template slot="paneR">
      <div class="left-container">
        <el-progress :text-inside="true" :stroke-width="18" v-if="running" :percentage="percentage"></el-progress>
      </div>
    </template>
  </split-pane>
 </div>
</template>

<script>
  import { getResultsList,initResult } from '@/api/table'
  import splitPane from 'vue-splitpane'
  import tableSelect from '@/components/table/table_select'
  import Pagination from '@/components/Pagination' 

  export default {
    name: 'SplitpaneDemo',
    components: { splitPane,tableSelect,Pagination },
    data (){
      return{
        results:[],
        total:0,
        listLoading: true,
        running: false,
        interval: null,
        listQuery: {
          page: 1,
          limit: 30,
          importance: undefined,
          title: undefined,
          type: undefined,
          id: '',
          sort: '+id'
        },
        percentage:0,
        url:"http://localhost:9528/#/static_video/videos/11.mkv"
      }
    },
    created() {
      console.log(this.$route)
      if(this.$route.query.id){
        this.listQuery.id = this.$route.query.id
        this.url = this.$route.query.url
      }
      this.listLoading = false
      console.log("this.listquery",this.listQuery)
      initResult(this.listQuery).then(response=>{
          console.log("***********",response.data)
          let res = response.data
          this.listLoading = false
          this.results = res.items
          this.running = res.running
          if(this.running){
            try {
              this.percentage = parseFloat((res.currentframe*100 / res.totalframes).toFixed(2))
            } catch (error) {
              this.percentage = 0
            }
            if(this.interval==null){
              this.interval = setInterval(()=>{this.fetchData()},5000)
            }
          }else{
            clearInterval(this.interval)
          }
      })
      // this.fetchData()
    },
    methods: {
      resize() {
        // console.log(this.$router)
        console.log('resize')
      },
      playvideo(url) {

      },
      initres() {

      },
      fetchData() {
      
        // this.total = this.results.length;
        getResultsList(this.listQuery).then(response => {
          let res = response.data
          console.log("***********",res)
          this.results = [...this.results,...res.items]
          this.running = res.running
          if(this.running){
            try {
              this.percentage = parseFloat((res.currentframe*100 / res.totalframes).toFixed(2))
            } catch (error) {
              this.percentage = 0
            }
            
            if(this.interval==null){
              this.interval = setInterval(()=>{this.fetchData()},5000)
            }
          }else{
            clearInterval(this.interval)
          }
        })
      },
      changesrc(val){
        console.log("fufufufu")
        this.url = "http://ai.gemfield.org:5667/"+val
      }
    },
    destroyed(){
      clearInterval(this.interval)
    }
  }
</script>
  
<style  scoped>
  .components-container {
    position: relative;
    height: calc(100vh - 50px);
  }
  .left-container,.right-container,.bottom-container{
    overflow: hidden;
    
  }
  ::-webkit-scrollbar {/*滚动条整体样式*/
        width: 8px;     /*高宽分别对应横竖滚动条的尺寸*/
        height: 1px;
    }
  ::-webkit-scrollbar-thumb {/*滚动条里面小方块*/
        border-radius: 10px;
          -webkit-box-shadow: inset 0 0 5px rgba(0,0,0,0.2);
        background: #535353;
    }
  ::-webkit-scrollbar-track {/*滚动条里面轨道*/
        -webkit-box-shadow: inset 0 0 5px rgba(0,0,0,0.2);
        border-radius: 10px;
        background: #EDEDED;
    }
  .left-container {
    /* background-color: #F38181; */
    height: 100%;
  }

  .right-container {
    /* background-color: #FCE38A; */
    height: 200px;
  }

  .top-container {
    /* background-color: #FCE38A; */
    width: 100%;
    height: 100%;
    overflow: scroll;
  }

  .bottom-container {
    width: 100%;
    /* background-color: #95E1D3; */
    height: 100%;
    
    text-align: center;
  }

  .deep-video{
    margin:0 auto;
    max-width: 100%;
    height:100%;
    vertical-align: middle;
  }
</style>