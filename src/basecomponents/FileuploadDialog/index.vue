<template>
    <div class="FileuploadDialog" v-show="isShow">
        <div class="close" v-on:click="close" style="display: none;">x</div>
        <ul class="FileItemBox">
            <li class="item" v-for="(item,index) in files" :key="index">
                <div class="title">{{item.name}}</div>
                <div class="percent">
                    <div class="percentBox">
                        <div class="progressBar" ref="progressBar"></div>
                    </div>
                </div>
                <div class="scheduleValue" ref="scheduleValue">0%</div>
            </li>
        </ul>
    </div>
</template>

<script>
import fileUpload from '@/libs/fileUpload'

function contains(arr, obj) {
    var i = arr.length;
    while (i--) {
        if (arr[i] === obj) {
            return true;
        }
    }
    return false;
}
//二进制文件转Blob
function dataURLtoBlob(dataurl) {
    var arr = dataurl.split(','), mime = arr[0].match(/:(.*?);/)[1],
        bstr = atob(arr[1]), n = bstr.length, u8arr = new Uint8Array(n);
    while (n--) {
        u8arr[n] = bstr.charCodeAt(n);
    }
    return new Blob([u8arr], { type: mime });
}
export default {
    name: 'FileuploadDialog',
    props: {
        url: {
            type: String,
            required: true
        },
        formName: {
            type: String,
            default: "fileToUpload"
        },
        format: {
            type: String,
            default: ""
        },
        method: {
            type: String,
            default: "PUT"
        },
        isShowDialog: {
            type: Boolean,
            default: false
        },
        closeMethod: {
            type: Function,
            default: function() {
                //console.log("closeMethod");
            }
        },
        fileUploadSuccess: {
            type: Function,
            default: function(res) {
                //console.log(res);
            }
        },
        startUpload: {
            type: Function,
            default: function(event) {
                //console.log(event);
            }
        }
    },
    data() {
        return {
            isShow: this.isShowDialog,
            files: [],
            fileIndex: 0
        }
    },
    methods: {
        upload(inputElement) {
            let files = [];
            if (Array.isArray(inputElement)) {//[file] 直接是文件数组
                inputElement.forEach(function(element) {
                    //解决图片name丢失问题
                    files.push(dataURLtoBlob(element));
                }, this);
            } else {//是input type="file"
                files = inputElement.files;
            }

            //允许上传文件后缀
            var format = [];
            if (this.format != "") {
                format = this.format.split(",");
            }

            //说明需要过滤,过滤出允许上传的文件
            if (format.length > 0) {
                var newfiles = [];
                for (var i = 0; i < files.length; i++) {
                    var suffix = "." + files[i].name.split('.').pop().toLowerCase();
                    if (contains(format, suffix)) {
                        newfiles.push(files[i]);
                    }
                }
                files = newfiles;
            }

            if (files && files.length > 0) {
                this.isShow = true;
                this.files = files;
            } else {
                return
            }

            var _this = this;
            this.Upload = fileUpload({
                method: _this.method,
                url: _this.url,
                FileList: files,
                formName: _this.formName,
                onprogress: function(event) {//上传进度
                    _this.$refs.progressBar[_this.fileIndex].style.width = event.percent + "%";
                    _this.$refs.scheduleValue[_this.fileIndex].innerHTML = event.percent + "%";
                },
                onloadstart: function(event) {//开始上传
                    _this.startUpload(event);
                },
                onload: function(res) {//上传成功
                    _this.fileUploadSuccess(res);
                    _this.fileIndex++
                    //console.log(_this.fileIndex)
                    if (_this.fileIndex == files.length) {
                        //console.log("ok")
                        _this.close();
                        if (!Array.isArray(inputElement)) {
                            inputElement.value = "";
                        }
                    }
                },
                onerror: function(event) {//出错
                    console.log("onerror", event);
                },
                onabort: function(event) {//取消上传
                    //console.log("取消上传",event);
                },
                onloadend: function(event) {//不管成功还是失败都执行
                    //console.log("不管成功还是失败都执行",event); 
                }
            });
            //Upload.abort();
        },
        close() {
            this.isShow = false;
            this.fileIndex = 0;
            this.Upload.abort();
            this.closeMethod();
        }
    }
}
</script>


<style lang="less" rel="stylesheet/less">
@import "./zh-cn.less";
@import "./en.less";
</style>