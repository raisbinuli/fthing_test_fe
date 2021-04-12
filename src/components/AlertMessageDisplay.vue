<template>
    <div  v-show="showAlertMsg" >
        <div v-if="rtnMessagesStr !== '' " :class="['alert',clsAlert]" role="alert">
            {{rtnMessagesStr}}            
        </div>        
        <div v-else :class="['alert',clsAlert]" role="alert">
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
    </div>
    
</template>

<script>
    export default {
        name: 'AlertMessageDisplay',
        props:{
            showAlertMsg: Boolean,
            rtnMessages: Object,
            clsAlert: String, 
            rtnMessagesStr: String,    
        }
    }
</script>

<style scoped>
    .alert ul{
        padding-bottom: 0;
        margin-bottom: 0;
    }
</style>