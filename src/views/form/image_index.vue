<template>
    <div class="container">
        <div class="section-title">
            <h2>图片检测演示</h2>
        </div>
        <div class="deepai">
            <div class="deepai-content">
                <div class="deepai-content-inline">
                    <div class="result-cover" :style="{ 'background-image': backgroundImage ,'background-size': 'contain'}"></div>
                    <div :class="animateclass"></div>
                    <div class="deepai-content-inline-search">
                        <div class="search">
                            <input spellcheck="false" type="text" placeholder="请输入网络图片URL" class="search-url" v-model="url"> 
                            <button :class="butclass" @click="handlerclick">检测</button> 
                            <div class="search-add">或</div> 
                            <label class="search-local">
                                <input type="file" accept="image/png, image/bmp, image/jpg, image/jpeg" class="search-local-input" @change="checkLocalImg">
                                上传图片
                            </label>
                        </div>
                    </div>
                    <!-- <div class="list-content"></div> -->
                </div>

                <div class="deepai-content-inline deepai-content-inline-json">
                    <div class="json">
                        <textarea class="json" v-model="expression"></textarea>
                    </div>
                </div>
            </div>
        </div>

    </div>
</template>

<script>
import { imgUpload } from '@/api/form'
import { getBase64 } from '@/utils/index'
export default {
    data(){
        return{
            backgroundImage:'url("http://aip.bdstatic.com/portal/dist/1547780921660/ai_images/imageRecognition/plants/1@2x.jpg")',
            url:"",
            butclass:"search-button",
            animateclass:"",
            expression:""
        }
    },
    watch:{
        url(val){
            if(this.url != ""){
              this.butclass = "search-button search-button-active"
            }else{
                this.butclass = "search-button"
            }
        }
    },
    methods:{
        handlerclick(){
            this.backgroundImage = "url("+this.url+")"
            this.animateclass = "deepai-content-inline-scan"
            imgUpload({"dataURL":this.url.trim()}).then(response=>{
                console.log(response)
                this.expression = JSON.stringify(response,null,4)
                this.animateclass = ""
            }).catch((e)=>{
                console.log(e)
                this.animateclass = ""
            })
        },
        checkLocalImg(e){
            console.log(this)
            this.animateclass = "deepai-content-inline-scan"
            let this_ = this
            let thefile = e.target.files[0]
            e.target.value = ""
            let n = new FileReader
            n.readAsDataURL(thefile)
            n.onload = function(e){
                let imgurl = e.target.result
                this_.backgroundImage = "url("+imgurl+")"
                imgUpload({"dataURL":imgurl}).then(response=>{
                    let str = JSON.stringify(response,null,4)
                    this_.expression = str
                    this_.animateclass = ""

                }).catch((e)=>{
                    this_.animateclass = ""

                })
            }
        }
    }
}
</script>

<style>
/* @media (min-width: 768px){
    .container {
        width: 750px;
    }
} */
/* .container {
    padding-right: 15px;
    padding-left: 15px;
    margin-right: auto;
    margin-left: auto;
    margin-top: 27px;
    font-size: 0;
} */

.deepai {
    width: 1180px;
    margin: 0 auto
}

.deepai-content {
    margin-top: 27px;
    font-size: 0
}

.deepai-content-inline {
    position: relative;
    display: inline-block;
    vertical-align: top;
}

