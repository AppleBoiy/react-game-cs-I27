import { RouterProvider, createBrowserRouter } from 'react-router-dom'

import BoardPage from './BoardPage'
import MatLayout from './MatLayout'
import ScorePage from './ScorePage/ScorePage'

const router = createBrowserRouter([
    {
        path: '/',
        element: <MatLayout />,
        children: [
            {
                path: '/',

                element: <BoardPage />,
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
