<template>
<div>
   <div>
        <el-table   
      :data="list?list:[]"
      style="width: 100%;margin-bottom: 20px;"
      row-key="id"
      border
      :tree-props="{children: 'children'}"
    >
    
      <el-table-column prop="title" label="活动名称" sortable></el-table-column>
      
    
      <el-table-column label="状态">
        <template slot-scope="scope">
          <el-button type="success" v-if="scope.row.status===1">启用</el-button>
          <el-button type="info" v-else>禁用</el-button>
        </template>
      </el-table-column>
      <el-table-column label="操作">
       
        <template slot-scope="scope">
            <!-- <button @click="gets(scope)">111</button> -->
          <el-button type="primary" @click="edit(scope.row.id)">编 辑</el-button>
          <del-btn @confirm="del(scope.row.id)"></del-btn>
        </template>
      </el-table-column>
    </el-table>
   </div>
 </div>
</template>
<script>
import { mapGetters, mapActions } from "vuex"
import { reqseckDel } from '../../../utils/http';
import { successAlert } from '../../../utils/alert';

export default {
    computed: {
      ...mapGetters({
        list:"seckill/list"
      })
     },
     methods: {
      ...mapActions({
          reqList:"seckill/reqList"
      }),
      edit(id){
        
        this.$emit("edit",id)
      },
      del(id){
        reqseckDel(id).then(res=>{
          if(res.data.code==200){
            successAlert(res.data.msg)
            this.reqList()
          }
        })
      }
     },
 mounted() {
     this.reqList()
 }
};
</script>
<style scoped>
</style>