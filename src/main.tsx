import 'babel-polyfill'
import 'isomorphic-fetch'

import React from 'react'
import ReactDOM from 'react-dom'
import {AppContainer} from 'react-hot-loader'
import {Provider as MobxProvider} from 'mobx-react'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'

import appStore from 'core/stores/app'

import App from './App'

type TRender = (AppComponent: React.ComponentClass | React.SFC) => void

declare global {
	interface Window {
		appStore: any;
	}
}

window.appStore = appStore

const renderApp: TRender = (AppComponent) => {
	ReactDOM.render((
		<AppContainer>
			<MuiThemeProvider>
				<MobxProvider appStore={appStore}>
					<AppComponent />
				</MobxProvider>
			</MuiThemeProvider>
		</AppContainer>
	), document.getElementById('main'))
}


renderApp(App)

if (module && module.hot) {
	module.hot.accept('./App', () => {
		renderApp(App)
	})
}