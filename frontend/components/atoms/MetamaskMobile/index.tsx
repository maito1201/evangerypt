const metamaskAppDeepLink = 'dapp://evangerypt.vercel.app/'

export const MetamaskMobile = () => {
  return (
    <a href={metamaskAppDeepLink} target="_self">
      <button>Connect to MetaMask</button>
    </a>
  )
}
