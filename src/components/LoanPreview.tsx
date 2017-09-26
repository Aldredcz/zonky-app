import React from 'react'
import {observer} from 'mobx-react'
import {ListItem, Avatar} from 'material-ui'

import {TLoan} from 'core/stores/loans'

type TProps = {
	loan: TLoan,
	onClick: (ev: any) => void,
}

function getFirst20Words (value: string): string {
	return value.split(' ').slice(0, 20).join(' ')
}

export default observer((props: TProps) => {
	let story = getFirst20Words(props.loan.story).substr(0, 200)
	if (story.length < props.loan.story.length) {
		story += '...'
	}

	return (
		<ListItem
			onClick={props.onClick}
			leftAvatar={<Avatar src={`https://api.zonky.cz/${props.loan.photos[0].url}`} />}
		>
			<h4 style={{margin: 0}}>
				<small>{props.loan.nickName}</small>{' | '}
				{props.loan.name}
				</h4>
			<p style={{marginBottom: 0}}>{story}</p>
		</ListItem>
	)
})