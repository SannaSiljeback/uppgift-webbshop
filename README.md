# FSU23D Systemutveckling Uppgift 1

Denna uppgift går ut på att skapa en e-handel, som fungerar både för administratörer och kunder. Administratörer ska kunna lägga till och redigera produkter som sedan visas för användaren. Användaren sk kunna välja produkter och lägga i sin varukorg för att sedan gå igenom betalningen för att skapa en order i systemet, som administratören senare kan se.

## Kraven för denna uppgift:

### Betyg G

- Diagram för databas, sitemap och tidsplan framtagen
- Databas uppsatt med tabeller enligt diagramet
- Utveckla ett användargränssnitt för administratörer där de kan lägga till och redigera produkter
- Produkterna ska sparas ner i databasen
- Användare ska kunna se en lista med alla produkter och lägga dem i sin varukorg
- Användaren ska sedan kunna betala för sina varor och skapa en order i databasen
- Administratören ska kunna se listan med ordrar och vilka varor som beställts

### Betyg VG

Krav för VG

- Samtliga punkter för G
- Alla typer av objekt i databasen ska ha en egen klass som resten av kodbasen arbetar mot
- Alla klasser ska ärva från en basklass som sköter laddande och sparande av data
- En singleton ska användas för alla databasfrågor
- Varukorgen ska sparas i databasen och delar genmensam funktionalitet med order-klassen
- Betalning genomförs med vald betaltjänst

Denna uppgift mäter följande moment från kursplanen:

kommunikation med databaser
ta fram E-handelsplattform
välja ut, designa och anpassa databaser utifrån given uppgift

Denna uppgift mäter följande VG-moment från kursplanen:

Använda Objektorienterad programmering på ett korrekt sätt.