/**
 * Computes the failure function for input string.
 *
 * This is the "next[j]" table found in
 * "Fast pattern matching in strings" by Knuth, Morris, and Pratt,
 * although here indices are 0-based hence all indices and inputs are one less
 * than in that paper.
 *
 * NOTE The main loop is somewhat unrolled for faster execution. This was not
 * benchmarked.
 *
 * @param {ArrayLike} p
 * @param {number} pi
 * @param {number} pj
 * @param {number[]} t
 * @param {number} ti
 */
const build = (p, pi, pj, t, ti) => {
	t[ti] = -1;
	if (pi === pj) return;
	const p0 = pi;
	if (++pi === pj) {
		t[++ti] = 0;
		return;
	}

	const t0 = ti;
	t[++ti] = p[pi] === p[p0] ? -1 : 0;
	let m = 0;
	--pj;
	while (pi < pj) {
		while (p[pi] !== p[p0 + m]) {
			m = t[t0 + m];
			if (m === -1) break;
		}

		++m;
		t[++ti] = p[++pi] === p[p0 + m] ? t[t0 + m] : m;
	}

	while (p[pj] !== p[p0 + m]) {
		m = t[t0 + m];
		if (m === -1) break;
	}

	++m;
	t[++ti] = m;
};

export default build;
