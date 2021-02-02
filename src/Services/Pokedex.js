const BASE_URL = "https://pokeapi.co/api/v2/";
const isValid = async response => {
    const contentType = response.headers.get("content-type");
    if (contentType && contentType.indexOf("application/json") !== -1) {
        return await response.json();
    } else {
        return false;
    }
}
const Get = async data => {
    let response = await fetch(`${BASE_URL}${data}`);
    let json = await isValid(response);
    if (json) return json;
}
/**
 * @typedef {Object} Pokemon
 * @property {String} name
 * @property {String} url
 * @property {String} type
 */
/**
 * @param {Type[]} types
 * @returns {Promise<Pokemon[]>}
 */
export const GetPokemons = (types = []) => {
    return new Promise(async (res, rej) => {
        try {
            const cTypes = types.sort((a, b) => a.name.localeCompare(b));
            const result = await Promise.all(cTypes.map(async t => {
                const type = await GetType(t.name);
                const pokemons = type.pokemon.map(p => ({ ...p.pokemon, type: t.name }));
                return pokemons;
            }));
            const pokemonList = result.flat();
            const response = pokemonList.filter((p, i) => pokemonList.findIndex(pc => pc.name === p.name) === i);
            res(response);
        } catch (e) {
            rej(e);
        }
    });
};
/**
 * @typedef {Object} Sprites
 * @property {String} front_default
 * @property {String} back_default
 */
/**
 * @typedef {Object} Description
 * @property {String} name
 */
/**
 * @typedef {Object} Stat
 * @property {String} name
 * @property {String} base_stat
 */
/**
 * @typedef {Object} FullPokemon
 * @property {Number} id
 * @property {String} name
 * @property {Number} weight
 * @property {Number} height
 * @property {Sprites} sprites
 * @property {Stat[]} stats
 * @property {Description[]} moves
 * @property {Description[]} types
 * @property {Description[]} abilities
 */
/**
 * @param {String} name
 * @returns {Promise<FullPokemon>}
 */
export const GetPokemon = name => {
    return new Promise(async (res, rej) => {
        try {
            const result = await Get(`pokemon/${name}`);
            /**@type {FullPokemon} */
            const pokemon = {
                id: result.id,
                name: result.name,
                weight: result.weight,
                height: result.height,
                sprites: result.sprites,
                stats: result.stats.map(s => ({ base_stat: s.base_stat, name: s.stat.name })),
                abilities: result.abilities.map(a => ({ name: a.ability.name })),
                moves: result.moves.map(m => ({ name: m.move.name })),
                types: result.types.map(t => ({ name: t.type.name }))
            }
            res(pokemon);
        } catch (e) {
            rej(e);
        }
    });
};
/**
 * @typedef {Object} Type
 * @property {String} name
 * @property {String} url
 */
/**
 * @returns {Promise<Type[]>}
 */
export const GetTypes = () => {
    return new Promise(async (res, rej) => {
        try {
            const result = await Get(`type`);
            res(result?.results);
        } catch (e) {
            rej(e);
        }
    });
};
/**
 * @typedef {Object} PokemonWrapper
 * @property {Pokemon} pokemon
 * @property {String} slot
 */
/**
/**
 * @typedef {Object} FullType
 * @property {PokemonWrapper[]} pokemon
 * @property {String} name
 */
/**
 * @param {String} type
 * @returns {Promise<FullType>}
 */
export const GetType = type => {
    return new Promise(async (res, rej) => {
        try {
            const result = await Get(`type/${type}`);
            res(result);
        } catch (e) {
            rej(e);
        }
    });
};
