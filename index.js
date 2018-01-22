
const model = require("./model");
const mongoose = require('mongoose');

module.exports = function(options) {

   // const url = 'mongodb://localhost/test';

    /* 连接数据库 */
    mongoose.Promise = require('bluebird');
    // mongoose.connect(db, {useMongoClient: true});
    mongoose.connect(options.url);

    // 注入koahub
    koahub.model = model;
    koahub.mongoose = mongoose;

    return async function(ctx, next) {
        ctx.model = model;

        await next();
    };
};
