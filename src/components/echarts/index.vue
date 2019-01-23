<template>
    <div id="main" ref="main"></div>
</template>

<script>
const echarts = require('echarts')
// 引入柱状图
require('echarts/lib/chart/bar');
// 引入提示框和标题组件
require('echarts/lib/component/tooltip');
require('echarts/lib/component/title');

export default {
    name:"echarts",
    data(){
        return{
            myEcharts:'', //echarts实例
            option:{
                title:{
                    text:"剪辑结果",

                },
                tooltip: {
                    trigger: 'item',
                    axisPointer: {
                        type: 'cross'
                    }
                },
                toolbox: {
                    feature: {
                        dataView: {show: true, readOnly: false},
                        restore: {show: true},
                        saveAsImage: {show: true}
                    }
                },
                legend: {
                    data:['item1','item2','item3']
                },
                // dataZoom:[
                    
                // ],
                xAxis: {
                    type: 'value',
                    axisTick: {
                        alignWithLabel: true
                    },
                    // data:["a","b","c"]
                },
                yAxis: {
                    
                },
                series: [
                    {
                        type:'scatter',
                        symbol: 'circle',
                        symbolSize: function(val){
                            return val[2]*2
                        },
                        data:[
                            [1,5,1],
                            [2,2,6],
                            [3,2,3],
                        ]
                    },
                ]
            },
        }
    },
    props:['echartsdata'],
    mounted(){
        console.log(this.$refs.main)
        this.myEcharts = echarts.init(this.$refs.main)
        console.log(this.myEcharts,this.option)
        this.myEcharts.setOption(this.option)
        let this_ = this
        window.addEventListener("resize",()=>{
            this_.myEcharts.resize()
        })
    },
    methods:{

    } 
}
</script>

<style>
#main{
    width:80vw;
    height:60vh;
}
</style>
