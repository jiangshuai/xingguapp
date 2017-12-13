window.fileUpload = (function() {
    function fileUpload(option) {
        var uploadUrl;
        if (option && option.url && option.url != "") {
            uploadUrl = option.url
        } else {
            console.error("upload url undefined");
            return
        }

        var FileList = [];
        if (option.FileList && option.FileList.length > 0) {
            FileList = option.FileList
        } else {
            console.log("no FileList");
            return
        }
        //上传方式
        var method;
        if (option.method && option.method != '') {
            method = option.method;
        } else {
            method = 'PUT';
        }

        //FormData 对象 key
        var formName = option.formName || 'fileToUpload';
        var i = 0;
        var xhr;

        function Upload(file) {
            // console.log(file);
            //1.准备FormData
            var fd = new FormData();
            var fileName = file.name == undefined ? new Date() * 1 + "." + file.type.split("/")[1].toLowerCase() : file.name
            fd.append(formName, file, fileName);

            // 2.创建xhr对象
            if (!xhr) {
                xhr = new XMLHttpRequest();
            }

            // 监听状态，实时响应
            // xhr 和 xhr.upload 都有progress事件，xhr.progress是下载进度，xhr.upload.progress是上传进度
            //这里监听上传进度事件，文件在上次的过程中，会多次触发该事件，返回一个event事件对象
            xhr.upload.onprogress = function(event) {
                if (event.lengthComputable) { //返回一个  长度可计算的属性，文件特别小时，监听不到，返回false
                    //四舍五入
                    var percent = Math.round(event.loaded * 100 / event.total); //event.loaded:表示当前已经传输完成的字节数。
                    //event.total:当前要传输的一个总的大小.通过传输完成的除以总的，就得到一个传输比率
                    event["percent"] = percent
                    option && option.onprogress && option.onprogress(event);
                }
            };

            // 传输开始事件
            xhr.onloadstart = function(event) {
                option && option.onloadstart && option.onloadstart(event);
            };
            // xhr.abort();//调用该方法停止ajax上传，停止当前的网络请求

            //每个文件上传成功
            xhr.onload = function(event) {
                option && option.onload && option.onload(JSON.parse(event.target.response));
                i++
                if (i < FileList.length) {
                    setTimeout(function() {
                        Upload(FileList[i]);
                    }, 200);
                }
            };

            // ajax过程发生错误事件
            xhr.onerror = function(event) {
                option && option.onerror && option.onerror(event);
            };

            // ajax被取消，文件上传被取消，说明调用了 xhr.abort();  方法，所触发的事件
            xhr.onabort = function(event) {
                option && option.onabort && option.onabort(event);
            };

            // loadend传输结束，不管成功失败都会被触发
            xhr.onloadend = function(event) {
                option && option.onloadend && option.onloadend(event);
            };

            // 发起ajax请求传送数据
            xhr.open(method, uploadUrl, true);
            xhr.send(fd); //发送文件
        }
        Upload(FileList[i]);
        return {
            abort: function() {
                xhr.abort();
            }
        };
    }
    return fileUpload;
})()

try {
    module.exports = window.fileUpload
} catch (error) {

}