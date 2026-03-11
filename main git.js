let elist = []
let dlist = []
let textlist = []
let N;
let e;
let d;
let t;
let challenged = 0;
let challengescore = 0
let highscore = 0
let level = 1
let Nchallenge;
let currentEncrypted = [];
let currentWord = "";
let challengesolved = false;
let challengestarted = false;

function gcd(a, b) {
    while (b != 0) {
        let temp = b
        b = a % b
        a = temp
    }
    return a
}

function modarithmetic(a, b, m) {

    let result = 1n;
    b = BigInt(b)
    m = BigInt(m)
    a = BigInt(a) % m

    while (b > 0n) {
        if (b % 2n == 1n) {
            result = (result * a) % m
        }
        a = (a * a) % m
        b = b / 2n
    }

    return result;

}

function geteInput() {
    elist.length=0;
    dlist.length=0;

    let p = Number(document.getElementById("pvalue").value);
    let q = Number(document.getElementById("qvalue").value);
    N = p*q;


    function phi(x, y, n) {
        return n - (Math.floor(n/x) + Math.floor(n/y) - Math.floor(n/(x*y)))
    }

    let ph = phi(p, q, N)

    let list = []

    for (let i = 2; i < ph; i++) {
        if (gcd(i, ph) == 1) {
            list.push(i)
        }
    }
    e = list[0]
    let k = 0
    d = 0

    while ((k*ph + 1)%e != 0) {
        k += 1
    }
    d = (k*ph + 1)/e
    let ekey = [e, N]
    let dkey = [d, N]
    let charlist = []
    


    let text = document.getElementById("plaintext").value;
    for (let i = 0; i < text.length; i++) {
        let h = BigInt(text.codePointAt(i))
        charlist.push(h)
    }
    let eb = BigInt(e)
    let nb = BigInt(N)

    for (let i = 0; i < text.length; i++) {
        let b = modarithmetic(charlist[i], eb, nb)
        elist.push(b.toString())
    }

    let index = 0

    document.getElementById("cipher").textContent = ""
    function displaytext() {
        if (index < elist.length) {
            document.getElementById("cipher").textContent += (elist[index] + " ")
            index ++
            setTimeout(displaytext, 100);
            }
        }
    displaytext();
    }

function attemptsInput() {

    let attempts = 1
    let a = Math.ceil(Math.sqrt(N))
    let b = (Math.pow(a,2) - N)
    while (Math.sqrt(b) % 1 != 0) {
        a += 1
        b = (Math.pow(a,2) - N)
        attempts += 1
    }
    document.getElementById("attempts").textContent = String(attempts)
}

function spamattemptsInput() {
    let attempts = 0
    for (let i = 2; i <= Math.sqrt(N); i++) {
        if (isPrime(i) == false) {
            continue;
        }
        attempts += 1
        if ((N % i) == 0) {
            break
        }
    }
    document.getElementById("spamattempts").textContent = String(attempts)
}

function animateBar(barid, n) {
    let bar = document.getElementById(barid)
    let value = bar.nextElementSibling
    let c = 0
    let maxwidth = 400

    function increasebar() {
        if (c >= n) {
            return;
        }
        c ++
        let width = ((c/n) * maxwidth)
        bar.style.width = width + "px"
        value.textContent = c

        requestAnimationFrame(increasebar)
    }
    increasebar()
}

function getdInput() {
    let nb = BigInt(N)
    let db = BigInt(d)
    for (let i = 0; i < elist.length; i++) {
        let h = modarithmetic(elist[i], db, nb)
        if (h < 65536n) {
            dlist.push(String.fromCodePoint(Number(h)))
        }
        else {
            dlist.push("?")
        }
    }

    let index = 0

    document.getElementById("cipher").textContent = ""
    function displaytext() {
        if (index < dlist.length) {
            document.getElementById("cipher").textContent += (dlist[index] + "")
            index ++
            setTimeout(displaytext, 100);
            }
        else {
            elist.length = 0;
            dlist.length = 0;
        }
        }
    displaytext();
}

