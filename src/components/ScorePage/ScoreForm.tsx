import { Button, Stack, TextField } from '@mui/material'
import { useState } from 'react'

import { ProjectName } from '../../App'
import { IScoreRequest, addAppScore } from '../../api/scoreApi'

function ScoreForm({ onSubmitSuccess }: { onSubmitSuccess: () => void }) {
    const [loading, setLoading] = useState<boolean>(false)

    const [requestBody, setRequestBody] = useState<IScoreRequest>({
        name: '',
        score: 0,
        projectName: ProjectName,
    })

    const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        console.log('event.target.name: ', event.target.value)
        setRequestBody((prev) => {
            return {
                ...prev,
                [event.target.name]: event.target.value,
            }
        })
    }

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        try {
            setLoading(true)
            await addAppScore(requestBody)
            onSubmitSuccess()
        } catch (err) {
        } finally {
            setLoading(false)
        }
    }

    return (
        <form onSubmit={handleSubmit}>
            <Stack spacing={2}>
                <TextField
                    label="Project Name"
                    name="projectName"
                    onChange={onChange}
                    value={ProjectName}
                    disabled
                    InputLabelProps={{ shrink: true }}
                />

                <TextField label="Score" name="score" onChange={onChange} />

                <TextField
                    label="Player Name"
                    name="name"
                    onChange={onChange}
                />
            </Stack>

            <Button
                type="submit"
                variant="contained"
                disabled={loading}
                style={{
                    marginTop: '16px',
                }}
            >
                Submit
            </Button>
        </form>
    )
}

export default ScoreForm
