import MidSeg from '../points/MidSeg'
export default class Fractal{
    constructor(){

    }
    _midSeg(){
        let midseg = new MidSeg({
            points,
            offset: fractalOffset
        })
        this._path(Object.assign({}, options, {
            _points: midseg.points,
            fractalLevel,
            fractalUse: fractalLevel > 1,
            r: _.dis(midseg.points[0], options.o)
        }))
    }

}