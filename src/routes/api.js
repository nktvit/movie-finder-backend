const UserController = require('../modules/user/controller/user.controller');
const ContributionController = require('../modules/contribution/controller/contribution.controller');

module.exports = async (app) => {
    // User controller routes
    app.get(`/api/v1/users/:UserID`, UserController.findByID);
    app.post(`/api/v1/users`, UserController.create);
    app.patch(`/api/v1/users/:UserID`, UserController.update);
    app.delete(`/api/v1/users/:UserID`, UserController.deleteByID);
    // Contribution controller routes
    app.get(`/api/v1/contribution`, ContributionController.getContribution);
    app.get(`/api/v1/contributions`, ContributionController.getAllContributions);
    app.post(`/api/v1/contribution`, ContributionController.createContribution);
};