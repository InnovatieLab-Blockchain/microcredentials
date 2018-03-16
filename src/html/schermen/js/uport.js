/* global Web3 globalState render */

// Setup

const Connect = window.uportconnect.Connect
const appName = 'Innovatielab Blockchain'
const connect = new Connect(appName, {network: 'rinkeby'})
const web3 = connect.getWeb3()


import { Connect, SimpleSigner } from 'uport-connect'

const uport = new Connect('Innovatielab Blockchain', {
  clientId: '2osVEge5GkpT3tJWdzr2TpfwdjsEo27MEoc',
  network: 'rinkeby or ropsten or kovan',
  signer: SimpleSigner('497369198844fe973c9cadc8bdc5b0634fe01cd3ffe69944884cb6506c7f7be4')
})

// Request credentials to login
uport.requestCredentials({
  requested: ['name', 'phone', 'country'],
  notifications: true // We want this if we want to recieve credentials
})
.then((credentials) => {
  // Do something
})

// Attest specific credentials
uport.attestCredentials({
  sub: THE_RECEIVING_UPORT_ADDRESS,
  claim: {
    CREDENTIAL_NAME: CREDENTIAL_VALUE
  },
  exp: new Date().getTime() + 30 * 24 * 60 * 60 * 1000, // 30 days from now
})


// Basic usage with modal injection
uport.requestCredentials()
     .then((userProfile) => {
       // Do something after they have disclosed credentials
})

uport.requestCredentials({
  requested: ['name', 'avatar', 'phone', 'country'],
  notifcations: true
  }).then((userProfile) => {
    // Do something after they have disclosed credentials
})


uport.requestCredentials({
  requested: ['name', 'avatar', 'phone', 'country'],
  notifcations: true },
  (uri) => {

    const qr = kjua({
      text: uri,
      fill: '#000000',
      size: 400,
      back: 'rgba(255,255,255,1)'
    })

    // Create wrapping link for mobile touch
    let aTag = document.createElement('a')
    aTag.href = uri

    // Nest QR in <a> and inject
    aTag.appendChild(qr)
    document.querySelector('#kqr').appendChild(aTag)
  }
  }).then((userProfile) => {
    // Do something after they have disclosed credentials
})
