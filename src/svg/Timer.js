export const _timer = (fn, options, delay) => {
    let {
        timer,
        level
    } = options
    delay = delay || level * (timer.delay || 500)
    if (typeof timer === "object") {
        timer.use ? setTimeout(() => {
            fn.call(this, options)
        }, delay) : fn.call(this, options)
    } 
    // else {
    //     options.timerUse ? setTimeout(() => {
    //         fn.call(this, options)
    //     }, level * timerDelay) : fn.call(this, options)
    // }
}