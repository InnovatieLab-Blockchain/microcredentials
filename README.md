<p align="center">
    <img src="innovatielab.png"/>    
</p>

# Innovatielab Blockchain - Microcredentials

### This manual describes the setup for the microcredentials project.

### Prerequisites

* [Installation of Node.js](#Deployment)
* Installation of npm.
* Installation of Ganache.
* Installation of the Truffle framework.
* Installation of IPFS.</li>
* Installation of lite-server (HTTP server).
* Installation of Metamask (browser plugin).


### Installation of Node.js

nodejs

### Installation of npm

npm

### Installation of Ganache

Ganache is a personal Ethereum blockchain application, which can be used for development and testing. The application can be downloaded from the <a href="http://truffleframework.com/ganache/" target="_blank">truffle framework website</a><br/><p></p>
Ganache for Linux can be found [here](https://github.com/trufflesuite/ganache/releases/download/v1.0.2/ganache-1.0.2-x86_64.AppImage).<br/> 
For other operating systems please visit [this link](https://github.com/trufflesuite/ganache/releases).
<p></p>

### Installation of the Truffle framework

truffle

### Installation of IPFS

IPFS

### Installation of lite-server (HTTP server)

lite-server

### Installation of Metamask (browser plugin)

metamask

```
Give the example
```


## Deployment

Add additional notes about how to deploy this on a live system

## Built With

* [Dropwizard](http://www.dropwizard.io/1.0.2/docs/) - The web framework used
* [Maven](https://maven.apache.org/) - Dependency Management
* [ROME](https://rometools.github.io/rome/) - Used to generate RSS Feeds

## Contributing

Please read [CONTRIBUTING.md](https://gist.github.com/PurpleBooth/b24679402957c63ec426) for details on our code of conduct, and the process for submitting pull requests to us.

## Versioning

We use [SemVer](http://semver.org/) for versioning. For the versions available, see the [tags on this repository](https://github.com/your/project/tags). 

## Authors

* **Billie Thompson** - *Initial work* - [PurpleBooth](https://github.com/PurpleBooth)

See also the list of [contributors](https://github.com/your/project/contributors) who participated in this project.

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details

## Acknowledgments

* Hat tip to anyone who's code was used
* Inspiration
* etc



## Temporary flow for MT
Zorg ervoor dat gebruiker (speelt student "RECIPIENT") de uport app op telefoon heeft EN een identity erop heeft aangemaakt.

Open en start ganache

###In terminal in project
truffle.cmd compile --all --reset

truffle.cmd migrate --all --reset

truffle.cmd networks

Check dat 'OpenBadges' contractaddress == 0x75c35c980c0d37ef46df04d31a140b65503c0eed

Open index2 in browser (firefox)

Verwijder metamask en installeer opnieuw

Open metamask en open account met mnemomic : candy maple cake sugar pudding cream honey rich smooth crumble sweet treat

Verander metamask netwerk naar http://localhost:7545

###VO Instelling (ISSUER)
Ga op 'index2.html' naar Voortgezet onderwijs (praedinius)
Toekennen Atheneum Diploma
Verder
Selecteer student(Jan)
Klik toekennen
In metamask klik submit

Ga terug naar 'index2.html'

###Student (RECIPIENT)
Klik op 'ga naar' als student Jan
Log in bij het Praedinius Gymnasium met de uport app door te klikken op 'inloggen' --> continue with uport
Klik op 'continue' in de uport app (zie dat Praedinius wil dat je bij hen inlogt)
Klik op 'nieuw diploma ophalen' en wacht tot de badge op je uport app verschijnt
Klik 'accept'
Verifieer dat je deze hebt ontvangen in je 'verifications' tab in de uport app
Deel je diploma met de Rijksuniversiteit Groningen (RUG)
Log in bij de RUG (zoals hierboven bij Praedinius gedaan werd) met de uport app
Klik 'continue'

Ga terug naar 'index2.html'

###Rijksuniversiteit groningen (RUG) (VERFIFIER)
Klik op 'Ga naar' onder RUG op index2.html
Selecteer Jan als student
Vraag om diploma op te halen (groene knop)
Valideer diploma 