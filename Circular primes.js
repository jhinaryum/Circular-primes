function findPrimes(range) {
  let numbers = [];
  const primesArr = [2];
  let prime = 2;

  while (prime <= range) {
    // Dizi asal sayılar ile dolduruluyor
    for (let i = 1; i <= range && prime * i <= range; ++i) {
      numbers[prime * i - 1] = prime * i;
    }
    // Bir sonraki asal sayıya geçiyor
    while (numbers[prime - 1] !== undefined) {
      ++prime;
    }
    // Geçerli bir asal sayı eklenicek
    primesArr.push(prime);
  }
  // Aralıktan daha büyük olan son üs siliniyor
  primesArr.pop();
  return primesArr;
}

const LN10 = Math.log(10);
// anlamlı olan en az temel 10 basamağı öne döndürüyor
function rotate(number) {
  return (
    ((number / 10) >> 0) +
    (number % 10) * Math.pow(10, Math.floor(Math.log(number) / LN10))
  );
}

// asallar arasında dairesel asallar bulunur 
function findCircularPrimes(range) {
  const primes = findPrimes(range);

  // daha hızlı aramak için bir karma değer bulunur 
  const primeHash = primes.reduce(function(memo, prime) {
    memo[prime] = true;
    return memo;
  }, {});

  const circularPrimes = primes.filter(function(prime) {
    // dairesel asal olup olmadığı kontrol edilir 
    let nextDigit = prime;
    while ((nextDigit = rotate(nextDigit)) !== prime) {
      if (!(nextDigit in primeHash)) {
        return false;
      }
    }
    return true;
  });

  return circularPrimes;
}

const listCircularPrimes = document.querySelector('.button');
listCircularPrimes.addEventListener('click', getCircularPrimes);

function getCircularPrimes(inputValue) {
  inputValue = document.getElementById('userInput').value;
  inputValue = parseInt(inputValue);
  if (typeof inputValue !== 'number' || isNaN(inputValue)) {
    return (document.getElementById('result').innerHTML =
      '<span style="color: red">Lütfen, geçerli bir sayı giriniz</span>');
  } else if (inputValue <= 0 || inputValue > 9999999) {
    return (document.getElementById('result').innerHTML =
      '<span style="color: red">Lütfen,1 ile 9.999.999 arasında bir sayı giriniz</span>');
  }

  let circularPrimes = findCircularPrimes(inputValue).join(', ');

  // 1 ve 2 sayıları için özel durumlar 
  if (inputValue === 2) {
    return (document.getElementById('result').innerHTML =
      '1 ile 2 arasındaki dairesel asal sayı 2 dir ');
  } else if (inputValue === 1) {
    return (document.getElementById('result').innerHTML =
      '1 için dairsel asal sayı yok');
  } else {
    return (document.getElementById(
      'result'
    ).innerHTML = ` 1 ile ${inputValue} arasındaki dairesel asal sayılar şunlardır: <br> ${circularPrimes}`);
  }
}