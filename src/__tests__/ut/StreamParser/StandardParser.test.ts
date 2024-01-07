
import { describe, test, expect, beforeEach } from 'vitest'
import { StandardParserInput } from '../../TestCases/ParserString/StandardInput';
import { StandardParser } from '../../../libs/StreamParser/StandardParser';

describe('Standard Parser', () => {
  test.each(StandardParserInput)('Standard Parse should parse [%input]', async ({ input, result }) => {
    const parser = new StandardParser();
    const r = parser.parse(input);
    expect(r).toEqual(result);
  });
});
