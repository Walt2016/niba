const figures = [{
    shape: 'lattice',
    n: 10,
    r: 10,
    anime: {
        prop: 'r',
        range: [1, 50],
        speed: 0.1,
        act: 'uniform' //匀速
    }
}, {
    shape: 'polygon',
    n: 10,
    r: 100,
    color: 'red',
    anime: {
        prop: 'r', //作用属性
        range: [1, 100], //取值范围
        speed: 1, //速度
        act: 'uniform' //匀速
    }
},
{
    shape: 'polygon',
    n: 10,
    r: 50,
    color: 'green',
    anime: {
        prop: 'n', //作用属性
        range: [1, 10], //取值范围
        speed: 0.1, //速度
        act: 'uniform' //匀速
    }
}]

export {figures}