export const appendTextCases: Array<{ input: string; expect: string }> = [
  // 1 - normal string
  {
    input: 'Hello World',
    expect: 'Hello World',
  },
  // 2 - special characters
  {
    input: '\nHello World',
    expect: '\nHello World',
  },
  {
    input: '<&lt;>&gt;',
    expect: '&lt;&lt;&gt;&gt;',
  },
  {
    input: '  ',
    expect: '  ',
  },
  {
    input: '&nbsp;&nbsp;',
    expect: '&nbsp;&nbsp;',
  },
  {
    input: '"&quot;',
    expect: '""',
  },
  {
    input: '©&copy;',
    expect: '©©',
  },
];

