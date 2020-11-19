<template>
  <div>
    <div>
      <el-dialog :title="info.title" :visible.sync="info.isshow" @closed="closed">
        <el-form :model="user" :rules="rules">
          <el-form-item label="活动名称" label-width="120px" prop="price">
            <el-input v-model="user.title" placeholder="请输入活动名称"></el-input>
          </el-form-item>
          <el-form-item label="活动期限" label-width="120px">
            <el-date-picker
              v-model="value1"
              type="datetimerange"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
              value-format="timestamp"
            ></el-date-picker>
          </el-form-item>

          <el-form-item label="一级分类" label-width="120px" prop="first_cateid">
            <el-select placeholder="请选择一级分类" v-model="user.first_cateid" @change="changeFirst">
              <el-option
                v-for="item in cateList"
                :key="item.id"
                :label="item.catename"
                :value="item.id"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="二级分类" label-width="120px" prop="second_cateid">
            <el-select placeholder="请选择二级分类" v-model="user.second_cateid" @change="changeSecond">
              <el-option
                v-for="item in secondCateList"
                :key="item.id"
                :label="item.catename"
                :value="item.id"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="商品" label-width="120px" prop="goodsid">
            <el-select placeholder="请选择商品" v-model="user.goodsid">
              <el-option
                v-for="item in getgoods"
                :key="item.id"
                :label="item.goodsname"
                :value="item.id"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="cancel">取 消</el-button>
          <el-button type="primary" v-if="info.title=='添加活动'" @click="add">添 加</el-button>
          <el-button type="primary" v-else @click="update">修 改</el-button>
        </div>
      </el-dialog>
    </div>
  </div>
</template>
<script>
import { mapGetters, mapActions } from "vuex";
import {
  reqseckDel,
  reqseckAdd,
  reqseckDetail,
  reqseckUpdate,
  reqcateList,
  reqgoodsList
} from "../../../utils/http";
import { successAlert, errorAlert } from "../../../utils/alert";
export default {
  props: ["info"],
  data() {
    return {
      pickerOptions: {
        shortcuts: [
          {
            text: "最近一周",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit("pick", [start, end]);
            }
          },
          {
            text: "最近一个月",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
              picker.$emit("pick", [start, end]);
            }
          },
          {
            text: "最近三个月",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
              picker.$emit("pick", [start, end]);
            }
          }
        ]
      },
      user: {
        title: "",
        begintime: "",
        endtime: "",
        first_cateid: "",
        second_cateid: "",
        goodsid: "",
        status: 1
      },
      rules: {
        first_cateid: [
          { required: true, message: "请输入一级分类", trigger: "change" }
        ],
        second_cateid: [
          { required: true, message: "请输入二级分类", trigger: "change" }
        ]
      },
      secondCateList: [],
      getgoods: [],
      value1: []
    };
  },

  computed: {
    ...mapGetters({
      cateList: "cate/list",
      seckList: "seckill/list"
    })
  },
  methods: {
    ...mapActions({
      reqCateList: "cate/reqList",
      reqGoodsList: "goods/reqList",
      reqSeckList: "seckill/reqList"
    }),
    changeFirst() {
      this.user.second_cateid = "";
      this.getSecondList();
    },
    getSecondList() {
      reqcateList({ pid: this.user.first_cateid }).then(res => {
        this.secondCateList = res.data.list;
      });
    },
    changeSecond() {
      reqgoodsList({
        fid: this.user.first_cateid,
        sid: this.user.second_cateid
      }).then(res => {
        this.getgoods = res.data.list;
      });
    },
    cancel() {
      this.info.isshow = false;
    },
    empty() {
      this.user = {
        title: "",
        begintime: "",
        endtime: "",
        first_cateid: "",
        second_cateid: "",
        goodsid: "",
        status: 1
      };
      this.secondCateList = [];
      this.getgoods = [];
      this.value1=[];
    },
    check() {
      return new Promise((resolve, reject) => {
        if (this.user.first_cateid === "") {
          errorAlert("一级分类不能为空");
          return;
        }
        if (this.user.second_cateid === "") {
          errorAlert("二级分类不能为空");
          return;
        }
        resolve();
      });
    },

    add() {
      this.check().then(() => {
        reqseckAdd(this.user).then(res => {
          this.user.begintime = this.value1[0];
          this.user.endtime = this.value1[1];
          if (res.data.code == 200) {
            successAlert("添加成功");

            this.cancel();

            this.empty();

            this.reqGoodsList();
            this.reqSeckList();
          }
        });
      });
    },
    getOne(id) {
      reqseckDetail(id).then(res => {
        this.user = res.data.list;
        this.user.id = id;
        this.user.begintime = new Date(parseInt(this.user.begintime));
        this.user.endtime = new Date(parseInt(this.user.endtime));
        this.value1 = [this.user.begintime, this.user.endtime];
        this.changeSecond();
        this.getSecondList();
      });
    },
    update() {
      this.check().then(() => {
        reqseckUpdate(this.user).then(res => {
          if (res.data.code == 200) {
            successAlert("修改成功");
            this.cancel();
            this.empty();
            this.reqGoodsList();
          }
        });
      });
    },
    closed() {
      if (this.info.title === "编辑活动") {
        this.empty();
      }
    }
  },
  mounted() {
    this.reqCateList();
  }
};
</script>
<style scoped>
</style>
