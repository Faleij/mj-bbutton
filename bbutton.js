import React, { Component } from 'react'
import ReactDomServer from 'react-dom/server'
import _ from 'lodash'
import { MJMLColumnElement, registerElement } from 'mjml'


@MJMLColumnElement({
  tagName: 'mj-bbutton',
  content: '',
  attributes: {
    'href': '',
    'width': '200px',
    'height': '40px',
    'v-text-anchor': 'middle',
    'background-image-url': undefined,
    'background-color': '#414141',
    'border-radius': '0px',
    'border-color': undefined,
    'color': '#ffffff',
    'font-family': 'sans-serif',
    'font-size': '13px',
    'font-weight': 'bold',
    'text-align': 'center',
    'text-decoration': 'none'
  }
})
class BButton extends Component {
  getStyles() {
    const {
      mjAttribute
    } = this.props

    return _.merge({}, this.constructor.baseStyles, {
      msov: {
        width: mjAttribute('width'),
        height: mjAttribute('height'),
        vTextAnchor: mjAttribute('v-text-anchor')
      },
      a: {
        color: mjAttribute('color'),
        display: 'inline-block',
        fontFamily: mjAttribute('font-family'),
        fontSize: mjAttribute('font-size'),
        fontWeight: mjAttribute('font-weight'),
        lineHeight: mjAttribute('height'),
        textAlign: mjAttribute('text-align'),
        textDecoration: mjAttribute('text-decoration'),
        width: mjAttribute('width'),
        WebkitTextSizeAdjust: 'none',
        borderRadius: mjAttribute('border-radius')
      },
      image: {
        center: {
          color: mjAttribute('color'),
          fontFamily: mjAttribute('font-family'),
          fontSize: mjAttribute('font-size'),
          fontWeight: mjAttribute('font-weight')
        },
        a: {
          msoHide: 'all'
        }
      }
    });
  }

  static parseCSSUnit(str) {
    return parseFloat(str.replace(/[^-\d\.]/g, ''));
  }

  renderAButton(styles) {
    const {
      mjContent,
      mjAttribute
    } = this.props

    return (
      <a
        href={mjAttribute('href')}
        target="_blank"
        style={styles}
        dangerouslySetInnerHTML = {{ __html: mjContent() }} />
      );
  }

  static renderStyle(obj) {
    return Object.keys(obj || {}).map(key => `${key.replace(/([A-Z])/g, "-$1").toLowerCase()}:${obj[key]}`).join(';')
    // alternative hackish way of rendering with cheerio and react: cheerio.load(ReactDomServer.renderToStaticMarkup(<div style={styles.msov}/>))('div').attr("style")
  }

  static renderOptions(opts) {
    return Object.keys(opts || {}).reduce((p, c) => p + (opts[c] != undefined ? ` ${c}="${opts[c]}"` : ''), '');
  }

  renderImageButton(elemtype, styles, opts) {
    const {
      mjContent,
      mjAttribute
    } = this.props

    return `
      <!--[if mso]>
      <${elemtype} ${BButton.renderOptions(opts)}
        style="${BButton.renderStyle(styles.msov)}">
          <v:fill type="tile" src="${mjAttribute('background-image-url')}" color="${mjAttribute('background-color')}"></v:fill>
          <w:anchorlock></w:anchorlock>
          <center style="${BButton.renderStyle(styles.image.center)}"">${mjContent()}</center>
      </${elemtype}>
      <![endif]-->
      ${React.renderToStaticMarkup(this.renderAButton(_.merge({}, styles.baseButtonStyle, styles.image.a)))}
      `;
  }

  renderButton(elemtype, styles, opts) {
    return `
      <!--[if mso]>
      <${elemtype} ${BButton.renderOptions(opts)}
        style="${BButton.renderStyle(styles.msov)}">
          <w:anchorlock></w:anchorlock>
          <center>
          <![endif]-->
            ${ReactDomServer.renderToStaticMarkup(this.renderAButton(styles.baseButtonStyle))}
            <!--[if mso]>
          </center>
        </${elemtype}>
      <![endif]-->
      `;
  }

  render() {
    const {
      mjAttribute
    } = this.props

    const styles = this.getStyles();

    const opts = {
      'xmlns:v': 'urn:schemas-microsoft-com:vml',
      'xmlns:w': 'urn:schemas-microsoft-com:office:word',
      href: mjAttribute('href')
    };

    const bgcss = {
      backgroundColor: mjAttribute('background-color')
    };

    if (mjAttribute('background-image-url')) {
      bgcss.backgroundImage = `url(${mjAttribute('background-image-url')})`;
      opts.fill = 't'
    } else {
      opts.fillcolor = mjAttribute('background-color')
    }

    const bordercss = {};

    if (mjAttribute('border-color')) {
      bordercss.border = `1px solid ${ mjAttribute('border-color')}`;
      opts.strokecolor = mjAttribute('border-color')
    } else {
      opts.stroke = 'f'
    }

    const borderRadius = BButton.parseCSSUnit(mjAttribute('border-radius'))
    const elemtype = borderRadius > 0 ? 'v:roundrect' : 'v:rect'

    opts.arcsize = borderRadius > 0 ? `${Math.ceil((borderRadius || 0) / BButton.parseCSSUnit(mjAttribute('height')) * 100)}%` : undefined;

    styles.baseButtonStyle = _.merge({}, bgcss, bordercss, styles.a)

    const html = mjAttribute('background-image-url') || mjAttribute('border-color') ? this.renderImageButton(elemtype, styles, opts) : this.renderButton(elemtype, styles, opts)

    return <div dangerouslySetInnerHTML = {{ __html: html }}/>
  }
}

registerElement('bbutton', BButton, {
  endingTag: true
})
export default BButton
