<template>
  <div>
    <el-button type="primary" @click="willAdd">添加</el-button>
    <v-list @init="init" :list="list" @edit="edit"></v-list>
    <v-form :info="info" @init="init" ref="form"></v-form>
  </div>
</template>
<script>
import { mapGetters, mapActions } from "vuex";
import vForm  from "./components/form";
import vList from "./components/list"
import { reqRoleList } from '../../utils/http';
export default {
  data(){
    return{
       info:{
         isshow:false,
         title:"添加角色"
       },
       list:[]
    }
  },
  computed: {
    ...mapGetters({})
  },
  methods: {
    ...mapActions({}),
    willAdd(){
     this.info={
          isshow:true,
          title:"添加角色"
        }
    },
    edit(id){
        this.info={
           isshow:true,
           title:"编辑角色"
        },
        this.$refs.form.getOne(id)
    },
    init(){
      reqRoleList().then(res=>{
        this.list=res.data.list
      })
    }
  },
  mounted() {
    this.init()
  },
  components:{
    vList,
    vForm
  }
};
</script>
<style scoped>
</style>