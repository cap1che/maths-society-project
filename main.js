let p = document.getElementById(pvalue).value;
let q = document.getElementById(qvalue).value;
let N = p*q;

function phi(x, y, n) {
    return n - ((n/x) + (n/y) + (n/x*y))
}

function gcd(a, b) {
    while (b != 0) {
        let temp = b
        b = a % b
        a = temp
    }
    return a
}

ph = phi(p, q, N)

let list = []

for (let i = 2; i < ph; i++) {
    if (gcd(e, ph) == 1) {
        list.push(i)
    }
}
let e = list[0]
let k = 0

while ((k*ph + 1)%e != 0) {
    d = (k*ph + 1)/e
    k += 1
}
let ekey = [e, N]
let dkey = [d, N]

let text = document.getElementById(plaintext).value;
let h = text.charCodeAt(0)

let b = (h**e)%N
document.getElementById("cipher").textContent = c;