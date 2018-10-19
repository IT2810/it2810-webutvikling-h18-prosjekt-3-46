# it2810-webutvikling-h18-prosjekt-3-gruppe--46

- I prosjekt 3 av IT2810 Webutvikling har vi lageet en React Native applikasjon ved hjelp av Expo. Expo er en open source tjeneste som bygger på React Native, og hjelper utvikleren å utvikle til både Android og iOS ved hjelp av Javascript og React. 

- For dette prosjektet har vi brukt følgende teknologier

#

## Avhengigheter
I dette prosjektet har vi brukt følgende teknologi
- Expo
- Jest
- react-navigation
- react-native-calendars
- native-base
- react-native-modal
- Med mer?????????????????????

#

## Funksjonalitet
Applikasjonen er ment å fungere som en Personal Information and Motivation Manager for mobil, og den gjør det mulig for brukeren å sette seg personlige mål, den fungerer som en kalender, og man kan legge inn gjøremål. For kalenderfunksjonaliteten kan man legge inn ulike avtaler eller lignende for datoer i fremtiden. 

- Calendar: Denne fungerer både som en kalender og som en agenda med funksjonalitet for innlegging av planer for en gitt dag. En kan både navigere seg måned for måned, eller dag for dag. Dette justeres ved å velge en gitt dag når du er i månedsmodus, eller ved å trykke på den grå streken når du er i dagsmodus. Vi har også lagt til funksjonalitet for endring og sletting av allerede eksisterende notater.
- Tasks: Med denne kan du som bruker legge ting du skal gjøre eller få gjort til i en liste med todos og fjerne de når du er ferdig med dem. for å legge til nye oppgaver skriver du inn i tekstfeltet nederst på skjermen, og for å fjerne noe swiper du de til venstre og trykker på "Done".
- Daily Progress: Her har vi laget funksjonalitet for å fylle inn daglige mål for antall skritt man skal gå, antall push-ups og antall kalorier man skal få i seg. Ved å bruke modalmenyen som vises øverst på skjermen kan man enkelt sette seg mål, og resette dagens framgang. Man kan dog ikke starte skrittelleren om igjen, dette fordi den henter ut antall skritt fra mobilen selv.

#

## Teknologi
Som beskrevet ovenfor er applikasjonen utviklet med Expo og React Native. Vi lagrer all data/tilstander ved hjelp av AsyncStorage. For å demonstrere noe som går utover "basic React Native UI-problematikk" valgte vi å implementere skritteller. Vi har også testet med Jest. Vi har vært flittige i bruk av tredjepartskomponenter og biblioteker, og det har gjort det veldig greit for oss å få komponenter som egner seg for vår bruk, uten at vi må bruke så veldig lang tid på å utvikle komponentene fra bunn selv.

#

## Utviklingsmetode
I dette prosjektet har vi utviklet ved hjelp av issue-tracking på Github. For hvert issue vi har laget, har vi laget en tilsvarende branch hvor vi arbeider med issuet. Dette gjør det veldig enkelt for oss å hoppe mellom branches uten konflikter, samt at ikke flere trenger å jobbe på samme branch. Vi opplevde at det ga oss langt færre merge-konflikter enn hva vi fikk på sist prosjekt, der vi til tider var både to og tre personer på samme branch. Vi laget dermed en development-branch som vi videre inn i feature-branches som vi hver for oss jobbet på. Etterhvert som vi løste issues merget vi featurebranchene sammen med development-branchen som vi til slutt merget tilbake til masterbranchen igjen. Dette er en arbeidsmetode som er svært inspirert etter GitFlow WorkFlow, som lar oss skille ny kode fra kode vi anser oss som ferdig med.
#

## Testing
- I dette prosjektet har vi ikke fått til å teste så mye som vi gjerne skulle ha gjort, men årsaken til det ligger mye i begrensninger ved Jest. For fremtidig testing ville vi nok heller ha testet mer systematisk. Vi har nå brukt snapshot-testing mens vi utviklet noen av komponentene våre, og det ville vi gjort i fremtiden også. Vi har ikke fått til så mye enhetstesting som vi ønsket, og det er noe vi gjerne skulle ha fått til. 

