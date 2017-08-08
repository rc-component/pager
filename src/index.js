import React, { Component} from 'react'
import style from './style.css'
import cx from 'classnames'
import PropTypes from 'prop-types'

const SideLink = function (props) {
  let clz = cx(style.side, {
    [style.hide]: props.hide
  })
  return (
    <li className={clz}><a href="#" onClick={props.onClick}>{props.children}</a></li>
  )
}

const Link = function (props) {
  let clz = cx({
    [style.active]: props.active
  })
  return (
    <li className={clz}>
      <a href="#" onClick={props.onClick}>{props.children}</a>
    </li>
  )
}

const Dots = function () {
  return (
    <li className={style.dots}>...</li>
  )
}

export default class Pager extends Component {
  static defaultProps = {
    limit: Infinity,
    curpage: 1
  }
  static propTypes = {
    curpage: PropTypes.number.isRequired,
    perpage: PropTypes.number.isRequired,
    total: PropTypes.number.isRequired,
    limit: PropTypes.number,
    onChange: PropTypes.func.isRequired
  }
  constructor(props) {
    super(props)
    this.state = {
      curpage: props.curpage
    }
  }
  componentWillReceiveProps(props) {
    let count = Math.ceil(props.total/props.perpage)
    let curpage = props.curpage > count ? 1 : props.curpage
    this.setState({
      curpage: curpage
    })
  }
  prev(curr) {
    if (curr === 1) return
    this.active(this.state.curpage - 1)
  }
  next(curr, count) {
    if (curr === count) return
    this.active(this.state.curpage + 1)
  }
  getPageCount() {
    let props = this.props
    return Math.ceil(props.total/props.perpage)
  }
  getLinks (count) {
    let res = []
    let curpage = this.state.curpage
    let limit = this.props.limit
    if (curpage > limit - 2 && curpage < count -1) {
      limit = curpage + 2
    }
    for (let i = 1; i <= count; i++) {
      let active = curpage == i
      if (i === limit - 1) {
        res.push(<Dots key={i} />)
      } else if(i > limit - 1 && i < count - 1) {
        continue
      } else {
        res.push(<Link key={i} onClick={() => {this.active(i)}} active={active}>{i}</Link>)
      }
    }
    return res
  }
  active (i) {
    if (this.state.curpage == i) return
    this.setState({curpage: i})
    this.props.onChange(i)
  }
  render() {
    let props = this.props
    if (props.total == 0) {
      return null
    } else {
      let curr = this.state.curpage
      let count = this.getPageCount()
      let hidePrev = curr == 1
      let hideNext = curr == count
      let links = this.getLinks(count)
      return (
        <ul className={cx(style.pager, props.className)} style={props.style}>
          <SideLink hide={hidePrev} onClick={this.prev.bind(this, curr)}>&lsaquo;</SideLink>
            {links}
          <SideLink hide={hideNext} onClick={this.next.bind(this, curr, count)}>&rsaquo;</SideLink>
        </ul>
      )
    }
  }
}
