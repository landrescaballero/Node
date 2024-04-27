import { getPokemonById } from "../../src/js-foundation/06-promises";

describe('js-foundation/06-promises.ts', () => {
    test('getPokemonById should return a pokemon with name pikachu', async () => {
        const pokemonId = 384;
        const pokemonName = await getPokemonById(pokemonId);

        expect(pokemonName).toBe('rayquaza');
    });

    test('getPokemonById should throw an error if pokemon does not exist', async () => {
        const id = 10000;
        try {
            await getPokemonById(id);
            expect(true).toBe(false);
        } catch (error) {
            expect(error).toBe(`Pokemon not found with id ${id}`);
        }
    });
});