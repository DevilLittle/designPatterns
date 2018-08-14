#### JS加法运算全解析

终极命题：
在JS中：[]+[]、[]+{}、{}+[]、{}+{}的结果分别是什么？

一、JS中的类型
* JS中的值有两种类型：原始类型(Primitive)、对象类型(Object)。
* 基本类型包括：Undefined、Null、Boolean、Number和String等五种。
* Undefined类型和Null类型的都只有一个值，即undefined和null；Boolean类型有两个值：true和false；Number类型的值有很多很多；String类型的值理论上有无数个。
* 所有对象都有valueOf()和toString()方法，它们继承自Object，当然也可能被子类重写。

二、JS中的加法运算规则

对于JS的加法运算：
1.使用ToPrimitive运算转换左右运算元为原始数据类型（primitive）。
2.在第一步转换后，如果有运算元出现原始数据类型是“字符串”类型值时，则另一运算元强制转换为字符串，然后做字符串的连接运算
3.在其他情况时，所有运算元都会转换为原始数据类型的“数字”类型值，然后作数字的相加


三、ToPrimitive内部运算
加号运算符只能用于原始数据类型，对于对象类型的值，需要进行数据转换。

在ECMAScript中，有一个抽象的ToPrimitive运算，用于将对象转换为原始数据类型，在对象的加法、关系比较或值相等比较的运算中，都会用到。
关于ToPrimitive的说明语法:
```
ToPrimitive(input, PreferredType?)
```
input代表代入的值，PreferredType可以是数字(Number)或字符串(String)其中一种，表示需要优先转换的原始类型。但如果没有提供这个值也就是预设情况，
则会设置转换的hint值为"default"。这个首选的转换原始类型的指示(hint值)，是在作内部转换时由JS视情况自动加上的，一般情况就是预设值。

而在JS的Object原型的设计中，有两个方法，valueOf与toString，在对象的数据类型转换过程中会根据传入的值调整被调用的顺序。

* PreferredType为数字（Number）时
当PreferredType为数字(Number)时，input为要被转换的值，以下是转换这个input值的步骤:
1.如果input为原始数据类型，直接返回input。
2.否则，input是对象，调用valueOf()方法，如果能得到原始数据类型的值，返回这个值。
3.否则，input是对象，调用toString()方法，如果能得到原始数据类型的值，返回这个值。
4.否则，抛出TypeError错误。

* PreferredType为字符串（String）时
1.如果input是原始数据类型，直接返回input。
2.否则，input是对象，调用toString()方法，如果能得到原始数据类型的值，返回这个值。
3.否则，input是对象，调用valueOf()方法，如果能得到原始数据类型的值，返回这个值。
4.否则，抛出TypeError错误。

* PreferredType未提供（default）时
PreferredType预设类型为Number，所以先调用valueOf()，再调用toString()。

其中比较特殊的是Date对象和Symbol对象，他们覆盖了原来的PreferredType行为，Date对象预设首选类型是String。

四、valueOf()和toString()

valueOf()和toString()是Object上的两个方法，但是在JS中，可能会根据Object之间的差异，返回值有所不同。

* 普通的Object对象

valueOf():返回对象本身
toString():"[object Object]"字符串值,不同的内建对象的返回值是"[object type]"字符串，"type"指的是对象本身的类型识别，
例如Math对象是返回"[object Math]"字符串。但有些内建对象因为覆盖了这个方法，所以直接调用时不是这种值。
(注意: 这个返回字符串的前面的"object"开头英文是小写，后面开头英文是大写)

利用Object中的toString来进行各种不同对象的判断语法:
```
Object.prototype.toString.call([])
"[object Array]"

Object.prototype.toString.call(new Date)
"[object Date]"
```
需要配合call，才能得到正确的对象类型值。

* Array(数组)
Array(数组)虽然是个对象类型，但它与Object的设计不同，它的toString有覆盖，说明一下数组的valueOf与toString的两个方法的返回值:
valueOf(): 返回对象本身
toString(): 相当于用数组值调用join(',')所返回的字符串。也就是[1,2,3].toString()会是"1,2,3"，这点要特别注意。

