const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');

const auth = require('../../../auth');
const TABLA = 'auth';

module.exports = function (injectedStore) {
    let store = injectedStore;
    if(!store){
        store = require('../../../store/dummy');
    }

    async function login(username, password){
        const data = await store.query(TABLA, { username: username });

        return bcrypt.compare(password, data.password)
            .then(areEqual => {
                if(areEqual){
                    return auth.sign(data);
                } else {
                    throw new Error('Invalidate information');
                }
            });
    }

    async function upsert(data) {
        if(data.username){
            authData.username = data.username;
        }
        if(data.password){
            authData.password = await bcrypt.hash(data.password, 5);
        }

        return store.update(TABLA, authData);
    }

    return { upsert, login };
};