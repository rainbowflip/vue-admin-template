<template>
    <div>
        <ul class='grid cs-style-3'>
            <li v-for='item in demos'>
                <figure>
                    <img :src="item.img" :alt="item.alt">
                    <figcaption>
                        <h3>{{ item.title }}</h3>
                        <span>{{ item.details }}</span><br/>
                        <span>{{ item.details }}</span>
                        <a :href="item.url">即刻试用&gt;&gt;&gt;</a>
                    </figcaption>
                </figure>
            </li>
        </ul>
    </div>
</template>

<script>
import '@/styles/deep.css'
export default {
    name:'democard',
    data() {
        return {
            demos:[
                {
                    'img':'static/images/王者荣耀角色.jpg',
                    'alt':'img04',
                    'url':'/demo/gameImg',
                    'title':'王者荣耀的人物与场景检测',
                    'details':'王者荣耀的人物与场景检测'
                },
                {
                    'img':'static/images/王者荣耀角色.jpg',
                    'alt':'img04',
                    'url':'/demo/gameImg',
                    'title':'王者荣耀的人物与场景检测',
                    'details':'王者荣耀的人物与场景检测'
                },
                {
                    'img':'static/images/王者荣耀角色.jpg',
                    'alt':'img04',
                    'url':'/demo/gameImg',
                    'title':'王者荣耀的人物与场景检测',
                    'details':'王者荣耀的人物与场景检测'
                },
                {
                    'img':'static/images/王者荣耀角色.jpg',
                    'alt':'img04',
                    'url':'/demo/gameImg',
                    'title':'王者荣耀的人物与场景检测',
                    'details':'王者荣耀的人物与场景检测'
                }
            ]
        }
    }
}
</script>

<style>
    figure{
        border-radius:4px;
    }
</style>


