
var readline = require("readline");
var rl = readline.createInterface(process.stdin,process.stdout);

var bookIfo = [];
var begin = [];
var over = [];
var bookCancel = [];
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

//日期检测函数
function checkDate(input) {
    input = input.split(" ");
    let year = input[0].split("-")[0];
    let month = input[0].split("-")[1];
    let day = input[0].split("-")[2];
    let hour1 = input[1].split("~")[0].split(":")[0];
    let hour2 = input[1].split("~")[1].split(":")[0];
    let minute1 = input[1].split("~")[0].split(":")[1];
    let minute2 = input[1].split("~")[1].split(":")[1];
    if (year.length === 4 && month.length === 2 && day.length === 2
        && hour1.length === 2 && hour2.length === 2 && hour2 > hour1
        && parseInt(hour1) >= 9 && parseInt(hour2) <= 22
        && minute1 === '00' && minute2 === '00')
        return true;
    else return false;
}

//输入检测函数
function checkInput(input) {
    let information = input.split(" ");
    let error = `Error: the booking is invalid!`
    //判断输入字符串格式
    if (information.length < 4) return error;
    if (information.length === 4){
        if (information[0][0] !== 'U' || typeof parseInt(information[0][1]) !== 'number'
            || typeof parseInt(information[0][2]) !== 'number' || typeof parseInt(information[0][3]) !== 'number') return error;
        switch (information[3]){
            case 'A':;break;
            case 'B':;break;
            case 'C':;break;
            case 'D':;break;
            default: return error;break;
        }
        //判断日期
        let date = `${information[1]} ${information[2]}`;
        if (!checkDate(date)) return error;
        //判断时间是否冲突
        begin = begin.sort();
        over = over.sort();
        let beginTime = `${information[1]} ${information[2].split("~")[0]}`;
        let overTime = `${information[1]} ${information[2].split("~")[1]}`
        for (let i=0;i<begin.length;i++){
            if (beginTime >= begin[i] && beginTime <= over[i]){
                return `Error: the booking conflicts with existing bookings!`;
            }
        }
        for (let i=0;i<begin.length;i++){
            if (overTime >= begin[i] && overTime <= over[i]){
                return `Error: the booking conflicts with existing bookings!`;
            }
        }
    }
    //判断取消预定信息
    if(information.length === 5){
        if (information[4] !== 'C') {return error;}
        else {
            information.pop()
            if(!bookIfo.includes(information.join(" ")))
                return `Error: the booking being cancelled does not exist!`;
        }
    }
    return `Success: the booking is accepted!`;
}

//收入统计函数
function sumIncome(bookIfo,bookCancel) {
    let income = 0;
    let incomeArr = [];
    let day = 0;
//使用收费
    for(let i=0;i<bookIfo.length;i++){
        day = bookIfo[i].split(" ")[1];
        day = new Date(`${day}`);
        day = day.getDay();
        //console.log(`day:${day}`)
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
                    bookIfo_A.push(`${bookCancel[i].split(" ")[1]} ${bookCancel[i].split(" ")[2]} 违约金 ${income_A_c[j]}元`);
                    sum_A += parseInt(income_A_c[j]);
                }
            }break;
            case 'B':{
                for (let j=0;j<income_B.length;j++){
                    bookIfo_B.push(`${bookCancel[i].split(" ")[1]} ${bookCancel[i].split(" ")[2]} 违约金 ${income_B_c[j]}元`);
                    sum_B += parseInt(income_B_c[j]);
                }
            }break;
            case 'C':{
                for (let j=0;j<income_C.length;j++){
                    bookIfo_C.push(`${bookCancel[i].split(" ")[1]} ${bookCancel[i].split(" ")[2]} 违约金 ${income_C_c[j]}元`);
                    sum_C += parseInt(income_C_c[j]);
                }
            }break;
            case 'D':{
                for (let j=0;j<income_D.length;j++){
                    bookIfo_D.push(`${bookCancel[i].split(" ")[1]} ${bookCancel[i].split(" ")[2]} 违约金 ${income_D_c[j]}元`);
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
    return printIfo;
}

function main() {
    rl.question(``,function(line){
       switch (line){
           case '':console.log(sumIncome(bookIfo,bookCancel));break;
           default:{
               if (checkInput(line) === `Success: the booking is accepted!` && line.split(" ").length === 4){
                   console.log(checkInput(line))
                   begin.push(`${line.split(" ")[1]} ${line.split(" ")[2].split("~")[0]}`);
                   over.push(`${line.split(" ")[1]} ${line.split(" ")[2].split("~")[1]}`);
                   bookIfo.push(line);
               }
               else if(checkInput(line) === `Success: the booking is accepted!` && line.split(" ").length === 5){
                   console.log(checkInput(line));
                   begin = begin.filter(value =>{
                       if (value === `${line.split(" ")[1]} ${line.split(" ")[2].split("~")[0]}`) return false;
                       else return true;
                   });
                   over = over.filter(value =>{
                       if (value === `${line.split(" ")[1]} ${line.split(" ")[2].split("~")[1]}`) return false;
                       else return true;
                   })
                   bookCancel.push(line);
                   let ifo = line.split(" ");
                   ifo.pop();
                   bookIfo = bookIfo.filter(value =>{
                       if(value === ifo.join(" ")) return false;
                       else return true;
                   })
               }
               else console.log(checkInput(line));
/*
               console.log(`begin:${begin}
                   over:${over}
                   bookIfo:${bookIfo}
                   bookCancel:${bookCancel}`);
*/
               main();
           };break;
       }
    });

}
main();

