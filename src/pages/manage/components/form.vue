<template>
  <div>

    
    <el-dialog :title="info.title" :visible.sync="info.isshow" @closed="closed">
      <el-form :model="user" :rules="rules">
        <el-form-item label="所属角色" label-width="120px" prop="roleid">
          <el-select v-model="user.roleid"  placeholder="请选择角色">
            <el-option
              v-for="item in list"
              :key="item.id"
              :value="item.id"
              :label="item.rolename"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="用户名" label-width="120px" prop="username">
          <el-input v-model="user.username" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="密码" label-width="120px">
          <el-input v-model="user.password" autocomplete="off"></el-input>
        </el-form-item>

        <el-form-item label="状态" label-width="120px">
          <el-switch v-model="user.status" :active-value="1" :inactive-value="2"></el-switch>
        </el-form-item>
      </el-form>

      <div slot="footer" class="dialog-footer">
        <el-button @click="cancel">取 消</el-button>
        <el-button type="primary" @click="add" v-if="this.info['title'].trim()==='添加管理员'">添 加</el-button>
        <el-button type="primary" v-else @click="update">修 改</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import { mapGetters, mapActions } from "vuex";
import {
  reqRoleList,
  reqUserAdd,
  reqUserDetail,
  reqUserUpdate
} from "../../../utils/http";
import { successAlert } from "../../../utils/alert";
export default {
  data() {
    return {
      rules: {
        roleid: [
          { required: true, message: "请输入角色名称", trigger: "change" }
        ],
        username : [
          { required: true, message: "请输入用户名", trigger: "change" }
        ],
      },
      user: {
        roleid: "",
        username: "",
        password: "",
        status: 1
      },
      list: []
    }
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
    empty() {
      this.user = {
        roleid: "",
        username: "",
        password: "",
        status: 1
      };
    },
    add() {
      // console.log(this.user)
      reqUserAdd(this.user).then(res => {
        if (res.data.code == 200) {
          successAlert("添加成功"),
            this.cancel(),
            this.empty(),
            this.$emit("init");
        }
      });
    },
    getOne(uid) {
        console.log(uid)
      reqUserDetail(uid).then(res => {
      
      
        this.user = res.data.list;

      
        this.user.password = "";
      });
    },
    update() {
      console.log(this.user)
      reqUserUpdate(this.user).then(res => {
        if (res.data.code == 200) {
          successAlert("修改成功");
          this.cancel();
          this.empty();
          this.$emit("init");
        }
      });
    },
    closed() {
      if (this.info.title === "编辑管理员") {
        this.empty();
      }
    }
  },
  mounted() {
    reqRoleList().then(res => {
      if (res.data.code == 200) {
        this.list = res.data.list;
      }
    });
  }
};
</script>
<style scoped>
</style>