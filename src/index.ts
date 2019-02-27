import { createElement, render, renderDom } from './element'
import diff from './diff'

let virtualDom1 = createElement('ul', { class: 'list' }, [
    createElement('li', { class: 'item' }, ['a']),
    createElement('li', { class: 'item' }, ['b']),
    createElement('li', { class: 'item' }, ['c'])
])

let virtualDom2 = createElement('ul', { class: 'list-group' }, [
    createElement('li', { class: 'item' }, ['a']),
    createElement('li', { class: 'item' }, ['b']),
    createElement('li', { class: 'item' }, ['c'])
])

// 虚拟dom转化成真实DOM，渲染到页面中
// let el = render(virtualDom)
// renderDom(el, document.body)
// console.log(el, '3')

let patches = diff(virtualDom1, virtualDom2)
