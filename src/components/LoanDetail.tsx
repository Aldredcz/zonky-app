import React from 'react'
import {observer} from 'mobx-react'
import {Dialog} from 'material-ui'

import {TLoan} from 'core/stores/loans'

type TProps = {
	loan: TLoan,
	onClose: (...args: any[]) => void,
}

function getFirst20Words (value: string): string {
	return value.split(' ').slice(0, 20).join(' ')
}

export default observer((props: TProps) => {
	return (
		<Dialog
			open={true}
			onRequestClose={props.onClose}
		>
			<h4>{props.loan.name}</h4>
				<pre>
					{JSON.stringify(props.loan, null, 2)}
				</pre>
		</Dialog>
	)
})