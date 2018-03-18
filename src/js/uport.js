const Credentials = uportconnect.Credentials;
const Connect = uportconnect.Connect;
const SimpleSigner = uportconnect.SimpleSigner;

const atheneumConnect = new Connect('Praedinius Gymnasium', {
    clientId: '2ohupr9RpmvYbkdSdffenMyeXrWSYWyfEa5',
    network: 'rinkeby',
    signer: SimpleSigner('73cbd6c820866458b709dbf03da8166f66eac404b3d5736fbff0197c3c2b1e74')
});

const universiteitConnect = new Connect('RUG', {
    clientId: '2ojKNym3x16kUNQPq32CNcRpuo8MDH5w5vQ',
    network: 'rinkeby',
    signer: SimpleSigner('11cba7f19bce365f70b85e029f048f5c4cc73ad3232db828af5107dbb865e2b6')
});

const universiteitCredentials = new Credentials({
    appName: 'RUG',
    address: '2ojKNym3x16kUNQPq32CNcRpuo8MDH5w5vQ',
    network: 'rinkeby',
    signer: SimpleSigner('11cba7f19bce365f70b85e029f048f5c4cc73ad3232db828af5107dbb865e2b6')
});

var user_data = {};

const uportConnect = function () {
    atheneumConnect.requestCredentials({
        requested: ['name', 'phone', 'country', 'avatar'],
        notifications: true
    }).then((credentials) => {
            console.log("Credentials:", credentials);

            user_data.uportId = credentials.address;
            user_data.uportName = credentials.name;
            user_data.uportCountry = credentials.country;
            user_data.uportPhone = credentials.phone;

            document.getElementById("inloggen").style = "display:none;";
            document.getElementById("ophalen").style = "display:block;";
        })
};

const uportAttest = function () {
    atheneumConnect.attestCredentials({
        sub: user_data.uportId,
        claim: {'Atheneum diploma': {naam: 'Atheneum diploma', description: 'Atheneum diploma' }},
        exp: new Date().getTime() + 30 * 24 * 60 * 60 * 1000,
        }).then((attestation) => {
            console.log("Attestation = " + attestation);
            window.location.href = "student2.html";
            alert("Atheneum diploma opgehaald")
    })
};

const uportVerify = function () {
    universiteitConnect.requestCredentials({
        verified: ['Atheneum diploma'],
        notifications: true,
        exp: new Date().getTime() + 60000
    }).then((profile) => {
        console.log(profile);
        universiteitCredentials.lookup(profile.verified[0].iss).then(profile => {
            console.log("Issuer ", profile);
            alert("Diploma gedeeld met RUG")
        })
    }).catch (err => {
        console.log("Niet gedeeld: ", err)
    })
};