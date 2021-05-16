import {build} from '../../src/index.js';

const _table = (p, pi, pj) => {
	// eslint-disable-next-line unicorn/no-new-array
	const next = new Array(pj - pi + 1);
	build(p, pi, pj, next, 0);
	return next;
};

export const table = (input) => _table(input, 0, input.length);
