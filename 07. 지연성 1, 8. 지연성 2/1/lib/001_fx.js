const log = console.log;

const curry = (f) => (a, ...as) => as.length ? f(a, ...as) : (...as) => f(a, ...as);

const map = curry((f, iter) => {
    let res = [];  
    for(const a of iter) {
        res.push(f(a))
    }
    return res;})

const filter = curry((f, iter) => {
    let res = [];
    for(const a of iter) {
        if(f(a)) res.push(a)
    }
    return res;});

const reduce = curry((f, acc, iter) => {
    if(!iter) {
        iter = acc[Symbol.iterator]();
        acc = iter.next().value;
    }
    for(const a of iter) {
        acc = f(acc, a)
    }
    return acc;
});

const go = (...as) => reduce((a, f) => f(a), as);

const pipe = (f, ...fs) => (...as) => go(f(...as), ...fs);