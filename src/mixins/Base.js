import { commonUrl } from './commonUrl'
export const Base = {
    data(){
        return {
          module    : 'users',
          modal1      : false,
          listData: [],
          total   : 0,
          page    : 1,
          rows    : 10,
          ids     :[],
          name    :''
        }
      },
      methods:{
        handleSubmit (name,isTree) {
            this.$refs[name].validate((valid) => {
                if (valid) {
                  //console.log(this.formValidate._id);
                  if(this.formValidate._id && this.formValidate._id.trim().length>0){
                    // edit
                    this.axios({
                      url   : `${commonUrl.url}/${this.module}/${this.formValidate._id}`,
                      method: 'put',
                      data  : this.formValidate
                    }).then(res=>{
                      //console.log(res);
                      this.$Message.success('修改数据成功!');
                      this.modal1 = false;
                      this.getData();
                      this.handleReset();
                    })
                  }else{
                    // add
                    //console.log(this.formValidate);
                    this.axios({
                      url   : `${commonUrl.url}/${this.module}`,
                      method: 'post',
                      data  : this.formValidate
                    }).then(res=>{
                      //console.log(res);
                      this.$Message.success('添加数据成功!');
                      this.modal1 = false;
                      this.getData();
                      this.handleReset();
                    })
                  }
                } else {
                    this.$Message.error('Fail!');
                }
            })
        },
        handleReset () {
          //console.log('重置');
          //console.log(this.$data.formValidate,this.$options.data().formValidate);
            Object.assign(this.$data.formValidate,this.$options.data().formValidate);
        },
        ok () {
            this.$Message.info('Clicked ok');
        },
        cancel () {
            this.handleReset();
        },
        addData(){
          this.modal1 = true;
        },
        getData(){
          this.axios({
            url   : `${commonUrl.url}/${this.module}/list`,
            method: 'post',
            data  : {
              page: this.page,
              rows: this.rows,
              name: this.name,
              newsId: this.formValidate.newsId,
              orderId:this.formValidate.orderId
            }
          }).then(res=>{
            //console.log(res.data.rows);
            this.listData = res.data.rows;
            this.total    = res.data.total;
          })
        },

        onChangePage(page){
          this.page = page;
          this.getData();
        },
        onPageSizeChange(pageSize){
          this.rows = pageSize;
          this.getData();
        },
        removeData(id){
          this.$Modal.confirm({
              title: '确认',
              content: '<p>你是否确认删除记录?</p>',
              onOk: () => {
                this.axios({
                  url:`${commonUrl.url}/${this.module}/${id}`,
                  method:'delete'
                }).then(res=>{
                  this.getData();
                   this.$Message.info('Clicked ok');
                })
              },
              onCancel: () => {
                  this.$Message.info('Clicked cancel');
              }
          });
        },
        editData(id){
          this.axios({
            url:`${commonUrl.url}/${this.module}/${id}`,
            method:'get'
          }).then(res=>{
            //console.log(res.data);
            this.formValidate = res.data;
            this.modal1 = true;
          })
        },
        onSelectionChange(selection){
          var selectionLen = selection.length;
          if(selectionLen>0){
            for(let i=0;i<selectionLen;i++){
              this.ids.push(selection[i]._id);
            }
          }
        },
        removesData(){
          this.$Modal.confirm({
              title: '确认',
              content: '<p>你是否确认删除记录?</p>',
              onOk: () => {
                this.axios({
                  url:`${commonUrl.url}/${this.module}/removes`,
                  method:'post',
                  data:{
                    ids: this.ids.toString()
                  }
                }).then(res=>{
                  this.handleReset();
                  this.getData();
                  this.$Message.info('Clicked ok');
                })
              },
              onCancel: () => {
                  this.$Message.info('Clicked cancel');
              }
          });
        },
        searchData(){
          this.getData();
        }
      },
      mounted(){
        this.getData();
      }
}