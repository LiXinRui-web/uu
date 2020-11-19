<template>
  <div>
    <el-button type="primary" @click="willAdd">添加</el-button>
    <v-list :list="list" @init="init" @edit="edit($event)"></v-list>
    <v-form :info="info" :list="list" @init="init" ref="form"></v-form>
  </div>
</template>
<script>
import { mapGetters, mapActions } from "vuex";
import vList from "./components/list.vue"
import vForm from "./components/form.vue"
import { reqMenuList } from '../../utils/http';
export default {
  data() {
    return {
      info: {
        isshow: false,
        title:"添加菜单"
      },
      list:[]
    };
  },
  computed: {
    ...mapGetters({})
  },
  methods: {
    ...mapActions({}),
    willAdd() {
      this.info.isshow = true;
      this.info.title="添加菜单"
    },
    init(){
        // console.log(123)
        reqMenuList().then(res=>{
            this.list=res.data.list;
        })
    },
    edit(id){
        this.info.isshow=true
        this.info.title="编辑菜单"
        this.$refs.form.getOne(id)
    }
  },
  mounted() {
      this.init()
  },
  components: {
    vList,
    vForm
  }
};
</script>
<style scoped>
</style>