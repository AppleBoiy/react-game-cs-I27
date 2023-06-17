const SESSION_ID = '9EA18E08-AB5C-4BAD-8E31-045668BF3216'

const APIUrl =
    'https://mycos-react-training-2023.azurewebsites.net/api/appscore'

const headers = {
    Accept: '*/*',
    _SESSIONID: SESSION_ID,
    'Content-Type': 'application/json',
}

export interface IScoreRequest {
    id?: number
    projectName: string
    score: number
    name: string
}
export const addAppScore = async ({
    projectName,
    score,
    name,
}: IScoreRequest) => {
    try {
        const response = await fetch(APIUrl + '/AddAppScore', {
            method: 'POST',
            headers: headers,
            body: JSON.stringify({
                createdDate: new Date(),
                name: name,
                projectName: projectName,
                score: score,
                ip: 'string',
            }),
        })

        const data: IScoreRequest = await response.json()
        return data
    } catch (error) {
        console.error(error)
    }
}

export const getAllAppScores = async (projectName: string) => {
    try {
        const response = await fetch(
            `${APIUrl}/GetAllAppScore?projectName=${projectName}`,
            {
                method: 'GET',
                headers: {
                    Accept: '*/*',
                    _SESSIONID: SESSION_ID,
                    'Content-Type': 'application/json',
                },
            },
        )

        const data: IScoreRequest[] = await response.json()
        console.log(data)

        return data
    } catch (error) {
        console.error(error)
    }
}

export const deleteAppScore = async (scoreID: number) => {
    try {
        const response = await fetch(`${APIUrl}/DeleteAppScore/${scoreID}`, {
            method: 'DELETE',
            headers: headers,
        })

        if (!response.ok) {
            throw new Error('Error deleting AppScore')
        }

        console.log('AppScore deleted successfully')
    } catch (error) {
        console.error(error)
    }
}

export default {}
