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
                
                <b-form-group id="input-group-2"  label-for="input-2">
                    <b-form-input
                    id="input-2"
                    v-model="password"
                    placeholder="Enter Password"
                    type="password"
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
                
            </b-form>
            
        </div>
        
    </div>
</template>

<script>
    import AlertMessageDisplay from '../components/AlertMessageDisplay'
    export default {
        components:{
            AlertMessageDisplay
        },
        data(){
            return{
                name: '',
                email: '',
                password: '',
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
        name:'Create',
        methods:{
            async onSubmit(e){
                e.preventDefault();
                this.clsAlert = '';
                this.showAlertMsg = false;
                this.disabled = true
                const data = new FormData()
                data.append('name', this.name)
                data.append('password', this.password)
                data.append('email', this.email)
                data.append('gender', this.gender)
                data.append('is_married', this.is_married)     
                data.append('address', this.address)     
                this.axios.post(process.env.VUE_APP_API_ENDPOINT+'customer',data,{
                
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
            }
        }
    }
</script>

<style lang="scss" scoped>

</style>