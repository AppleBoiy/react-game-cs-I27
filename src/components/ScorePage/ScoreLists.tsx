import {
    Avatar,
    IconButton,
    List,
    ListItem,
    ListItemAvatar,
    ListItemText,
} from '@mui/material'
import { IScoreRequest, deleteAppScore } from '../../api/scoreApi'
import ImageIcon from '@mui/icons-material/Image'
import DeleteIcon from '@mui/icons-material/Delete'

interface ScoreListsProps {
    scoreLists: IScoreRequest[]
    onDeleteSuccess: (deleteScoreID: number) => void
}
function ScoreLists({ scoreLists, onDeleteSuccess }: ScoreListsProps) {
    const onClickDelete = async (scoreID: number) => {
        try {
            await deleteAppScore(scoreID)
            onDeleteSuccess(scoreID)
        } catch (err) {}
    }

    return (
        <List dense>
            {scoreLists.map((score) => (
                <ListItem
                    key={score.id}
                    secondaryAction={
                        <IconButton
                            edge="end"
                            aria-label="delete"
                            onClick={() => onClickDelete(score.id!)}
                        >
                            <DeleteIcon />
                        </IconButton>
                    }
                >
                    <ListItemAvatar>
                        <Avatar>
                            <ImageIcon />
                        </Avatar>
                    </ListItemAvatar>
                    <ListItemText
                        primary={score.score + ' ' + score.name}
                        secondary={score.projectName}
                    />
                </ListItem>
            ))}
        </List>
    )
}

export default ScoreLists
