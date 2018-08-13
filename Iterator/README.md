#### 迭代器模式
一、迭代器模式的定义
迭代器模式(Iterator)：提供一种方法顺序一个聚合对象中各个元素，而又不暴露该对象内部表示。

迭代器的几个特点是：

访问一个聚合对象的内容而无需暴露它的内部表示。
为遍历不同的集合结构提供一个统一的接口，从而支持同样的算法在不同的集合结构上进行操作。
遍历的同时更改迭代器所在的集合结构可能会导致问题（比如C#的foreach里不允许修改item）。

二、迭代器的实现
```
/**
 * Jquery的$each
 */
$.each( [1, 2, 3], function( i, n ){
    console.log( '当前下标为： '+ i,'当前值为:' + n );
});

```
自己实现迭代器：
```
/**
 * 自己实现迭代器
 */

let each = function (arr,callback) {
    for(let i in arr){
        callback.call(arr[i],i,arr[i]);
    }
};

each([1,2,3],function (i,n) {
    console.log(i,n);
});
```
三、内部迭代器和外部迭代器
1. 内部迭代器
内部迭代器在调用的时候非常方便，外界不关心迭代器内部的实现，只做初始调用，但是由于内部迭代器的迭代规则已经被提前规定，
所以无法扩展需求。

例如，现有需求，判断两个数组里的元素是否完全相等：
```
/**
 * 判断两个数组的元素是否完全相等
 */

let compare = function (arr1,arr2) {
    if(arr1.length!==arr2.length){
        throw new Error('arr1 和 arr2不相等');
    }
    each(arr1,function (i,n) {
        if(n!==arr2[i]){
            throw new Error('arr1 和 arr2不相等');
        }
    });

    console.log('arr1 和 arr2相等');
};

compare([1,2,3],[1,2,4]);   // throw new Error('arr1 和 arr2不相等');
```
为了满足需求，我们结合each函数做出调整，但是并不是很好。

2.外部迭代器
外部迭代器必须显式的请求迭代下一个元素。
外部迭代器增强了迭代器的灵活性，使得我们可以控制迭代的过程和顺序，但是相对的也增加了一些调用的复杂度。

迭代器的外部实现：
```
/**
 * 外部迭代器的实现
 */
class Iterator {
    constructor(obj) {

        this.obj = obj;

        this.current = 0;
    }

    next() {
        this.current += 1;
    }

    isDone() {
        return this.current >= this.obj.length;
    }

    getCurrentItem() {
        return this.obj[this.current];
    }
}
```
现在改写compare函数：
```
let compareIsEqual = function (iterator1, iterator2) {
    if (iterator1.length !== iterator2.length) {
        console.log('iterator1和iterator2不相等');
    }
    while (!iterator1.isDone() && !iterator2.isDone()) {
        if (iterator1.getCurrentItem() !== iterator2.getCurrentItem()) {
            console.log('iterator1和iterator2不相等');
        }

        iterator1.next();
        iterator2.next();
    }

    console.log('iterator1和iterator2相等');
};

let iterator1 = new Iterator([1, 2, 3]);
let iterator2 = new Iterator([1, 2, 3]);
compareIsEqual(iterator1, iterator2);    //iterator1和iterator2相等
```

四、迭代类数组对象和字面量对象

无论是内部迭代器还是外部迭代器，只要被迭代的聚合对象具有length属性而且可以用下标访问，那它就可以被迭代。
```
$.each = function (obj, callback) {

    let isArray = isArrayLike(obj);
    let value;

    /**
     * 迭代类数组对象
     */
    if (isArray) {
        for (let i = 0; i < obj.length; i++) {
            value = callback.call(obj[i], i, obj[i]);

            if (value === false) {
                break;
            }
        }
    } else {
        /**
         * 迭代对象
         */
        for (let i in obj) {
            value = callback.call(obj[i], i, obj[i]);

            if (value === false) {
                break;
            }
        }
    }
    return obj;
};
```
五、迭代器模式的应用
以常用的上传文件功能为例，在不同的浏览器环境下，选择的上传方式是不一样的。因为使用浏览器的上传控件进行上传速度快，可以暂停和续传，所以我们首先会优先使用控件上传。
如果浏览器没有安装上传控件， 则使用 Flash 上传， 如果连 Flash 也没安装，那就只好使用浏览器原生的表单上传了，代码为
```
var getUploadObj = function() {
    try {
        return new ActiveXObject("TXFTNActiveX.FTNUpload"); // IE 上传控件
    } catch (e) {
        if (supportFlash()) { // supportFlash 函数未提供
            var str = '<object type="application/x-shockwave-flash"></object>';
            return $(str).appendTo($('body'));
        } else {
            var str = '<input name="file" type="file"/>'; // 表单上传
            return $(str).appendTo($('body'));
        }
    }
};
```
看看上面的代码，为了得到一个 upload 对象，这个 getUploadObj 函数里面充斥了 try，catch 以及 if 条件分支。缺点是显而易见的。

现在来梳理一下问题，目前一共有 3 种可能的上传方式，我们不知道目前浏览器支持那种上传方式，那就需要逐个尝试，直到成功为止，分别定义以下几个函数：

```
// IE 上传控件
var getActiveUploadObj = function() {
    try {
        return new ActiveXObject("TXFTNActiveX.FTNUpload");
    } catch (e) {
        return false;
    }
};

// Flash 上传
var getFlashUploadObj = function() {
    if (supportFlash()) { // supportFlash 函数未提供
        var str = '<object type="application/x-shockwave-flash"></object>';
        return $(str).appendTo($('body'));
    };
    return false;
}

// 表单上传
var getFormUpladObj = function() {
    var str = '<input name="file" type="file" class="ui-file"/>';
    return $(str).appendTo($('body'));
};

```

在以上三个函数中，如果该函数里面的 upload 对象是可用的，则让函数返回该对象，反之返回 false，提示迭代器继续往后面进行迭代。

那么迭代器只需进行下面这几步工作：

提供一个可以被迭代的方法，使得 getActiveUploadObj，getFlashUploadObj 以及 getFlashUploadObj 依照优先级被循环迭代。
如果正在被迭代的函数返回一个对象，则表示找到了正确的 upload 对象，反之如果该函数返回 false，则让迭代器继续工作。

```
var iteratorUpload = function() {
    for (var i = 0, fn; fn = arguments[i++];) {
        var upload = fn();
        if (upload !== false) {
            return upload;
        }
    }
};

var uploadObj = iteratorUpload( getActiveUploadObj, getFlashUploadObj, getFormUpladObj )
```
重构代码之后，可以看到，上传对象的各个函数彼此分离互补干扰，很方便维护和扩展，如果后期增加了 Webkit 控件上传和 HTML5 上传，我们就增加对应的函数功能并在迭代器里添加：
```
var getWebkitUploadObj = function(){
 // 具体代码略
}

var getHtml5UploadObj = function(){
 // 具体代码略
}

// 依照优先级把它们添加进迭代器
var uploadObj = iteratorUploadObj( getActiveUploadObj, getWebkitUploadObj,
getFlashUploadObj, getHtml5UploadObj, getFormUploadObj );
```