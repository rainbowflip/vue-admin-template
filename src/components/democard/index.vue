<template>
    <div>
        <ul class='grid cs-style-3'>
            <li v-for='item in demos'>
                <figure>
                    <img :src="item.img" :alt="item.alt">
                    <figcaption>
                        <h3>{{ item.title }}</h3>
                        <span>{{ item.details1 }}</span><br/>
                        <span>{{ item.details2 }}</span>
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

        }
    },
    props:['demos']
}
</script>

<style>
    figure{
        border-radius:4px;
    }
</style>


