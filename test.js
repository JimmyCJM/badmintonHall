
//test moment.js
/*

var moment = require('moment');
let input = `2016-06-02 22:00~22:00`
let time = moment().format(`YYYY-MM-DD HH:mm`)
console.log(time);

//test day
let date = new Date(`2016-06-22`)
console.log(date.getDay());

console.log(input.split(" ")[1].split("~"));

//test checkDate()
var checkDate = require("./checkDate.js");
console.log(checkDate(`2017-08-05 09:00~11:00`));

*/

//test checkInput()
/*
var checkDate = require("./checkDate.js");
var checkInput = require ("./checkInput.js");
let information = `U001 2016-06-02 22:00~22:00 A`.split(" ");

console.log(checkInput(`U002 2017-08-01 19:00~22:00 A`));
*/

//test arr.sort()
/*
let begin = [`2017-08-01 18:00`];
let over = [`2017-08-01 20:00`];
let bookIfo = [`U003 2017-08-01 18:00~20:00 A`];
let beginTime = [`2017-08-01 19:00`]
for (let i=0;i<begin.length;i++){
    console.log((beginTime >= begin[i] && beginTime <= over[i]));
}
*/

//test check information
/*
let information = `U002 2017-08-01 19:00~22:00 A C`;
information = information.split(" ");
information.pop();
console.log(information.join(" "));
*/

//test time
/*
let begin = `2017-08-01 19:00`;
let time = `2017-08-01 20:00`
console.log(parseInt(time.split(" ")[1]) - parseInt(begin.split(" ")[1]));
*/

//test sunIncome
/*
let begin = ['2017-08-01 18:00','2017-08-02 13:00'];
let over = ['2017-08-01 20:00','2017-08-02 17:00'];
let bookIfo = ['U003 2017-08-01 18:00~20:00 A','U003 2017-08-02 13:00~17:00 B'];
let bookCancel = ['U002 2017-08-01 19:00~22:00 A C'];
*/