* Function对象
Function对象很少会用到，它的toString也有被覆盖，所以并不是Object中的那个toString，Function对象的valueOf与toString的两个方法的返回值:
valueOf(): 返回对象本身
toString(): 返回函数中包含的代码转为字符串值。

五、Number、String、Boolean包装对象
JS的包装对象是必须使用new关键字进行对象实例化的，直接使用Number()、String()与Boolean()三个强制转换函数的用法。例如new Number(123)，而Number('123')则是强制转换其他类型为数字类型的函数。

* 包装对象

包装对象是JS为原始数据类型数字、字符串、布尔专门设计的对象，所有的这三种原始数据类型所使用到的属性与方法，都是在这上面所提供。

包装对象的valueOf与toString的两个方法在原型上有经过覆盖，所以它们的返回值与一般的Object的设计不同:

valueOf方法返回值: 对应的原始数据类型值

toString方法返回值: 对应的原始数据类型值，转换为字符串类型时的字符串值

toString方法会比较特别，这三个包装对象里的toString的细部说明如下:
* Number包装对象的toString方法: 可以有一个传参，可以决定转换为字符串时的进位(2、8、16)
* String包装对象的toString方法: 与String包装对象中的valueOf相同返回结果
* Boolean包装对象的toString方法: 返回"true"或"false"字符串

* 强制转换
Number()、String()与Boolean()三个强制转换函数，所对应的就是在ECMAScript标准中的ToNumber、ToString、ToBoolean三个内部运算转换的对照表。

通过ToNumber()把值转换成Number:
参数          结果
undefined	  NaN
null	      +0
boolean	      true被转换为1,false转换为+0
number	      无需转换
string	      由字符串解析为数字。例如，”324″被转换为324


通过ToString()把值转化成字符串:
参数	           结果
undefined	   “undefined”
null	       “null”
boolean	       “true” 或者 “false”
number	       数字作为字符串。比如，”1.765″
string	       无需转换


六、从实例中理解
* 基本类型(只考虑原始类型)
1.运算元其一为字符串(String)
```
/**
 * 运算元其一为字符串(String)
 */
console.log('12'+1);            // 121
console.log('abc'+'def');       // abcdef
console.log('1'+true);          //1true
console.log('1'+undefined);     //1undefined
console.log('1'+null);          //1null
```
运算元其一为字符串，字符串的拼接运算。

2.运算元其一为数字(Number)
```
/**
 * 运算元其一为数字(Number)
 */
console.log(1+1);            // 2
console.log(1+'def');       // 1def
console.log(1+true);          //2
console.log(1+undefined);     //NaN
console.log(1+null);          //1
```
1+'def'为运算元其一为字符串情况，其余为在没有字符串情况下，运算元其一为数字，做类型转换后相加。

3.数字(Number)/字符串(String)以外的原始类型相加
```
/**
 * 数字(Number)/字符串(String)以外的原始类型相加
 */
console.log(true+true);             // 2
console.log(true+null);             // 1
console.log(true+undefined);        //NaN
console.log(undefined+null);        //NaN
console.log(undefined+undefined);   //NaN
console.log(null+null);            //0
```
当数字与字符串以外的，其他原始数据类型直接使用加号运算时，就是转为数字再运算，这与字符串完全无关。

4.空数组 + 空数组
```
console.log([] + []);        //""
```
5.空对象 + 空对象
```
console.log({} + {});        //"[object Object][object Object]"
```
6.空对象 + 空数组
```
console.log({} + []);        //"[object Object]"
```
7.Date对象
```
console.log(1 + (new Date()));       //"1Tue Aug 14 2018 21:18:24 GMT+0800 (中国标准时间)"
```
8.Symbols类型
ES6中新加入的Symbols数据类型，它不算是一般的值也不是对象，它并没有内部自动转型的设计，所以完全不能直接用于加法运算，使用时会报错。

9. +[]/+{}

六、扩展

终极命题：
(!(~+[])+{})[--[~+""][+[]]*[~+[]] + ~~!+[]]+({}+[])[[~!+[]]*~+[]]的结果是什么？
