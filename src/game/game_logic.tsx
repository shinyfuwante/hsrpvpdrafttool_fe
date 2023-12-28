
export const messageEnum = {
    INIT_GAME: 'init_game',
    GAME_READY: 'game_ready',
    GAME_START: 'game_start',
    GAME_STATE: 'game_state',
    SIDE_SELECT: 'side_select',
    SIDE_SELECT_WAITER: 'side_select_waiter',
    FRONT_END_MESSAGE: 'front_end_message',
    BAN: 'draft_ban',
    PICK: 'draft_pick',
};
export const handleMsg = (data: string) => {
    const msg = JSON.parse(data);
    switch (msg.message.message_type) {
        case messageEnum.GAME_READY:
         console.log('Game Ready');
         break;
    }
}