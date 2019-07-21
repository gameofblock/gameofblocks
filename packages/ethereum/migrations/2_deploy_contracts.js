const Card = artifacts.require('Card');

module.exports = async function(deployer, network) {
  let proxyRegistryAddress = '';
  if (network === 'rinkeby') {
    proxyRegistryAddress = '0xf57b2c51ded3a29e6891aba85459d600256cf317';
  } else {
    proxyRegistryAddress = '0xa5409ec958c83c3f309868babaca7c86dcb077c1';
  }

  await deployer.deploy(Card, proxyRegistryAddress);
  const contractInstance = await Card.deployed();

  if(network === 'rinkeby') {
    await contractInstance.mintTo("0x92B7f7E374723d138cE1D6CAb6F955c88BdbC46e");
  }
};
