'use strict';
var _ = require("lodash");
var chai = require("chai");
var sinon = require("sinon");
var sinonChai = require("sinon-chai");
var expect = chai.expect;
chai.use(sinonChai);

var main = require("./main.js");

describe('income of badminton hall', function () {
    sinon.spy(console, 'log');
    it('messy code input should console error1', function() {
        let input1 = 'abcdefghijklmnopqrst1234567890';
        let checkResult1 = checkInput(input1);
        let income1 = sumIncome(inpu1);
        let expected1 = `Error: the booking is invalid!`;
        expect(checkResult1).toEqual(expected1);

        let input2 = `U001 2016-06-02 22:00~22:00 A`;
        let checkResult2 = checkInput(input2);
        let income2 = sumIncome(inpu2);
        let expected2 = `Error: the booking is invalid!`;
        expect(checkResult2).toEqual(expected2);

        let input3 = `U002 2017-08-01 19:00~22:00 A`;
        let checkResult3 = checkInput(input3);
        let income3 = sumIncome(inpu3);
        let expected3 = `Success: the booking is accepted!`;
        expect(checkResult3).toEqual(expected3);

        let input4 = `U003 2017-08-02 13:00~17:00 B`;
        let checkResult4 = checkInput(input4);
        let income4 = sumIncome(inpu4);
        let expected4 = `Success: the booking is accepted!`;
        expect(checkResult4).toEqual(expected4);

        let input5 = `U004 2017-08-03 15:00~16:00 C`;
        let checkResult5 = checkInput(input5);
        let income5 = sumIncome(inpu5);
        let expected5 = `Success: the booking is accepted!`;
        expect(checkResult5).toEqual(expected5);

        let input6 = `U005 2017-08-05 09:00~11:00 D`;
        let checkResult6 = checkInput(input6);
        let income6 = sumIncome(inpu6);
        let expected6 = `Success: the booking is accepted!`;
        expect(checkResult6).toEqual(expected6);


        expect(`${}\n${}\n`).toEqual(expected)
    });



    it('income summary', function() {
        const error1 = `Error: the booking conflicts with existing bookings!`;
        const error2 = `Error: the booking being cancelled does not exist!`;
        const success = `Success: the booking is accepted!`;
        const output1 = `收入汇总
---
场地:A
2017-08-01 19:00~22:00 200元
小计：200元

场地:B
2017-08-02 13:00~17:00 200元
小计：200元

场地:C
2017-08-03 15:00~16:00 50元
小计：50元

场地:D
2017-08-05 09:00~11:00 80元
小计：80元

---
总计：530元`;
        const output2 = `收入汇总
---
场地:A
2017-08-01 18:00~20:00 160元
2017-08-01 19:00~22:00 违约金 100元
小计：260元

场地:B
2017-08-02 13:00~17:00 200元
小计：200元

场地:C
小计：0元

场地:D
小计：0元
---
总计：460元`;
        let income = sumIncome(input);
        let expected = `Success: the booking is accepted!`;
        expect(income).toEqual(expected)
    });


});