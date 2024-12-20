import React, { Component } from 'react'

class PinterestWidget extends Component {
  componentDidMount() {
    if (!window.doBuild) {
      this.preloadWidgetScript();
    } else {
      window.doBuild();
    }
  }
  
  preloadWidgetScript = () => {
    const script = document.createElement('script');
    script.async = true;
    script.dataset.pinBuild = 'doBuild';
    script.src = '//assets.pinterest.com/js/pinit.js';
    document.body.appendChild(script);
  }
  render() {
    const { url,size } = this.props

    return (
      <a data-pin-do="embedPin" data-pin-width={size} data-pin-build="doBuild" href={url}>
        {url}
      </a>
    )
  }
}

export default PinterestWidget