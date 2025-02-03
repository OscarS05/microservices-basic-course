const axios = require('axios');

function createRemoteDB(host, port){
    const URL = `http://${host}:${port}`;

    function list(table) {
        const method = 'GET';
        return req({method, table});
    }

    function get(table, id){
        const method = 'GET';
        return req({method, table, id});
    }

    function insert(table, data){
        const method = 'POST';
        return req({method, table, data});
    }

    function update(table, data){
        const method = 'PUT';
        return req({method, table, data});
    }

    function query(table, query, join){
        const method = 'POST';
        return req({method, table: `${table}/query`, data: { query, join }});
    }

    function req({method, table, data, id}){
        let url = `${URL}/${table}`;
        let body = '';

        if(id){
            url += `/${id}`;
        }

        if(data){
            body = JSON.stringify(data);
        }


        return  new Promise((resolve, reject) => {
            axios({
                method,
                url,
                headers: {
                    'Content-Type': 'application/json',
                },
                data: body || undefined,
            }).then(res => {
                return resolve(res.data.body);
            })
            .catch(err => {
                console.error('err', err);
                return reject(err.message);
            });
        })
    }

    return { list, get, insert, update, query };
}

module.exports = createRemoteDB;