/**
 *JS减法
 */
// //Number
// console.log(5-2);    //3
// console.log(1-3);    //-2

// //String
// console.log(3-'1');     //2
// console.log('7'-2);     //5
// console.log(2-'7');     //-5
// console.log('2'-7);     //-5
// console.log('7'-'2');   //5
// console.log('2'-'7');   //-5
// console.log('abc'-1);   //NaN
// //Boolean
// console.log(4-true);    //3
// console.log(true-false);    //1
//
// //undefined
// console.log(1-undefined);     //NaN
// console.log(undefined -1);    //NaN
//
// //Null
// console.log(1-null);     //1
// console.log(null -1);    //-1
//
// //Object
// console.log(1-[]);      //1
// console.log(1-{});      //NaN
// console.log({}-1);      //NaN
// console.log([]-[]);     //0
// console.log({}-{});     //NaN
// console.log({}-[]);     //NaN
// console.log([]-{});     //NaN
//
// //
// console.log(-1);   //-1
// console.log(-[]);   //-0
// console.log(-{});   //NaN
// console.log(-'1');  //-1
//

/**
 * JS 按位取非
 */
// console.log(~1);   //-2
// console.log(~2);   //-3
// console.log(~'abc');   //-1
// console.log(~"");      //-1
// console.log(~true);    //-2
// console.log(~null);    //-1
// console.log(~undefined);     //-1
// console.log(~{});      //-1
console.log(~[]);       //-1

//~~
console.log(~~true);     //-1
console.log(~~false);    //1
console.log(~~"");       //0
console.log(~~[]);       //0
console.log(~~undefined);     //0
console.log(~~null);       //0

