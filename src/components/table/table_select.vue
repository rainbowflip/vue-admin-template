<template>
  <div>
    <div style="margin: 10px">
        <el-button size='small' type="primary" @click="delSelected()">删除选中</el-button>
        <el-button size='small' type="primary" @click="backtoresults()">返回</el-button>
        <el-button :loading="downloadLoading" class="filter-item" size='small' type="primary" icon="el-icon-download" @click="handleDownload"> export </el-button>
    </div>
    <el-table
        v-loading="listLoading"
        ref="multipleTable"
        :data="results"
        tooltip-effect="dark"
        style="width: 100%"
        @selection-change="handleSelectionChange">
        <el-table-column
        type="selection"
        width="55">
        </el-table-column>
        <el-table-column
        label="starttime"
        width="120">
        <template slot-scope="scope">{{ scope.row.starttime|parseTime("{y}{m}{d}_{h}{i}{s}") }}</template>
        </el-table-column>
        <el-table-column
        prop="name"
        label="分类"
        width="120">
        <template slot-scope="scope">{{ scope.row.category }}</template>
        </el-table-column>
        <el-table-column
        label="路径"
        show-overflow-tooltip>
            <template slot-scope="scope">
                <span class="link-type" @click="handleUpdate(scope.row)">{{ scope.row.url }}</span>
            </template>
        </el-table-column>
    </el-table>
  </div>
</template>

<script>
  export default {
    name: 'tableSelect',
    data() {
      return {
        tableData3: [{
          date: '2016-05-03',
          name: 'star',
          address: '3.mp4'
        }, {
          date: '2016-05-02',
          name: 'star',
          address: '3.mp4'
        }, {
          date: '2016-05-04',
          name: 'star',
          address: '3.mp4'
        }],
        multipleSelection: [],
        downloadLoading:false
      }
    },
    props:['results','listLoading'],
    methods: {
        backtoresults() {
            this.$router.go(-1)
        },
        toggleSelection(rows) {
        if (rows) {
            rows.forEach(row => {
            this.$refs.multipleTable.toggleRowSelection(row);
            });
        } else {
            this.$refs.multipleTable.clearSelection();
        }
        },
        handleSelectionChange(val) {
          this.multipleSelection = val.map(function(item){
            return item.id
          })
        },
        handleUpdate(param){
          console.log(param)
          this.$emit("changesrc",param)
        },
        delSelected(){
          if(!this.multipleSelection){
            this.$message({
              type:"warning",
              message:"Please choose at least one!"
            })
            return
          }
          delSelected(this.multipleSelection).then(response=>{
            
          })
        },
        handleDownload() {
          this.downloadLoading = true
          import('@/vendor/Export2Excel').then(excel => {
            const tHeader = ["category", "conf", "time_s", "url", "taskid", "time_e", "starttime", "id", "desc"]
            const filterVal = ["category", "conf", "time_s", "url", "taskid", "time_e", "starttime", "id", "desc"]
            const data = this.formatJson(filterVal, this.results)
            excel.export_json_to_excel({
              header: tHeader,
              data,
              filename: 'results-list'
            })
            this.downloadLoading = false
          })
        },
        formatJson(filterVal, jsonData) {
          return jsonData.map(v => filterVal.map(j => {
            if (j === 'timestamp') {
              return parseTime(v[j])
            } else {
              return v[j]
            }
          }))
        },
    }
  }
</script>