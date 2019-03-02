import { createElement, render, renderDom } from './element'
import diff from './diff'
import patch from './patch'

let virtualDom1 = createElement('ul', { class: 'list' }, [
    createElement('li', { class: 'item' }, ['a']),
    createElement('li', { class: 'item' }, ['b']),
    createElement('li', { class: 'item' }, ['c'])
])

let virtualDom2 = createElement('ul', { class: 'list-group' }, [
    createElement('li', { class: 'item' }, ['1']),
    createElement('li', { class: 'item' }, ['b']),
    createElement('div', { class: 'item' }, ['3'])
])

// 虚拟dom转化成真实DOM，渲染到页面中
let el = render(virtualDom1)
renderDom(el, document.body)
let patchs = diff(virtualDom1, virtualDom2)

// 给元素打补丁，重新更新视图
patch(el, patchs)

// 1. 平级元素有互换，会导致重新渲染
// 2. 新增节点也会被更新

// 通过 index(索引)解决
