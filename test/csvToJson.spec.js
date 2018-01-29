'use strict';

let expect = require('chai').expect;
let assert = require('chai').assert;
let csvtoJson = require('../src/csvToJson');

let expectedJson = [{
    firstName: 'Constantin',
    lastName: 'Langsdon',
    email: 'clangsdon0@hc360.com',
    gender: 'Male',
    age: "96",
    birth: '10.02.1965'
}, {
    firstName: 'Norah',
    lastName: 'Raison',
    email: 'nraison1@wired.com',
    gender: 'Female',
    age: "32",
    birth: '10.05.2000'
}];

let fileInputName = 'test/resource/input.csv';

describe('csvToJson testing', function () {

    describe('getCurrentLine() testing', function () {
        let headers = ['header1', 'header2', 'header3', 'header4'];
        let currenLine = 'value1;value2;value3;value4';
        let fieldDelimiter = ';';
        let index = 0;
        it('Should return error when currentLine has more value as the header', () => {
            //given
            currenLine += ';header5';
            let expectedErrorMessage = 'The header fields [4] numbers are not the same then the current line fileds [5] number!!!' +
                '\nThe error occurs on the line 1\n See the difference:\n ' +
                'HEADER: header1,header2,header3,header4\n ' +
                'LINE 1: value1,value2,value3,value4,header5\n' +
                '***Tips***: checks that the defined filed delimiter [;] is correct!!!';

            //when


            //then

//            assert.throws(function () {
//                csvtoJson.getCurrentLine(headers, currenLine, fieldDelimiter, index);
//                }, Error('asda'));

        });


    });
});