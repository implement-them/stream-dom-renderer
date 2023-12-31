export const appendTextCases: Array<{ input: string; innerHTML: string, textContent: string }> = [
  // 1 - normal string
  {
    input: 'Hello World',
    innerHTML: 'Hello World',
    textContent: 'Hello World',
  },
  // 2 - special characters
  {
    input: '\nHello World',
    innerHTML: '\nHello World',
    textContent: '\nHello World',
  },
  {
    input: '<>&lt;&gt;',
    innerHTML: '&lt;&gt;&amp;lt;&amp;gt;',
    textContent: '<>&lt;&gt;',
  },
  {
    input: '<div></div>',
    innerHTML: '&lt;div&gt;&lt;/div&gt;',
    textContent: '<div></div>',
  },
  {
    input: '  ',
    innerHTML: '  ',
    textContent: '  ',
  },
  {
    input: '&nbsp;&nbsp;',
    innerHTML: '&amp;nbsp;&amp;nbsp;',
    textContent: '&nbsp;&nbsp;',
  },
  {
    input: '"&quot;',
    innerHTML: '"&amp;quot;',
    textContent: '"&quot;',
  },
  {
    input: '©&copy;',
    innerHTML: '©&amp;copy;',
    textContent: '©&copy;',
  },
];

