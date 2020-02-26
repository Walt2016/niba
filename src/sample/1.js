const figures = [{
    shape: 'lattice',
    sort: 'parity', //shuffle parity misplaced shuffle
    n: [4, 10],
    r: 50,
    anime: {
        prop: 'r',
        range: [0, 100],
        speed: 0.1,
        act: 'uniform'
    }
}, {
    shape: 'polygon',
    r: 75,
    n: 5,
    color: 'white',
    sort: 'parity',
    sAngle: 10,
    anime: {
        prop: 'sAngle',
        range: [0, 100],
        speed: 0.01,
        act: 'uniform'
    }

}]

export {
    figures
}