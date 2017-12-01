const fs = require('fs');
const path = require('path');

const clientLoggerConfig = path.join(process.cwd(), '/lib/config/clientLoggerConfig.js');
const serverLoggerConfig = path.join(process.cwd(), '/lib/config/serverLoggerConfig.js');
let logConfigLocation = require('../config/appConfig').logConfigLocation;

// const logger = require('../../lib/serverLoggerHandler');
// var loggerHandler = logger.getBunyanInstance('loggerConfig-loader');

/**
 * For local development user server/data path else use
 * the one specified in environments.js
 * @return {[type]} [description]
 */
function getlogFilePath() {
    if (!fs.existsSync(logConfigLocation)) {
        logConfigLocation = './lib/config/';
    }
    // loggerHandler.info('Log Loader ::: getlogFilePath logConfigLocation', logConfigLocation);
    return logConfigLocation;
}

/**
 * './lib/config/' + 'clientLoggerConfig.js'
 * @param  {[type]} LogFilePath [description]
 * @param  {[type]} files        [description]
 * @return {[type]}              [description]
 */

function constructFileFullPath(logFilePath, files) {
    const filesWithFullPath = files.map((fileName) => {
        return logFilePath + fileName;
    });
    // loggerHandler.debug('Log Loader ::: Valid Log files full Path: ', filesWithFullPath);
    return filesWithFullPath;
}

function copyData(destPath) {
    fs.readFile(destPath, 'utf8', (err, data) => {
        if (err) {
            throw err;
        }
        // write file
        fs.writeFile(destPath, data, (err) => {
            if (err) {
                throw err;
            }
            // loggerHandler.info('::: Logger config files loaded :::');
        });
    });
}
/**
 * Load Log file from the configured path
 * TODO: Load multiple locale specific Logs.
 * @return {[type]} [description]
 */
function loadLoggerConfig() {
    const logFilePath = getlogFilePath();
    fs.readdir(logFilePath, (error, filenames) => {
        if (error) {
            reject(error);
        }
        const filesWithFullPath = constructFileFullPath(logFilePath, filenames);
        filesWithFullPath.forEach((srcPath) => {
            if (srcPath === './lib/config/clientLoggerConfig.js') {
                copyData(clientLoggerConfig);
            } else {
                copyData(serverLoggerConfig);
            }
        });
    });
}
module.exports = loadLoggerConfig;
