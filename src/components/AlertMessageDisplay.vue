<template>
    <div v-show="showAlertMsg" class="alert alert-danger" role="alert">
        <ul 
            v-for="(messages, index) in rtnMessages"
                :key="index"
            >
            <li 
                v-for="(message, index) in messages"
                :key="index"
            >
                
                {{message}}
            </li>  
        </ul>
    </div>
</template>

<script>
    export default {
        name: 'AlertMessageDisplay',
        props:{
            showAlertMsg: Boolean,
            rtnMessages: Object,     
        }
    }
</script>

<style scoped>
    .alert ul{
        padding-bottom: 0;
        margin-bottom: 0;
    }
</style>