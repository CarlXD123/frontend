import { Button, CardContent, Divider, Grid, IconButton, Input, InputAdornment, InputBase, InputLabel, ListItem, MenuItem, Paper, Tab, Tabs, TextField } from "@mui/material";
import React from "react";
import { NavigateFunction, useNavigate } from "react-router-dom";
import { Contenido } from "./Home";
import HandshakeRoundedIcon from '@mui/icons-material/HandshakeRounded';
import SearchSharpIcon from '@mui/icons-material/SearchSharp';
import TbResultadosPorAtender from "./tablas/tbResultadosPorAtender";
import TbResultadosAtendidas from "./tablas/tbResultadosAtendidas";

class Resultados extends React.Component<{ navigate: NavigateFunction }, any>{

    constructor(props: any) {
        super(props);
        //this.theme = useTheme();
        this.state = {
            tabValue: 0,
            buscarTexto: "",
            buscarTextoClone: "",
            buscarSeleccionar: "code",
            buscarSeleccionarClone: "",
        };
    }
    handleChangeTab = (event: any, tabValue: any) => {
        this.setState({ tabValue });
    };
    handleChange = (prop: any) => (event: React.ChangeEvent<HTMLInputElement>) => {
        this.setState({
            [prop]: event.target.value
        });
    };
    buscarResutadosEnter = (event: any) => {
        if (event.key === 'Enter') {
            this.setState({
                buscarTextoClone: this.state.buscarTexto,
                buscarSeleccionarClone: this.state.buscarSeleccionar
            });
        }
    };
    buscarResutados = () => {
        this.setState({
            buscarTextoClone: this.state.buscarTexto,
            buscarSeleccionarClone: this.state.buscarSeleccionar
        });
    };

    render() {
        return (
            <div className='tabla-componente card-table-general'>
                <Contenido>
                    <div style={{ display: "flex" }} className="nav-tabla">
                        <Grid container item>
                            <div style={{ display: "flex", alignItems: "center" }} >
                                <HandshakeRoundedIcon style={{ color: "white", fontSize: "38px" }}></HandshakeRoundedIcon>
                                <InputLabel style={{ color: "white", fontFamily: "Quicksand", fontWeight: "400", fontSize: "2.5rem" }} >Resultados</InputLabel>
                            </div>
                        </Grid>
                        <Grid container item>
                            <div style={{ display: "flex" }} className="nav-tabla-comboText">
                                <div className="textfield-combo">
                                    <TextField id="select-currency-native" select
                                        value={this.state.buscarSeleccionar}
                                        onChange={this.handleChange('buscarSeleccionar')}
                                        variant={"outlined"}
                                        InputProps={{
                                            style: {
                                                backgroundColor: "white",
                                                color: "black",
                                                cursor: "pointer",
                                                borderStyle: "revert",
                                                borderColor: "#039be5",
                                                borderWidth: "0.1px",
                                                maxWidth: "320px"
                                            }
                                        }}
                                    >
                                        <MenuItem value={"code"}>Codigo</MenuItem>
                                        <MenuItem value={"date"}>Fecha</MenuItem>
                                        <MenuItem value={"dni"}>DNI</MenuItem>
                                        <MenuItem value={"passport"}>Pasaporte</MenuItem>
                                        <MenuItem value={"nombre"}>Paciente</MenuItem>
                                        <MenuItem value={"referencia"}>Referencia</MenuItem>
                                        <MenuItem value={"date"}>Rango Fecha</MenuItem>
                                    </TextField>
                                </div>
                                <div className="textfield-buscar-combo">
                                    <TextField fullWidth id="outlined-basic" variant="outlined"
                                        placeholder="Ingrese contendio de busqueda"
                                        value={this.state.buscarTexto}
                                        onChange={this.handleChange('buscarTexto')}
                                        onKeyPress={this.buscarResutadosEnter}
                                        onClick={this.buscarResutados}
                                        InputProps={{
                                            style: {
                                                backgroundColor: "white",
                                                color: "black",
                                                cursor: "pointer",
                                                borderStyle: "revert",
                                                borderColor: "#039be5",
                                                borderWidth: "0.1px",
                                                maxWidth: "520px"
                                            },
                                            endAdornment: (
                                                <InputAdornment position="end" >
                                                    <SearchSharpIcon type="submit" onClick={this.buscarResutados} />
                                                </InputAdornment>
                                            )
                                        }}
                                    />
                                </div>
                            </div>




                        </Grid>
                        <Grid container item></Grid>
                    </div>
                    <br></br>
                    <div>
                        <CardContent style={{ backgroundColor: "white", borderRadius: "12px" }}>

                            <Tabs value={this.state.tabValue} onChange={this.handleChangeTab}
                                indicatorColor="primary" textColor="primary" centered variant="fullWidth"
                                classes={{ root: "w-full h-64" }} style={{ backgroundColor: "white" }}
                            >
                                <Tab className="h-64 normal-case" label="POR ATENDER" style={{ fontFamily: "Quicksand", fontWeight: "500", fontSize: "1.2rem" }} />
                                <Tab className="h-64 normal-case" label="ATENDIDAS" style={{ fontFamily: "Quicksand", fontWeight: "500", fontSize: "1.2rem" }} />

                            </Tabs>
                            <div style={{ display: this.state.tabValue == 0 ? "block" : "none" }}>
                                <TbResultadosPorAtender texto={this.state.buscarTextoClone} opcion={this.state.buscarSeleccionarClone} />
                            </div>
                            <div style={{ display: this.state.tabValue == 1 ? "block" : "none" }}>
                                <TbResultadosAtendidas texto={this.state.buscarTextoClone} opcion={this.state.buscarSeleccionarClone} />
                            </div>
                        </CardContent>
                    </div>
                </Contenido>
            </div>
        )
    }
}
function withNavigation(Component: any): (props: any) => JSX.Element {
    return props => <Component {...props} navigate={useNavigate()} />;
}

export default withNavigation(Resultados);