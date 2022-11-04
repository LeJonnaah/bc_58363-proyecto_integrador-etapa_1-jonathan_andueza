const PERSISTENCE_TYPE = {
    TYPE_MEM: 'MEMORY',
    TYPE_FILE: 'FILE SYSTEM',
    TYPE_MONGODB: 'MONGODB',
};

const config = {
    PORT: 8080,
    PERSISTENCE_TYPE: PERSISTENCE_TYPE.TYPE_MONGODB,    // 'MEM', 'FILE', 'MONGODB'
    MONGODB_CONNECTION_STR: 'mongodb+srv://SERVER:123@cluster0.mkekqsl.mongodb.net/ecommerce?retryWrites=true&w=majority',
    MONGODB_TIMEOUT: 20000,
};

export {PERSISTENCE_TYPE, config as default};