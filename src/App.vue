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
.layout{
    border: 1px solid #d7dde4;
    background: #f5f7f9;
    position: absolute;
    border-radius: 4px;
    overflow: hidden;
    height: 100%;
    width: 100%;
    background: url("https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1554430182&di=ca38dc2f693215ca2ab423f6376822ca&imgtype=jpg&er=1&src=http%3A%2F%2Fpic1.win4000.com%2Fwallpaper%2F9%2F540559494b474.jpg") no-repeat;
}
/* .vertical-center-modal{
    display: flex;
    align-items: center;
    justify-content: center;
} */
</style>
<template>
    <div class="layout" style="height:100%">
        <div v-if="!login" class="vertical-center-modal">
                <div style="padding: 30px;width: 500px;height: 300px;margin: auto;position: absolute;bottom: 0;top: 0;right: 0;left: 0;">
                    <Card :bordered="false">
                        <p slot="title">westWorld 后台管理系统登录</p>
                        <p>
                            <Form ref="formCustom" :model="formCustom" :rules="ruleCustom" :label-width="80">
                                <FormItem label="用户名" prop="name">
                                    <Input type="text" v-model="formCustom.name"></Input>
                                </FormItem>
                                <FormItem label="密码" prop="password">
                                    <Input type="password" v-model="formCustom.password"></Input>
                                </FormItem>
                                <FormItem>
                                    <Button type="primary" @click="handleSubmit('formCustom')">登陆</Button>
                                    <Button @click="handleReset('formCustom')" style="margin-left: 8px">重置</Button>
                                </FormItem>
                            </Form>
                        </p>
                    </Card>

            </div>
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
                                    订单管理
                                </template>
                                <MenuItem name="3-1"><router-link to="/order">订单管理</router-link></MenuItem>
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
                formCustom: {
                    name: '',
                    password: ''
                },
                ruleCustom: {
                    name: [
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
                            data:this.formCustom
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
