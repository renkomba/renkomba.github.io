const progressBars = document.querySelectorAll('.progress-bar');

// months as of April 14th 2022
const monthsBuildingWith = {
    "apps-script": 16.5,
    "css": 5,
    "jquery": 1,
    "react": 1,
    "sheets": 22,
    "js": 16,
    "git": 4,
    "html": 4,
    "sass": 1,
    "bootstrap": 1,
    "json": 1.5,
    "sql": 1,
    "python": 6.5,
    "node-js": 1
}

/*
 * if months > 6, max value
 * else, give value over 6
 * source: find psych source
 */
const fillBar = () => {
    let bars = [...progressBars];

    for (let bar of bars) {
        let id = bar.parentNode.parentNode.id;
        let months = monthsBuildingWith[id];
        let [percentage, mastery] = [
            months > 6 ? 100 : Math.round(100 * ( (months+4) /10) ),
            months > 6 ? 'Creative' :
                months >= 5 ? 'Confident' :
                months >= 3 ? 'Experienced' :
                months <= 1 ? 'Student' : 'Competent'
        ];
        console.log(`Lang: ${id}\nMonths: ${months}\nLevel: ${mastery}`);

        bar.style.width = `${percentage}%`;
        bar.querySelector('.text').innerHTML = mastery;
    }
}

fillBar();

// ===== Greetings =====
function newSetInterval(callback, duration, callbackArgs) {
    callback.apply(this, callbackArgs);
    let [args, scope] = [
      arguments,
      this
    ];
    
    setTimeout( () => {
      newSetInterval.apply(scope, args);
    }, duration );
  }
  
  /* GREETING <p> */
  let greeting = document.querySelector('#greetings');
  
  const greetings = {
    english: 'Hello!',
    french: 'Coucou !',
    spanish: '¡ Holís !',
    portuguese: 'Olá !',
    japanese: 'ヤッホー',
    italian: 'Ciao !',
    jumble: (len) => {
      const symbols = '@#$£¢∞§¶¥†®∑ƒ©∆∫?%';
      let randomStr = '';
  
      while (randomStr.length < len) {
        randomStr += symbols.charAt(Math.floor(
          Math.random() * symbols.length)
        );
      }
  
      return randomStr;
    },
  };
  
  // ===== FUNCTIONS =====
  /*
   * 1. Take {greetings}.values
   * 2. pop(jumble)
   * 3. Get random index & return the value at that index
   */
  const generateGreeting = () => {
    let greetingsValues = Object.values(greetings);
    greetingsValues.pop();
    let i = Math.floor( Math.random() * greetingsValues.length);
    
    return greetingsValues[i];
  };
  
  // Durstenfeld shuffle algorithm
  const shuffleGreeting = array => {
    // type check
    if ( array.length < 1 || !Array.isArray(array) ) return [
      [' ', 2], ['h', 0], ['!', 3], ['i', 1]
    ];
    
    let keyValuePairs = array.map( (e,i) => [e,i] );
  
    for (let j, i=keyValuePairs.length-1; i > 0 ; i--) {
      j = Math.floor( Math.random() * (i + 1) );
      [ keyValuePairs[i], keyValuePairs[j] ] = [
        keyValuePairs[j],
        keyValuePairs[i]
      ];
    }
  
    return keyValuePairs;
  }
  
  /* *************** MAIN ****************
   * 1. Choose a greeting from {greetings}
   * 2. Choose the random order in which to reveal the above
   * 3. Animate a jumble of symbols
   * 4. Reveal the chosen greeting
   */
  const animateGreeting = () => {
    const chosenGreeting = generateGreeting(); //types ''
    const jumbledLetters = shuffleGreeting(chosenGreeting.split('')); //type []
    
    let [currentLen, greetingLen] = [
      0,
      chosenGreeting.length
    ];
    
    /*
     * 1. Take first index of 2d array [letter, i]
     * 2. Pull the innerHTML of <p #greetings>
     * 3. Place -letter- at index -i- of innerHTML
     * 4. Update <p #greetings> innerHTML in dom
     */
    const revealLetters = () => {
      // console.log(greeting.innerHTML);
      
      if (jumbledLetters.length > 0) {
        let [letter, i] = jumbledLetters.shift();
        let greetingInDom = greeting.innerHTML.split('');
  
        greetingInDom[i] = letter;
        greeting.innerHTML = greetingInDom.join('');
        
        setTimeout(revealLetters, 20);
      }
    }
  
    const writeSymbols = () => {
      if (currentLen < greetingLen) {
        currentLen = (currentLen + 2) > greetingLen ?
          greetingLen : currentLen + 2;
  
        greeting.innerHTML = greetings.jumble(currentLen);
  
        setTimeout(writeSymbols, 20);
      } else {
        revealLetters();
      }
    }
    
    writeSymbols();
  }
  
  newSetInterval(animateGreeting, 5000);