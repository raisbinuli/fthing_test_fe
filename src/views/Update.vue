<template>
    <div class="row mt-5">
        <div class="col-lg-12">
            <AlertMessageDisplay
                :showAlertMsg="showAlertMsg"                
                :rtnMessages="rtnMessages"
                :clsAlert="clsAlert"
                :rtnMessagesStr="rtnMessagesStr"
            />
            <b-form @submit="onSubmit" >
                <b-form-group
                    id="input-group-1"
                    
                    label-for="input-1"
                >
                <b-form-input
                    id="input-1"
                    v-model="email"
                    type="email"
                    placeholder="Enter email"
                    required
                    ></b-form-input>
                </b-form-group>
                
                <b-form-group id="input-group-2" label-for="input-2">
                    <b-form-input
                    id="input-2"
                    v-model="name"
                    placeholder="Enter Name"
                    required
                    ></b-form-input>
                </b-form-group>
                <b-form-group label="Individual radios" v-slot="{ ariaDescribedby }">
                    <b-form-radio v-model="gender" :aria-describedby="ariaDescribedby" name="gender" value="P">Female</b-form-radio>
                    <b-form-radio v-model="gender" :aria-describedby="ariaDescribedby" name="gender" value="L">Male</b-form-radio>
                </b-form-group>
                <b-form-group label="Individual radios" v-slot="{ ariaDescribedby }">
                    <b-form-radio v-model="is_married" :aria-describedby="ariaDescribedby" name="is_married" value="0">Single</b-form-radio>
                    <b-form-radio v-model="is_married" :aria-describedby="ariaDescribedby" name="is_married" value="1">Married</b-form-radio>
                </b-form-group>
                <b-form-textarea
                id="textarea"
                v-model="address"
                
                rows="3"
                max-rows="6"
                class="mb-5"
                ></b-form-textarea>
                
                <b-button type="submit" class="mr-2" variant="primary" :disabled="disabled">Submit</b-button>
                <b-button type="reset" variant="danger">Reset</b-button>
            </b-form>            
        </div>        
    </div>
</template>

<script>
    import AlertMessageDisplay from '../components/AlertMessageDisplay'
    import {mapMutations} from 'vuex'
    export default {
        name: 'Update',
        components:{
            AlertMessageDisplay
        },
        data(){
            return{
                name: '',
                email: '',
                gender: '',
                is_married:'',
                address: '',
                clsAlert:'',
                disabled: false,
                showAlertMsg: false,
                rtnMessages: {},
                rtnMessagesStr: '',


            }
        },
        created(){
            
            this.axios.get(process.env.VUE_APP_API_ENDPOINT+'customer/'+this.$route.params.id,{
                
                config: { headers: { 'Content-Type': 'application/json' } }
            })
            .then((response) => {
                this.name = response.data.result.data[0].name
                this.email = response.data.result.data[0].email
                this.gender = response.data.result.data[0].gender
                this.is_married = response.data.result.data[0].is_married
                this.address = response.data.result.data[0].address
                
            }).catch(err => {
                
                console.log(err)
                if(err.response.status == 404){                        
                    this.$router.push('/')
                    this.changeErrMessage(err.response.data.status.message) 
                    this.makeToast('danger')
                }
            }) 
        },
        methods:{
            async onSubmit(e){
                e.preventDefault();
                this.clsAlert = '';
                this.showAlertMsg = false;
                this.disabled = true
                const data = {}
                data.name = this.name
                data.email = this.email
                data.gender = this.gender
                data.is_married = this.is_married     
                data.address = this.address     
                this.axios.put(process.env.VUE_APP_API_ENDPOINT+'customer/'+this.$route.params.id,data,{
                
                    config: { headers: { 'Content-Type': 'application/json' } }
                })
                .then((response) => {
                    this.clsAlert = 'alert-success'
                    this.disabled = false
                    this.showAlertMsg = true                    
                    this.rtnMessagesStr = response.data.status.message
                }).catch(err => {
                    if(err.response){
                        if(err.response.status == 404)     
                            this.rtnMessagesStr = err.response.data.status.message
                        else
                            this.rtnMessages = err.response.data.status.message

                        this.clsAlert = 'alert-danger'                   
                        this.disabled = false
                        this.showAlertMsg = true
                        
                    }
                    
                })   
            },
            ...mapMutations(['changeErrMessage']),
        }
    }
</script>

<style lang="scss" scoped>

</style>