const Credentials = uportconnect.Credentials;
const Connect = uportconnect.Connect;
const SimpleSigner = uportconnect.SimpleSigner;

// import Connect from 'uport-duo_connector'
// import SimpleSigner from 'uport-duo_connector'
// import Credentials from 'uport-duo_connector'

const duo_connector = new Connect('DUO', {
    clientId: '2oynp4geSgBwqkQebaYtexB32rCNbPmLu5K',
    network: 'rinkeby',
    signer: SimpleSigner('69c9446852693c00bd0a8825fad8297e4f9db34c9562a660585a0e767f993bd7')
});

const issuer_RUG = new Connect('RUG', {
    clientId: '2ojKNym3x16kUNQPq32CNcRpuo8MDH5w5vQ',
    network: 'rinkeby',
    signer: SimpleSigner('11cba7f19bce365f70b85e029f048f5c4cc73ad3232db828af5107dbb865e2b6')
});

const verifier_RABO = new Connect('Rabobank',{
    clientId: '2otfT9XykJx5HJEquMhg4WTeLNKkx8ZkjBE',
    network: 'rinkeby',
    signer: SimpleSigner('13b1ed7eb7d0af503dd5f9e292356d58ece0e50221c3ba65ec8ce4c5a3b99c51')
});

const credentialsRabo = new Credentials({
    appName: 'Rabobank',
    address: '2otfT9XykJx5HJEquMhg4WTeLNKkx8ZkjBE',
    network: 'rinkeby',
    signer: SimpleSigner('13b1ed7eb7d0af503dd5f9e292356d58ece0e50221c3ba65ec8ce4c5a3b99c51')
});

// global variables to reuse
let user_data = {};

// print credentials in console to test
function show_credentials() {
    console.log("Country = " + user_data.uportCountry);
    console.log("Name = " + user_data.uportName)
}

// uPort request credentials
const uportConnect = function () {
    duo_connector.requestCredentials({
        requested: ['name', 'phone', 'country', 'avatar'],
        // callbackUrl:'student.html',
        notifications: true // We want this if we want to recieve credentials
    })
        .then((credentials) => {
            // Do something (in this case print all credentials)
            console.log("Credentials:", credentials);

            user_data.uportId = credentials.address;
            user_data.uportName = credentials.name;
            user_data.uportCountry = credentials.country;
            user_data.uportPhone = credentials.phone;
            // window.location.href = "student.html";
        })
};

// attest/issue badge
const uportAttest = function () {
    issuer_RUG.attestCredentials({
        sub: user_data.uportId,
        claim: {Bachelor_Of_Education: {naam: 'Bachelor_Of_Education', description: 'Bachelor_Of_Education 2018' }},
        // callbackUrl: 'student2.html',
        exp: new Date().getTime() + 30 * 24 * 60 * 60 * 1000, // 30 days from now
        // uriHandler: (log) => { console.log(log)}
        })
        .then((attestation) => {
        console.log("Attestation = " + attestation);
        window.location.href = "student2.html";
    })
};

const uportVerify = function () {
    verifier_RABO.requestCredentials({
        verified: ['Bachelor_Of_Education'],
        notifications: true,
        exp: new Date().getTime() + 60000
    }).then((profile) => {
        console.log(profile);
        credentialsRabo.lookup(profile.verified[0].iss).then(profile => {
            console.log("Issuer ", profile);
            // this.setState({issuer: profile});
        })
    }).catch (err => {
        console.log("Niet gedeeld: ", err)
    })
};

