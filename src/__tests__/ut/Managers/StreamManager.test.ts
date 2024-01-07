import { describe, it, expect } from 'vitest'
import { StreamManager } from '../../../libs/Managers/StreamManager';


describe('StreamManager', () => {
  it('Write Stream', () => {
    const m = new StreamManager();
    m.writeStream('abcdefg123');
    expect(m.stream).toEqual('abcdefg123');
    expect(m.parsedStream).toEqual('');
    expect(m.parsingStream).toEqual('abcdefg123');
    m.writeStream('111');
    expect(m.stream).toEqual('abcdefg123111');
    expect(m.parsedStream).toEqual('');
    expect(m.parsingStream).toEqual('abcdefg123111');
  });

  it('Parse Stream', () => {
    const m = new StreamManager();
    m.writeStream('abcdefg123111');
    m.appendParsed('abcde');
    expect(m.parsedStream).toEqual('abcde');
    expect(m.parsingStream).toEqual('fg123111');
    m.appendParsed('f');
    expect(m.parsingStream).toEqual('g123111');

    expect(() => m.appendParsed('123')).toThrow(`Error: 123 was not part of the stream`);
  });
});
