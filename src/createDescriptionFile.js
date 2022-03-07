import { promises as fs } from 'fs';
import xmlescape from 'xml-escape';

export const createDescriptionFile = (
  outputFile,
  { shortName, description, siteUrl, searchTemplate, searchForm, image }
) => {
  const components = [
    `<OpenSearchDescription xmlns="http://a9.com/-/spec/opensearch/1.1/" xmlns:moz="http://www.mozilla.org/2006/browser/search/">`,
    `<ShortName>${xmlescape(shortName)}</ShortName>`,
    `<Description>${xmlescape(description)}</Description>`,
    `<InputEncoding>UTF-8</InputEncoding>`,
    `<Url type="text/html" method="get" template="${xmlescape(
      siteUrl + searchTemplate
    )}"/>`,
    image
      ? `<Image width="${image.width}" height="${
          image.height
        }" type="image/x-icon">${xmlescape(siteUrl + image.src)}</Image>`
      : '',
    `<moz:SearchForm>${xmlescape(siteUrl + searchForm)}</moz:SearchForm>`,
    `</OpenSearchDescription>`,
  ].filter((elem) => !!elem);

  fs.writeFile(outputFile, components.join('\n'));
};
