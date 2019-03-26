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
        >
        <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="80">
            <FormItem label="Name" prop="name">
                <Input v-model="formValidate.name" placeholder="Enter your name"></Input>
            </FormItem>
            <FormItem label="Password" prop="password">
                <Input v-model="formValidate.password" placeholder="Enter your password"></Input>
            </FormItem>
            <FormItem label="Age" prop="age">
                <Input v-model="formValidate.age" placeholder="Enter your age"></Input>
            </FormItem>
            <FormItem label="Tel" prop="tel">
                <Input v-model="formValidate.tel" placeholder="Enter your tel"></Input>
            </FormItem>
            <FormItem label="Email" prop="email">
                <Input v-model="formValidate.email" placeholder="Enter your email"></Input>
            </FormItem>
            <FormItem label="Interest" prop="interest">
                <Input v-model="formValidate.interest" placeholder="Enter your interest"></Input>
            </FormItem>
            <FormItem label="Address" prop="address">
                <Input v-model="formValidate.address" placeholder="Enter your address"></Input>
            </FormItem>
             <FormItem label="Sex" prop="sex">
                <Input v-model="formValidate.sex" placeholder="Enter your sex"></Input>
            </FormItem>
             <FormItem label="Birthday" prop="birthday">
                <Input v-model="formValidate.birthday" placeholder="Enter your birthday"></Input>
            </FormItem>

            <FormItem>
                <Button type="primary" @click="handleSubmit('formValidate')">提交</Button>
                <Button @click="handleReset('formValidate')" style="margin-left: 8px">重置</Button>
            </FormItem>
        </Form>

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
          name    : '',
          password: '',
          age: '',
          tel: '',
          email: '',
          interest: '',
          address: '',
          sex: '',
          birthday: '',
      },
      ruleValidate: {
          name: [
              { required: true, message: 'The name cannot be empty', trigger: 'blur' }
          ],
          password: [
              { required: true, message: 'password cannot be empty', trigger: 'blur' },
          ],
          age: [
              { required: true, message: 'password cannot be empty', trigger: 'blur' },
          ],
          tel: [
              { required: true, message: 'password cannot be empty', trigger: 'blur' },
          ],
          email: [
              { required: true, message: 'password cannot be empty', trigger: 'blur' },
          ],
          interest: [
              { required: true, message: 'password cannot be empty', trigger: 'blur' },
          ],
          address: [
              { required: true, message: 'password cannot be empty', trigger: 'blur' },
          ],
          sex: [
              { required: true, message: 'password cannot be empty', trigger: 'blur' },
          ],
          birthday: [
              { required: true, message: 'password cannot be empty', trigger: 'blur' },
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
            width: 150,
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
  }
}
</script>
