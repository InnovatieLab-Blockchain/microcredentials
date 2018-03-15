const Connect = window.uportconnect.Connect
const SimpleSigner = window.uportconnect.SimpleSigner
const appName = 'Microcredentials-test'
const connect = new Connect(appName, {
    network: 'rinkeby',
    clientId: '2ovZg93ga1UZnfrzq1PyXCfmYbdmYjHryi6',
    signer: SimpleSigner('03e880ceab681858cc09b1016fbb06d652a242d084d90f82807276e378be64d8')
})

// global variables to reuse
let context = {}

// print credentials in console to test
function show_credentials() {
    console.log("Country = " + context.uportCountry)
    console.log("Name = " + context.uportName)
}

// uPort connect
const uportConnect = function () {
    connect.requestCredentials({
        requested: ['name', 'phone', 'country'],
        notifications: true // We want this if we want to recieve credentials
    })
        .then((credentials) => {
            // Do something (in this case print all credentials)
            console.log("Credentials:", credentials);

            context.uportId = credentials.address;
            context.uportName = credentials.name;
            context.uportCountry = credentials.country;
            context.uportPhone = credentials.phone;
        })
};

