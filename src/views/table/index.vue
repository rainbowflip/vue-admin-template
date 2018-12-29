<template>
  <div class="app-container">
    <template class="filter-container">
      <el-input :placeholder="title" v-model="listQuery.title" size='small' style="width: 200px;" class="filter-item" @keyup.enter.native="handleFilter"/>
      <el-button class="filter-item" type="primary" size='small' icon="el-icon-search" @click="handleFilter"> search </el-button>
      <el-button class="filter-item" style="margin-left: 10px;" size='small' type="primary" icon="el-icon-edit" @click="handleCreate"> add </el-button>
      <el-button :loading="downloadLoading" class="filter-item" size='small' type="primary" icon="el-icon-download" @click="handleDownload"> export </el-button>
    </template>
    <el-table
      v-loading="listLoading"
      :data="list"
      element-loading-text="Loading"
      border
      fit
      height="800px"
      highlight-current-row>
      <el-table-column align="center" label="ID" width="95">
        <template slot-scope="scope">
          {{ scope.$index }}
        </template>
      </el-table-column>
      <el-table-column label="Name">
        <template slot-scope="scope">
          {{ scope.row.title }}
        </template>
      </el-table-column>
      <el-table-column label="Tag" width="110" align="center">
        <template slot-scope="scope">
          <el-tag>{{ scope.row.author }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column label="Ressults count" width="110" align="center">
        <template slot-scope="scope">
          {{ scope.row.pageviews }}
        </template>
      </el-table-column>
      <el-table-column class-name="status-col" label="Status" width="110" align="center">
        <template slot-scope="scope">
          <el-tag :type="scope.row.status | statusFilter">{{ scope.row.status }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column align="center" prop="created_at" label="Display_time" width="200">
        <template slot-scope="scope">
          <i class="el-icon-time"/>
          <span>{{ scope.row.display_time }}</span>
        </template>
      </el-table-column>
        <el-table-column
        align="center"
        fixed="right"
        label="操作"
        width="150">
        <template slot-scope="scope">
          <el-button @click="gotoResults(scope.row.id)" type="text" size="small">查看</el-button>
          <el-button @click="handleClick(scope.row)" type="text" size="small">编辑</el-button>
          <el-button @click="handleClick(scope.row)" v-if="scope.row.status=='new'" type="text" size="small">start</el-button>
        </template>
      </el-table-column>
    </el-table>

    <pagination align="center" v-show="total>0" :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.limit" @pagination="fetchData" />

    <el-dialog title="edit task" :visible.sync="dialogFormVisible">
      <Taskform></Taskform>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogFormVisible = false">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { getList } from '@/api/table'
import Pagination from '@/components/Pagination' // Secondary package based on el-pagination
import Taskform from '@/components/Taskform/index'

export default {
  components: { Pagination,Taskform },
  filters: {
    statusFilter(status) {
      const statusMap = {
        published: 'success',
        draft: 'gray',
        deleted: 'danger'
      }
      return statusMap[status]
    }
  },
  data() {
    return {
      list: null,
      title:"",
      total: 0,
      listLoading: true,
      listQuery: {
        page: 1,
        limit: 30,
        importance: undefined,
        title: undefined,
        type: undefined,
        sort: '+id'
      },
      dialogFormVisible: false,
      downloadLoading: false,

    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    fetchData() {
      this.listLoading = true
      getList(this.listQuery).then(response => {
        this.list = response.data.items
        this.listLoading = false
        console.log(this.list.length)
        this.total = this.list.length

        // Just to simulate the time of the request
        setTimeout(() => {
          this.listLoading = false
        }, 1.5 * 1000)
      })
    },
    handleClick(row) {
      console.log(row);
      this.dialogFormVisible = true;
    },
    handleFilter() {
      this.listQuery.page = 1
      this.fetchData()
    },
    handleCreate(){
      console.log("handlecreate")
      this.$router.push({path:"/form/index"})
    },
    handleDownload() {
      this.downloadLoading = true
      // import('@/vendor/Export2Excel').then(excel => {
      //   const tHeader = ['timestamp', 'title', 'type', 'importance', 'status']
      //   const filterVal = ['timestamp', 'title', 'type', 'importance', 'status']
      //   const data = this.formatJson(filterVal, this.list)
      //   excel.export_json_to_excel({
      //     header: tHeader,
      //     data,
      //     filename: 'table-list'
      //   })
      //   this.downloadLoading = false
      // })
    },
    gotoResults(id) {
      this.$router.push({path:'/results/index',params:'id'})
    },
    goback(id){
      console.log(id);
      this.$router.go(-1)
    },
  }
}
</script>
<style>

</style>

