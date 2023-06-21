// import { experimental_extendTheme as extendTheme } from '@mui/material/styles'
// import { deepPurple } from '@mui/material/colors'
// new code add dark theme
import { ThemeProvider, createTheme } from '@mui/material/styles'
import CssBaseline from '@mui/material/CssBaseline'

const darkTheme = createTheme({
    palette: {
        mode: 'dark',
    },
})

function App() {
    return (
        <ThemeProvider theme={darkTheme}>
            <CssBaseline />
            <main>This app is using the dark mode</main>
        </ThemeProvider>
    )
}

export default App

// const theme = extendTheme({
//     colorSchemes: {
//         light: {
//             palette: {
//                 primary: {
//                     main: deepPurple[800],
//                 },
//             },
//         },
//         dark: {
//             palette: {
//                 primary: {
//                     main: deepPurple[100],
//                 },
//             },
//         },
//     },
// })

// export default theme
