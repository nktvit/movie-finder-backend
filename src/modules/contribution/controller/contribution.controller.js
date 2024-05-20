const ContributionService = require('../service/contribution.service')

class ContributionController {
    async createContribution(req, res) {
        const data = await ContributionService.createContribution(req.body)
        res.json(data)
    }

    async getContribution(req, res) {
        const data = await ContributionService.getContribution(req.params.ContributionID)
        res.json(data)
    }

    async getAllContributions(req, res) {
        const data = await ContributionService.getAllContributions()
        res.json(data)
    }

}

module.exports = new ContributionController()