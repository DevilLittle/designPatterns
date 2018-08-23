#### JS运算解析
一、JS减法
```
result = number1 - number2;
```
对于JS的减法运算，整体规则是当运算符两边的运算元不为Number时，转换为Number再计算。

通过ToNumber()把值转换成Number:
参数          结果
undefined	  NaN
null	      +0
boolean	      true被转换为1,false转换为+0
number	      无需转换
string	      由字符串解析为数字。例如，”324″被转换为324

实例：
1、基本类型
```
//Number(直接相减)
console.log(5-2);    //3
console.log(1-3);    //-2

//String(转化为Number后相减)
console.log(3-'1');     //2
console.log('7'-2);     //5
console.log(2-'7');     //-5
console.log('2'-7);     //-5
console.log('7'-'2');   //5
console.log('2'-'7');   //-5
console.log('abc'-1);   //NaN

//Boolean(转换后true为1，false为+0)
console.log(4-true);    //3
console.log(true-false);    //1

//undefined(undefined转换后为NaN)
console.log(1-undefined);     //NaN
console.log(undefined -1);    //NaN

//Null(null转换后为+0)
console.log(1-null);     //1
console.log(null -1);    //-1
```
2、Object类型
由于Object为复杂类型，做减法运算时，要先调用内置的valueOf()转化为Number类型后再做运算
```
//Object
console.log(1-[]);      //1
console.log(1-{});      //NaN
console.log({}-1);      //NaN
console.log([]-[]);     //0
console.log({}-{});     //NaN
console.log({}-[]);     //NaN
console.log([]-{});     //NaN
```
3、一元运算
```
console.log(-1);   //-1
console.log(-[]);   //-0
console.log(-{});   //NaN
console.log(-'1');  //-1
```

二、JS~运算(按位取反)
```
result = ~ [数字]
```
~ 运算符查看表达式的二进制表示形式的值，并执行位非运算,表达式中的任何一位为 1，则结果中的该位变为 0。
表达式中的任何一位为 0，则结果中的该位变为 1。

实例：
```
var temp = ~5;
/*
5 二进制 101，补满 32位
00000000000000000000000000000101
按位取反
11111111111111111111111111111010
由于32位开头第一个是1，所以这是一个负数，将二进制转换成负数，需要先反码
00000000000000000000000000000101
之后，再+1
00000000000000000000000000000110
转换成十进制为6，加上符号变成负数 -6
*/
alert(temp);
// 弹出 [-6]
```
~【数字】，所以~运算符后面的类型要转换为Number。
```
/**
 * JS 按位取非
 */
console.log(~1);   //-2
console.log(~2);   //-3
console.log(~'abc');   //-1
console.log(~"");      //-1
console.log(~true);    //-2
console.log(~null);    //-1
console.log(~undefined);     //-1
console.log(~{});      //-1
console.log(~[]);       //-1
```

*扩展~~
```
console.log(~~true);     //-1
console.log(~~false);    //1
console.log(~~"");       //0
console.log(~~[]);       //0
console.log(~~undefined);     //0
console.log(~~null);       //0
```
~~运算在~的基础上再做一次~操作

按位与&
按照1&1为1，其它都为0

按位或|
按照0|0为0，其它都为1

按位亦或^
按照0^0为1，1^1为1，其它都为0

左移<<
右边的空位用0补齐

右移>>
左边的空位正数用0补齐，负数用1补齐

无符号右移>>>
左边的空位用0补齐


三、复杂运算
++[[]][+[]]+[+[]]
根据运算级拆分：
```
(++[[]][+[]])
+
([+[]])
```
左边：
1、+[]一元运算符会调用 ToNumber 方法把 ToNumber([]) 转化成数字，根据ToNumber(x) 的转换规则，x为[]是数组对象，因此会调用 ToPrimitive 方法,
根据ToPrimitive(input [ , PreferredType]) 的转换规则，空数组先调用valueOf()，得到[]不是原始值，再调用toString()，得到“”空字符串。然后再调
用 ToNumber("")得到0。
2、此时表达式为(++[[]][0]),其中[[]][0]看做数组和数组下标，而且数组下标的优先级高于一元运算符++，所以[[]][0]看做是[[]]数组的第一个元素，则为[]
,最后变为++[],结果为1。

右边：
[+[]]中+[]一元运算符会调用 ToNumber 方法把 ToNumber([]) 转化成数字，根据ToNumber(x) 的转换规则，x为[]是数组对象，因此会调用 ToPrimitive 方法,
根据ToPrimitive(input [ , PreferredType]) 的转换规则，空数组先调用valueOf()，得到[]不是原始值，再调用toString()，得到“”空字符串。然后再调
用 ToNumber("")得到0，最后为[0]。

由此，++[[]][+[]]+[+[]]问题变成了1+[0]问题，遇见+运算符，左边为1(Number)不用转换，右边为[0]需要转换，先调用valueOf(),得到[0]不是原始值，继续
调用toString(),得到字符串'0',1+'0',运算元其一为字符串做拼接运算，得到结果10。
