import { RouterProvider, createBrowserRouter } from 'react-router-dom'

import MatLayout from './MatLayout'
import ScorePage from './ScorePage/ScorePage'
import MyGame from '../game/MyGame'

const router = createBrowserRouter([
    {
        path: '/',
        element: <MatLayout />,
        children: [
            {
                path: '/',

                element: <MyGame />,
            },
            {
                path: 'scores',
                element: <ScorePage />,
            },
        ],
    },
])

function InitRoute() {
    return <RouterProvider router={router} />
}

export default InitRoute
