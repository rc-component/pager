# Pager

Pager component for [react](https://facebook.github.io/react/).

Build with [webpack](https://webpack.github.io/) and [CSS Modules](https://github.com/css-modules/css-modules)

[Story book](https://rc-component.github.io/pager/)

## Install

    npm i rc-page

## Usage

```
<Pager curpage={2} perpage={20} total={300} onChange={this.onShow.bind(this)} />
```

## Props

name    | type   | default   | description
--------| ------ | ----------| ------------
*curpage| number |           | Page to show
*perpage| number |           | Item count perpage
*total  | number |           | Total number of item
 limit  | number | Infinity  | Limit page link number
*onChange| func  |           | Page change handler

# License

MIT
