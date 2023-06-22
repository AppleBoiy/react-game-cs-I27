import { experimental_extendTheme as extendTheme } from '@mui/material/styles'
import { deepPurple } from '@mui/material/colors'

const theme = extendTheme({
    colorSchemes: {
        light: {
            palette: {
                primary: {
                    main: deepPurple[800],
                },
            },
        },
        dark: {
            palette: {
                primary: {
                    main: deepPurple[100],
                },
            },
        },
    },
})

export default theme
