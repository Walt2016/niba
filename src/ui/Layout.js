import BaseDom from './BaseDom'
export default class Layout extends BaseDom {
  constructor(options) {
    super(options)
  }
  render() {
    let top = this._div({
      id: 'tools-container',
    })

    let tools = this._div(
      {
        class: 'tools',
      },
      top,
      [
        {
          tag: 'span',
          props: {
            innerText: 'zoom',
          },
        },
        {
          tag: 'input',
          props: {
            type: 'range',
            class: 'zoom',
            max: '2.5',
            min: '0.1',
            step: '0.1',
            value: '1',
          },
          on: {
            input: e => {
              let val = e.target.value
              let svg = document.querySelector('svg')
              let container = document.querySelector('#svg-container')
              let height = container.offsetHeight
              let width = container.offsetWidth
              svg.setAttribute('viewBox', [0, 0, width / val, height / val])
              document.querySelector('.zoom-value').innerText = val
            },
          },
        },
        {
          tag: 'div',
          props: {
            class: 'zoom-value',
            innerText: 1,
          },
        },
      ]
    )

    let ui = this._div(
      {
        id: 'toggle-ui-button',
        innerText: 'UI',
        click: e => {
          console.log(e)
          let el = e.target
          let ui = document.querySelector('#ui-container')
          let svg = document.querySelector('#svg-container')

          ;[el, ui, svg].forEach(t => {
            t.className = t.className === 'hideui' ? '' : 'hideui'
          })
        },
      },
      top
    )

    let main = this._div({
      id: 'svg-container',
    })

    let right = this._div({
      id: 'ui-container',
    })

    this._appendTo(document.body, [top, main, right])
  }
}
