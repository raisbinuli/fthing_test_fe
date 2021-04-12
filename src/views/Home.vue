<template>
  <div class="row">
    <div class="col-lg-12 mt-2">
      <AlertMessageDisplay
                :showAlertMsg="showAlertMsg"                
                :rtnMessages="rtnMessages"
                :clsAlert="clsAlert"
                :rtnMessagesStr="rtnMessagesStr"
            />
    </div>
    <div class="col-lg-12 mt-2">
      <b-link class="btn btn-primary" to="create">Create</b-link>
    </div>
    <div class="col-lg-12 mt-3">
      
       <b-table striped hover :items="customers"  :fields="fields">
         
        <template #cell(actions)="row">
          <b-link class="mr-2" :to="'update/'+row.item.id">Edit</b-link>
          <b-link class="text-danger" hred="#" @click="onDelete(parseInt(row.item.id))">Delete</b-link>
        </template>

       </b-table>
    </div>    
  </div>
</template>

<script>
// @ is an alias to /src
import {mapState,mapMutations} from 'vuex'
import AlertMessageDisplay from '../components/AlertMessageDisplay'
export default {
  name: 'Home',
  components:{
    AlertMessageDisplay
  },
  data(){
    return{
      fields: ['name', 'address', 'created_at','updated_at', 'Actions'],
      clsAlert:'',
      disabled: false,
      showAlertMsg: false,
      rtnMessages: {},
      rtnMessagesStr: '',
      
    }
    
  },
  computed:{
      ...mapState(['toastMessage','customers','errMessage'])
  },
  created(){
    if(this.errMessage != ''){
      this.showAlertMsg = true
      this.rtnMessagesStr = this.errMessage
      this.clsAlert = 'alert-danger'

      
    }
      
    this.getCustomers()
  },
  methods:{
    async onDelete(id){
      this.axios.delete(process.env.VUE_APP_API_ENDPOINT+'customer/'+id,{                
          config: { headers: { 'Content-Type': 'application/json' } }
      })
      .then((response) => {
          console.log(response)
          this.changeMessage(response.data.status.message) 
          this.getCustomers()
          this.makeToast('success')
      }).catch(err => {
          if(err.response){ 
              if(err.response.status == 404){
                this.changeMessage(err.response.data.status.message) 
                this.makeToast('danger')
              }
          }
      }) 
    },
    async getCustomers(){
      this.axios.get(process.env.VUE_APP_API_ENDPOINT+'customer').then((response) => {
            
            this.updateCustomer(response.data.result.data)  
          })
    },
    ...mapMutations(['changeMessage','updateCustomer']),
    
  }
}
</script>
