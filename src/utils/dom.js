const _attr = (el, pops) => {
    Object.keys(pops).forEach(t => el.setAttribute(t, pops[t]))
}
const _appendChild = (parent, child, props) => {
    if (Array.isArray(child)) {
        child.forEach(t => {
            _appendChild(parent, t, props)
        })
    } else if (child) {
        props && _attr(child, pops)
        parent.appendChild(child)
    }
}

export default {
    _attr,
    _appendChild
}