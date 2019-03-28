<template>
  <div class="users">
        <Button type="primary" @click="addData">添加数据</Button>
        <Button type="error" @click="removesData">删除多条</Button>
        <Input search v-model="name" placeholder="请输入关键字" @on-search="searchData"/>

        <Table :columns="columns" :data="listData" @on-selection-change="onSelectionChange"></Table>
        <Page :total="total" show-sizer @on-change="onChangePage" @on-page-size-change="onPageSizeChange" :page-size-opts="[5,10,20,30,40,50]"/>
        <Modal
        v-model    = "modal1"
        title      = "添加用户信息"
        @on-ok="ok"
        @on-cancel="cancel('formValidate')"
        >
        <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="80">
            <FormItem label="姓名" prop="name">
                <Input v-model="formValidate.name" placeholder="Enter your name"></Input>
            </FormItem>
            <FormItem label="密码" prop="password">
                <Input type="password" v-model="formValidate.password" placeholder="Enter your password"></Input>
            </FormItem>
            <FormItem label="年龄" prop="age">
                <InputNumber :max="100" :min="1" style="width:150px" v-model="formValidate.age" placeholder="Enter your age"></InputNumber>
            </FormItem>
            <FormItem label="电话" prop="tel">
                <Input v-model="formValidate.tel" number placeholder="Enter your tel"></Input>
            </FormItem>
            <FormItem label="邮箱" prop="email">
                <Input v-model="formValidate.email" placeholder="Enter your email"></Input>
            </FormItem>
            <FormItem label="兴趣爱好" prop="interest">
                <Input v-model="formValidate.interest" placeholder="Enter your interest"></Input>
            </FormItem>
            <FormItem label="地址" prop="address">
                <Input v-model="formValidate.address" placeholder="Enter your address"></Input>
            </FormItem>
            <FormItem label="性别" prop="sex">
                <RadioGroup v-model="formValidate.sex">
                    <Radio label="male">男</Radio>
                    <Radio label="female">女</Radio>
                </RadioGroup>
            </FormItem>
             <FormItem label="出生年月" prop="birthday" >
               <Row>
                    <Col span="12">
                        <DatePicker type="date" placeholder="Select date" style="width: 200px" v-model="formValidate.birthday" ></DatePicker>
                    </Col>
               </Row>
            </FormItem>
            <FormItem label="了解我们">
                <i-switch v-model="formValidate.know" size="large">
                    <span slot="open">Yes</span>
                    <span slot="close">No</span>
                </i-switch>
            </FormItem>
        </Form>
        <div slot="footer">
            <Button type="primary" @click="handleSubmit('formValidate')">提交</Button>
            <Button @click="handleReset('formValidate')" style="margin-left: 8px">重置</Button>
        </div>
    </Modal>
  </div>
</template>

<script>
import  { Base } from '../../mixins/Base'
export default {
  mixins:[Base],
  data(){
    return {
      formValidate: {
          _id:null,
          name    : '',
          password: '',
          age:0,
          tel: '',
          email: '',
          interest: '',
          address: '',
          sex: '',
          birthday: '',
          know:false
      },
      ruleValidate: {
          name: [
              { required: true, message: 'The name cannot be empty', trigger: 'blur' }
          ],
          password: [
              { required: true, message: 'password cannot be empty', trigger: 'blur' },
          ],
          age: [
              { required: true, message: 'age cannot be empty', trigger: 'blur',pattern: /.+/ },
          ],
          tel: [
              { required: true, message: 'tel cannot be empty', trigger: 'blur',pattern: /.+/ },
              { required: true,type:'number',message: '只能是数字', trigger:'blur', pattern:/^(([1-9]\d{0,3})|0)$/},
              /* { required: true,type:'number',message: '请输入正确的手机号', trigger:'blur', pattern:/^((13|14|15|17|18)[0-9]{1}\d{8})$/}, */
          ],
          email: [
              { required: true, message: 'email cannot be empty', trigger: 'blur' },
              { required: true, message: '请输入正确的邮箱格式', trigger: 'blur',pattern: /^[A-Za-zd]+([-_.][A-Za-zd]+)*@([A-Za-zd]+[-.])+[A-Za-zd]{2,5}$/},

          ],
          interest: [
              { required: true, message: 'interest cannot be empty', trigger: 'blur' },
          ],
          address: [
              { required: true, message: 'address cannot be empty', trigger: 'blur' },
          ],
          sex: [
              { required: true, message: 'sex cannot be empty', trigger: 'blur' },
          ],
          birthday: [
              { required: true, message: 'birthday cannot be empty', trigger: 'blur',pattern: /.+/ },
          ],
      },
      columns: [
          {
            type: 'selection',
            width: 60,
            align: 'center'
          },
          {
              title: '姓名',
              key  : 'name'
          },
          {
              title: '年龄',
              key  : 'age'
          },
          {
              title: '电话',
              key  : 'tel'
          },
          {
              title: '邮箱',
              key  : 'email'
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
                                this.editData(params.row._id,false);
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
  }
}
</script>
