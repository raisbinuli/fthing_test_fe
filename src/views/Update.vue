<template>
    <div>

    </div>
</template>

<script>
    export default {
        created(){
            console.log(this.$route.params.id)
            this.axios.get(process.env.VUE_APP_API_ENDPOINT+'customer/'+this.$route.params.id,{
                
                config: { headers: { 'Content-Type': 'application/json' } }
            })
            .then((response) => {
                console.log(response)
                
            }).catch(err => {
                
                console.log(err)
                if(err.response){                        
                    this.$router.push('/')
                }
            }) 
        }
    }
</script>

<style lang="scss" scoped>

</style>