const options = {
    method: 'GET',
    headers: {
      'X-RapidAPI-Host': 'love-calculator.p.rapidapi.com',
      'X-RapidAPI-Key': 'ee48202537mshdacae3233583e98p1d6624jsn8464dcfdf162'
    }
  };

const firstName = "Maja"
const secondName = "Okan"
  
  fetch(`https://love-calculator.p.rapidapi.com/getPercentage?sname=${secondName}&fname=${firstName}`, options)
    .then(response => response.json())
    .then(response => console.log(response))
    .catch(err => console.error(err));