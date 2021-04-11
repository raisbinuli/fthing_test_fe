<template>
  <div class="row">
    <div class="col-lg-12">
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

export default {
  name: 'Home',
  data(){
    return{
      fields: ['name', 'address', 'created_at','updated_at', 'Actions'],
      customers: Array  
    }
    
  },
  created(){
    this.axios.get(process.env.VUE_APP_API_ENDPOINT+'customer').then((response) => {
      console.log(response.data)
      this.customers = response.data.result.data
    })
  },
  methods:{
    onDelete(id){
      console.log(id)
    }
  }
}
</script>
