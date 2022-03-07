import { createDescriptionFile } from './createDescriptionFile';
import { promises } from 'fs';

const fileName = 'test.xml';

const fields = {
  shortName: 'Shrt',
  description: 'Search engine',
  searchTemplate: '/test{searchParams}',
  searchForm: '/search',
  siteUrl: 'http://example.com',
};

const expectedXML = `<OpenSearchDescription xmlns="http://a9.com/-/spec/opensearch/1.1/" xmlns:moz="http://www.mozilla.org/2006/browser/search/">
<ShortName>Shrt</ShortName>
<Description>Search engine</Description>
<InputEncoding>UTF-8</InputEncoding>
<Url type="text/html" method="get" template="http://example.com/test{searchParams}"/>
<moz:SearchForm>http://example.com/search</moz:SearchForm>
</OpenSearchDescription>`;

describe('createDescriptionFile', () => {
  it('produces expected xml file', () => {
    const writeMock = jest.fn();
    jest.spyOn(promises, 'writeFile').mockImplementation(writeMock);
    createDescriptionFile(fileName, fields);
    expect(writeMock).toHaveBeenCalledTimes(1);
    expect(writeMock).toHaveBeenCalledWith(fileName, expectedXML);
  });
  it('populates image if specified', () => {
    const writeMock = jest.fn();
    jest.spyOn(promises, 'writeFile').mockImplementation(writeMock);
    createDescriptionFile(fileName, {
      ...fields,
      image: { width: 16, height: 16, src: '/favicon.ico' },
    });
    expect(writeMock).toHaveBeenCalledTimes(1);
    expect(writeMock).toHaveBeenCalledWith(
      fileName,
      expect.stringContaining(
        '<Image width="16" height="16" type="image/x-icon">http://example.com/favicon.ico</Image>'
      )
    );
  });
});