function isPrime(n) {
    let prime = true
    let comp = 2
    while (comp <= Math.sqrt(n)) {
        if (n % comp == 0){
            prime = false
            break
        }
        comp = comp + 1
    }
    return prime
}

function gettInput() {
    let inp = document.getElementById("tvalue").value
    if (inp == "") {
        alert("please enter a number")
        return;
    }
    let t = Number(inp)
        if (isPrime(t) == false || t == 1) {
            alert("number is not prime, try: \n" + suggestPrime(t))
        }
        else{
            alert("number is prime")
        }
}

function suggestPrime(n) {
    let limit = 3
    let current = 0
    let suggestions = []
    let temp = n
    while (current < limit) {
        temp -= 1
        if (isPrime(temp) && temp > 0) {
            suggestions.push(temp)
            current += 1
        }
        if (temp < 0) {
            break
        }
    }
    temp = n
    current = 0
    while (current < limit) {
        temp += 1
        if (isPrime(temp) && temp > 0) {
            suggestions.push(temp)
            current += 1
        }
        if (temp < 0) {
            break
        }
    }
    return suggestions.join(", ")
}

let mathfact = [
    "4 is the only number with the same number of letters as its value",
    "A Kerr-Newman black hole has a theoretical maximum energy efficiency of 42%, 60x more efficient than nuclear fusion",
    "Imaginary numbers are necessary to solve the Schrodinger equation, meaning they are used to describe the fundamental matter within the universe.",
    "1 mile = 1.609 km, which is approximately the golden ratio (1.618), so miles can be converted by iteratively moving through the Fibonacci sequence.",
    "yummy",
    "the product of 2 numbers is the product of their HCF and LCM",
    "the square of 111,111,111 is 12,345,678,987,654,321",
    "every odd number has an 'e' in its word",
    "folding an A4 sheet of paper 103 times will cause its thickness to exceed the diameter of the observable universe",
    "picking a 3 digit number with distinct first and last digits, then reversing, then subtracting smaller from larger number, then adding reverse will always yield 1089",
    "for a positive integer n, there is always a prime number between n and 2n",
    "-40 Celsius is equal to -40 Fahrenheit",
    "'eleven plus two' is an anagram of 'twelve plus one'",
    "6 is the first perfect number, equal to the sum of its divisors",
    "by induction, contradiction, and exhaustion, the cake is not true, do not listen to it"
]
let randomfactnumber = Math.floor(Math.random() * mathfact.length)
let randomfact = mathfact[randomfactnumber]
if (Math.random() < 0.01) {
    randomfact = "you found the secret fact"
}

let factelem = document.getElementById("mathfact")
if (factelem) {
    factelem.textContent = randomfact
}

function getcInput() {
    function cencrypt(str, shift) {
        shift = Number(shift) % 26
        let text = ''
        for (let i = 0; i < str.length; i++) {
            let x = str[i]
            let c = str.charCodeAt(i)
            if (c >= 65 && c <= 90) {
                text += String.fromCharCode((c - 65 + shift + 26) % 26 + 65);
            }
            else if (c >= 97 && c <= 122) {
                text += String.fromCharCode((c - 97 + shift + 26) % 26 + 97);
            }
            else {
                text += x
            }
        }
        return text;
    }

    let newtext = document.getElementById("plaintext2").value;
    let shiftvalue = document.getElementById("cvalue").value;
    textlist = (cencrypt(newtext, shiftvalue)).split("");

    let index = 0

    document.getElementById("ccipher").textContent = ""
    function displaytext() {
        if (index < textlist.length) {
            document.getElementById("ccipher").textContent += (textlist[index])
            index ++
            setTimeout(displaytext, 100);
            }
        }
    displaytext();
}

