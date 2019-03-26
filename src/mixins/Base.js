import { commonUrl } from './commonUrl'
export const Base = {
    data(){
        return {
          module    : 'users',
          modal1      : false,
          isView      : false,
          listData: [],
          total   : 0,
          page    : 1,
          rows    : 10,
          ids     :[],
          name    :''
        }
      },
      methods:{
        handleSubmit (name) {
            this.$refs[name].validate((valid) => {
                if (valid) {
                  if(this.formValidate._id && this.formValidate._id.trim().length>0){
                    // edit
                    this.axios({
                      url   : `${commonUrl.url}/${this.module}/${this.formValidate._id}`,
                      method: 'put',
                      data  : this.formValidate
                    }).then(res=>{
                      console.log(res);
                      this.$Message.success('修改数据成功!');
                      this.modal1 = false;
                      this.getData();
                    })
                  }else{
                    // add
                    this.axios({
                      url   : `${commonUrl.url}/${this.module}`,
                      method: 'post',
                      data  : this.formValidate
                    }).then(res=>{
                      // console.log(res);
                      this.$Message.success('添加数据成功!');
                      this.modal1 = false;
                      this.getData();
                    })
                  }
                } else {
                    this.$Message.error('Fail!');
                }
            })
        },
        handleReset (name) {
            this.$refs[name].resetFields();
        },
        ok () {
            this.$Message.info('Clicked ok');
        },
        cancel (name) {
            this.$refs[name].resetFields();
            this.$Message.info('Clicked cancel');
        },
        addData(){
          this.modal1 = true;
        },
        getData(){
          /* console.log({
            page: this.page,
            rows: this.rows,
            name: this.name,
            newsId: this.formValidate.newsId,
            commonUrl:commonUrl
          })
          console.log(commonUrl.url); */
          this.axios({
            url   : `${commonUrl.url}/${this.module}/list`,
            method: 'post',
            data  : {
              page: this.page,
              rows: this.rows,
              name: this.name,
              newsId: this.formValidate.newsId
            }
          }).then(res=>{
            // console.log(res.data.rows);
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
        editData(id,isView){
          // this.modal1 = true;
          // console.log(id);

          this.axios({
            url:`${commonUrl.url}/${this.module}/${id}`,
            method:'get'
          }).then(res=>{
            this.formValidate = res.data;
            this.modal1 = true;
            this.modal2 = isView;
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