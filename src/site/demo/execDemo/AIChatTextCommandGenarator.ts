import { IDomCommand } from 'stream-dom-renderer';

export type IAIChatCommandAll = {
  'answer': {
    text: string;
  };
  'label': {
    text: string;
  };
  'reference': {
    text: string;
    reference: any;
  };
  'audio': {
    text?: string;
    audio: string;
    time?: {
      startTime: number;
      duration: number;
    };
  };
  'text': {
    text: string;
  };
  'break': null;
};

export type IAIChatCommandPayload<T extends keyof IAIChatCommandAll> = IAIChatCommandAll[T];

export type IAIChatCommand<T extends keyof IAIChatCommandAll>  = {
  type: T;
  payload: IAIChatCommandPayload<T>;
};

export const AIChatTextCommandGenerator = (input: IAIChatCommand<any>[]): IDomCommand[] => {
  const result: IDomCommand[] = [
    ['dom.reset', undefined],
  ];
  let beforeLast: keyof IAIChatCommandAll = 'break';
  let lastType: keyof IAIChatCommandAll = 'break';

  const contentWrapper = (ele) => {
    if (lastType === 'label') {
      result.push(
        ['dom.create_dom', { tag: 'div' }],
        ['dom.append_attribulte', {
          values: [['class', 'inline-content']],
        }],
      );
    }  else if (lastType === 'break' && beforeLast === 'label') {
      result.push(
        ['dom.create_dom', { tag: 'div' }],
        ['dom.append_attribulte', {
          values: [['class', 'segment-content']],
        }],
      );
    }
  };

  for (let i = 0; i < input.length; ++i) {
    const item = input[i];
    switch (item.type) {
      case 'answer': {
        result.push(
          ['dom.create_dom', { tag: 'div' }],
          ['dom.append_attribulte', {
            values: [['data-type', 'answer'], ['class', 'single-segment']],
          }],
          ['dom.create_dom', { tag: 'div' }],
          ['dom.append_attribulte', {
            values: [['data-type', 'answer'], ['class', 'single-segment']],
          }],
          ['dom.append_text', { text: item.payload.text }],
          ['dom.create_dom_finished', undefined],
        );
        break;
      }
      case 'label': {
        if (lastType) {
          result.push(
            ['dom.create_dom_finished', undefined],
            ['dom.create_dom_finished', undefined],
          );
        }
        result.push(
          ['dom.create_dom', { tag: 'div' }],
          ['dom.append_attribulte', {
            values: [['class', 'single-param']],
          }],
          ['dom.create_dom', { tag: 'div' }],
          ['dom.append_attribulte', {
            values: [['data-type', 'label'], ['class', 'single-segment']],
          }],
          ['dom.append_text', { text: item.payload.text }],
          ['dom.create_dom_finished', undefined],
        );
        break;
      }
      case 'reference': {
        contentWrapper(item);
        result.push(
          ['dom.create_dom', { tag: 'div' }],
          ['dom.append_attribulte', {
            values: [['data-type', 'reference'], ['class', 'single-segment']],
          }],
          ['dom.append_text', { text: item.payload.text }],
          ['dom.create_dom_finished', undefined],
        );
        break;
      }
      case 'audio': {
        contentWrapper(item);
        result.push(
          ['dom.create_dom', { tag: 'div' }],
          ['dom.append_attribulte', {
            values: [['data-type', 'audio'], ['class', 'single-segment']],
          }],
          ['dom.append_text', { text: item.payload.text }],
          ['dom.create_dom_finished', undefined],
        );
        break;
      }
      case 'text': {
        contentWrapper(item);
        result.push(
          ['dom.create_dom', { tag: 'div' }],
          ['dom.append_attribulte', {
            values: [['data-type', 'text'], ['class', 'single-segment']],
          }],
          ['dom.append_text', { text: item.payload.text }],
          ['dom.create_dom_finished', undefined],
        );
        break;
      }
      case 'break': {
        break;
      }
      default: break;
    }
    beforeLast = lastType;
    lastType = item.type;
  }
  return result;
};

export const inputList: IAIChatCommand<any>[] = [{
  type: 'answer',
  payload: {
    text: '答案是： XXX',
  },
}, {
  type: 'break',
  payload: null,
}, {
  type: 'label',
  payload: {
    text: '核心词',
  },
}, {
  type: 'reference',
  payload: {
    text: 'keyword-1',
    reference: { index: 1, length: 2 },
  },
}, {
  type: 'reference',
  payload: {
    text: 'keyword-2',
    reference: { index: 4, length: 5 },
  },
}, {
  type: 'break',
  payload: null,
}, {
  type: 'label',
  payload: {
    text: '同义替换',
  },
}, {
  type: 'break',
  payload: null,
}, {
  type: 'reference',
  payload: {
    text: 'keyword-1',
    reference: { index: 1, length: 2 },
  },
}, {
  type: 'text',
  payload: {
    text: '同义词1',
  },
}, {
  type: 'break',
  payload: null,
}, {
  type: 'reference',
  payload: {
    text: 'keyword-2',
    reference: { index: 2, length: 2 },
  },
}, {
  type: 'text',
  payload: {
    text: '同义词1',
  },
}, {
  type: 'break',
  payload: null,
}, {
  type: 'label',
  payload: {
    text: '混合内容-1',
  },
}, {
  type: 'break',
  payload: null,
}, {
  type: 'text',
  payload: {
    text: 'text 111 text 333'
  },
}, {
  type: 'reference',
  payload: {
    text: 'keyword-3',
    reference: { index: 3, length: 3 },
  },
}, {
  type: 'text',
  payload: {
    text: 'text 555 text 777 teext 2333 永和九年岁在癸丑暮春之初会于会稽山阴之兰亭'
  },
}, {
  type: 'break',
  payload: null,
}, {
  type: 'label',
  payload: {
    text: '混合内容-2',
  },
}, {
  type: 'break',
  payload: null,
}, {
  type: 'reference',
  payload: {
    text: 'keyword-4',
    reference: { index: 4, length: 4 },
  },
}, {
  type: 'text',
  payload: {
    text: '群贤毕至少长咸集引以为流觞曲水列坐其次'
  },
}, {
  type: 'reference',
  payload: {
    text: 'keyword-3',
    reference: { index: 3, length: 3 },
  },
}, {
  type: 'text',
  payload: {
    text: '落霞与孤鹜齐飞秋水共长天一色'
  },
}];
