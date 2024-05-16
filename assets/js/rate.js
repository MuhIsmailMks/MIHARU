window.addEventListener('DOMContentLoaded', async () => {
    async function getEthBalance(apiKey, address) {
        try {
            const response = await fetch(`https://api.etherscan.io/api?module=account&action=balance&address=${address}&tag=latest&apikey=${apiKey}`);
            const data = await response.json();
            
            if (data.status === "1") {
                const balance = parseFloat(data.result) / 1e18; // Convert balance from Wei to Ether
                return balance;
            } else {
                throw new Error(data.message);
            }
        } catch (error) {
            console.error('Error fetching Ether balance:', error);
            return null;
        }
    }
    
    async function getEthBaseBalance(apiKey, address) {
        try {
            const response = await fetch(`https://api.basescan.org/api?module=account&action=balance&address=${address}&tag=latest&apikey=${apiKey}`);
            const data = await response.json();
            
            if (data.status === "1") {
                const balance = parseFloat(data.result) / 1e18; // Convert balance from Wei to Ether
                return balance;
            } else {
                throw new Error(data.message);
            }
        } catch (error) {
            console.error('Error fetching Ether balance:', error);
            return null;
        }
    }

    async function getEthPrice(apiKey) {
        try {
            const response = await fetch(`https://api.etherscan.io/api?module=stats&action=ethprice&apikey=${apiKey}`);
            const data = await response.json();
            
            if (data.status === "1") {
                const ethUsdPrice = parseFloat(data.result.ethusd);
                return ethUsdPrice;
            } else {
                throw new Error(data.message);
            }
        } catch (error) {
            console.error('Error fetching Ethereum price:', error);
            return null;
        }
    }    

    const etherscan = 'WKE74AMZP7TKIIWIY198RHWUW4K59PIM9V';
    const basescan = 'NQHZV6X36CA2Q8NSIANVI38ZZS7XDSD26X';
    const rateToken = 0;
    const presaleAddress = '0x627cC788f67B4113622E01DAda7F25998d7B6825';

    let ethOnMainnet = await getEthBalance(etherscan, presaleAddress);
    let ethOnBase = await getEthBaseBalance(basescan, presaleAddress);
    let ethPrice = await getEthPrice(etherscan);

    let ethToUsd = ethOnMainnet * ethPrice;
    let baseToUsd = ethOnBase * ethPrice;
    let mergeAll = ethToUsd + baseToUsd;

    const usdRaised = document.getElementById('usdRaised');
    usdRaised.textContent = `$${mergeAll.toFixed(2)}`;

    // console.log('ethOnMainnet', ethOnMainnet);
    // console.log('ethOnBase', ethOnBase);
    // console.log('ethPrice', ethPrice);
    // console.log('ethToUsd', ethToUsd);
    // console.log('baseToUsd', baseToUsd);
});