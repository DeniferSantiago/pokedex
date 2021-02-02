import { Grid, makeStyles, Paper } from '@material-ui/core';
import React from 'react'
const useStyles = makeStyles((theme) => ({
    media: {
        height: 200,
        flex: 1
    }
}));
/**
 * @typedef {Object} PokemonInfoParams
 * @property {import('../Services/Pokedex').FullPokemon} pokemon
 */
/**
 * @param {PokemonInfoParams} param0 
 */
export const Photos = ({ pokemon }) => {
    const classes = useStyles();
    const urls = Object.values(pokemon?.sprites ?? {});
    const photos = urls.filter(u => !!u && typeof u === "string");
    return (
        <div>
            <Grid container spacing={2}>
                {photos.map((p, i) => (
                    <Grid xs={3} key={i} item>
                        <Paper elevation={2}>
                            <img className={classes.media} alt={pokemon?.name} src={p} />
                        </Paper>
                    </Grid>
                ))}
            </Grid>
        </div>
    )
}
