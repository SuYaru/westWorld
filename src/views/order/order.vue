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
                title      = "添加订单"
                @on-ok="ok"
                @on-cancel="cancel('formValidate')"
            >
                <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="80">
                    <FormItem label="订单名称" prop="ordername">
                        <Input v-model="formValidate.ordername"></Input>
                    </FormItem>
                    <FormItem label="订单明细" prop="details">
                        <Input v-model="formValidate.details" placeholder="Enter your details"></Input>
                    </FormItem>
                    <FormItem label="开始时间" prop="sdate">
                        <Row>
                            <Col span="12">
                                <DatePicker type="date" placeholder="Select date" style="width: 200px" v-model="formValidate.sdate" ></DatePicker>
                            </Col>
                        </Row>
                    </FormItem>
                    <FormItem label="预计完成时间" prop="fdate">
                        <Row>
                            <Col span="12">
                                <DatePicker type="date" placeholder="Select date" style="width: 200px" v-model="formValidate.fdate" ></DatePicker>
                            </Col>
                        </Row>
                    </FormItem>
                    <FormItem label="订单进度" prop="progress">
                        <div v-if="+formValidate.progress>=100">
                            <Progress :percent="+formValidate.progress" status="success">
                                <Icon type="checkmark-circled"></Icon>
                                <span>订单完成</span>
                            </Progress>
                        </div>
                        <div v-if="+formValidate.progress<30">
                            <Progress :percent="+formValidate.progress" status="wrong">
                                <Icon type="checkmark-circled"></Icon>
                                <span>催单中</span>
                            </Progress>
                        </div>
                        <div v-if="+formValidate.progress>=30 &&+formValidate.progress<=90">
                            <Progress :percent="+formValidate.progress"/>
                        </div>
                        <ButtonGroup size="large">
                            <Button icon="ios-add" @click="add"></Button>
                            <Button icon="ios-remove" @click="minus"></Button>
                        </ButtonGroup>
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


import  { Base } from '../../mixins/Base'
import { commonUrl } from '../../mixins/commonUrl'
export default {
  mixins:[Base],
  data(){
    return {
      treeData:[],
      module: 'order',
      //isView:false,
      formValidate: {
          _id:null,
          ordername: null,
          details    : '',
          sdate: '',
          fdate:'',
          progress:0,
          orderId:null
      },
      ruleValidate: {
          ordername: [
              { required: true, message: 'The ordername cannot be empty', trigger: 'blur' }
          ],
          details: [
              { required: true, message: 'The details cannot be empty', trigger: 'blur' }
          ],
          sdate: [
              { required: true, message: 'The sdate cannot be empty', trigger: 'blur',pattern: /.+/ },
          ],
          fdate: [
              { required: true, message: 'The fdate cannot be empty', trigger: 'blur',pattern: /.+/},
          ],
          progress: [
              { required: true, message: 'The progress cannot be empty', trigger: 'blur',pattern: /.+/},
          ],
      },
      columns: [
          {
            type: 'selection',
            width: 60,
            align: 'center'
          },
          {
              title: '订单名称',
              key  : 'ordername'
          },
          {
              title: '订单明细',
              key  : 'details'
          },
          {
              title: '开始时间',
              key  : 'sdate',
              render: (h, params) => {
                console.log(params.row)
                return h('strong',this.$moment(params.row.sdate).utc().zone(+6).format('YYYY-MM-DD'));
              }
          },
          {
              title: '预计完成时间',
              key  : 'fdate',
               render: (h, params) => {
                return h('strong',this.$moment(params.row.fdate).utc().zone(+6).format('YYYY-MM-DD HH:mm:ss'));
              }
          },
          {
              title: '订单进度',
              key  : 'progress',
              render: (h, params) => {
                return h('Progress',{
                    props:{
                        percent:+params.row.progress
                    },
                });
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
          this.formValidate.orderId = node[0]._id;
          console.log(this.formValidate.orderId);
          this.getData();
      },
      addData(){
          console.log(this.formValidate.orderId);
          if(this.formValidate.orderId == null ){
              alert('请选择一个分类');
          }else{
              this.modal1 = true;
          }
      },
      getTreeData(){
          //console.log(commonUrl.url);
          this.axios({
              url:`${commonUrl.url}/cate/list/2`,
              method:'post'
          }).then(res=>{
              console.log(res.data);
              this.treeData = res.data;
          })
      },
      // 进度条修改信息
      add () {
        if (this.formValidate.progress >= 100) {
            return false;
        }
        this.formValidate.progress+= 10;
      },
      minus () {
        if (this.formValidate.progress <= 0) {
            return false;
        }
        this.formValidate.progress-= 10;
      }
  },
  mounted(){
      this.getTreeData();
      //this.isView=this.modal1;
  }
}
</script>