.deepai-content-inline-scan {
    position: absolute;
    z-index: 7;
    top: 0;
    left: 0;
    width: 840px;
    filter: progid:DXImageTransform.Microsoft.Gradient(startColorStr="transparent",endColorStr="#3e88f1",gradientType="0");
    /* border-bottom: 3px solid #3e88f1; */
    -webkit-animation: scan 1.2s infinite;
    -moz-animation: scan 1.2s infinite;
    animation: scan 1.2s infinite;
    background: -webkit-gradient(linear,left top,left bottom,from(transparent),to(#3e88f1));
    background: -webkit-linear-gradient(top,transparent,#3e88f1);
    background: -moz-linear-gradient(top,transparent,#3e88f1);
    background: linear-gradient(180deg,transparent,#3e88f1);
}

.deepai-content-inline-load {
    position: absolute;
    z-index: 2;
    height: 525px;
    width: 100%;
    top: 0;
    left: 0
}

.deepai-content-inline-load-content {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    margin: auto;
    width: 200px;
    height: 150px
}

.deepai-content-inline-load-img {
    width: 32px;
    height: 32px;
    margin: 0 auto;
    background-image: url(//aip.bdstatic.com/portal/dist/1547780921660/ai_images/loading.png);
    -webkit-animation: loadImg .7s infinite;
    -moz-animation: loadImg .7s infinite;
    animation: loadImg .7s infinite
}

.deepai-content-inline-load-intro {
    margin-top: 20px;
    font-size: 14px;
    color: #666;
    text-align: center
}

.deepai-content-inline-search {
    position: absolute;
    left: 0;
    bottom: 0
}

.deepai-content-inline-summary {
    position: absolute;
    right: 0;
    top: 0
}

.deepai-feedback {
    margin-top: 20px;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
    text-align: right;
    font-size: 14px
}

.deepai-feedback-info {
    display: inline-block;
    color: #999;
    padding-bottom: 1px;
    border-bottom: 1px solid #999;
    cursor: pointer
}

.search {
    width: 820px;
    height: 38px;
    padding: 20px 0 20px 20px;
    font-size: 0;
    background-color: rgba(0,0,0,.5);
    box-sizing: content-box;
}

.search-label {
    position: relative
}

.search-local{
    border-radius: 6px;
}

button{
    min-width: 116px;
    border-top-right-radius: 6px;
    border-bottom-right-radius: 6px;
}

.search-add,.search-local,.search-url,.search .search-button {
    display: inline-block;
    vertical-align: middle;
    margin: 0;
    -webkit-box-sizing: border-box;
    -moz-box-sizing: border-box;
    box-sizing: border-box;
    height: 38px;
    outline: none;
    font-size: 14px;
    border: 1px solid #666;
    background-color: rgba(0,0,0,.45);
    line-height: 36px
}

.search-url{
    border-top-left-radius: 8px;
    border-bottom-left-radius: 8px;
}

.search-add:hover,.search-local:hover,.search-url:hover,.search .search-button:hover {
    -webkit-box-shadow: unset;
    -moz-box-shadow: unset;
    box-shadow: unset
}

.search-add-active,.search-local-active,.search-url-active,.search .search-button-active {
    background-color: #0073eb;
    border-color: #0073eb;
    color: #fff
}

.search .search-button {
    color: #999
}

.search .search-button-active {
    color: #fff
}

.search-url {
    display: inline-block;
    vertical-align: middle;
    color: #ccc;
    width: 492px;
    border-right: 0;
    text-indent: 11px
}

.search-local {
    position: relative;
    width: 116px;
    text-align: center;
    background-color: #0073eb;
    border-color: #0073eb;
    color: #fff;
    font-size: 16px;
    cursor: pointer
}

.search-local-input {
    display: none;
}

.search-add {
    margin: 0 30px;
    color: #ccc;
    font-size: 16px;
    border: 0;
    background-color: transparent;
    line-height: 38px
}

.result-cover {
    position: relative;
    width: 840px;
    height: 525px;
    background-color: #343434;
    background-position: 50%;
    background-repeat: no-repeat
}

.result-unchecked {
    background-image: url(//aip.bdstatic.com/portal/dist/1547780921660/ai_images/imageRecognition/common-icon/unchecked.png);
    -moz-background-size: 104px 72px;
    background-size: 104px 72px;
    background-position: center 173px
}

.result-error-msg {
    width: 176px;
    margin: 0 auto;
    padding-top: 270px;
    text-align: center;
    font-size: 16px;
    color: #fff;
    line-height: 26px
}


.list-content {
    width: 820px;
    height: 90px;
    padding: 20px 0 20px 20px;
    background-color: #ebebeb;
    font-size: 0;
    box-sizing: content-box;
}

.list-img {
    -webkit-box-sizing: border-box;
    -moz-box-sizing: border-box;
    box-sizing: border-box;
    display: inline-block;
    vertical-align: middle;
    width: 144px;
    height: 90px;
    margin-right: 20px;
    -moz-background-size: 144px 90px;
    background-size: 144px 90px;
    background-position: 50%;
    cursor: pointer;
    opacity: .5;
    border-color: transparent
}

.list-img:last-child {
    margin-right: 0
}

.list-img-unselected {
    opacity: 1;
    border: 2px solid #0073eb
}

.json {
    position: relative;
    width: 340px;
    height: 525px;
    background-color: #fafafa;
    overflow: hidden;
    font-size:16px;
    color:#bb5b5b;
}

textarea{
    outline: none;
    resize: none;
}

.deepai-content-inline-scan {
    position: absolute;
    z-index: 7;
    top: 0;
    left: 0;
    width: 840px;
    filter: progid:DXImageTransform.Microsoft.Gradient(startColorStr="transparent",endColorStr="#3e88f1",gradientType="0");
    border-bottom: 3px solid #3e88f1;
    -webkit-animation: scan 1.2s infinite;
    -moz-animation: scan 1.2s infinite;
    animation: scan 1.2s infinite;
    background: -webkit-gradient(linear,left top,left bottom,from(transparent),to(#3e88f1));
    background: -webkit-linear-gradient(top,transparent,#3e88f1);
    background: -moz-linear-gradient(top,transparent,#3e88f1);
    background: linear-gradient(180deg,transparent,#3e88f1)
}
@-webkit-keyframes scan {
    0% {
        height: 0
    }

    to {
        opacity: 0;
        height: 525px
    }
}

@-moz-keyframes scan {
    0% {
        height: 0
    }

    to {
        opacity: 0;
        height: 525px
    }
}

@keyframes scan {
    0% {
        height: 0
    }

    to {
        opacity: 0;
        height: 525px
    }
}
</style>
