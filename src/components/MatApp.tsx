import { Experimental_CssVarsProvider as CssVarsProvider } from '@mui/material/styles'
import theme from './InitTheme'
import InitRoute from './InitRoute'

function MatApp() {
    return (
        <CssVarsProvider theme={theme}>
            <InitRoute />
        </CssVarsProvider>
    )
}

export default MatApp
