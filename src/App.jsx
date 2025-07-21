import './App.css'
import { ContextProvider } from './utils/provider'
import { BrowserRouter } from 'react-router-dom'
import { AppRoute } from './components/routes/app-routes'
import { ThemeContainer } from './utils/themeContext'
import { Layout } from './components/layout'

function App() {

  return (
    <>
      <ThemeContainer>
        <ContextProvider>
          <BrowserRouter>
            <Layout>
              <AppRoute />
            </Layout>
          </BrowserRouter>
        </ContextProvider>
      </ThemeContainer>
    </>
  )
}

export default App
