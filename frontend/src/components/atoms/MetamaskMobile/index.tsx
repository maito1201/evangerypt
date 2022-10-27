const metamaskAppDeepLink = 'dapp://maito1201.github.io/evangerypt/'

export const MetamaskMobile = () => {
  return (
    <a href={metamaskAppDeepLink} target="_self">
      <button>Connect to MetaMask</button>
    </a>
  )
}
