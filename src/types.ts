export type CharacterDetails = {
    id: string;
    point_costs: number[];
    rarity: number;
    special?: boolean;
    code: string;
    nickname: string;
};
export type CharJsonType = {
    [key: string]: CharacterDetails;
}
export type LCDetails = {
    id: string;
    point_costs: number[];
    character?: string;
    rarity: number;
    free?: boolean;
    standard?: boolean;
};
export type LCJsonType = {
    [key: string]: LCDetails;
}