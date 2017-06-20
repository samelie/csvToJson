'use strict';

let fileUtils = require('././util/fileUtils');
let stringUtils = require('././util/stringUtils');
let jsonUtils = require('././util/jsonUtils');

const newLine = '\n';
const defaultFieldDelimiter = ';';

class CsvToJson {

    formatValueByType() {
        this.printValueFormatByType = true;
        return this;
    }

    fieldDelimiter(delimieter) {
        this.delimiter = delimieter;
        return this;
    }

    generateJsonFileFromCsv(fileInputName, fileOutputName) {
        let jsonStringified = this.getJsonFromCsvStringified(fileInputName);
        fileUtils.writeFile(jsonStringified, fileOutputName);
    }

    getJsonFromCsvStringified(fileInputName) {
        let json = this.getJsonFromCsv(fileInputName);
        let jsonStringified = JSON.stringify(json, undefined, 1);
        jsonUtils.validateJson(jsonStringified);
        return jsonStringified;
    }

    getJsonFromCsv(fileInputName) {
        let parsedCsv = fileUtils.readFile(fileInputName);
        return this.csvToJson(parsedCsv);
    }

    csvToJson(parsedCsv) {
        let lines = parsedCsv.split(newLine);
        let fieldDelimiter = this.getFieldDelimiter();
        let headers = lines[0].split(fieldDelimiter);

        let jsonResult = [];
        for (let i = 1; i < lines.length; i++) {
            let currentLine = this.getCurrentLine(headers, lines[i], fieldDelimiter, i);
            if (currentLine) {
                jsonResult.push(this.buildJsonResult(headers, currentLine));
            }
        }
        return jsonResult;
    }

    getCurrentLine(headers, line, fieldDelimiter, index) {
        let currentLine = line.split(fieldDelimiter);
        let hasContent = stringUtils.hasContent(currentLine);
        if (!hasContent) {
            return null;
        }
        if (headers.length === currentLine.length) {
            return currentLine;
        }
        else {
            this.getErrorMessage(headers, currentLine, index, fieldDelimiter);
        }
    }

    getErrorMessage(headers, currentLine, index, fieldDelimiter) {
        var errorMessage = 'The header fields [' + headers.length + '] numbers ';
        errorMessage += 'are not the same then the current line fileds [' + currentLine.length + '] number!!!\n';
        errorMessage += 'The error occurs on the line ' + (index + 1) + '\n';
        errorMessage += ' See the difference:\n';
        errorMessage += ' HEADER: ' + headers + '\n';
        errorMessage += ' LINE ' + (index + 1) + ': ' + currentLine + '\n';
        errorMessage += '***Tips***: checks that the defined filed delimiter [' + fieldDelimiter + '] is correct!!!';
        throw new Error(errorMessage);
    }

    getFieldDelimiter() {
        if (this.delimiter) {
            return this.delimiter;
        }
        return defaultFieldDelimiter;
    }

    buildJsonResult(headers, currentLine) {
        let jsonObject = {};
        for (let j = 0; j < headers.length; j++) {
            let propertyName = stringUtils.trimPropertyName(headers[j]);

            let value = currentLine[j];
            if (this.printValueFormatByType) {
                value = stringUtils.getValueFormatByType(currentLine[j]);
            }
            jsonObject[propertyName] = value;
        }
        return jsonObject;
    }
}

module.exports = new CsvToJson();