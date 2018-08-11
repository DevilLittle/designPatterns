#### 迭代器模式
一、迭代器
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