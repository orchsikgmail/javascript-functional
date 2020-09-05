const log = console.log;

const curry = f => (a, ...as) => as.length ? f(a, ...as) : (...as) => f(a, ...as);

const isIterable = a => a && a[Symbol.iterator];

const go1 = (a, f) => a instanceof Promise ? a.then(f) : f(a);

const reduceF = (acc, a, f) =>
    a instanceof Promise ? a.then(a =>
        f(acc, a), e => 
            e == nop ? acc : Promise.reject(e)
    ) : f(acc, a);

const head = iter => go1(take(1, iter), ([h]) => h);
