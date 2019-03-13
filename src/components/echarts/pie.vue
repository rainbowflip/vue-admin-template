<template>
    <div id="pie" ref="pie"></div>
</template>

<script>
const echarts = require('echarts')
// 引入柱状图
// require('echarts/lib/chart/bar');
// 引入提示框和标题组件
require('echarts/lib/component/tooltip');
require('echarts/lib/component/title');
const types_ = [
    {'item1': '#333'},
    {'item2': '#bd6d6c'},
    {'item3': '#75d874'}
]
export default {
    name:"echartspie",
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
                    orient: 'vertical',
                    data:['Spike','item2','item3'],
                    top:"bottom",
                    left:"right",
                    textStyle: {
                        color: '#333'
                    },
                    selectedMode: 'single'
                },
                dataZoom:[
                    {
                        type:"inside",
                        xAxisIndex:[0],
                    },
                    {
                        type:"slider",
                        show:true,
                        xAxisIndex:[0],
                        top:200, 
                    }
                ],
                xAxis: {
                    type: 'category',
                    axisTick: {
                        alignWithLabel: true
                    },   
                    data:(function(){
                        let arr = []
                        for(let i=0;i<3000;i+=1){
                            // let h = Math.floor(i / 3600);
                            // let m = Math.floor(i / 60) % 60;
                            // let s = Math.floor(i % 60);
                            // h = h<10 ? "0"+h : h;
                            // m = m<10 ? "0"+m : m;
                            // s = s<10 ? "0"+s : s;
                            // arr.push(h+":"+m+":"+s)
                            arr.push(i)
                        }
                        return arr
                    })(),
                    axisLabel: {
                        formatter: function (val) {
                            let h = Math.floor(val / 3600);
                            let m = Math.floor(val / 60) % 60;
                            let s = Math.floor(val % 60);
                            h = h<10 ? "0"+h : h;
                            m = m<10 ? "0"+m : m;
                            s = s<10 ? "0"+s : s;
                            // return Math.max(0, val) + ' ms';
                            return h+":"+m+":"+s
                        }
                    }
                },
                yAxis: {
                    data:["process",'results']
                },
                grid: {
                    height:100
                },
                // dataset:[

                // ],
                series: [{
                        type: 'custom',
                        renderItem: function (params, api) {
                            console.log(this)
                            var categoryIndex = api.value(0);
                            var start = api.coord([api.value(1), categoryIndex]);
                            var end = api.coord([api.value(2), categoryIndex]);
                            // var height = api.size([0, 1])[1] * 0.6;
                            var height =  10;
                            // console.log("-0--0-0-0-",start,api.style())
                            var rectShape = echarts.graphic.clipRectByRect({
                                x: start[0],
                                y: start[1] - height / 2,
                                width: end[0] - start[0],
                                height: height
                            }, {
                                x: params.coordSys.x,
                                y: params.coordSys.y,
                                width: params.coordSys.width,
                                height: params.coordSys.height
                            });
                            console.log(rectShape)
                            return rectShape && {
                                type: 'rect',
                                shape: rectShape,
                                style: api.style()
                            };
                        },
                        itemStyle:{
                            normal: {
                                opacity: 0.6
                            }
                        },
                        encode: {
                            x: [0,1],
                            y: 0
                        },
                        data: [
                            {
                                name:"item1",
                                value:['results',1,5,4],
                                itemStyle:{
                                    normal:{
                                        color:"red"
                                    }
                                }
                            },{
                                name:"item2",
                                value:['results',8,15,7],
                                itemStyle:{
                                    normal:{
                                        color:"green"
                                    }
                                }
                            },
                            {
                                name:"process",
                                value:["process",0,20,20]
                            }
                        ]
                    },
                ]
            },
        }
    },
    props:['echartsdata'],
    mounted(){
        // console.log(this.$refs.main)
        this.myEcharts = echarts.init(this.$refs.pie)
        // console.log("========this.myEcharts,",this.option.series[0].data)
        // this.option.series[0].data = this.echartsdata.map(function(item,index){
        //     return {
        //         name:item.category,
        //         value:["results",parseInt(item.time_s),parseInt(item.time_e),10],
        //         itemStyle:{
        //             normal:{
        //                 color:"#333"
        //             }
        //         }
        //     }
        // })
        console.log("{}{}{}{{",this.option.series[0].data)
        this.myEcharts.setOption(this.option)
        let this_ = this
        window.addEventListener("resize",()=>{
            this_.myEcharts.resize()
        })
    },
    watch:{
        echartsdata:function(newval,oldval){
            console.log("wwwww",newval,this)
            this.option.series[0].data = newval.map(function(item,index){
                let dic = {
                    name:item.category,
                    value:["results",parseInt(item.time_s),parseInt(item.time_e),10],
                    itemStyle:{
                        normal:{
                            color:"#333"
                        }
                    }
                }
                console.log(dic)
                return dic
            })
            this.myEcharts.setOption(this.option)
        }
    },
    methods:{

    } 
}
</script>

<style>
#pie{
    margin:0 auto;
    width:80vw;
    height:300px;
}
</style>
