<template>
  <div class="casts" @contextmenu.prevent="bodyContext()">
    <Tabs type="card" @on-click="onclicktab">
        <TabPane v-for="(tab,i) in tabs" :key="i" :label="tab"></TabPane>
         <Button @click="handleTabsAdd" size="default" slot="extra">增加</Button>
    </Tabs>
       <Dropdown
        trigger="contextMenu"
        style="margin-left: 20px"
        ref="menu"
      >
        <a href=" javascript:void(0)">
            <Tree
              :data="treeData"
               @contextmenu.prevent="bodyContext"
               @on-select-change="onTreeSelectChange"
            ></Tree>
        </a>
        <DropdownMenu slot="list">
          <DropdownItem @click.native="addCate">新增</DropdownItem>
          <DropdownItem @click.native="removeData">删除</DropdownItem>
          <DropdownItem @click.native="editCate">修改</DropdownItem>
        </DropdownMenu>
      </Dropdown>


    <Modal
          v-model    = "modal1"
          title      = "添加节点"
    >
        <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="100">
            <FormItem label="新节点名称" prop="title">
                <Input v-model="formValidate.title"></Input>
            </FormItem>
        </Form>
        <div slot="footer">
            <Button type="primary" @click="handleSubmit('formValidate'),handleInner()">提交</Button>
            <Button @click="handleReset('formValidate')" style="margin-left: 8px">重置</Button>
        </div>
    </Modal>
  </div>

</template>

<script>
import { commonUrl } from '../../mixins/commonUrl'
export default {
    //mixins:[Base],
    data () {
        return {
            //tabs: ['新闻分类','产品分类','用户分类','华东地区分类'],
            tabs:[],
            modules:'cate',
            type:1,
            treeData: [],
            modal1: false,
            nowId:null,
            formValidate: {
                  parentId:null,
                  _id:null,
                  title    : '',
            },
            ruleValidate: {
                title: [
                    { required: true, message: 'The title cannot be empty', trigger: 'blur' }
                ],
            },
        }
    },
    methods: {
        // 增加Tab
        handleTabsAdd (e) {
            console.log(e);
            this.modules="cateClassify",
            this.modal1 = true;
        },
        // 后台新增 Tabs 标签类。以动态增删改查(目前只做了增加)
        // 如果标签还有4个类的话，后续再增加 contextMenu 事件
        getTabs() {
          this.axios({
            url: `${commonUrl.url}/cateClassify/list`,
            method: "post"
          }).then(res => {
            //console.log(typeof res.data);
            res.data.forEach(element => {
                  this.tabs.push(element.title);
            });
          });
        },
        // 空白处右键点击添加多个根节点
        bodyContext(){
          console.log(this);
          this.$refs.menu.currentVisible =true;
        },
        // 获取节点树内容
        getTreeDate() {
          this.axios({
            url: `${commonUrl.url}/cate/list/${this.type}`,
            method: "post"
          }).then(res => {
            // console.log('123123');
            this.treeData = res.data;
            //this.treeData[0].expand=true;
          });
        },
        // tab 切换
        onclicktab(key){
            this.type=key+1;
            this.getTreeDate();
        },
        onTreeSelectChange(node) {
          this.modules="cate";
          this.nowId=node[0]._id;
          console.log(this.nowId);
        },
        addCate() {
          Object.assign(this.$data.formValidate,this.$options.data().formValidate);
          delete(this.formValidate._id);
          this.formValidate.parentId=this.nowId;
          this.formValidate.type=this.type;
            this.modal1 = true;
        },
        handleInner(){

        },
        editCate(){
            this.axios({
              url:`${commonUrl.url}/cate/${this.nowId}`,
              method:'get'
            }).then(res=>{
              this.formValidate = res.data;
              this.formValidate._id=this.nowId;
              this.modal1 = true;
            })
        },
        removeData(){
            console.log(this.nowId);
            if(!this.nowId){
                this.$Modal.confirm({
                    title: '提示',
                    content: '<p>请选择一个要删除的节点！</p>',
                });
            }else{
                this.$Modal.confirm({
                    title: '确认',
                    content: '<p>你是否确认删除记录?</p>',
                    onOk: () => {
                      this.axios({
                        url:`${commonUrl.url}/cate/${this.nowId}`,
                        method:'delete'
                      }).then(res=>{
                        console.log(res);
                        this.$Message.success('删除数据成功!');
                        this.getTreeDate(this.type);
                      })
                    }
                });
            }
        },
        handleSubmit (name) {
            this.$refs[name].validate((valid) => {
                if (valid) {
                  //console.log(this.formValidate._id)
                  if(this.formValidate._id && this.formValidate._id.trim().length>0){
                    // edit
                    console.log(111)
                    this.axios({
                      url   : `${commonUrl.url}/cate/${this.formValidate._id}`,
                      method: 'put',
                      data  : this.formValidate
                    }).then(res=>{
                      console.log(res);
                      this.$Message.success('修改数据成功!');
                      this.modal1 = false;
                      this.getTreeDate(res.data.type);
                      Object.assign(this.$data.formValidate,this.$options.data().formValidate);
                      delete(this.formValidate._id);
                    })
                  }else{
                    console.log(this.formValidate);
                    console.log(commonUrl.url,this.modules);
                    this.modules=="cateClassify" ? this.tabs.push(this.formValidate.title):null;
                    this.axios({
                      url   : `${commonUrl.url}/${this.modules}`,
                      method: 'post',
                      data  : this.formValidate
                    }).then(res=>{
                      console.log(res);
                      this.$Message.success('添加数据成功!');
                      this.modal1 = false;
                      this.getTreeDate(res.data.type);
                      Object.assign(this.$data.formValidate,this.$options.data().formValidate);
                      delete(this.formValidate._id);
                    })
                  }
                } else {
                    this.$Message.error('添加数据失败');
                }
            })
        }
    },
    mounted() {
      this.getTreeDate();
      this.getTabs();
    }

}
</script>
<style scoped>
  .casts{
     height: 100%;
  }
</style>
