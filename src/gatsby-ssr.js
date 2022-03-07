import React from 'react';
import { defaultOptions } from './config';

exports.onRenderBody = ({ setHeadComponents }, pluginOptions) => {
  let { output, createLinkInHead, shortName } = {
    ...defaultOptions,
    ...pluginOptions,
  };

  if (!createLinkInHead) {
    return;
  }

  if (output.charAt(0) !== `/`) {
    output = `/` + output;
  }

  setHeadComponents([
    <link
      key="gatsby-plugin-opensearch"
      rel="search"
      type="application/opensearchdescription+xml"
      title={shortName}
      href={output}
    />,
  ]);
};
