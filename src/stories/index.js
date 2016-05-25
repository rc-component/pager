import React from 'react';
import { storiesOf, action } from '@kadira/storybook';
import Pager from '../index';

storiesOf('Pager', module)
  .add('basic pager', () => {
    return (
      <Pager
        curpage={2}
        perpage={20}
        total={300}
        limit={10}
        onChange={(i)=>{
          console.log(i)
        }}
      />
  )})
  .add('dynamic pager', () => {
    let Foo = React.createClass({
      getInitialState: function() {
        return {
          curpage: 1,
          perpage: 10,
          total: 100
        }
      },
      setCurpage: function (e) {
        this.setState({
          curpage: Number(e.target.value)
        })
      },
      setPerpage: function (e) {
        this.setState({
          perpage: Number(e.target.value)
        })
      },
      setTotal: function (e) {
        this.setState({
          total: Number(e.target.value)
        })
      },
      onChange: function (page) {
        this.setState({
          curpage: page
        })
      },
      render: function () {
        let state = this.state
        return (
          <div>
            <div>curpage <input type="number" value={state.curpage} onChange={this.setCurpage}/> </div>
            <div>perpage <input type="number" value={state.perpage} onChange={this.setPerpage}/> </div>
            <div>total <input type="number" value={state.total} onChange={this.setTotal}/> </div>
          <Pager
            curpage={state.curpage}
            perpage={state.perpage}
            total={state.total}
            limit={state.limit}
            onChange={this.onChange}
          />
          </div>
        )
      }
    })
    return <Foo />
  })
