export type CharacterDetails = {
    id: string;
    point_costs: number[];
    rarity: number;
};
export type CharJsonType = {
    [key: string]: CharacterDetails;
}