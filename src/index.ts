import { createElement, render, renderDom } from './element'

let virtualDom = createElement('ul', { class: 'list' }, [
    createElement('li', { class: 'item' }, ['a']),
    createElement('li', { class: 'item' }, ['b']),
    createElement('li', { class: 'item' }, ['c'])
])

// 虚拟dom转化成真实DOM，渲染到页面中
let el = render(virtualDom)
renderDom(el, document.body)
console.log(el, '3')
