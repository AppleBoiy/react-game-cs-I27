import {
    AppBar,
    Box,
    Button,
    Container,
    Toolbar,
    Typography,
} from '@mui/material'
import { Outlet, useNavigate } from 'react-router-dom'
import { ProjectName } from '../App'
function MatLayout() {
    const navigate = useNavigate()

    const gotoBoard = () => {
        navigate('/')
    }

    const goToScore = () => {
        navigate('/scores')
    }

    return (
        <>
            <Box sx={{ flexGrow: 1 }}>
                <AppBar position="static">
                    <Toolbar>
                        <Typography
                            variant="h6"
                            component="div"
                            sx={{ flexGrow: 1 }}
                        >
                            {ProjectName}
                        </Typography>

                        <Button color="inherit" onClick={gotoBoard}>
                            Game
                        </Button>

                        <Button color="inherit" onClick={goToScore}>
                            Scores
                        </Button>
                    </Toolbar>
                </AppBar>
            </Box>
            <Container
                sx={{
                    mt: 2,
                }}
            >
                <Outlet />
            </Container>
        </>
    )
}

export default MatLayout
