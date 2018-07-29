import React from 'react'
import Autocomplete from 'react-autocomplete'
import { fakeCategorizedRequest } from './utils'


const renderMenu = (items, value) => {
  // console.log('items', items)
  return (
    <div className="menu">
      {value === '' ? (
        <div className="item">Type of the name of a United State</div>
      ) : items.length === 0 ? (
        <div className="item">No matches for {value}</div>
      ) : items}
    </div>
  )
}

class CustomMenu extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      value: '',
      unitedStates: [],
      loading: false
    }
    this.requestTimer = null
  }

  handleOnChange = (event, value) => {
    this.setState({ value, loading: true, unitedStates: [] })
    const newItems = fakeCategorizedRequest(value)
    this.setState({ unitedStates: newItems, loading: false })
  }

  handleOnSelect = (value, state) => {
    console.log('state', state)
    this.setState({ value, unitedStates: [state] })
  }

  render() {
    const { loading } = this.state
    return (
      <div>
        <h1>Custom Menu</h1>
        <p>
          While Autocomplete ships with a decent looking menu, you can control the
          look as well as the rendering of it. In this example we'll group the states
          into the region where they belong.
        </p>
        <label htmlFor="states-autocomplete">Choose a state from the US</label>
        <Autocomplete
          value={this.state.value}
          inputProps={{ id: 'states-autocomplete' }}
          items={this.state.unitedStates}
          getItemValue={(item) => item.name}
          onSelect={(value, state) => this.handleOnSelect(value, state) }
          onChange={(event, value) => this.handleOnChange(event, value)}
          renderItem={(item, isHighlighted) => (
            item.header ?
              <div
                className="item item-header"
                key={item.header}
              >{item.header}</div>
              : <div
                className={`item ${isHighlighted ? 'item-highlighted' : ''}`}
                key={item.abbr}
              >{item.name}</div>
          )}
          renderMenu={(items, value, loading) => renderMenu(items, value)}
          
          isItemSelectable={(item) => !item.header}
        />
      </div>
    )
  }
}

export default CustomMenu

// renderMenu={(items, value) => {
//   return (
//     <div className="menu">
//       {value === '' ? (
//         <div className="item">Type of the name of a United State</div>
//       ) : loading ? (
//         <div className="item">Loading...</div>
//       ) : items.length === 0 ? (
//         <div className="item">No matches for {value}</div>
//       ) : items}
//     </div>
//   )
// }
// }