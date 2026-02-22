let elist = []
let dlist = []
let textlist = []
let N;
let e;
let d;
let t;

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

    function gcd(a, b) {
        while (b != 0) {
            let temp = b
            b = a % b
            a = temp
        }
        return a
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
            alert("number is not prime")
        }
        else{
            alert("number is prime")
        }

    }

let mathfact = [
    "4 is the only number with the same number of letters as its value",
    "A Kerr-Newman black hole has an energy efficiency of 42%, 60x more efficient than nuclear fusion",
    "Imaginary numbers are somewhat real, being necessary to solve the Schrodinger equation, meaning they are used to describe the fundamental matter within the universe.",
    "Statistically, your friends are likely more popular than you are.",
    "1 mile = 1.609 km, which is approximately the golden ratio (1.618), so miles can be converted by iteratively moving through the Fibonacci sequence.",
    "yummy",
    "the product of 2 numbers is the product of their HCF and LCM",
    "the square of 111,111,111 is 12,345,678,987,654,321",
    "every odd number has an 'e' in its word",
    "folding an A4 sheet of paper 103 times will cause its thickness to exceed the diameter of the observable universe",
    "picking a 3 digit number with distinct first and last digits, then reversing, then subtracting smaller from larger number, then adding reverse will always yield 1089",
    "for a positive integer n, there is always a prime number between n and 2n"
]
let randomfactnumber = Math.floor(Math.random() * mathfact.length)
let randomfact = mathfact[randomfactnumber]
if (Math.random() < 0.01) {
    randomfact = "you found the secret fact"
}

document.getElementById("mathfact").textContent = randomfact

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