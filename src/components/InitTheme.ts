import { experimental_extendTheme as extendTheme } from '@mui/material/styles'
import { deepPurple } from '@mui/material/colors'

const theme = extendTheme({
    colorSchemes: {
        light: {
            palette: {
                primary: {
                    main: deepPurple[600],
                },
            },
        },
        dark: {
            palette: {
                primary: {
                    main: deepPurple[400],
                },
            },
        },
    },
})

export default theme
