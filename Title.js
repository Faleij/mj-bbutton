
import React, { Component } from 'react'
import _ from 'lodash'
import {
  elements,
  registerElement,
} from 'mjml'

var MJMLColumnElement = require('mjml').MJMLColumnElement.default


/*
 * Wrap your dependencies here.
 */
const {
  text: MjText,
} = elements;

const NAME = 'title'

@MJMLColumnElement({
  tagName: 'mj-title',
  content: ' ',

  /*
   * These are your default css attributes
   */
  attributes: {
    'color': '#424242',
    'font-family': 'Helvetica',
    'margin-top': '10px'
  }
})
class Title extends Component {

  /*
   * Build your styling here
   */
  getStyles() {
    const { mjAttribute, color } = this.props

    return _.merge({}, this.constructor.baseStyles, {
      text: {
      /*
       * Get the color attribute
       * Example: <mj-title color="blue">content</mj-title>
       */
        color: mjAttribute('color')
      }
    })
  }

  render() {

    const css = this.getStyles(),
          content = 'Hello World!'

    return (
      <span style={ css }>
        { content }
      </span>
    )
  }
}

registerElement('title', Title)
export default Title
