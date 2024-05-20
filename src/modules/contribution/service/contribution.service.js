const ContributionRepository = require('../repository/contribution.repository')
const UserRepository = require('../../user/repository/user.repository')

class ContributionService {
    async createContribution({data}) {
        try {
            console.log(data)
            if (!data.Username) {
                throw new Error("Missing username in contribution data.");
            }

            const user = await UserRepository.create({Username: data.Username});
            data.UserID = user.UserID;
            data.Date = new Date().toISOString();

            return await ContributionRepository.create(data);
        } catch (error) {
            console.error("Error creating contribution:", error);
            throw error;
        }
    }


    async getContribution(ContributionID) {
        const data = await ContributionRepository.findByID(ContributionID);
        const user = await UserRepository.findByID(data.Item.UserID);
        if (data && user) {
            data.Item.Username = user.Item.Username;
            return data.Item;
        }
        return data;
    }

    async getAllContributions() {
        const data = await ContributionRepository.getAll();
        for (let i = 0; i < data.Items.length; i++) {
            const user = await UserRepository.findByID(data.Items[i].UserID);
            data.Items[i].Username = user.Item.Username;
        }
        return data.Items;
    }
}

module.exports = new ContributionService();