import React from 'react';
import { withPrefix as fallbackWithPrefix, withAssetPrefix } from 'gatsby';
import { defaultOptions } from './config';

// TODO: remove for v3
const withPrefix = withAssetPrefix || fallbackWithPrefix;

exports.onRenderBody = ({ setHeadComponents }, pluginOptions) => {
  let { output, createLinkInHead } = { ...defaultOptions, ...pluginOptions };

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
      href={withPrefix(output)}
    />,
  ]);
};
