/**
 * 在Node环境下运行Jquery
 */
const jsdom = require("jsdom");
const { JSDOM } = jsdom;
const { window } = new JSDOM(`<!DOCTYPE html>`);
const $ = require('jquery')(window);

/**
 * Jquery的$each
 */
$.each([1, 2, 3], function( i, n ){
    // console.log( '当前下标为： '+ i,'当前值为:' + n );
});

/**
 * 自己实现迭代器
 */

let each = function (arr, callback) {
    for (let i in arr) {
        callback.call(arr[i], i, arr[i]);
    }
};

// each([1,2,3],function (i,n) {
// console.log(i,n);
// });

/**
 * 判断两个数组的元素是否完全相等
 */

let compare = function (arr1, arr2) {
    if (arr1.length !== arr2.length) {
        throw new Error('arr1 和 arr2不相等');
    }
    each(arr1, function (i, n) {
        if (n !== arr2[i]) {
            throw new Error('arr1 和 arr2不相等');
        }
    });

    console.log('arr1 和 arr2相等');
};

// compare([1,2,3],[1,2,4]);
// compare([1,2,3],[1,2,3]);

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

let compareIsEqual = function (iterator1, iterator2) {
    if (iterator1.length !== iterator2.length) {
        throw new Error('iterator1和iterator2不相等');
    }
    while (!iterator1.isDone() && !iterator2.isDone()) {
        if (iterator1.getCurrentItem() !== iterator2.getCurrentItem()) {
            throw new Error('iterator1和iterator2不相等');
        }

        iterator1.next();
        iterator2.next();
    }

    console.log('iterator1和iterator2相等');
};

let iterator1 = new Iterator([1, 2, 3]);
let iterator2 = new Iterator([1, 2, 4]);
// compareIsEqual(iterator1, iterator2);

/**
 * 迭代类数组对象和字面量对象
 */
function isArrayLike(obj) {
    var length = !!obj && "length" in obj && obj.length,
        type = toType( obj );

    if ( isFunction( obj ) || isWindow( obj ) ) {
        return false;
    }

    return type === "array" || length === 0 ||
        typeof length === "number" && length > 0 && ( length - 1 ) in obj;
}
let iteratorFunc = function (obj,callback) {

    console.log($.isArrayLike);
    let isArray = $.isArrayLike(obj);
   // let isArray = $.isArrayLike(obj);
   console.log(isArray);

    /**
     * 迭代类数组对象
     */
   if(isArray){
       for(let i=0;i<obj.length;i++){
           value = callback.call(obj[i],i,obj[i]);

           if(value === false){
               break;
           }
       }
   }else {
       /**
        * 迭代对象
        */

       for(let i in obj){
           value = callback.call(obj[i],i,obj[i]);

           if(value === false){
               break;
           }
       }
   }

   return obj;
};

iteratorFunc([1,2,3]);
