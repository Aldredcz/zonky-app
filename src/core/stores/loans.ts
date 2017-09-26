import {observable, action} from 'mobx'
import {ERating} from 'core/utils/rating'

export type TLoan = {
	id: number,
	url: string,
	name: string,
	story: string,
	purpose: string,
	photos: {
		name: string,
		url: string,
	}[],
	userId: number,
	nickName: string,
	termInMonths: number,
	interestRate: number,
	rating: ERating,
	amount: number,
	remainingInvestment: number,
	investmentRate: number,
	covered: boolean,
	datePublished: Date,
	published: boolean,
	deadline: Date,
	investmentsCount: number,
	questionsCount: number,
	region: string,
	mainIncomeType: string,
}

export type TLoanFromApi = TLoan & {
	datePublished: string,
	deadline: string,
	story: string | null,
}

class LoansStore {
	@observable loans: Map<TLoan['id'], TLoan> = new Map()
	getLoan  = (id: TLoan['id']): TLoan | null => this.loans.get(id) || null
	@action setLoan = (id: TLoan['id'], loan: TLoan) => this.loans.set(id, loan)
}

export default new LoansStore()