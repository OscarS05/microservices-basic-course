const bodyParser = require('body-parser');
const auth = require('../auth');

const TABLA = 'user';

module.exports = function (injectedStore, injectedCache) {
    let store = injectedStore;
    let cache = injectedCache;
    if(!store){
        store = require('../../../store/dummy');
    }
    if(!cache){
        store = require('../../../store/dummy');
    }

    async function list(){
        let users = await cache.list(TABLA);

        if(!users){
            console.log('No estaba en caché. Buscando en DB');
            users = await store.list(TABLA);
            cache.upsert(TABLA, users);
        } else {
            console.log('Nos traemos datos de cache');
        }

        return users;
    }

    function get(id){
        return store.get(TABLA, id);
    }

    async function insert(body){
        const user = {
            id: body.id,
            name: body.name,
            username: body.username,
        }
        return store.insert(TABLA, user);
    }

    async function update(body){
        const data = {
            id: body.id,
            name: body.name,
            username: body.username,
            password: body.password,
        }

        return auth.upsert(data);
    }

    async function follow(from, to){
        return store.insert(TABLA + '_follow', {
            user_from: from,
            user_to: to,
        });
    }

    async function following(userId){
        const join = {};
        join[TABLA] = 'user_to'; // { user: 'user_to' }
        const query = { user_from: userId };

        return await store.query(TABLA + '_follow', query, join);
    }

    return { list, get, insert, update, follow, following };
};