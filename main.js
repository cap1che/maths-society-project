let elist = []
let dlist = []
let N;
let e;
let d;

function modarithmetic(a, b, m) {
    
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
        let b = ((charlist[i])**eb)%nb
        elist.push(b.toString())
    }

    document.getElementById("cipher").textContent = elist.join(" ");

}
function getdInput() {
    let nb = BigInt(N)
    let db = BigInt(d)
    for (let i = 0; i < elist.length; i++) {
        let h = ((BigInt(elist[i]))**db)%nb
        if (h < 65536n) {
            dlist.push(String.fromCodePoint(Number(h)))
        }
        else {
            dlist.push("?")
        }
    }
    document.getElementById("cipher").textContent = dlist.join("")
    elist.length = 0;
    dlist.length = 0;
}