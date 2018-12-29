<template>
    <Taskform :data="form"></Taskform>
</template>
<script>
import Taskform from '@/components/Taskform/index'
export default {
    components: { Taskform },
    data (){
        return{
            form: {
                name: '',
                region: '',
                date1: '',
                date2: '',
                delivery: false,
                type: [],
                resource: '',
                desc: ''
            }
        }
    },

}
</script>

