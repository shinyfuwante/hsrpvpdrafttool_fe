import { useParams } from "solid-start"
export default function GamePage() {
    const {game_id} = useParams() 
    return (
        <div>
            game_id is {game_id}
        </div>
    )
}