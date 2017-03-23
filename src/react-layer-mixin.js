import { DOM as E } from 'react'
import {
  unstable_renderSubtreeIntoContainer as renderSubtreeIntoContainer, // eslint-disable-line camelcase
  unmountComponentAtNode,
} from 'react-dom'

import { noop } from './utils'
import { isClient } from './platform'


const createElement = (x) =>
  isClient ? document.createElement(x) : noop

const bodyAppendElement = (x, parent = document.body) =>
  isClient ? parent.appendChild(x) : noop

const bodyRemoveElement = (x, parent = document.body) =>
  isClient ? parent.removeChild(x) : noop



const ReactLayerMixin = () => ({
  componentWillMount () {
    this.targetBounds = null
    /* Create a DOM node for mounting the React Layer. */
    this.layerContainerNode = createElement(`div`)
  },
  componentDidMount () {
    /* Mount the mount. */
    bodyAppendElement(this.layerContainerNode, this.props.parent)
    this._layerRender()
  },
  componentDidUpdate () {
    this._layerRender()
  },
  componentWillUnmount () {
    this._layerUnrender()
    /* Unmount the mount. */
    bodyRemoveElement(this.layerContainerNode, this.props.parent)
  },
  _layerRender () {
    const layerReactEl = this.renderLayer()
    if (!layerReactEl) {
      this.layerReactComponent = null
      renderSubtreeIntoContainer(this, E.noscript(), this.layerContainerNode)
    } else {
      this.layerReactComponent = renderSubtreeIntoContainer(this, layerReactEl, this.layerContainerNode)
    }
  },
  _layerUnrender () {
    if (this.layerWillUnmount) this.layerWillUnmount(this.layerContainerNode)
    unmountComponentAtNode(this.layerContainerNode)
  },
  // renderLayer() {
  //   Must be implemented by consumer.
  // }
})



export default ReactLayerMixin
