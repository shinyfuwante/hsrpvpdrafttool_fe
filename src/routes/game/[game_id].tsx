import { useParams } from "solid-start";
import { onMount } from "solid-js";
import { ruleSet, sideSelector, handleMsg, CharacterPick, CharacterBan, ownTeam, MessageEnum } from "~/game/game_logic";
import { w3cwebsocket as WebSocket } from "websocket";
import MainApp from "~/components/MainApp/MainApp"
export default function GamePage() {
    const params = useParams();
  const game_id = params.game_id;
  const ruleSetString = ruleSet();
  const backendUrl = `ws://localhost:8000/ws/game/${game_id}?ruleSet=${ruleSetString}`;
  const client = new WebSocket(backendUrl);
  const LoadingMenu = () => {
    return (
      <div>
        Send this link to your friend to join the game:
        <a href={window.location.href}>{window.location.href}</a>
      </div>
    );
  }
  const handlePick = (character: CharacterPick) => {
    const message = {
      'type': 'select_char',
      'character': character,
      'team': ownTeam(),
    }
    console.log('made pick');
    console.log(message);
    // client.send(JSON.stringify(message));
    // need to make a character object for picks, with optional fields for bans? 
    // not sure if that would make sense for optional fields or just two different types, one pick one ban (latter sounds better bc of diff message type)

  }
  const handleBan = (character: CharacterBan) => {
    const message = {
      'type': MessageEnum.BAN,
      'character': character,
      'team': ownTeam(),
    }
    client.send(JSON.stringify(message));

  }
  const handleSigEidChange = (character: CharacterPick) => {
    const message = {
        'type': 'select_char',
        'character': character,
        'team': ownTeam(),
    }
  }
  const SideSelection = () => {
    // returns a modal with a button to select side, which will send a message to the backend to select side
    const sendSideMessage = (side: string) => {
      const message = {
      'type': 'side_select',
      'side': side,
      }
      client.send(JSON.stringify(message));
    }
    return (
      // if side selector, show buttons, else show a message that we're waiting for the other player
      <div>
        {sideSelector() && (
          <div>
            <button onClick={() => sendSideMessage("blue")}>Blue Team</button>
            <button onClick={() => sendSideMessage("red")}>Red Team</button>
          </div>
        )}
        {!sideSelector() && (
          <div>
            Waiting for other player to select side...
          </div>
        )}
      </div>
    )
  }
  onMount(async () => {
    client.onopen = () => {
      console.log("WebSocket Client Connected");
    };
    client.onmessage = (message: any) => {
      handleMsg(message.data);
    };
  });
    return (
        <div>
            <MainApp LoadingMenu={LoadingMenu} SideSelection={SideSelection} HandleBan={handleBan} HandlePick={handlePick} HandleSigEid={handleSigEidChange}/>
        </div>
    )
}