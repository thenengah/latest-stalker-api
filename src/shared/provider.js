import React from 'react'
import { Provider } from 'react-redux'
import { StaticRouter } from 'react-router-dom'
import { renderToStaticMarkup } from 'react-dom/server'

export default (url, store, Component, context={}) => {
  const state = store.getState()
  return renderToStaticMarkup(
    <Provider store={store} context={context}>
      <StaticRouter location={url} context={state}>
        <div id='root'>
          <Component />
        </div>
      </StaticRouter>
    </Provider>
  )
}
