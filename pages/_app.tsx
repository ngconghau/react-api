import type { AppProps } from 'next/app'
import MainLayout from '../src/components/layout/MainLayout'
import '../styles/style.scss'
import { Provider } from 'react-redux'
import  store  from '../src/redux/store'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <MainLayout>
        <Component {...pageProps} />
      </MainLayout>
    </Provider>
  )
}

export default MyApp
