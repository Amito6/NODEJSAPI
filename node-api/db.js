const mongodb = require("mongodb").MongoClient;
const url = "mongodb://127.0.0.1:27017";

/* establishing connection */
const config = () =>{
    return new Promise((resolve,reject)=>{
        mongodb.connect(url).then((conn)=>{
            const db = conn.db("operations");
            const collection = db.collection("users");
            resolve(collection);
        })
        .catch((error)=>{
            reject(error);
        });
    })
}

/* find or fetch Data */

exports.find = (query) =>{
    return new Promise((resolve,reject)=>{
        config().then((collection)=>{
            collection.find(query).toArray().then((dataRes)=>{
                if(dataRes.length != 0){
                    resolve({
                        status_code : 200,
                        data : dataRes,
                        message : "match found"
                    })
                }
                else(
                    reject({
                        status_code : 404,
                        message : "DATA Not Found"
                    })
                )
            }).catch((error)=>{
                console.log(error)
            })
        })
    })
};

/* InsertRes */

exports.insertOne = (formData) =>{
    return new Promise((resolve,reject)=>{
        config().then((collection)=>{
            collection.insertOne(formData).then((insertRes)=>{
                resolve({
                    status_code : 200,
                    data : insertRes,
                    message : "Data inserted"
                })
            }).catch((error)=>{
                reject(
                    {
                        status_code : 500,
                        message : "Internal Server error"
                }
                )
            })
        })
    })
}