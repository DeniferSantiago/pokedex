import { AppBar, Grid, Tabs, Tab, Box, Icon, Paper, Container } from '@material-ui/core'
import React, { useState, useEffect, useContext } from 'react'
import { useParams } from 'react-router-dom';
import { Photos } from '../Components/Photos';
import { PokemonInfo } from '../Components/PokemonInfo';
import { AlertContext } from '../Helpers/AlertContext';
import { GetPokemon } from '../Services/Pokedex';
function TabPanel(props) {
    const { children, value, index, ...other } = props;
    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
        {value === index && (
            <Box p={2}>
                <Paper elevation={3}>
                    <Box p={1}>
                        {children}
                    </Box>
                </Paper>
            </Box>
        )}
        </div>
    );
}
export const Pokemon = () => {
    const [tab, setTab] = useState(0);
    /**@type {import('../Services/Pokedex').FullPokemon} */
    const pType = null;
    const [data, setData] = useState(pType);
    const { name } = useParams();
    const alerts = useContext(AlertContext);
    console.log(data);
    useEffect(() => {
        let isMounted = true;
        const GetData = async () => {
            try {
                if(name){
                    const result = await GetPokemon(name);
                    if(isMounted) setData(result);
                }
            } catch (e) {
                alerts.setAlert({ message: "Un error ha impedido que encontremos la informacion", code: 0 });
            }
        };
        GetData();
        return () => (isMounted = false);
    }, [name]);
    return (
        <Container maxWidth="xl">
            <AppBar position="static" color="secondary">
                <Tabs value={tab} onChange={(e, val) => setTab(val)}>
                    <Tab icon={<Icon>article</Icon>} label="Información" id="tab-1"  />
                    <Tab icon={<Icon>insert_photo</Icon>} label="Fotos" id="tab-2"  />
                </Tabs>
            </AppBar>
            <TabPanel value={tab} index={0}>
                <PokemonInfo pokemon={data} />
            </TabPanel>
            <TabPanel value={tab} index={1}>
                <Photos pokemon={data} />
            </TabPanel>
        </Container>
    )
}
