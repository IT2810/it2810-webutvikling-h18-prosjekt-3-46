# it2810-webutvikling-h18-prosjekt-3-gruppe--46

## Valg og løsninger
- Vår PIMM-applikasjon består av fire forskjellige skjermer: En startskjerm (HomeScreen), kalender (Calendar), gjøremålsliste (Todo) og en skjerm med oversikt over personlige mål (DailyProgress).

- Startskjermen vår består av et bakgrunnsbilde og inneholder en liste med inspirerende sitater som endres ved trykk. Den viser også nåværende dag, dato og klokkeslett. Dette valgte vi fordi vi tenkte at en tilfeldig liste med inspirerende sitater passer bra til å være "startskjermen" på en motivasjonsapp.

- For kalenderen vår benyttet vi en en tredjeparts-modul: `react-native-calendars`. Fra denne modulen importerte vi en Agenda komponent som enkelt ga oss mulighet for å legge til en notis eller en agenda for en gitt dag. Den er også enkel å navigere seg frem i, samt at den også er oversiktlig da den merker av alle dager som har en notis festet til seg. Vi benyttet oss også av Modal-komponenten som vi importerte fra react-native-modal. Den ga oss ekstra rom for å implementere tekstbokser og knapper i forbindelse med å fjerne/legge til notiser.

- For gjøremålslisten benyttet vi tredjeparts-modulen: `react-native-swipeout` som vi importerte Swipeout-komponenten fra. #MAGNUS FORKLAR

- For skjermen som holder oversikt over personlige mål har vi valgt å implementere en skritteller som funksjonalitet utover normal React-Native UI problematikk. Vi implementerte også en måte å holde oversikt over antall konsumerte kalorier iløpet av en dag samt antall utførte push-ups. For å få til dette har vi benyttet oss av Pedometer-komponenten fra Expo API-et. Samt en AnimatedCircularProgress-komponent fra `react-native-circular-progress`. Vi har også her benyttet oss av Modal-komponenten for å tilby innstillinger av skritteleren, kalorimåleren og push-up måleren.

- Alle importeringer av moduler og komponenter er gjort med tanke på at de er enkle å implementere, har et rent og stilig design og ikke minst at de tilbyr oss de løsningene vi trenger for å fullføre oppgaven på en god måte. 


- I prosjekt 3 av IT2810 Webutvikling har vi laget en React Native applikasjon ved hjelp av Expo. Expo er en open source tjeneste som bygger på React Native, og hjelper utvikleren å utvikle til både Android og iOS ved hjelp av Javascript og React. 

- Mappestruktur:
  Vi har plassert de forskjellige sidene i React Navigation i mappen `/screens/`. Her ligger de forskjellige Screen-komponentene, navngitt vha. Pascal Case. Selve mappen har navnet på komponenten og filen som inneholder komponenten ligger heter `index.js`, for enkelt oppslag.
`├───assets
├───screens
│   ├───Calendar
│   ├───DailyProgress
│   ├───HomeScreen
│   └───TodoList
└───__tests__
    └───__snapshots__`


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

## Funksjonalitet
Applikasjonen er ment å fungere som en Personal Information and Motivation Manager for mobil, og den gjør det mulig for brukeren å sette seg personlige mål, den fungerer som en kalender, og man kan legge inn gjøremål. For kalenderfunksjonaliteten kan man legge inn ulike avtaler eller lignende for datoer i fremtiden. 

- Calendar: Denne fungerer både som en kalender og som en agenda med funksjonalitet for innlegging av planer for en gitt dag. En kan både navigere seg måned for måned, eller dag for dag. Dette justeres ved å velge en gitt dag når du er i månedsmodus, eller ved å trykke på den grå streken når du er i dagsmodus. Vi har også lagt til funksjonalitet for endring og sletting av allerede eksisterende notater.
- Tasks: Med denne kan du som bruker legge ting du skal gjøre eller få gjort til i en liste med todos og fjerne de når du er ferdig med dem. for å legge til nye oppgaver skriver du inn i tekstfeltet nederst på skjermen, og for å fjerne noe swiper du de til venstre og trykker på "Done".
- Daily Progress: Her har vi laget funksjonalitet for å fylle inn daglige mål for antall skritt man skal gå, antall push-ups og antall kalorier man skal få i seg. Ved å bruke modalmenyen som vises øverst på skjermen kan man enkelt sette seg mål, og resette dagens framgang. Man kan dog ikke starte skrittelleren om igjen, dette fordi den henter ut antall skritt gått fra mobilens innebygde skritteller.
- Home Screen: Her har vi ikke gjort så mye spennende, men vi har lagt inn en komponent som viser tilfeldige quotes, ut i fra en liste med predefinerte quotes. Ved å trykke på quoten får man en ny, tilfeldig quote. I tillegg viser den hvilken ukedag, måned og dato det er, pluss klokkeslett. 

