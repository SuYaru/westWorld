<template>
  <div class="news">

 <Row>
        <Col span="4"><Tree :data="treeData" @on-select-change="onTreeSelectChange"></Tree></Col>
        <Col span="20">

        <Button type="primary" @click="addData">添加数据</Button>
        <Button type="error" @click="removesData">删除多条</Button>
        <Input search v-model="name" placeholder="请输入关键字" @on-search="searchData"/>
        <Table :columns="columns" :data="listData" @on-selection-change="onSelectionChange"></Table>
        <Page :total="total" show-sizer @on-change="onChangePage" @on-page-size-change="onPageSizeChange" :page-size-opts="[5,10,20,30,40,50]"/>
            <Modal
                v-model    = "modal1"

                title      = "添加新闻"
                @on-ok="ok"
                @on-cancel="cancel('formValidate')"
            >
                <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="80">
                    <FormItem label="新闻分类ID" prop="newsId">
                        <Input v-model="formValidate.newsId"></Input>
                    </FormItem>

                    <FormItem label="新闻标题" prop="title">
                        <Input v-model="formValidate.title" placeholder="Enter your title"></Input>
                    </FormItem>
                    <FormItem label="关键字" prop="keyWords">
                        <Input v-model="formValidate.keyWords" placeholder="Enter your keyWords"></Input>
                    </FormItem>
                    <FormItem label="作者" prop="author">
                        <Input v-model="formValidate.author" placeholder="Enter your author"></Input>
                    </FormItem>
                    <FormItem label="新闻内容" prop="content">
                       <quill-editor v-model="formValidate.content"
                            ref="myQuillEditor"
                            >
                        </quill-editor>
                    </FormItem>
                </Form>
                <div slot="footer">
                    <Button type="primary" @click="handleSubmit('formValidate')">提交</Button>
                    <Button @click="handleReset('formValidate')" style="margin-left: 8px">重置</Button>
                </div>
            </Modal>
        </Col>
    </Row>
  </div>
</template>

<script>
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'

import { quillEditor } from 'vue-quill-editor'

import  { Base } from '../../mixins/Base'
import { commonUrl } from '../../mixins/commonUrl'
export default {
  components: {
    quillEditor
  },
  mixins:[Base],
  data(){
    return {
      treeData:[],
      module: 'news',
      //isView:false,
      formValidate: {
          _id:null,
          newsId: null,
          title    : '',
          content: '',
          author:'',
          keyWords:'',
      },
      ruleValidate: {
          title: [
              { required: true, message: 'The title cannot be empty', trigger: 'blur' }
          ],
          keyWords: [
              { required: true, message: 'The keyWords cannot be empty', trigger: 'blur' }
          ],
          content: [
              { required: true, message: 'content cannot be empty', trigger: 'blur' },
          ],
      },
      columns: [
          {
            type: 'selection',
            width: 60,
            align: 'center'
          },
          {
              title: '新闻标题',
              key  : 'title'
          },
          {
              title: '关键字',
              key  : 'keyWords'
          },
          {
              title: '作者',
              key  : 'author'
          },
          {
              title: '发布日期',
              key  : 'date',
              render: (h, params) => {
                return h('strong',this.$moment(params.row.date).utc().zone(+6).format('YYYY-MM-DD'));
              }
          },
          {
            title: '操作',
            key: 'action',
            width: 250,
            align: 'center',
            render: (h, params) => {
                return h('div', [
                     h('Button', {
                        props: {
                            type: 'primary',
                            size: 'small'
                        },
                        style: {
                            marginRight: '5px'
                        },
                        on: {
                            click: () => {
                                // this.show(params.index)
                                this.editData(params.row._id);
                            }
                        }
                    }, '修改'),
                    h('Button', {
                        props: {
                            type: 'error',
                            size: 'small'
                        },
                        on: {
                            click: () => {
                                this.removeData(params.row._id);
                            }
                        }
                    }, '删除')
                ]);
            }
        }
      ]
    }
  },
  methods:{
      /*  <Table :columns="columns" :data="listData" @on-selection-change="onSelectionChange"></Table> */
      onTreeSelectChange(node){
          this.formValidate.newsId = node[0]._id;
          this.getData();
      },
      addData(){
          if(this.formValidate.newsId === null){
              alert('请选择一个分类');
          }else{
              this.modal1 = true;
          }
      },
      getTreeData(){
          //console.log(commonUrl.url);
          this.axios({
              url:`${commonUrl.url}/cate/list/1`,
              method:'post'
          }).then(res=>{
              console.log(res.data);
              this.treeData = res.data;
          })
      }
  },
  mounted(){
      this.getTreeData();
      //this.isView=this.modal1;
  }
}
</script>
