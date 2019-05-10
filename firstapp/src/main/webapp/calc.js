const calculator = document.querySelector('.frame')
const keys = calculator.querySelector('.keys')
const display = calculator.querySelector('.display')

/// Ok dus bij nader inzicht was deze manier enigsinds omslachtig.
///Het gebruik van deze ene functie die alles in een keer kan berekenen klinkt leuk.
///En het werkt maar misschien was een directe berekening iets makkelijker geweest.
const calc = (n1, operation, n2) => {
  let result = ''
  /// Deze console log is een sanity check
  console.log("uuuh ja nee ik heb de operation gevonden het is uuuuhm hier!")
  /// afhankelijk van welke operator er wordt doorgegeven doen we een berekening
  if (operation === 'btn_plus') {
    result = parseFloat(n1) + parseFloat(n2)
  } else if (operation === 'btn_min') {
    result = parseFloat(n1) - parseFloat(n2)
  } else if (operation === 'btn_prod') {
    result = parseFloat(n1) * parseFloat(n2)
  } else if (operation === 'btn_div') {
    result = parseFloat(n1) / parseFloat(n2)
  }

  return result
}

/// Deze "functie" is uit de hand gelopen.
/// Korte versie. Deze functie kan niet worden aangeroepen want het heeft geen naam. Het is een generic functie.

keys.addEventListener('click', e => {
 if (e.target.matches('button')) {
   /// maakt constante aan voor gemakkelijke vergelijkingen

     const key = e.target
     const action = key.dataset.action
     const keyContent = key.textContent
     const displayedNum = display.textContent
     const previousKeyType = calculator.dataset.previousKeyType
     ///Als iets wordt aangeklikt moeten we zorgen dat niets anders meer aangeklikt is behalve deze ene key.
     Array.from(key.parentNode.children)
       .forEach(k => k.classList.remove('is-depressed'))

    /// Als de aangeklikte knop geen data action heeft dan is het een nummer key.
    /// Hier hoeven we niet veel mee te doen behalve te laten zien dat deze is aangeklikt
     if (!action) {
       if (displayedNum === '0' || previousKeyType === 'operation' || previousKeyType === 'btn_eq') {
         display.textContent = keyContent
       }
       else {
         display.textContent = displayedNum + keyContent
       }

       calculator.dataset.previousKeyType = 'number'
     }
     /// als een van de operation knoppen wordt aangeklikt setten we een aantal values
     /// Dan kijken we of de laatste knop een operation of de = teken was. Is dat het geval?
     /// Dan reken we ze uit als onder deel van een grotere som. Zo niet dan gooien we het naar het scherm.
     if (
       action === 'btn_prod' ||
       action === 'btn_div' ||
       action === 'btn_min' ||
       action === 'btn_plus' )
      {
       const firstValue = calculator.dataset.firstValue
       const operation = calculator.dataset.operation
       const secondValue = displayedNum

       if(firstValue &&
         operation &&
         previousKeyType !== 'operation' &&
         previousKeyType !== 'btn_eq')
        {
          const calcValue = calc(firstValue, operation, secondValue)
          display.textContent = calcValue
          calculator.dataset.firstValue = calcValue
        }
        else {
          calculator.dataset.firstValue = displayedNum
        }

      key.classList.add('is-depressed')
      calculator.dataset.previousKeyType = 'operation'
      calculator.dataset.operation = action
      }
      ///We zetten alles terug naar leeg zodat we niet moeilijk hoeven doen
     if (action === 'btn_clear') {
       /// Sanity check
       console.log('clear key! Ja nog steeds... Zucht')
       calculator.dataset.firstValue = ''
       calculator.dataset.modValue = ''
       calculator.dataset.operation = ''
       calculator.dataset.previousKeyType = ''
       display.textContent = 0
       calculator.dataset.previousKeyType = 'btn_clear'
     }

     /// Het afronden van een som. We doen de operatie via de calc.
     /// Dit zorgt ook opzich dat we de laatste operatie nog een keer kunnen doen.
     /// Kan helpen bij het maken van machten. Maar daar ga ik verder niet echt op in.
     if (action === 'btn_eq') {
       let firstValue = calculator.dataset.firstValue
       const operation = calculator.dataset.operation
       let secondValue = displayedNum

       if (firstValue){
         if(previousKeyType === 'btn_eq'){
           firstValue = displayedNum
           secondValue = calculator.dataset.modValue
         }

         display.textContent = calc(firstValue, operation, secondValue)
       }

       calculator.dataset.modValue = secondValue
       calculator.dataset.previousKeyType = 'btn_eq'
     }
   }
})
