import { useParams } from "solid-start"
import DraftTool from "~/components/DraftTool/DraftTool"
export default function GamePage() {
    const {game_id} = useParams() 
    return (
        <div>
            <p>game_id is {game_id}</p>
            <DraftTool/>
        </div>
    )
}