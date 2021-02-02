import React, { useContext, useEffect, useMemo, useState } from 'react'
import { AlertContext } from '../Helpers/AlertContext';
import { Box, Button, CircularProgress, Container, Grid, Icon, IconButton, LinearProgress, makeStyles, TextField } from "@material-ui/core";
import { GetPokemons, GetTypes } from '../Services/Pokedex';
import { DataGrid } from '@material-ui/data-grid';
import { Autocomplete } from '@material-ui/lab';
import { useHistory } from 'react-router-dom';
const useStyles = makeStyles((theme) => ({
	paper: {
		marginTop: theme.spacing(2),
        flexDirection: "row",
        flex: 1,
        justifyContent: "center"
    }
}));
export const Home = () => {
    const history = useHistory();
    const columns = [ 
        { field: "name", headerName: "Nombre", flex: 0.4 }, 
        { field: "type", headerName: "Tipo", flex: 0.4 }, 
        { 
            field: "data", 
            headerName: "Detalles", 
            renderCell: p => (
                <IconButton 
                    onClick={() => 
                        history.push({ pathname: `/pokemon/${p.value.name}`})
                    }
                    size="small"
                    color="primary"
                >
                    <Icon>arrow_forward</Icon>
                </IconButton>
            ),
            flex: 0.2,
            sortable: false,
            filterable: false,
            align: "right"
        }
    ];
    const classes = useStyles();
    const [pokemons, setPokemons] = useState([]);
    const [type, setType] = useState(null);
    const [types, setTypes] = useState([]);
    const [loading, setLoading] = useState(false);
    const alerts = useContext(AlertContext);
    useEffect(() => {
        var isMounted = true;
        const GetData = async () => {
            setLoading(true);
            try {
                const resultTypes = types.length > 0? types : await GetTypes();
                if(!isMounted) return;
                setTypes(resultTypes);
                const result = await GetPokemons(resultTypes);
                if(!isMounted) return;
                setPokemons(result.map((p, i) => ({ ...p, id: i, data: p })));
            } catch (e) {
                alerts.setAlert({ code: 0, message: "Un error ha evitado la carga de los pokemones, por favor espere mientras la pokedex está en el tecnico"});
            } finally {
                if(isMounted) setLoading(false);
            }
        };
        GetData();
        return () => (isMounted = false);
    }, []);
    const pokemonsShow = useMemo(() => type? pokemons.filter(p => p.type === type) : pokemons, [pokemons, type]);
    return (
        <Grid container className={classes.paper}>
            <Grid container>
                <Grid item xs={12} sm={8} md={6} lg={3} xl={2}>
                    <Box ml={2}>
                        <Autocomplete
                            freeSolo
                            size="small"
                            value={type}
                            onChange={(e, v) => setType(v)}
                            options={types.map(t => t.name)}
                            renderInput={(params) => (
                                <TextField {...params} label="Tipo" margin="normal" variant="outlined" />
                            )}
                        />
                    </Box>
                </Grid>
            </Grid>
            <Grid xs={12} md={10} lg={8} item>
                <Box ml={2}>
                    <div style={{ height: 400, flexGrow: 1 }}>
                        <DataGrid
                            disableSelectionOnClick
                            disableColumnFilter
                            loading={loading}
                            density="compact"
                            autoHeight
                            pageSize={10}
                            columns={columns}
                            rows={pokemonsShow} 
                        />
                    </div>
                </Box>
            </Grid>
        </Grid>
    )
}
