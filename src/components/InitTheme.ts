import { experimental_extendTheme as extendTheme } from '@mui/material/styles'
import { deepPurple } from '@mui/material/colors'

const theme = extendTheme({
    colorSchemes: {
        light: {
            palette: {
                primary: {
                    main: '#362706',
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
