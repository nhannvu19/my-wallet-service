const Migrations = artifacts.require("MultiSend");

module.exports = function(deployer, network, accounts) {
  deployer.deploy(Migrations);
};
