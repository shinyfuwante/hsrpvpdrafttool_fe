import { useParams } from "solid-start"
import MainApp from "~/components/MainApp/MainApp"
export default function GamePage() {
    const {game_id} = useParams() 
    return (
        <div>
            <p>game_id is {game_id}</p>
            <MainApp/>
        </div>
    )
}