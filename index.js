const $ = require('./node_modules/jquery/dist/jquery.min');

console.log($);
console.log($.each([1,2,3],function (i) {
    console.log(i);
}));