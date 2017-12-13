<template>
    <div id="cropper">
        <!-- 遮罩层 -->
        <div class="container" v-show="panel">
            <div>
                <img id="image" :src="url">
            </div>
            <div class="btn">
                <span @click="cancel">取消</span>
                <span @click="cropClick">确定</span>
            </div>
        </div>
        <!-- 遮罩层 -->
    </div>
</template>

<script>
import Cropper from 'cropperjs' //图片裁剪插件

export default {
    name: '',
    props: {
    },
    data() {
        return {
            //图片裁剪
            headerImage: '',
            picValue: '',
            cropper: '',
            croppable: false,
            panel: false,
            url: '',
        }
    },
    created() {
    },
    mounted() {
        //初始化这个裁剪框  
        var self = this;
        var image = document.getElementById('image');
        this.cropper = new Cropper(image, {
            aspectRatio: 1,
            viewMode: 1,
            background: false,
            zoomable: false,
            ready: function () {
                self.croppable = true;
            }
        });
    },
    methods: {
        //图片裁剪过程
        getObjectURL(file) {
            var url = null;
            if (window.createObjectURL != undefined) { // basic  
                url = window.createObjectURL(file);
            } else if (window.URL != undefined) { // mozilla(firefox)  
                url = window.URL.createObjectURL(file);
            } else if (window.webkitURL != undefined) { // webkit or chrome  
                url = window.webkitURL.createObjectURL(file);
            }
            return url;
        },
        changeCut(e) {  //有图片变动
            let files = e.target.files || e.dataTransfer.files;
            if (!files.length) return;
            this.panel = true;
            this.picValue = files[0];

            this.url = this.getObjectURL(this.picValue);

            //每次替换图片要重新得到新的url  
            if (this.cropper) {
                this.cropper.replace(this.url);
            }
            this.panel = true;
            return this.headerImage;
        },
        cancel() {
            this.panel = false; //关闭
            this.$emit('clearValue'); //清input值
        },
        cropClick() {
            this.panel = false;
            var croppedCanvas;
            var roundedCanvas;

            if (!this.croppable) { return; }
            // Crop  
            croppedCanvas = this.cropper.getCroppedCanvas();
            // Round  
            roundedCanvas = this.getRoundedCanvas(croppedCanvas);

            this.headerImage = roundedCanvas.toDataURL();
            // this.disabled = false;  //上传按钮状态
            // this.postImg();  //此时上传
            this.$emit("listenImgUrl", this.headerImage);
            // console.log(this.headerImage)            
        },
        getRoundedCanvas(sourceCanvas) {    //获取裁剪后的图片
            var canvas = document.createElement('canvas');
            var context = canvas.getContext('2d');
            var width = sourceCanvas.width;
            var height = sourceCanvas.height;

            canvas.width = width;
            canvas.height = height;

            context.imageSmoothingEnabled = true;
            context.drawImage(sourceCanvas, 0, 0, width, height);
            context.globalCompositeOperation = 'destination-in';
            context.beginPath();
            //context.arc(width / 2, height / 2, Math.min(width, height) / 2, 0, 2 * Math.PI, true);    //不要圆形，自定圆角即可
            context.fill();
            return canvas;
        },
        // postImg() { //这边写图片的上传
        //     console.log("上传吧，兄弟！");
        // }
    },
    components: {
    }
}
</script>

<style lang="less" rel="stylesheet/less">
@import "./cropper.less";
</style>