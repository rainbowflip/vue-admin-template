<template>
 <div class="components-container">
  <split-pane split="horizontal" @resize="resize">
    <template slot="paneL">
      <split-pane split="vertical">
        <template slot="paneL">
          <div class="top-container">
            <tableSelect :results="results"></tableSelect>
            <pagination align="center" v-show="total>0" :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.limit" @pagination="fetchData" />
          </div>
        </template>
        <template slot="paneR">
          <div class="bottom-container">
            <video controls autoplay class="deep-video" v-bind:src="url"></video>
          </div>
        </template>
      </split-pane>
    </template>
    <template slot="paneR">
      <div class="left-container">
        
      </div>
    </template>
  </split-pane>
 </div>
</template>

<script>
  import splitPane from 'vue-splitpane'
  import tableSelect from '@/components/table/table_select'
  import Pagination from '@/components/Pagination' 

  export default {
    name: 'SplitpaneDemo',
    components: { splitPane,tableSelect,Pagination },
    data (){
      return{
        results:[{
          date: '2016-05-03',
          name: 'test',
          address: 'test.mp4'
        }, {
          date: '2016-05-02',
          name: 'test',
          address: 'test.mp4'
        }, {
          date: '2016-05-04',
          name: 'test',
          address: 'test.mp4'
        }],
        total:0,
        listLoading: true,
        listQuery: {
          page: 1,
          limit: 30,
          importance: undefined,
          title: undefined,
          type: undefined,
          sort: '+id'
        },
        url:"http://localhost:9528/#/static_video/videos/11.mkv"
      }
    },
    created() {
      this.fetchData()
    },
    methods: {
      resize() {
        // console.log(this.$router)
        console.log('resize')
      },
      playvideo(url) {

      },
      fetchData() {
        this.total = this.results.length;
        
      },
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