## Navigering
Appen vår bruker `BottomTabNavigator` med en `StackNavigator` for å håndtere navigasjon mellom de ulike skjermene. Appen åpner med hva vi kaller HomeScreen, som tilbyr motiverende quotes til brukeren. På bunnen av skjermen tilbyr vi brukeren en meny for å navigere seg mellom skjermene. 

#

## Teknologi
Som beskrevet ovenfor er applikasjonen utviklet med Expo og React Native. Vi lagrer all data/tilstander ved hjelp av AsyncStorage. For å demonstrere noe som går utover "basic React Native UI-problematikk" valgte vi å implementere skritteller. Vi har også testet med Jest. Vi har vært flittige i bruk av tredjepartskomponenter og biblioteker, og det har gjort det veldig greit for oss å få komponenter som egner seg for vår bruk, uten at vi må bruke så veldig lang tid på å utvikle komponentene fra bunn selv.

#

## Utviklingsmetode
Helt i begynnelsen av prosjektet vårt satte vi oss ned i lag og tegnet hvordan vi ønsket at applikasjonen skulle se ut. Dette gjorde det veldig enkelt å velge tredjepartskomponenter som passet vår visjon.
I dette prosjektet har vi utviklet ved hjelp av issue-tracking på Github. For hvert issue vi har laget, har vi laget en tilsvarende branch hvor vi arbeider med issuet. Dette gjør det veldig enkelt for oss å hoppe mellom branches uten konflikter, samt at ikke flere trenger å jobbe på samme branch. Vi opplevde at det ga oss langt færre merge-konflikter enn hva vi fikk på sist prosjekt, der vi til tider var både to og tre personer på samme branch. Vi laget dermed en development-branch som vi videre inn i feature-branches som vi hver for oss jobbet på. Etterhvert som vi løste issues merget vi featurebranchene sammen med development-branchen som vi til slutt merget tilbake til masterbranchen igjen. Dette er en arbeidsmetode som er svært inspirert etter GitFlow WorkFlow, som lar oss skille ny kode fra kode vi anser oss som ferdig med.
#

## Testing
- I dette prosjektet har vi ikke fått til å teste så mye som vi gjerne skulle ha gjort, men årsaken til det ligger mye i begrensninger ved Jest. For fremtidig testing ville vi nok heller ha testet mer systematisk. Vi har nå brukt snapshot-testing mens vi utviklet komponentene våre, og det vil vi gjøre i fremtiden også. Vi har ikke fått til så mye enhetstesting som vi ønsket, og det er noe vi gjerne skulle ha fått til. Underveis i prosjektet har vi kontinuerlig gjennomført testing på Android- og iPhone-mobiler gjennom prosjektet, for å sikre at den har lik funksjonalitet på disse.
- For framtidig utvikling ville vi nok ha testet på en annen måte. Vi hadde problemer med at noen av komponentene våre var vanskelige å teste, og at jest ikke hadde tilstrekkelig testingfunksjonalitet som vi klarte å bruke. I fremtiden skulle vi gjerne ha fått til mer enhetstesting og testing av state. Vi ville også ha testet grenseverdier der det er hensiktsmessig, samt testet for nullverdier og verdier forbi grenseverdiene våre.
#### Appen er testet på følgende enheter
- iPhone 8
- iPhone 7
- iPhone 6s
- Motorola Moto G6 Plus
- One Plus 6T
<<<<<<< HEAD

#
=======
>>>>>>> d6b4a53ef3b00239f03d99be770d9c089f996f16
