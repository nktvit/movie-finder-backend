const db = require(`../../../helpers/database`);
const {v4: uuidv4} = require('uuid');

class ContributionRepository {
    constructor() {
        this.tableName = 'contributions';
    }
    
    async findByID(ContributionID) {
        const params = {
            TableName: this.tableName,
            Key: {
                ContributionID,
            },
        };

        return await db.get(params).promise();
    }
    async create(data) {
        const params = {
            TableName: this.tableName,
            Item: {
                ContributionID: uuidv4(),
                UserID: data.UserID,
                Amount: data.Amount,
                Date: data.Date,
            },
        };

        await db.put(params).promise();

        return params.Item;
    }
    async getAll() {
        const params = {
            TableName: this.tableName,
        };

        return await db.scan(params).promise();
    }
}

module.exports = new ContributionRepository()