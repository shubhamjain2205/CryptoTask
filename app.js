import { TatumSDK, Network } from '@tatumio/tatum';

const addressInput = document.getElementById('address');
const balanceDiv = document.getElementById('balance');
const lastBlockNumberDiv = document.getElementById('lastBlockNumber');
const nftBalanceDiv = document.getElementById('nftBalance');
const subscriptionResultDiv = document.getElementById('subscriptionResult');
const fundResultDiv = document.getElementById('fundResult');
const ipfsUploadResultDiv = document.getElementById('ipfsUploadResult');

window.getBalance = async function() {
    const tatum = await TatumSDK.init({ network: Network.ETHEREUM });
    const balance = await tatum.address.getBalance({
        addresses: [addressInput.value],
    });
    const balanceData = balance.data.filter(asset => asset.asset === 'ETH')[0];
    balanceDiv.textContent = `${balanceData.balance} ${balanceData.asset}`;
    await tatum.destroy();
}

window.getLastBlockNumber = async function() {
    const tatum = await TatumSDK.init({ network: Network.ETHEREUM });
    const latestBlock = await tatum.rpc.blockNumber();
    lastBlockNumberDiv.textContent = `Latest Block Number: ${latestBlock}`;
    await tatum.destroy();
}

window.getAllNFTs = async function() {
    const tatum = await TatumSDK.init({ network: Network.ETHEREUM });
    const nftBalance = await tatum.nft.getBalance({ addresses: [addressInput.value] });
    nftBalanceDiv.textContent = `NFT Balance: ${JSON.stringify(nftBalance)}`;
    await tatum.destroy();
}

window.createSubscription = async function() {
    const tatum = await TatumSDK.init({ network: Network.ETHEREUM });
    const subscription = await tatum.notification.subscribe.addressEvent({
        address: addressInput.value,
        url: 'https://webhook.site/0b6c2f1a-8f7f-4f0a-8e9a-0e8f5c5f2f2a',
    });
    subscriptionResultDiv.textContent = `Subscription Result: ${JSON.stringify(subscription)}`;
    await tatum.destroy();
}

window.fund = async function() {
    const tatum = await TatumSDK.init({ network: Network.ETHEREUM_SEPOLIA });
    const result = await tatum.faucet.fund(addressInput.value);
    fundResultDiv.textContent = `Funding Result: ${JSON.stringify(result)}`;
    await tatum.destroy();
}

window.uploadFileToIPFS = async function() {
    const tatum = await TatumSDK.init({ network: Network.ETHEREUM });
    const buffer = fs.readFileSync('/path/to/image.jpg');
    const result = await tatum.ipfs.uploadFile({ file: buffer });
    ipfsUploadResultDiv.textContent = `IPFS Upload Result: ${JSON.stringify(result)}`;
    await tatum.destroy();
}
