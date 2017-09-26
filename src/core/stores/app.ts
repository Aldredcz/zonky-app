import {observable, action, computed} from 'mobx'
import loansStore, {TLoan, TLoanFromApi} from './loans'
import {ESortBy, ESortOrder} from 'core/enums'
import {Rating, ERating} from 'core/utils/rating'

const FETCH_INTERVAL = 5 * 60 * 1000 // 5 minutes

export class AppStore {
	constructor () {
		this.loadData()
		setInterval(this.loadData.bind(this), FETCH_INTERVAL)
	}

	@observable loansByIds: TLoan['id'][] = []
	@observable firstTimeLoad: boolean = false
	@observable loading: boolean = false
	@observable loanDetailId: TLoan['id'] | null = null // null => list of all loans
	@observable sortBy: ESortBy | null = null
	@observable sortOrder: ESortOrder = ESortOrder.DESC

	@action loadData = () => {
		this.loading = true
		fetch('/zonkyapi/loans/marketplace')
			.then((response) => response.json())
			.then((loans: TLoanFromApi[]) => {
				loans.forEach((loanFromApi) => {
					const loan: TLoan = {
						...loanFromApi,
						datePublished: new Date(loanFromApi.datePublished),
						deadline: new Date(loanFromApi.deadline),
						story: loanFromApi.story || '',
					}
					loansStore.setLoan(loan.id, loan)
				})
				this.loansByIds = loans.map((loan) => loan.id)
				this.loading = false
				this.firstTimeLoad = true
			})
	}
	@action setSortOrder (order: ESortOrder) {
		this.sortOrder = order
	}
	@action setSortBy (sortBy: ESortBy) {
		this.sortBy = sortBy
		this.setSortOrder(ESortOrder.DESC)
	}
	@action showLoanDetail (loanId: TLoan['id'] | false) {
		if (loanId === false) {
			this.loanDetailId = null
		} else {
			this.loanDetailId = loanId
		}
	}

	@computed get loans (): TLoan[] {
		return (this.loansByIds
			.map((id) => loansStore.getLoan(id))
			.filter(Boolean) as TLoan[]) // nulls are filtered out
			.sort((a, b) => {
				if (!this.sortBy) {
					return -1
				} else {
					const sign = this.sortOrder === ESortOrder.ASC ? 1 : -1
					switch (this.sortBy) {
						case ESortBy.AMOUNT:
							return sign * (a.amount - b.amount)
						case ESortBy.RATING:
							return sign * (Rating[a.rating] - Rating[b.rating])
						case ESortBy.TERM_IN_MONTHS:
							return sign * (a.termInMonths - b.termInMonths)
						case ESortBy.DEADLINE:
							return sign * (a.deadline.getTime() - b.deadline.getTime())
						default:
							return 0
					}
				}
			})
	}

	@computed get selectedLoan (): TLoan | null {
		return this.loanDetailId ? loansStore.getLoan(this.loanDetailId) : null
	}
}

export default new AppStore()