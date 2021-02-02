import { Accordion, AccordionDetails, AccordionSummary, Badge, Box, Card, CardContent, CardHeader, CardMedia, Chip, Grid, Hidden, Icon, IconButton, makeStyles, Paper, Typography } from '@material-ui/core'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { FavoriteActions } from '../Actions/FavoriteActions';
const useStyles = makeStyles((theme) => ({
	label: {
        fontWeight: "900"
    },
	data: {
        marginLeft: theme.spacing(1)
    },
    media: {
        height: 0,
        paddingTop: '56.25%', // 16:9
    },
    chip: {
        marginRight: theme.spacing(1),
        marginBottom: theme.spacing(1),
        fontSize: theme.typography.body1.fontSize,
    },
    stat: {
        color: theme.palette.success.main
    },
    paperDetails: {
        padding: theme.spacing(1)
    },
    summary: {
        backgroundColor: "#D8D8D8"
    }
}));
/**
 * @typedef {Object} PokemonInfoParams
 * @property {import('../Services/Pokedex').FullPokemon} pokemon
 */
/**
 * @param {PokemonInfoParams} param0 
 */
export const PokemonInfo = ({ pokemon }) => {
    const classes = useStyles();
    const typesText = pokemon?.types?.map(t => t.name)?.join(", ");
    const user = useSelector(state => state.UserReducer.user);
    const favs = useSelector(state => state.FavoriteReducer.favorites[user.userName]);
    const fav = favs?.find(f => f.id === pokemon?.id) ?? {};
    const color = fav.val? "#Fc1817" : "#A8A8A8";
    const dispatch = useDispatch();
    const ToggleFav = () => {
        dispatch(FavoriteActions.SetFavorite(user.userName, { id: pokemon.id, val: !fav.val }))
    };
    return (
        <Grid container>
            <Grid container justify="center" direction="row">
                <Typography variant="h5">Carta Pokemon</Typography>
            </Grid>
            <Grid item xs={12} md={4}>
                <Card variant="outlined">
                    <CardHeader
                        title={pokemon?.name}
                        subheader="Información Basica"
                        action={
                            <IconButton onClick={ToggleFav}>
                                <Icon style={{ color }}>favorite</Icon>
                            </IconButton>
                        }
                    />
                    <CardContent>
                        <Grid container direction="row">
                            <Typography variant="subtitle2" className={classes.label}>Id:</Typography>
                            <Typography variant="body1" className={classes.data}>{pokemon?.id}</Typography>
                        </Grid>
                        <Grid container direction="row">
                            <Typography variant="subtitle2" className={classes.label}>Nombre:</Typography>
                            <Typography variant="body1" className={classes.data}>{pokemon?.name}</Typography>
                        </Grid>
                        <Grid container direction="row">
                            <Typography variant="subtitle2" className={classes.label}>Tipos:</Typography>
                            <Typography variant="body1" className={classes.data}>{typesText}</Typography>
                        </Grid>
                        <Grid container direction="row">
                            <Typography variant="subtitle2" className={classes.label}>Peso:</Typography>
                            <Typography variant="body1" className={classes.data}>{pokemon?.weight}</Typography>
                        </Grid>
                        <Grid container direction="row">
                            <Typography variant="subtitle2" className={classes.label}>Altura:</Typography>
                            <Typography variant="body1" className={classes.data}>{pokemon?.height}</Typography>
                        </Grid>
                    </CardContent>
                </Card>
            </Grid>
            <Grid item xs={false} md={5} />
            <Grid item xs={12} md={3}>
                <Card variant="outlined">
                    <CardMedia title={pokemon?.name} className={classes.media} image={pokemon?.sprites?.front_default} />
                </Card>
            </Grid>
            <Grid item xs={12}>
                <Box mt={3}>
                    <Paper className={classes.paperDetails} elevation={3}>
                        <Grid xs={12} sm={12} md={12}>
                            <Accordion TransitionProps={{ unmountOnExit: true }}>
                                <AccordionSummary className={classes.summary} title="Presiona para mostrar">
                                    <Typography variant="subtitle1" className={classes.label}>Estadisticas: </Typography>
                                </AccordionSummary>
                                <AccordionDetails>
                                    {pokemon?.stats?.map((s, i) => (
                                        <Chip
                                            key={`stat-${i}`}
                                            className={classes.chip}
                                            icon={<Typography className={classes.stat} variant="body1">{s.base_stat}</Typography>}
                                            label={s.name}
                                        />
                                    ))}
                                </AccordionDetails>
                            </Accordion>
                            <Accordion TransitionProps={{ unmountOnExit: true }}>
                                <AccordionSummary className={classes.summary} title="Presiona para mostrar">
                                    <Typography variant="subtitle1" className={classes.label}>Movimientos: </Typography>
                                </AccordionSummary>
                                <AccordionDetails style={{ flexWrap: "wrap" }}>
                                    {pokemon?.moves?.map((m, i) => (
                                        <Chip
                                            key={`move-${i}`}
                                            className={classes.chip}
                                            icon={<Icon color="primary">flash_on</Icon>}
                                            label={m.name}
                                        />
                                    ))}
                                </AccordionDetails>
                            </Accordion>
                            <Accordion TransitionProps={{ unmountOnExit: true }}>
                                <AccordionSummary className={classes.summary} title="Presiona para mostrar">
                                    <Typography variant="subtitle1" className={classes.label}>Habilidades: </Typography>
                                </AccordionSummary>
                                <AccordionDetails style={{ flexWrap: "wrap" }}>
                                    {pokemon?.abilities?.map((a, i) => (
                                        <Chip
                                            key={`ability-${i}`}
                                            className={classes.chip}
                                            icon={<Icon style={{ color: "#FFa720" }}>start</Icon>}
                                            label={a.name}
                                        />
                                    ))}
                                </AccordionDetails>
                            </Accordion>
                        </Grid>                    
                    </Paper>
                </Box>
            </Grid>
        </Grid>
    )
}
