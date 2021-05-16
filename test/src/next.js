import test from 'ava';

import {table} from './_fixtures.js';

const isNext = (t, table, input) => {
	if (input === '') {
		t.deepEqual(table, [-1]);
		return;
	}

	// TODO this test is not complete

	t.is(table[0], -1);
	t.not(table[input.length], -1);
	for (let j = 1; j <= input.length; ++j) {
		const i = table[j];
		// TODO test when i === -1
		if (i !== -1) {
			// Prefix and suffix match
			t.true(input.slice(0, i) === input.slice(j - i, j));
			// Next character does not match
			t.true(j === input.length || input[i] !== input[j]);
			// A longer proper prefix/suffix pair does not match
			// TODO More possibilities need to be checked
			t.true(
				i + 1 === j ||
					input.slice(0, i + 1) !== input.slice(j - (i + 1), j) ||
					i + 2 === j ||
					j === input.length ||
					input[i + 1] === input[j],
			);
		}
	}
};

const macro = (t, input, expected) => {
	const next = table(input);
	t.deepEqual(next, expected);
	isNext(t, next, input);
};

macro.title = (title, input, expected) =>
	title ?? `next(${input}) is ${JSON.stringify(expected)}`;

const auto = (t, input) => {
	const next = table(input);
	isNext(t, next, input);
};

auto.title = (title, input) => title ?? `isNext(next(${input}))`;

test(macro, '', [-1]);
test(macro, 'z', [-1, 0]);
test(macro, 'abcd', [-1, 0, 0, 0, 0]);
test(macro, 'aaaa', [-1, -1, -1, -1, 3]);
test(macro, 'axax', [-1, 0, -1, 0, 2]);
test(macro, 'axxa', [-1, 0, 0, -1, 1]);
test(macro, 'aaaab', [-1, -1, -1, -1, 3, 0]);
test(macro, 'abracadabra', [-1, 0, 0, -1, 1, -1, 1, -1, 0, 0, -1, 4]);
test(
	macro,
	'abaababaabaababaababa',
	[-1, 0, -1, 1, 0, -1, 3, -1, 1, 0, -1, 6, 0, -1, 3, -1, 1, 0, -1, 11, -1, 8],
);

test(auto, 'eifoiwhfeldkasjflkdshfldshflkkdadkkkkkkkkkkkkasjfdljfdleifo');
test(auto, 'aaaaaaaaaaaabbbbbbbbbbaaaaaaaaabbbbbbbb');
