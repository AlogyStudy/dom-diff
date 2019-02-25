# 生成项目
```
npm install crete-react-app -g
create-react-app dom-diff
```

# virtual-dom
virtual-dom 相关

virtual-dom， 也就是虚拟节点，它通过JS的`Object`对象模拟`DOM`中都节点，然后再通过特定的`render`方法将其渲染成真实的`DOM`节点。

```
createElement -> { type, props, children }
```
-----
```
createElement('ul', { class: 'list' }, [
    createElement('li', { class: 'item' }, '111'),
    createElement('li', { class: 'item' }, '222'),
    createElement('li', { class: 'item' }, '333'),
])
```
