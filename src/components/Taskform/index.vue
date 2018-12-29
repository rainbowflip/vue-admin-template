<template>
  <el-form ref="form" :model="form" label-width="80px">
    <el-form-item label="分类">
      <el-radio-group v-model="form.resource">
        <el-radio label="Face"></el-radio>
        <el-radio label="Sports"></el-radio>
      </el-radio-group>
    </el-form-item>
    <el-form-item label="任务名称">
      <el-input v-model="form.name"></el-input>
    </el-form-item>
    <el-form-item label="文件路径">
      <el-input v-model="form.path"></el-input>
    </el-form-item>
    <el-form-item label="任务区域">
      <el-select v-model="form.region" placeholder="请选择任务区域">
        <el-option label="区域一" value="shanghai"></el-option>
        <el-option label="区域二" value="beijing"></el-option>
      </el-select>
    </el-form-item>
    <el-form-item label="任务时间">
      <el-col :span="11">
        <el-date-picker type="date" placeholder="选择日期" v-model="form.date1" style="width: 100%;"></el-date-picker>
      </el-col>
      <el-col class="line" :span="2">-</el-col>
      <el-col :span="11">
        <el-time-picker type="fixed-time" placeholder="选择时间" v-model="form.date2" style="width: 100%;"></el-time-picker>
      </el-col>
    </el-form-item>
    <el-form-item label="----">
      <el-switch v-model="form.delivery"></el-switch>
    </el-form-item>
    <!-- <el-form-item label="任务性质">
      <el-checkbox-group v-model="form.type">
        <el-checkbox label="美食/餐厅线上任务" name="type"></el-checkbox>
        <el-checkbox label="地推任务" name="type"></el-checkbox>
        <el-checkbox label="线下主题任务" name="type"></el-checkbox>
        <el-checkbox label="单纯品牌曝光" name="type"></el-checkbox>
      </el-checkbox-group>
    </el-form-item> -->
    <el-form-item label="注释">
      <el-input type="textarea" v-model="form.desc"></el-input>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="onSubmit">立即创建</el-button>
      <el-button @click="goback">取消</el-button>
    </el-form-item>
</el-form>
</template>

<script>
  export default {
    name: 'Taskform',
    data() {
      return {
        form: {
          name: '',
          path: '/static/videos/',
          region: '',
          date1: '',
          date2: '',
          delivery: false,
          type: [],
          resource: '',
          desc: ''
        }
      }
    },
    methods: {
      onSubmit() {
        console.log('submit!')
      },
      goback() {
        this.$router.go(-1)
      }
    }
  }
</script>