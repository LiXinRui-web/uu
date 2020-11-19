<template>
<div>
   <v-list @init="init" :list="list" @edit="edit"></v-list>
    <v-form :info="info" @init="init" ref="form"></v-form>
 </div>
</template>
<script>
import { mapGetters, mapActions } from "vuex";
import vList from "./components/list"
import vForm from "./components/form"
import {reqMemberList} from "../../utils/http"
export default {
  data(){
    return{
       info:{
         isshow:false,
       },
       list:[]
    }
  },
  computed: {
    ...mapGetters({})
  },
  methods: {
    ...mapActions({}),
   
    edit(uid){
        this.info={
           isshow:true,
           title:""
        },
        this.$refs.form.getOne(uid)
    },
    init(){
      reqMemberList().then(res=>{
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