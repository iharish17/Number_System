const infoArea = document.getElementById('info-area');
    const typeButtons = document.getElementById('type-buttons');
    let selectedType = null;

    const numberTypes = {
      natural: { title: "Natural Numbers", description: "Counting numbers starting from 1 (sometimes including 0). Examples: 1, 2, 3, 4, ..." },
      whole: { title: "Whole Numbers", description: "Natural numbers including 0. Examples: 0, 1, 2, 3, 4, ..." },
      integer: { title: "Integers", description: "Whole numbers and their negatives, including zero (..., -3, -2, -1, 0, 1, 2, 3, ...)." },
      rational: { title: "Rational Numbers", description: "Numbers expressible as a fraction of two integers, e.g., 1/2, -3/4, 0.75." },
      irrational: { title: "Irrational Numbers", description: "Numbers that cannot be expressed as a simple fraction. Their decimal expansions go on forever without repeating, e.g., π, √2." },
      real: { title: "Real Numbers", description: "All rational and irrational numbers together." },
      imaginary: { title: "Imaginary Numbers", description: "Numbers that are multiples of the imaginary unit i, where i² = -1." },
      complex: { title: "Complex Numbers", description: "Numbers with a real and an imaginary part, of the form a + bi, e.g., 3 + 4i." },
      even: { title: "Even Numbers", description: "Integers divisible by 2, e.g., -4, 0, 2, 6, 44." },
      odd: { title: "Odd Numbers", description: "Integers not divisible by 2, e.g., -3, 1, 5, 11, 99." },
      prime: { title: "Prime Numbers", description: "Natural numbers greater than 1 that have exactly two distinct divisors: 1 and themselves. Examples: 2, 3, 5, 7, 11." },
      perfect: { title: "Perfect Numbers", description: "Natural numbers that are equal to the sum of their positive divisors excluding themselves, e.g., 6, 28." },
      amicable: { title: "Amicable Numbers", description: "Two numbers each of which is the sum of the proper divisors of the other, e.g., (220, 284)." },
      transcendental: { title: "Transcendental Numbers", description: "Numbers that are not roots of any non-zero polynomial with rational coefficients, e.g., e, π." },
      algebraic: { title: "Algebraic Numbers", description: "Numbers that are roots of non-zero polynomial equations with rational coefficients." },
      palindromic: { title: "Palindromic Numbers", description: "Numbers which read the same backward and forward, e.g., 121, 1331." },
      triangular: { title: "Triangular Numbers", description: "Numbers that can form an equilateral triangle, e.g., 1, 3, 6, 10." },
      fibonacci: { title: "Fibonacci Numbers", description: "Numbers in a sequence where each number is the sum of the two preceding ones, e.g., 0, 1, 1, 2, 3, 5, 8." },
      square: { title: "Square Numbers", description: "Numbers that are squares of integers, e.g., 1, 4, 9, 16, 25." },
      cube: { title: "Cube Numbers", description: "Numbers that are cubes of integers, e.g., 1, 8, 27, 64." }
    };

    function isPrime(num) {
      if (num <= 1) return false;
      if (num <= 3) return true;
      if (num % 2 === 0 || num % 3 === 0) return false;
      for (let i = 5; i * i <= num; i += 6) {
        if (num % i === 0 || num % (i + 2) === 0) return false;
      }
      return true;
    }

    function isPerfect(num) {
      if (num < 2) return false;
      let sum = 1;
      for (let i = 2; i <= Math.sqrt(num); i++) {
        if (num % i === 0) {
          sum += i;
          if (i !== num / i) sum += num / i;
        }
      }
      return sum === num;
    }

    function isPalindromic(num) {
      const s = num.toString();
      return s === s.split('').reverse().join('');
    }

    function isTriangular(num) {
      const n = (-1 + Math.sqrt(1 + 8 * num)) / 2;
      return Number.isInteger(n);
    }

    function isFibonacci(num) {
      const isPerfectSquare = n => Number.isInteger(Math.sqrt(n));
      return isPerfectSquare(5 * num * num + 4) || isPerfectSquare(5 * num * num - 4);
    }

    function isSquare(num) {
      return Number.isInteger(Math.sqrt(num));
    }

    function isCube(num) {
      return Number.isInteger(Math.cbrt(num));
    }

    function getNumberList(type, n) {
      let arr = [];
      if (type === "even") {
        for (let i = 2; i <= n; i += 2) arr.push(i);
      } else if (type === "odd") {
        for (let i = 1; i <= n; i += 2) arr.push(i);
      } else if (type === "prime") {
        for (let i = 2; i <= n; i++) if (isPrime(i)) arr.push(i);
      } else if (type === "perfect") {
        for (let i = 2; i <= n; i++) if (isPerfect(i)) arr.push(i);
      } else if (type === "palindromic") {
        for (let i = 1; i <= n; i++) if (isPalindromic(i)) arr.push(i);
      } else if (type === "triangular") {
        let sum = 0;
        for (let i = 1; ; i++) {
          sum += i;
          if (sum > n) break;
          arr.push(sum);
        }
      } else if (type === "fibonacci") {
        let a = 0, b = 1;
        while (a <= n) {
          arr.push(a);
          [a, b] = [b, a + b];
        }
      } else if (type === "square") {
        for (let i = 1; i * i <= n; i++) arr.push(i * i);
      } else if (type === "cube") {
        for (let i = 1; i * i * i <= n; i++) arr.push(i * i * i);
      }
      return arr;
    }

    typeButtons.addEventListener('click', (e) => {
      if (e.target.tagName === 'BUTTON') {
        const allButtons = typeButtons.querySelectorAll("button");
        allButtons.forEach(btn => btn.classList.remove('selected'));
        e.target.classList.add('selected');
        selectedType = e.target.getAttribute('data-type');
        let info = numberTypes[selectedType];
        let checkUI = '';
        if (["even", "odd", "prime", "perfect", "palindromic", "triangular", "fibonacci", "square", "cube"].includes(selectedType)) {
          checkUI = `
            <div class="check-area">
              <label>Enter a number: <input id="usernum" type="number" min="1" value="10" /></label>
              <button class="show-btn">Show Numbers</button>
            </div>
            <div class="results-block" id="results-block" style="display:none"></div>
          `;
        }
        infoArea.innerHTML = `<h2>${info.title}</h2><p>${info.description}</p>${checkUI}`;
        if (checkUI) {
          document.querySelector('.show-btn').onclick = function () {
            const val = parseInt(document.getElementById('usernum').value);
            let resultsText = '';
            if (!Number.isInteger(val) || val < 1) {
              resultsText = 'Please enter a valid positive integer.';
            } else {
              const list = getNumberList(selectedType, val);
              resultsText = `All ${info.title.toLowerCase()} up to ${val}:<br> ${list.join(', ')}`;
            }
            const block = document.getElementById('results-block');
            block.innerHTML = `<p>${resultsText}</p>`;
            block.style.display = "block";
          }
        }
      }
    });