function getcdInput() {
    function cdecrypt(str, shift) {
        shift = Number(shift) % 26
        let text = ''
        for (let i = 0; i < str.length; i++) {
            let x = str[i]
            let c = str.charCodeAt(i)
            if (c >= 65 && c <= 90) {
                text += String.fromCharCode((c - 65 - shift + 26) % 26 + 65);
            }
            else if (c >= 97 && c <= 122) {
                text += String.fromCharCode((c - 97 - shift + 26) % 26 + 97);
            }
            else {
                text += x
            }
        }
        return text;
    }

    let newtext = textlist.join("")
    let shiftvalue = document.getElementById("cvalue").value;
    textlist = (cdecrypt(newtext, shiftvalue)).split("");

    let index = 0

    document.getElementById("ccipher").textContent = ""
    function displaytext() {
        if (index < textlist.length) {
            document.getElementById("ccipher").textContent += (textlist[index])
            index ++
            setTimeout(displaytext, 100);
            }
        }
    displaytext();
}

wordlist = ["apple", "chair", "hello", "book", "dragon", "cat", "bear", "wallet"]

function startChallenge() {
    challengestarted = true;
    challengesolved = false;
    let minlim = Math.floor((level)*2 + 10)
    let maxlim = Math.floor((level)*3 + 20)
    let p = randomPrime(minlim, maxlim)
    let q = randomPrime(minlim, maxlim)

    while (p == q) {
        q = randomPrime(minlim, maxlim)
    }

        Nchallenge = p * q;
    let phi = (p - 1) * (q - 1);

    let e = 2;
    while (gcd(e, phi) != 1) {
        e += 1;
    }

    let k = 0;
    let d = 0;
    while ((k * phi + 1) % e != 0) {
        k += 1;
    }
    d = (k * phi + 1) / e;

    challenged = d;
    currentWord = wordlist[Math.floor(Math.random() * wordlist.length)];
    currentEncrypted = encryptWord(currentWord, e, Nchallenge);


    document.getElementById("nvalue").textContent = Nchallenge;
    document.getElementById("evalue").textContent = e;
    document.getElementById("dinput").value = "";
    document.getElementById("ptext").textContent = currentEncrypted.join(" ");
}

function checkChallenge() {

    if (challengestarted == false) {
        return;
    }
    if (challengesolved == true) {
        return;
    }

    let userD = Number(document.getElementById("dinput").value);

    if (userD === challenged) {
        if (challengesolved == false) {
            challengescore += 1;
            highscore += 1
        }
        challengesolved = true;
        document.getElementById("scorevalue").textContent = challengescore;
        document.getElementById("highscorevalue").textContent = highscore;
        let decrypted = decryptWord(currentEncrypted, userD, Nchallenge);
        document.getElementById("ptext").textContent = decrypted;
        writetext()

    } else {
        alert("Incorrect! The correct d was " + challenged);
        challengescore = 0;
        document.getElementById("scorevalue").textContent = 0;
        startChallenge()
    }
}

function randomPrime(min, max) {
    let n = Math.floor(Math.random() * (max - min + 1)) + min

    if (isPrime(n)) {
        return n
    }
    let up = n + 1
    let down = n - 1
    while (true) {
        if (up <= max && isPrime(up)) {
            return up
        } 
        if (down >= min && isPrime(down)) {
            return down;
        } 
        up += 1;
        down -= 1;
        if (up > max || down < min) {
            break;
    }
    }
    return null;
}

function encryptWord(word, e, N) {
    let result = [];
    for (let char of word) {
        let code = BigInt(char.codePointAt(0));
        result.push(modarithmetic(code, e, N));
    }
    return result;
}
let correcttext;

function decryptWord(encryptedArray, d, N) {
    let result = "";
    for (let num of encryptedArray) {
        let code = modarithmetic(BigInt(num), d, N);
        result += String.fromCodePoint(Number(code));
    }
    correcttext = "correct. The decrypted word is "
    correcttext += result
    correcttext = correcttext.split("")
    return result;
}

function writetext() {
    let outelem = document.getElementById("output")
    let i = 0;
    function display() {
        if (i < correcttext.length) {
            outelem.textContent += (correcttext[i])
            i ++
            setTimeout(display, 50);
            }
    }
    display();
}