//test printIfo
/*
let begin = ['2017-08-05 09:00'];
let over = ['2017-08-05 11:00'];
let bookIfo = ['U005 2017-08-05 09:00~11:00 D'];
let bookCancel = [];
var dailyTime = [`09:00`,`12:00`,`18:00`,`20:00`,`22:00`];
var dailyFees = [30,50,80,60];
var weekendTime = [`09:00`,`12:00`,`18:00`,`22:00`];
var weekenFees = [40,50,60];
var income_A = [];
var income_B = [];
var income_C = [];
var income_D = [];
var income_A_c = [];
var income_B_c = [];
var income_C_c = [];
var income_D_c = [];
var printIfo = `收入汇总
---`;
var  bookIfo_A = [];
var  bookIfo_B = [];
var  bookIfo_C = [];
var  bookIfo_D = [];
var sum_A = 0;
var sum_B = 0;
var sum_C = 0;
var sum_D = 0;

let income = 0;
let incomeArr = [];
let day = 0;
//使用收费
for(let i=0;i<bookIfo.length;i++){
    day = bookIfo[i].split(" ")[1];
    day = new Date(`${day}`);
    day = day.getDay();
    console.log(`day:${day}`)
    //周一到周五
    if (day > 0 && day <6){
        for (let j=1;j<dailyTime.length-1;j++){
            //预定时间在同一个收费时间段
            if ( (begin[i].split(" ")[1] >= dailyTime[j-1] && over[i].split(" ")[1] <= dailyTime[j]) ){
                income = dailyFees[j-1] * ( parseInt(over[i].split(" ")[1].split(":")[0]) - parseInt(begin[i].split(" ")[1].split(":")[0]));
            }
            //预定时间在不同收费时间段
            else {
                if (begin[i].split(" ")[1] >= dailyTime[j-1] && begin[i].split(" ")[1] < dailyTime[j]){
                    income += dailyFees[j-1] * ( parseInt(dailyTime[j].split(":")[0]) - parseInt(begin[i].split(" ")[1].split(":")[0]) );
                }
                if (over[i].split(" ")[1] > dailyTime[j] && over[i].split(" ")[1] <= dailyTime[j+1]){
                    income += dailyFees[j] * ( parseInt(over[i].split(" ")[1].split(":")[0]) - parseInt(dailyTime[j].split(":")[0]) );
                }
            }
        }
        incomeArr.push(income);
    }
    //周六及周日
    else {
        for (let j=1;j<weekendTime.length-1;j++){
            //预定时间在同一个收费时间段
            if ( (begin[i].split(" ")[1] >= weekendTime[j-1] && over[i].split(" ")[1] <= weekendTime[j]) ){
                income = weekenFees[j-1] * ( parseInt(over[i].split(" ")[1].split(":")[0]) - parseInt(begin[i].split(" ")[1].split(":")[0]));
            }
            //预定时间在不同收费时间段
            else {
                if (begin[i].split(" ")[1] >= weekendTime[j-1] && begin[i].split(" ")[1] < weekendTime[j]){
                    income += weekenFees[j-1] * ( parseInt(dailyTime[j].split(":")[0]) - parseInt(begin[i].split(" ")[1].split(":")[0]) );
                }
                if (over[i].split(" ")[1] > weekendTime[j] && over[i].split(" ")[1] <= weekendTime[j+1]){
                    income += weekenFees[j] * ( parseInt(over[i].split(" ")[1].split(":")[0]) - parseInt(dailyTime[j].split(":")[0]) );
                }
            }
        }
        incomeArr.push(income);
    }
    switch (bookIfo[i].split(" ")[3]){
        case 'A':{
            income_A.push(incomeArr);
            incomeArr = [];
        }break;
        case 'B':{
            income_B.push(incomeArr);
            incomeArr = [];
        }break;
        case 'C':{
            income_C.push(incomeArr);
            incomeArr = [];
        };break;
        case 'D':{
            income_D.push(incomeArr);
            incomeArr = [];
        };break;
    }
    income = 0;
}
income_A.toString();
income_B.toString();
income_C.toString();
income_D.toString();
//违约金
for (let i=0;i<bookCancel.length;i++){
    day = bookCancel[i].split(" ")[1];
    day = new Date(`${day}`);
    day = day.getDay();
    //周一到周五
    if (day > 0 && day <6){
        for (let j=1;j<dailyTime.length-1;j++){
            //预定时间在同一个收费时间段
            if ( bookCancel[i].split(" ")[2].split("~")[0] >= dailyTime[j-1] && bookCancel[i].split(" ")[2].split("~")[1] <= dailyTime[j] ){
                income = dailyFees[j-1] * ( parseInt(bookCancel[i].split(" ")[2].split("~")[1]) - parseInt(bookCancel[i].split(" ")[2].split("~")[0]));
            }
            //预定时间在不同收费时间段
            else {
                if (bookCancel[i].split(" ")[2].split("~")[0] >= dailyTime[j-1] && bookCancel[i].split(" ")[2].split("~")[0] < dailyTime[j]){
                    income += dailyFees[j-1] * ( parseInt(dailyTime[j].split(":")[0]) - parseInt(bookCancel[i].split(" ")[2].split("~")[0]));
                }
                if (bookCancel[i].split(" ")[2].split("~")[1] > dailyTime[j] && bookCancel[i].split(" ")[2].split("~")[1] <= dailyTime[j+1]){
                    income += dailyFees[j] * ( parseInt(bookCancel[i].split(" ")[2].split("~")[1]) - parseInt(dailyTime[j].split(":")[0]));
                }
            }
        }
        incomeArr.push(income * 0.5);
    }
    //周六及周日
    else {
        for (let j=1;j<weekendTime.length-1;j++){
            //预定时间在同一个收费时间段
            if ( (begin[i].split(" ")[1] >= weekendTime[j-1] && over[i].split(" ")[1] <= weekendTime[j]) ){
                income = weekenFees[j-1] * ( parseInt(over[i].split(" ")[1].split(":")[0]) - parseInt(begin[i].split(" ")[1].split(":")[0]));
            }
            //预定时间在不同收费时间段
            else {
                if (begin[i].split(" ")[1] >= weekendTime[j-1] && begin[i].split(" ")[1] < weekendTime[j]){
                    income += weekenFees[j-1] * ( parseInt(dailyTime[j].split(":")[0]) - parseInt(begin[i].split(" ")[1].split(":")[0]) );
                }
                if (over[i].split(" ")[1] > weekendTime[j] && over[i].split(" ")[1] <= weekendTime[j+1]){
                    income += weekenFees[j] * ( parseInt(over[i].split(" ")[1].split(":")[0]) - parseInt(dailyTime[j].split(":")[0]) );
                }
            }
        }
        incomeArr.push(income * 0.25);
    }
    switch (bookIfo[i].split(" ")[3]){
        case 'A':{
            income_A_c.push(incomeArr);
            incomeArr = [];
        }break;
        case 'B':{
            income_B_c.push(incomeArr);
            incomeArr = [];
        }break;
        case 'C':{
            income_C_c.push(incomeArr);
            incomeArr = [];
        };break;
        case 'D':{
            income_D_c.push(incomeArr);
            incomeArr = [];
        };break;
    }
    income = 0;
}
//输出处理
for (let i=0;i<bookIfo.length;i++){
    //统计各场地预定信息
    switch (bookIfo[i].split(" ")[3]){
        case 'A':{
            for (let j=0;j<income_A.length;j++){
                bookIfo_A.push(`${bookIfo[i].split(" ")[1]} ${bookIfo[i].split(" ")[2]} ${income_A[j]}元`);
                sum_A += parseInt(income_A[j]);
            }
        }break;
        case 'B':{
            for (let j=0;j<income_B.length;j++){
                bookIfo_B.push(`${bookIfo[i].split(" ")[1]} ${bookIfo[i].split(" ")[2]} ${income_B[j]}元`);
                sum_B += parseInt(income_B[j]);
            }
        }break;
        case 'C':{
            for (let j=0;j<income_C.length;j++){
                bookIfo_C.push(`${bookIfo[i].split(" ")[1]} ${bookIfo[i].split(" ")[2]} ${income_C[j]}元`);
                sum_C += parseInt(income_C[j]);
            }
        }break;
        case 'D':{
            for (let j=0;j<income_D.length;j++){
                bookIfo_D.push(`${bookIfo[i].split(" ")[1]} ${bookIfo[i].split(" ")[2]} ${income_D[j]}元`);
                sum_D += parseInt(income_D[j]);
            }
        }break;
    }
}
for (let i=0;i<bookCancel.length;i++){
    switch (bookIfo[i].split(" ")[3]){
        case 'A':{
            for (let j=0;j<income_A.length;j++){
                bookIfo_A.push(`${bookIfo[i].split(" ")[1]} ${bookIfo[i].split(" ")[2]} 违约金 ${income_A_c[j]}元`);
                sum_A += parseInt(income_A_c[j]);
            }
        }break;
        case 'B':{
            for (let j=0;j<income_B.length;j++){
                bookIfo_B.push(`${bookIfo[i].split(" ")[1]} ${bookIfo[i].split(" ")[2]} 违约金 ${income_B_c[j]}元`);
                sum_B += parseInt(income_B_c[j]);
            }
        }break;
        case 'C':{
            for (let j=0;j<income_C.length;j++){
                bookIfo_C.push(`${bookIfo[i].split(" ")[1]} ${bookIfo[i].split(" ")[2]} 违约金 ${income_C_c[j]}元`);
                sum_C += parseInt(income_C_c[j]);
            }
        }break;
        case 'D':{
            for (let j=0;j<income_D.length;j++){
                bookIfo_D.push(`${bookIfo[i].split(" ")[1]} ${bookIfo[i].split(" ")[2]} 违约金 ${income_D_c[j]}元`);
                sum_D += parseInt(income_D_c[j]);
            }
        }break;
    }
}
//输出场地A
printIfo += `\n场地:A`;
for (let i=0;i<bookIfo_A.length;i++){
    printIfo += `\n${bookIfo_A[i]}`
}
printIfo += `\n小计：${sum_A}元\n`
//输出场地B
printIfo += `\n场地:B`;
for (let i=0;i<bookIfo_B.length;i++){
    printIfo += `\n${bookIfo_B[i]}`
}
printIfo += `\n小计：${sum_B}元\n`
//输出场地C
printIfo += `\n场地:C`;
for (let i=0;i<bookIfo_C.length;i++){
    printIfo += `\n${bookIfo_C[i]}`
}
printIfo += `\n小计：${sum_C}元\n`
//输出场地B
printIfo += `\n场地:D`;
for (let i=0;i<bookIfo_D.length;i++){
    printIfo += `\n${bookIfo_D[i]}`
}
printIfo += `\n小计：${sum_D}元\n`

printIfo += `---
总计：${ sum_A + sum_B + sum_C + sum_D}元`;
//
/*
income_A.toString();
income_B.toString();
income_C.toString();
income_D.toString();
if (income_A_c.length > 0){
    income_A_c.toString();
    income_A_c = `\n 违约金 ${income_A_c}元`
}
else {
    income_A_c = ``;
}
if (income_B_c.length > 0){
    income_B_c.toString();
    income_B_c = `\n 违约金 ${income_B_c}元`
}
else {
    income_B_c = ``;
}
if (income_C_c.length > 0){
    income_C_c.toString();
    income_C_c = `\n 违约金 ${income_C_c}元`
}
else {
    income_C_c = ``;
}
if (income_D_c.length > 0){
    income_D_c.toString();
    income_D_c = `\n 违约金 ${income_D_c}元`
}
else {
    income_D_c = ``;
}

console.log(printIfo);
*/
