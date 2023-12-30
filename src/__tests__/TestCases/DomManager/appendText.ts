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
    input: '<&lt;>&gt;',
    innerHTML: '&lt;&lt;&gt;&gt;',
    textContent: '<<>>',
  },
  {
    input: '  ',
    innerHTML: '  ',
    textContent: '  ',
  },
  {
    input: '&nbsp;&nbsp;',
    innerHTML: '&nbsp;&nbsp;',
    textContent: '  ', // '%C2%A0%C2%A0'
  },
  {
    input: '"&quot;',
    innerHTML: '""',
    textContent: '""',
  },
  {
    input: '©&copy;',
    innerHTML: '©©',
    textContent: '©©',
  },
];

