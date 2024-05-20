const db = require(`../../../helpers/database`);
const {v4: uuidv4} = require('uuid');

class UserRepository {
    constructor() {
        this.tableName = 'users';
    }

    async findByID(UserID) {
        const params = {
            TableName: this.tableName,
            Key: {
                UserID,
            },
        };

        return await db.get(params).promise();
    }
    
    async findByUsername(Username) {
        const params = {
            TableName: this.tableName,
            IndexName: `UsernameIndex`,
            KeyConditionExpression: `#Username = :Username`,
            ExpressionAttributeNames: {
                '#Username': `Username`,
            },
            ExpressionAttributeValues: {
                ':Username': Username,
            },
        };

        const data = await db.query(params).promise();

        return data.Items[0];
    }

    async create(data) {
        const params = {
            TableName: this.tableName,
            Item: {
                UserID: uuidv4(),
                Username: data.Username,
            },
        };

        await db.put(params).promise();

        return params.Item;
    }

    async update(UserID, data) {
        const params = {
            TableName: this.tableName,
            Key: {
                UserID: UserID
            },
            UpdateExpression: `set #Username = :Username`,
            ExpressionAttributeNames: {
                '#Username': `Username`,
            },
            ExpressionAttributeValues: {
                ":Username": data.Username,
            },
            ReturnValues: `UPDATED_NEW`,
        };

        const update = await db.update(params).promise();

        return update.Attributes;
    }

    async deleteByID(UserID) {
        const params = {
            TableName: this.tableName,
            Key: {
                UserID,
            },
        };

        return await db.delete(params).promise();
    }
}

module.exports = new UserRepository();