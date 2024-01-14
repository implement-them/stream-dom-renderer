
import {unified} from 'unified';
import remarkParse from 'remark-parse';
import remarkHTML from 'remark-html';

export const parser = unified().use(remarkParse).use(remarkHTML);
