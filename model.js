const mongoose = require('mongoose');
// const fs = require('fs');
const path = require('path');

module.exports = function (_name) {
    //如果系统配置了自动加载，会自动加载根目录下的所有模型文件，子目录下的模型会在第一次引用的时候加载到内存。

    /**
     * 获取数据库表对应的js对象所在的路径
     * @type {[type]}
     */
    const models_path = path.join(__dirname, '/model');

    // /**
    //  * 以递归的形式，读取models文件夹下的js模型文件，并require
    //  * @param  {[type]} modelPath [description]
    //  * @return {[type]}           [description]
    //  */
    // let walk = function (modelPath) {
    //     fs.readdirSync(modelPath).forEach(function (file) {
    //         let filePath = path.join(modelPath, '/' + file)
    //         let stat = fs.statSync(filePath)

    //         if (stat.isFile()) {
    //             if (/(.*)\.(js|coffee)/.test(file)) {
    //                 require(filePath)
    //             }
    //         } else if (stat.isDirectory()) {
    //             walk(filePath)
    //         }
    //     })
    // };
    // walk(models_path);

    //_name形式为基于models的路径，如article/user
    const model = koahub.models[_name];
    if (!model) {
        //支持分目录存放模型文件，如auth/user.model.js,
        //一般建议每一个模块的模型文件放在一个以模块命名的目录下，甚至不同的控制器所用到的模型可以以控制器命名的目录存放
        koahub.models[_name] = require(models_path + `/${_name}.model.js`)
        return koahub.models[_name];
    } else {
        return model;
    }
}