<template>
  <div>
    <!-- 5.绑定info.isshow到模板 -->
    <el-dialog :title="info.title" :visible.sync="info.isshow" @closed="closed">
      <el-form :model="user">
        <el-form-item label="角色名称" label-width="120px">
          <el-input v-model="user.rolename" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="角色权限" label-width="120px">
          <!-- 14.将menuList 绑定到tree,配置props -->
        <el-tree
          :data="menuList"
          show-checkbox
          node-key="id"
          ref="tree"
          :props="{children: 'children',label: 'title'}"
        ></el-tree>

        </el-form-item>
        
        <el-form-item label="状态" label-width="120px">
          <el-switch v-model="user.status" :active-value="1" :inactive-value="2"></el-switch>
        </el-form-item>
      </el-form>

      <div slot="footer" class="dialog-footer">
        <el-button @click="cancel">取 消</el-button>
        <el-button type="primary" @click="add" v-if="this.info['title'].trim()==='添加角色'">添 加</el-button>
        <el-button type="primary" v-else @click="update">修 改</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import { mapGetters, mapActions } from "vuex";
import {reqMenuList,
        reqRoleAdd,
        reqRoleDetail,
        reqRoleUpdate
} from "../../../utils/http"
import { successAlert } from '../../../utils/alert';
export default {
  data() {
    return {
      user: {
        rolename: "",
        menus: "",
        status: 1
      },
      menuList:[]
    };
  },
  props: ["info"],
  computed: {
    ...mapGetters({})
  },
  methods: {
    ...mapActions({}),
    cancel() {
      this.info.isshow = false;
    },
    empty(){
       this.user={
         rolename:'',
         menus:'',
         status:1
       },
       this.$refs.tree.setCheckedKeys([])
    },
    add(){
      this.user.menus=JSON.stringify(this.$refs.tree.getCheckedKeys())
      reqRoleAdd(this.user).then(res=>{
              if(res.data.code==200){
                successAlert("添加成功"),
                this.cancel(),
                this.empty(),
                this.$emit("init")
              }
              
      })
    },
    getOne(id){
        reqRoleDetail(id).then(res=>{
           //此刻user没有id
           this.user=res.data.list
           //处理树形控件的数据
           this.$refs.tree.setCheckedKeys(JSON.parse(this.user.menus))

           //补id
           this.user.id=id
        })
    },
    update(){
      this.user.menus=JSON.stringify(this.$refs.tree.getCheckedKeys());
      reqRoleUpdate(this.user).then(res=>{
        if(res.data.code==200){
          successAlert(res.data.msg)
          this.cancel();
          this.empty()
          this.$emit("init");
          
        }
      })
    },
    closed(){
      if(this.info.title==="编辑角色"){
           this.empty()
      }
    }
  },
  mounted() {
    reqMenuList().then(res=>{
      if(res.data.code==200){
        this.menuList=res.data.list
      }
    })
  }
};
</script>
<style scoped>
</style>