<style scoped>
.layout{
    border: 1px solid #d7dde4;
    background: #f5f7f9;
    position: relative;
    border-radius: 4px;
    overflow: hidden;
}
.layout-nav{
    width: 420px;
    margin: 0 auto;
    margin-right: 20px;
}
.layout-logo{
    width        : 100px;
    height       : 30px;
    line-height  : 30px;
    border-radius: 3px;
    float        : left;
    position     : relative;
    top          : 15px;
    left         : 20px;
    text-align   : center;
    font-size    : 30px;
    color        : #fff;
    font-family:Verdana, Geneva, Tahoma, sans-serif
}
.layout-footer-center{
    text-align: center;
}
</style>
<template>
    <div class="layout">
        <div v-if="!login">
            请登录
            <Form ref="formInline" :model="formInline" :rules="ruleInline" inline>
                <FormItem prop="name">
                    <Input type="text" v-model="formInline.name" placeholder="Name">
                        <Icon type="ios-person-outline" slot="prepend"></Icon>
                    </Input>
                </FormItem>
                <FormItem prop="password">
                    <Input type="password" v-model="formInline.password" placeholder="Password">
                        <Icon type="ios-lock-outline" slot="prepend"></Icon>
                    </Input>
                </FormItem>
                <FormItem>
                    <Button type="primary" @click="handleSubmit('formInline')">Signin</Button>
                </FormItem>
            </Form>
        </div>
        <div v-else>
            <Layout>
                <Header>
                    <Menu mode="horizontal" theme="dark" active-name="1">
                        <div class="layout-logo">westWorld</div>
                        <div class="layout-nav">
                            <MenuItem name="1">
                                <Icon type="ios-navigate"></Icon>
                                Item 1
                            </MenuItem>
                            <MenuItem name="2">
                                <Icon type="ios-keypad"></Icon>
                                Item 2
                            </MenuItem>
                            <MenuItem name="3">
                                <Icon type="ios-analytics"></Icon>
                                Item 3
                            </MenuItem>
                            <MenuItem name="4">
                                <Icon type="ios-paper"></Icon>
                                Item 4
                            </MenuItem>
                        </div>
                    </Menu>
                </Header>
                <Layout :style="{padding: '0 50px'}">
                    <Breadcrumb :style="{margin: '16px 0'}">
                        <BreadcrumbItem>首页</BreadcrumbItem>
                    <!--  <BreadcrumbItem>Components</BreadcrumbItem>
                        <BreadcrumbItem>Layout</BreadcrumbItem> -->
                    </Breadcrumb>
                    <Content :style="{padding: '24px 0', minHeight: '280px', background: '#fff'}">
                        <Layout>
                            <Sider hide-trigger :style="{background: '#fff'}">
                                <Menu active-name="1-2" theme="light" width="auto" :open-names="['1']">
                                    <Submenu name="1">
                                <template slot="title">
                                    <Icon type="ios-people"></Icon>
                                    用户管理
                                </template>
                                <MenuItem name="1-1"><router-link to="/">平台首页</router-link></MenuItem>
                                <MenuItem name="1-2"><router-link to="/users">用户管理</router-link></MenuItem>
                                <MenuItem name="1-3"><router-link to="/about">关于我们</router-link></MenuItem>
                            </Submenu>
                            <Submenu name="2">
                                <template slot="title">
                                    <Icon type="ios-paper"></Icon>
                                    新闻模块
                                </template>
                                <MenuItem name="2-1"><router-link to="/news">新闻模块</router-link></MenuItem>
                                <MenuItem name="2-2">Option 2</MenuItem>
                            </Submenu>
                            <Submenu name="3">
                                <template slot="title">
                                    <Icon type="ios-switch"></Icon>
                                    分类管理
                                </template>
                                <MenuItem name="3-1"><router-link to="/cate">分类管理</router-link></MenuItem>
                                <MenuItem name="3-2">Option 2</MenuItem>
                            </Submenu>
                            <Submenu name="4">
                                <template slot="title">
                                    <Icon type="logo-apple"></Icon>
                                    产品管理
                                </template>
                                <MenuItem name="3-1"><router-link to="/product">产品管理</router-link></MenuItem>
                                <MenuItem name="3-2">Option 2</MenuItem>
                            </Submenu>
                                </Menu>
                            </Sider>
                            <Content :style="{padding: '24px', minHeight: '280px', background: '#fff'}">
                                <router-view></router-view>
                            </Content>
                        </Layout>
                    </Content>
                </Layout>
                <Footer class="layout-footer-center">2011-2016 &copy; TalkingData</Footer>
            </Layout>
        </div>
    </div>
</template>
<script>
import {mapGetters,mapActions} from  'vuex'
import { commonUrl } from './mixins/commonUrl'

    export default {
        data () {
            return {
                formInline: {
                    name: '',
                    password: ''
                },
                ruleInline: {
                    user: [
                        { required: true, message: 'Please fill in the user name', trigger: 'blur' }
                    ],
                    password: [
                        { required: true, message: 'Please fill in the password.', trigger: 'blur' },
                        { type: 'string', min: 6, message: 'The password length cannot be less than 6 bits', trigger: 'blur' }
                    ]
                }
            }
        },
        computed:{
            ...mapGetters(['login','token'])
        },
        methods:{
            ...mapActions(['checklogin','setToken']),
            handleSubmit(name) {
                this.$refs[name].validate((valid) => {
                    if (valid) {
                        this.checklogin(true);
                        this.axios({
                            url:`${ commonUrl.url}/users/login`,
                            method:'post',
                            data:this.formInline
                        }).then(res=>{
                            this.setToken(res.data.token);
                            this.checklogin(true);
                        })
                    } else {
                        this.$Message.error('Fail!');
                    }
                })
            }
        }
    }
</script>
