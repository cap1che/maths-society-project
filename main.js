let p = document.getElementById(pvalue);
let q = document.getElementById(qvalue);
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
    if (gcd(N, i) == 1 && gcd(ph, i) == 1) {
        list.push(i)
    }
}
let e = list(0)
let k = 0

while ((k*ph + 1)%e != 0) {
    d = (k*ph + 1)/e
    k += 1
}
let ekey = [e, N]
let dkey = [d, N]

let h = document.getElementById(plaintext);