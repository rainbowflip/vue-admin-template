<template>
  <div>
    <div style="margin: 10px">
        <el-button size='small' type="primary" @click="delSelected()">删除选中</el-button>
        <el-button size='small' type="primary" @click="backtoresults()">返回结果页面</el-button>
    </div>
    <el-table
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
        label="日期"
        width="120">
        <template slot-scope="scope">{{ scope.row.date }}</template>
        </el-table-column>
        <el-table-column
        prop="name"
        label="姓名"
        width="120">
        </el-table-column>
        <el-table-column
        label="路径"
        show-overflow-tooltip>
            <template slot-scope="scope">
                <span class="link-type" @click="handleUpdate(scope.row)">{{ scope.row.address }}</span>
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
          address: '1.mp4'
        }, {
          date: '2016-05-02',
          name: 'star',
          address: '1.mp4'
        }, {
          date: '2016-05-04',
          name: 'star',
          address: '1.mp4'
        }],
        multipleSelection: []
      }
    },
    props:['results'],
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
        console.log(val);
        this.multipleSelection = val;
        }
    }
  }
</script>