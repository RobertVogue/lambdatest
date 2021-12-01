// const axios = require('axios')
// const url = 'http://checkip.amazonaws.com/';
let response;

/**
 *
 * Event doc: https://docs.aws.amazon.com/apigateway/latest/developerguide/set-up-lambda-proxy-integrations.html#api-gateway-simple-proxy-for-lambda-input-format
 * @param {Object} event - API Gateway Lambda Proxy Input Format
 *
 * Context doc: https://docs.aws.amazon.com/lambda/latest/dg/nodejs-prog-model-context.html 
 * @param {Object} context
 *
 * Return doc: https://docs.aws.amazon.com/apigateway/latest/developerguide/set-up-lambda-proxy-integrations.html
 * @returns {Object} object - API Gateway Lambda Proxy Output Format
 * 
 */
const mongo = require('mongodb');
const { MongoClient } = mongo;
let db = null;

let connectToDatabase = (uri, dbName) => {
    if(db && db.serverConfig.isConnected()) {
        return Promise.resolve.db;
    }
    return MongoClient.connect(uri, { poolSize: 10, useNewUrlParser: true, useUnifiedTopology: true }).then(client => {
        db = client.db(dbName);
        return db;
    })
}

let queryFields = (db, collect, query) => {
    return db.collection(collect).findOne(query);
}

exports.lambdaHandler = async (event, context) => {
    const dbConnection = await connectToDatabase("MONGODB_URI", "DB_NAME");
    const summon = await queryFields(dbConnection, "payloadtest", { family: "Modem" });

    return {
        statusCode: 200,
        body: JSON.stringify(summon)
    }
};
