# it2810-webutvikling-h18-prosjekt-3-gruppe--46

## Valg og løsninger
- Vår PIMM-applikasjon består av fire forskjellige skjermer: En startskjerm (HomeScreen), kalender (Calendar), gjøremålsliste (Todo) og en skjerm med oversikt over personlige mål (DailyProgress).

- For UI-elementer har vi benyttet oss av biblioteket `NativeBase` som gir oss mange grunnleggende komponenter som vi har brukt i tillegg til React Natives standard UI-elementer. Eksempler på Komponenter vi har benyttet oss fra dette biblioteket er `Icon`, `Button` og `Text`

- Startskjermen vår består av et bakgrunnsbilde og inneholder en liste med inspirerende sitater som endres ved trykk. Den viser også nåværende dag, dato og klokkeslett. Dette valgte vi fordi vi tenkte at en tilfeldig liste med inspirerende sitater passer bra til å være "startskjermen" på en motivasjonsapp.

- For kalenderen vår benyttet vi en en tredjeparts-modul: `react-native-calendars`. Fra denne modulen importerte vi en Agenda komponent som enkelt ga oss mulighet for å legge til en notis eller en agenda for en gitt dag. Den er også enkel å navigere seg frem i, samt at den også er oversiktlig da den merker av alle dager som har en notis festet til seg. Vi benyttet oss også av Modal-komponenten som vi importerte fra react-native-modal. Den ga oss ekstra rom for å implementere tekstbokser og knapper i forbindelse med å fjerne/legge til notiser.

- For gjøremålslisten benyttet vi tredjeparts-modulen: `react-native-swipeout` hvor vi importerte Swipeout-komponenten fra. Vi benyttet i tillegg et kodeeksempel fra Codeburst som grunnlag for selve listen (kilde nederst). Swipeout-komponenten omkapsler liste-elementet, og støtter også flere swipeout-knapper, dersom man skulle ønske det.

- For skjermen som holder oversikt over personlige mål har vi valgt å implementere en skritteller som funksjonalitet utover normal React-Native UI problematikk. Vi implementerte også en måte å holde oversikt over antall konsumerte kalorier iløpet av en dag samt antall utførte push-ups. For å få til dette har vi benyttet oss av Pedometer-komponenten fra Expo API-et. Samt en AnimatedCircularProgress-komponent fra `react-native-circular-progress`. Vi har også her benyttet oss av Modal-komponenten for å tilby innstillinger av skritteleren, kalorimåleren og push-up måleren.

- Alle importeringer av moduler og komponenter er gjort med tanke på at de er enkle å implementere, har et rent og stilig design og ikke minst at de tilbyr oss de løsningene vi trenger for å fullføre oppgaven på en god måte. 


- I prosjekt 3 av IT2810 Webutvikling har vi laget en React Native applikasjon ved hjelp av Expo. Expo er en open source tjeneste som bygger på React Native, og hjelper utvikleren å utvikle til både Android og iOS ved hjelp av Javascript og React. 
- Mappestruktur:
  Vi har plassert de forskjellige sidene i React Navigation i mappen `/screens/`. Her ligger de forskjellige Screen-komponentene, navngitt vha. Pascal Case. Selve mappen har navnet på komponenten og filen som inneholder komponenten ligger heter `index.js`, for enkelt oppslag.
  
```
├───App.js
├───assets
├───screens
│   ├───Calendar
│   ├───DailyProgress
│   ├───HomeScreen
│   └───TodoList
└───__tests__
    └───__snapshots__
```
Punkter som er verdt å merke seg i denne oversikten:
* `App.js` - hovedfilen som inneholder bla. TabNavigator for å vise Screens
* `/assets` - Inneholder bildefiler
* `/screens` - Inneholder de forskjellige Screens
* `/__tests__` - Inneholder alle tester, blant annet snapshot-tester


#

## Teknologier
I dette prosjektet har vi benyttet oss av følgende teknologier
- Expo
- Jest
- React Native
- AsyncStorage

#

## Avhengigheter
- `react-navigation`
- `react-native-calendars`
- `native-base`
- `react-native-modal`
- `react-native-swipeout`
- `react`
- `react-native-circular-progress`
- `expo`
- - `pedometer`
- `react-native-easy-toast`

#

## Hvordan kjøre prosjektet
#### 1. Klone eller last ned Github prosjektet og installer alle modulene
Bruk kommandolinjen, velg mappen du ønsker å legge prosjektet i og skriv inn:
```cmd
> git clone git@github.com:IT2810/it2810-webutvikling-h18-prosjekt-3-46.git
cd it2810-webutvikling-h18-prosjekt-3-46 
> npm install
```

#### 2.	Last ned og installer appen Expo
```cmd
> npm install -g expo-cli
```

#### 3.	Start Expo
```cmd
> expo start
```
Skann QR-koden som vises i kommandolinjen med Expo-appen(Android), eller med kamera på iPhone. Expo finnes på Play store eller App store.

#

