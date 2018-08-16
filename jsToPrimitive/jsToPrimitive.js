/**
 *example one:  []+[]
 * result  =>  ''
 */
console.log([]+[]);

/**
 *example two:  []+{}
 * result  =>  [object Object]
 */
console.log([]+{});

/**
 *example three:  {}+[]
 * result  =>  [object Object]
 */
console.log({}+[]);
/**
 *example four:  {}+{}
 * result  =>  [object Object][object Object]
 */
console.log({}+{});

/**
 * 基本类型的加法示例
 */

/**
 * 运算元其一为字符串(String)
 */
console.log('12'+1);            // 121
console.log('abc'+'def');       // abcdef
console.log('1'+true);          //1true
console.log('1'+undefined);     //1undefined
console.log('1'+null);          //1null
console.log('1'+{});            //1[object Object]

/**
 * 运算元其一为数字(Number)
 */
console.log(1+1);            // 2
console.log(1+'def');       // 1def
console.log(1+true);          //2
console.log(1+undefined);     //NaN
console.log(1+null);          //1
console.log(1+{});            //1[object Object]

/**
 * 数字(Number)/字符串(String)以外的原始类型相加
 */
console.log(true+true);             // 2
console.log(true+null);             // 1
console.log(true+undefined);        //NaN
console.log(undefined+null);        //NaN
console.log(undefined+undefined);   //NaN
console.log(null+null);            //0

