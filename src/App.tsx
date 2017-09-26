import React from 'react'
import {inject, observer} from 'mobx-react'
import {AppStore} from 'core/stores/app'
import {List} from 'material-ui'

import LoanPreview from 'components/LoanPreview'
import LoanDetail from 'components/LoanDetail'

@inject('appStore') @observer
export default class App extends React.Component<{appStore: AppStore}> {
	render () {
		const {appStore} = this.props
		return (
			<div>
				<List>
					{appStore.loans.map((loan) => (
						<LoanPreview
							loan={loan}
							key={loan.id}
							onClick={() => appStore.showLoanDetail(loan.id)}
						/>
					))}
				</List>
				{appStore.selectedLoan !== null && (
					<LoanDetail
						loan={appStore.selectedLoan}
						onClose={() => appStore.showLoanDetail(false)}
					/>
				)}
			</div>
		)
	}
}