## Hvordan bruke appen
Applikasjonen er ment å fungere som en Personal Information and Motivation Manager for mobil, og den gjør det mulig for brukeren å sette seg personlige mål, den fungerer som en kalender, og man kan legge inn gjøremål. For kalenderfunksjonaliteten kan man legge inn ulike avtaler eller lignende for datoer i fremtiden. 

- `Calendar`: Denne fungerer både som en kalender og som en agenda med funksjonalitet for innlegging av planer for en gitt dag. En kan både navigere seg måned for måned, eller dag for dag. Dette justeres ved å velge en gitt dag når du er i månedsmodus, eller ved å trykke på den grå streken når du er i dagsmodus. Vi har også lagt til funksjonalitet for endring og sletting av allerede eksisterende notater.

- `Tasks`: Med denne kan du som bruker legge ting du skal gjøre eller få gjort til i en liste med todos og fjerne de når du er ferdig med dem. for å legge til nye oppgaver skriver du inn i tekstfeltet nederst på skjermen, og for å fjerne noe swiper du de til venstre og trykker på "Done".

- `Daily Progress`: Her har vi laget funksjonalitet for å fylle inn daglige mål for antall skritt man skal gå, antall push-ups og antall kalorier man skal få i seg. Ved å bruke modalmenyen som vises øverst på skjermen kan man enkelt sette seg mål, og resette dagens framgang. Man kan dog ikke starte skrittelleren om igjen, dette fordi den henter ut antall skritt gått fra mobilens innebygde skritteller.

- `Home Screen`: Her har vi ikke gjort så mye spennende, men vi har lagt inn en komponent som viser tilfeldige quotes, ut i fra en liste med predefinerte quotes. Ved å trykke på quoten får man en ny, tilfeldig quote. I tillegg viser den hvilken ukedag, måned og dato det er, pluss klokkeslett. 

## Navigering
Appen vår bruker `BottomTabNavigator` for å håndtere navigasjon mellom de ulike skjermene. I tillegg til dette har vi i hver `screen` i `TabNavigator` (med unntak av `HomeScreen`) nøstet en `StackNavigator` for å gjøre det mulig å vise både en `Header` øverst i tillegg til en `bottomTabNavigator` nederst. Videre bruker vi denne headeren for å vise forskjellige brukervalg i hver enkelt screen, som for eksempel "Instillinger" i `DailyProgress`.

Appen åpner med hva vi kaller HomeScreen, som tilbyr motiverende quotes til brukeren. 
På bunnen av skjermen tilbyr vi brukeren en meny for å navigere seg mellom skjermene. Hver screen rendres først når brukeren trykker seg inn på den, men forblir deretter lastet inn i minnet resten av økten.

#

## Teknologier med tutorials
Som beskrevet ovenfor er applikasjonen utviklet med Expo og React Native. Vi lagrer all data/tilstander ved hjelp av AsyncStorage. For å demonstrere noe som går utover "basic React Native UI-problematikk" valgte vi å implementere skritteller. Vi har også testet med Jest. Vi har vært flittige i bruk av tredjepartskomponenter og biblioteker, og det har gjort det veldig greit for oss å få komponenter som egner seg for vår bruk, uten at vi må bruke så veldig lang tid på å utvikle komponentene fra bunn selv.

#

### Tutorial for Agenda-komponent:

