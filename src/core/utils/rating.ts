export const Rating = {
	D: 0,
	C: 1,
	B: 2,
	A: 3,
	AA: 4,
	AAA: 5,
	AAAA: 6,
	AAAAA: 7,
}

export type ERating = keyof typeof Rating