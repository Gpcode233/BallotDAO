require('dotenv').config({ path: '../.env' });

console.log('SEPOLIA_URL:', process.env.SEPOLIA_URL ? 'Set' : 'Not set');
console.log('PRIVATE_KEY:', process.env.PRIVATE_KEY ? 'Set' : 'Not set');
console.log('ETHERSCAN_API_KEY:', process.env.ETHERSCAN_API_KEY ? 'Set' : 'Not set');