Grundig dokumentasjon for denne komponenten kan finnes [her.](https://github.com/wix/react-native-calendars)

Man installerer modulen fra github ved hjelp av kommandoen ``` npm install --save react-native-calendars ``` Etter dette inkluderer man denne kodesnutten i starten av koden sin for å importere komponenten:  ``` import { Agenda } from 'react-native-calendars'; ``` Deretter kan en benytte ``` Agenda ``` - taggen i klassens renderfunksjon for å ta i bruk komponenten.

Agenda-komponenten kommer med mange properties man kan manipulere for å tilpasse både funksjonaliteten og utseendet til komponenten. Vi har kun inkludert de mest relevante i vår kode. De viktigste av disse nevnes her:
 - ``` items ``` - Liste av notatene som tilhører en gitt dag. Hvis innholdet er lik [] bettyr det vi ikke ikke har noe notat for denne dagen.
 - ``` renderItem ``` - Her spesifiserer du hvordan et ikke-tomt notat skal rendres.
 - ``` renderEmptyDate ``` - Her spesifiserer du hvordan et tomt notat skal rendres.
 - ``` onDayPress ``` - Her kan du spesifisere hva som skal skje hver gang du trykker på den dag.
 - ``` onDayChange ``` - Her kan du spesifisere hva som skal skje hver gang en dag endres ved at du scroller deg nedover i agendaen. Vi satt dette til å være akkurat samme hendelse som ved onDaypress. Altså at nåværende valgt dato i state endres.

#

### Tutorial for Pedometer

Vi har valgt å implementere skritteller i vårt prosjekt. Koden hentet vi fra https://docs.expo.io/versions/latest/sdk/pedometer. Komponenten henter ut antall skritt gått fra mobilens innebygde skritteller(Helse-appen på iPhone og Google Fit på Android). Vi henter skritt 24 timer tilbake i tid. Ved hjelp av `react-native-circular-progress` viser vi fram fremgangen man har på å gå antall skritt i løpet av en dag. 
Dette var lett å implementere, siden Expo tilbyr denne komponenten.

#

### Tutorial for AsyncStorage:

AsyncStorage er en lagringsløsning som asynkront lagrer verdier på nøkkelattributter. Alle verdier som lagres ved hjelp av AsyncStorage lagres lokalt. Dette bettyr a de ikke vil mistes om appen lukkes. AsyncStorage tilbyr mange ulike metoder, men de viktigste – som vi benyttet oss av – er ```setItem(Key, value)``` og ```getItem(key)```. Det er disse to metodene som henholdsvis lagrer data og henter de ut igjen. De opptrer asynkront med resten av koden og returnerer et Promise-objekt som blir omgjort til de dataene som er lagret. Dette skjer kun dersom dataene blir funnet og det ikke oppstår et problem i forbindelse med dette.

På React Native sine egne nettsider kan vi vise til følgende dokumentasjon:

“It is recommended that you use an abstraction on top of AsyncStorage instead of AsyncStorage directly for anything more than light usage since it operates globally.”

Til tross for dette har vi valgt å ikke mellomlagre data i et eget nivå. Dette er fordi dette ikke er et krav i henhold til oppgaven, samtidig som at vi ikke oppdaget dette før i sluttfasen av prosjektet. Hadde vi skulle gjort prosjektet om igjen ville vi nok ha vurdert Redux eller lignende for å ta hånd om mellomlagring av data, slik at vi ikke hadde vært nødt til å gjøre metodekall mot AsyncStorage så ofte som vi gjør i koden vår per nå.

#

## Utviklingsmetode
Helt i begynnelsen av prosjektet vårt satte vi oss ned i lag og tegnet hvordan vi ønsket at applikasjonen skulle se ut. Dette gjorde det veldig enkelt å velge tredjepartskomponenter som passet vår visjon.
I dette prosjektet har vi utviklet ved hjelp av issue-tracking på Github. For hvert issue vi har laget, har vi laget en tilsvarende branch hvor vi arbeider med issuet. Dette gjør det veldig enkelt for oss å hoppe mellom branches uten konflikter, samt at ikke flere trenger å jobbe på samme branch. Vi opplevde at det ga oss langt færre merge-konflikter enn hva vi fikk på sist prosjekt, der vi til tider var både to og tre personer på samme branch. Vi laget dermed en development-branch som vi videre inn i feature-branches som vi hver for oss jobbet på. Etterhvert som vi løste issues merget vi featurebranchene sammen med development-branchen som vi til slutt merget tilbake til masterbranchen igjen. Dette er en arbeidsmetode som er svært inspirert etter GitFlow WorkFlow, som lar oss skille ny kode fra kode vi anser oss som ferdig med.
#

## Testing
- I dette prosjektet har vi ikke fått til å teste så mye som vi gjerne skulle ha gjort, men årsaken til det ligger mye i begrensninger ved Jest. For fremtidig testing ville vi nok heller ha testet mer systematisk. Vi har nå brukt snapshot-testing mens vi utviklet komponentene våre, og det vil vi gjøre i fremtiden også. Vi har ikke fått til så mye enhetstesting som vi ønsket, og det er noe vi gjerne skulle ha fått til. Underveis i prosjektet har vi kontinuerlig gjennomført testing på Android- og iPhone-mobiler gjennom prosjektet, for å sikre at den har lik funksjonalitet på disse.
- For framtidig utvikling ville vi nok ha testet på en annen måte. Vi hadde problemer med at noen av komponentene våre var vanskelige å teste, og at jest ikke hadde tilstrekkelig testingfunksjonalitet som vi klarte å bruke. I fremtiden skulle vi gjerne ha fått til mer enhetstesting og testing av state. Vi ville også ha testet grenseverdier der det er hensiktsmessig, samt testet for nullverdier og verdier forbi grenseverdiene våre.
- Angående kompabilitet mellom forskjellige enheter er prosjektet for det meste testet i iOS, som en naturlig konsekvens av at vi alle kun eier iPhone. Vi har forsøkt å bruke Android-emulator via Android Studio men med begrenset suksess som følge av ytelsesproblemer og feil i konfigurasjon som har vært utfordrende å løse. Vi har lånt enheter av andre grupper for å få gjort litt kjapp testing, men denne har ikke vært gjennomgående. Gjennom vår avsluttende testing har vi oppdaget enkelte mindre ting som vises feil på Android selv om det fungerer i iOS. Eksempelvis vil teksten i TextInput-komponenten i Calendar screenen gjøre teksten man skriver inn usynlig. Videre testing viste likevel at teksten ble lagret, men dette er et eksempel på ting som har vært utfordrende å oppdage som følge av mangel på lett tilgjengelig Android-enheter.
#### Appen er testet på følgende enheter
- iPhone 8
- iPhone 7
- iPhone 6s
- Motorola Moto G6 Plus
- One Plus 6T
