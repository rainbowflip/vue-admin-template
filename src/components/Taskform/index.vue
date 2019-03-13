<template>
    <div style="width:100%">
        <el-row class="el-row-folder" :gutter="20">
            <el-col :span="7" >
                <span>分类</span><br>
                <div style="margin:10px">
                    <el-button size='mini' @click="toggleall">全选</el-button>

                    <el-checkbox-group v-model="checkedfolders" @change="showfiles()">
                        <el-checkbox v-for="folder in folders" :label="folder" :key="folder">{{folder}}</el-checkbox>
                    </el-checkbox-group>
                </div>
            </el-col>
            <el-col :span="7">
                <span>视频文件</span><br>
                <div style="margin:10px">
                   <el-input placeholder="请输入内容" v-model="searchInput" size="mini" class="input-with-select">
                        <el-button slot="append" icon="el-icon-search"></el-button>
                    </el-input>
                    <el-radio-group v-model="checkedfile" @change="gethistorys()">
                        <el-radio  v-for="(value,key) in files" :label="key" :key="key">{{ key }}</el-radio>
                    </el-radio-group>
                </div>

            </el-col>
            <el-col :span="10">
                <el-button :disabled="disableVal" @click="set_to_start">分析左侧选中文件</el-button>
                <el-upload
                    class="upload-demo"
                    drag
                    action="https://jsonplaceholder.typicode.com/posts/"
                    multiple
                    v-if="0">
                    <i class="el-icon-upload"></i>
                    <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
                    <!-- <div class="el-upload__tip" slot="tip">只能上传jpg/png文件，且不超过500kb</div> -->
                </el-upload>
            </el-col>
        </el-row>
        <el-row class="el-row-history">
            <el-col :span="24">
                <!-- <div style="margin: 10px">
                    <el-button size='small' type="text" disabled>历史记录</el-button>
                    <el-button :loading="downloadLoading" class="filter-item" size='small' type="primary" icon="el-icon-download" @click="handleDownload"> 导出表单 </el-button>
                </div> -->
                <Tasklist ref="tasklist"></Tasklist>
            </el-col>
        </el-row>
    </div>
</template>

<script>
import { getfolder,getfiles } from "@/api/walkdir"
import { set_and_start } from "@/api/taskcontrol"
import Tasklist from "@/components/table/index"

export default {
    name:"filestree",
    components:{ Tasklist },
    data (){
        return{
            tag:"",
            checkedfolders:[],
            folders:[],
            checkedfile:'',
            files:{},
            downloadLoading:false,
            searchInput:"",
            selectall:false
        }
    },
    // props:['filestree']
    created() {
        this.tag = this.$route.query.tag
        getfolder({"tag":this.tag}).then(response=>{
            this.folders = response.data.folders
            this.checkedfolders = []
            this.$refs.tasklist.listQuery.tag = this.$route.query.tag
            console.log(this.$refs.tasklist.listQuery)
        })
    },
    computed :{
        disableVal: function(){
            console.log("this.checkedfile == ''")
            return this.checkedfile == ""
        }
    },
    // watch:{
    //     checkedfolders:function(){
    //         console.log("watch watch")
    //         showfiles()
    //         }
    // },
    methods :{
        showfiles() {
            console.log("showfiles-----",this.checkedfolders.length)
            if(this.checkedfolders.length > 0){
                getfiles({"tag":this.tag,"folders":this.checkedfolders}).then(response=>{
                    this.files = response.data.files
                })
            }else{
                this.checkedfile = ""
                this.files = ""
                this.$refs.tasklist.list = []
            }
        },
        gethistorys() {
            console.log("文件对应的历史纪录")
            console.log(this.checkedfile)
            this.$refs.tasklist.fetchData()
        },
        handleDownload() {
            this.downloadLoading = true
            console.log("下载历史纪录表格")
            setTimeout(()=>{
                this.downloadLoading = false
            },2000)
        },
        toggleall(){
            if(this.selectall){
                this.checkedfolders = []
            }else{
                this.checkedfolders = this.folders
            }
            this.selectall = !this.selectall
            this.showfiles()
        },
        set_to_start(){
            console.log("set_and_start")
            set_and_start({"tag":this.tag,"targetfile":this.files[this.checkedfile]}).then(response=>{

            })
        },
    }
}
</script>

<style>
  .el-row {
    margin:10px!important;
    padding:5px;
  }
  .el-row-folder {
    height:30vh;
  }
  .el-row-history {
    max-height:60vh;
  }
  .el-col {
    border-radius: 4px;
    height:100%;
    overflow: auto;    
    box-shadow: 0 2px 12px 0 rgba(0,0,0,.1);
  }
    .el-checkbox-group，el-radio-group{
        overflow: auto;
    }
  .el-checkbox, .el-radio {
      display: block;
      margin:10px!important;
  }
   .row-bg {
    padding: 10px 0;
    background-color: #f9fafc;
  }
</style>
