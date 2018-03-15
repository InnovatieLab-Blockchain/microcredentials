const Credentials = uportconnect.Credentials;
const Connect = uportconnect.Connect;
const SimpleSigner = uportconnect.SimpleSigner;

// import Connect from 'uport-connect'
// import SimpleSigner from 'uport-connect'
// import Credentials from 'uport-connect'

const connect = new Connect('DUO', {
    clientId: '2oynp4geSgBwqkQebaYtexB32rCNbPmLu5K',
    network: 'rinkeby',
    signer: SimpleSigner('69c9446852693c00bd0a8825fad8297e4f9db34c9562a660585a0e767f993bd7')
});

const credentialsMC = new Credentials({
    appName: 'Microcredentials-test',
    network: 'rinkeby',
    address: '2ovZg93ga1UZnfrzq1PyXCfmYbdmYjHryi6',
    signer: SimpleSigner('03e880ceab681858cc09b1016fbb06d652a242d084d90f82807276e378be64d8')
});

const connectRug = new Connect('RUG', {
    clientId: '2ojKNym3x16kUNQPq32CNcRpuo8MDH5w5vQ',
    network: 'rinkeby',
    signer: SimpleSigner('11cba7f19bce365f70b85e029f048f5c4cc73ad3232db828af5107dbb865e2b6')
});

const connectRabo = new Connect('Rabobank',{
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
let context = {};

// print credentials in console to test
function show_credentials() {
    console.log("Country = " + context.uportCountry);
    console.log("Name = " + context.uportName)
}

// uPort connect
const uportConnect = function () {
    connect.requestCredentials({
        requested: ['name', 'phone', 'country', 'avatar'],
        // callbackUrl:'student.html',
        notifications: true // We want this if we want to recieve credentials
    })
        .then((credentials) => {
            // Do something (in this case print all credentials)
            console.log("Credentials:", credentials);

            context.uportId = credentials.address;
            context.uportName = credentials.name;
            context.uportCountry = credentials.country;
            context.uportPhone = credentials.phone;
            // window.location.href = "student.html";
        })
};

const uportAttest = function () {
    connectRug.attestCredentials({
        sub: context.uportId,
        claim: {OpenBadge1: {naam: 'OpenBadge1', description: 'Atheneum Diploma 2018' }},
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
    connectRabo.requestCredentials({
        verified: ['OpenBadge1'],
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

