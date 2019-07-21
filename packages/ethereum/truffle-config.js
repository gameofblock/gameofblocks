const HDWalletProvider = require("truffle-hdwallet-provider");


module.exports = {
  // Uncommenting the defaults below 
  // provides for an easier quick-start with Ganache.
  // You can also follow this format for other networks;
  // see <http://truffleframework.com/docs/advanced/configuration>
  // for more details on how to specify configuration options!
  
  networks: {
    development: {
      host: "127.0.0.1",
      port: 7545,
      network_id: "*"
    },
    test: {
      host: "127.0.0.1",
      port: 7545,
      network_id: "*"
    },
    rinkeby: {
      provider: function() {
        return new HDWalletProvider("DEDD18BF4F445951AC4CB773734EFF8BDEE57D8BE248C970563954A8E9C88446", "https://rinkeby.infura.io/v3/21fcb51c60954e8cb6abd68d75c148b1");
      },
      from: "0x92B7f7E374723d138cE1D6CAb6F955c88BdbC46e",
      network_id: 4,
      gas: 5000000,
      gasPrice: 5000000
    },
  }
};
