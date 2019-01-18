<template>
    <Taskform style="min-width:600px" :form="form"></Taskform>
</template>
<script>
import Taskform from '@/components/Taskform/index'
export default {
    components: { Taskform },
    data (){
        return{
            form: {
                name: '',
                url: 'static/videos/',
                region: '',
                date1: '',
                date2: '',
                delivery: false,
                type: [],
                tag: 'Face',
                desc: 'fufufufufuffu'
            }
        }
    },

}
</script>

<style>

</style>

