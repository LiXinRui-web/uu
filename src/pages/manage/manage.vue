<template>
  <div>
    <el-button type="primary" @click="willAdd">添加</el-button>
    <v-list @init="newInit" :list="list" @edit="edit"></v-list>
    <el-pagination background
    @current-change="changePage"
     layout="prev, pager, next" :total="total" :page-size="size"></el-pagination>
    <v-form :info="info" @init="newInit" ref="form"></v-form>
  </div>
</template>
<script>
import { mapGetters, mapActions } from "vuex";
import vForm  from "./components/form";
import vList from "./components/list"
import { reqUserList ,reqUserCount,reqRoleList} from '../../utils/http';
export default {
  components:{
    vList,
    vForm
  },
  data(){
    return{
       info:{
         isshow:false,
         title:"添加管理员"
       },
       list:[],
       total:0,
       size:2,
       page:1,
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
          title:"添加管理员"
        }
    },
    edit(uid){
        this.info={
           isshow:true,
           title:"编辑管理员"
        },
        this.$refs.form.getOne(uid)
    },
    init(){
      reqUserList({page:this.page,size:this.size}).then(res=>{
         let list=res.data.list?res.data.list:[]
          // 56.如果取到的list是[],并且page>1,page自减，请列表
             if(list.length===0&&this.page>1){
               this.page--;
               this.init();
               return;
             }
          this.list=list;
      })
    },
    getCount(){
      reqUserCount().then(res=>{
        this.total=res.data.list[0].total
      })
    },
    changePage(page){
      this.page=page;
      this.init()
    },
    newInit(){
      this.init()
      this.getCount()
    }
  },
  mounted() {
    this.init();
    this.getCount()
  },
  
};
</script>
<style scoped>
</style>