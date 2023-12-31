import { Component } from "solid-js";

interface CharacterCardProps {
    isPick: boolean;
    character: string;
    eidolon: string;
    lightcone: string;
    superimposition: string;
}

const CharacterCard: Component<CharacterCardProps> = ({ isPick, character, eidolon = 0, lightcone, superimposition = 0 }) => {
    let characterCard = <div></div>;
    if (isPick) { // it's a pick
        characterCard = (
            <div>
                <div>{character}</div>
                <div>{eidolon}</div>
                <div>{lightcone}</div>
                <div>{superimposition}</div>
            </div>
        );
    } else { // it's a ban
        characterCard = (
            <div>
                <div>{character}</div>
            </div>
        );
    }
    return <div></div>;
};