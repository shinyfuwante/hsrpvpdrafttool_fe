# starrailpb.dev frontend
https://starrailpb.dev/

This is the front end for the Star Rail Pick Ban project, which uses SolidJS as its framework. This app is dockerized and hosted on Railway. 

This front end serves as a tool for players who enjoy the community-made Player vs Player (PvP) game mode for Honkai: Star Rail, which is a single player gacha game. The goal of PvP is to clear a certain stage of content faster than the opposing team. This game mode introduces a drafting phase where players can pick and ban characters, as well as declare equipment or duplicates (Extra copies of a character to increase their strength). Some equipment is penalized in points, which will overall slow down their final score. 

This tool provides a way for players to easily conduct a game of PvP through screen sharing with something like Discord (using https://starrailpb.dev/solo/game) or creating a lobby which interfaces with the Django Channels back-end component, using Redis as a cache. 

SolidJS was picked as the framework because of my familiarity with React and helped to establish a performant front end. The multiplayer lobby form of the app connects to a websocket server and uses the pub-sub model. Any time a player makes a pick or ban, the back end receives it, stores the game state in the cache, and publishes the game state to both players. The front end handles the messages and populates the SolidJS signals (team picks, bans, character configurations) accordingly.

The screen share component focuses on the front end primarily, as there does not need to be client to client communication. A very similar format is followed, but lets one user control the draft, with picks and configurations being relayed through third party software like Discord. 

The back end component of this project can be found here: https://github.com/shinyfuwante/hsrpvpdrafttool_be


# Lessons Learned:
1) Although SolidJS has less support, the reactivity built into SolidJS seemed more intuitive to me than React. React uses a virtual DOM that may start to become cumbersome, whereas SolidJS's reactivity only updates certain DOM elements. This was a slight learning curve for me to handle, but SolidJS components are only rendered once and then cleaned up. This was a problem I ran into when I tried to update CharacterCard components, but quickly got over once I got used to SolidJS.

2) Learned a new (but familiar framework) and the patterns preached by the framework creators. This experience was good for me as learning how to use SolidJS semantics (for example, <Show> instead of conditional rendering) taught me that not all frameworks are exactly the same once optimized, but someone can be productive quickly given similar experience. 
