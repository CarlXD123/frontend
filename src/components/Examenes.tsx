import { Button, Divider, Grid, IconButton, Input, InputAdornment, InputBase, InputLabel, MenuItem, Paper, TextField, Tooltip } from "@mui/material";
import React from "react";
import { NavigateFunction, useNavigate } from "react-router-dom";
import { Contenido } from "./Home";
import ListAltIcon from '@mui/icons-material/ListAlt';
import SearchSharpIcon from '@mui/icons-material/SearchSharp';
import TbExamenes from "./tablas/tbExamenes";


class Examenes extends React.Component<{ navigate: NavigateFunction }, any>{
    constructor(props: any) {
        super(props);
        //this.theme = useTheme();
        this.state = {
            buscarTexto: "",
            buscarTextoClone: "",
        };
    }
    handleChange = (prop: any) => (event: React.ChangeEvent<HTMLInputElement>) => {
        this.setState({
            [prop]: event.target.value
        });
    };
    buscarExamen = () => {
        this.setState({
            buscarTextoClone: this.state.buscarTexto
        });
    };
    buscarExamenEnter = (event: any) => {
        if (event.key === 'Enter') {
            this.setState({
                buscarTextoClone: this.state.buscarTexto
            });
        }
    };
    crearExamen = () => {
        this.props.navigate('/apps/examinations/new')
    }
    render() {
        return (
            <div className='tabla-componente card-table-general'>
                <Contenido>
                    <div style={{ display: "flex" }} className="nav-tabla">
                        <Grid container item>
                            <div style={{ display: "flex", alignItems: "center" }} >
                            <ListAltIcon style={{ color: "white", fontSize: "45px" }}></ListAltIcon>
                                <div style={{ color: "white", fontFamily: "Quicksand", fontWeight: "400" }} className="text-responsive-combo" >Examenes</div >
                            </div>
                        </Grid>
                        <Grid container item>
                            <div style={{ display: "flex" }} className="nav-tabla-comboText">
                                <div className="textfield-buscar-combo">
                                    <TextField fullWidth id="outlined-basic" variant="outlined"
                                        placeholder="Buscar por nombre"
                                        value={this.state.buscar}
                                        onChange={this.handleChange('buscar')}
                                        onKeyPress={this.buscarExamenEnter}
                                        onClick={this.buscarExamen}
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
                                                    <SearchSharpIcon type="submit" onClick={this.buscarExamen} />
                                                </InputAdornment>
                                            )
                                        }}
                                    />
                                </div>
                            </div>
                        </Grid>
                        <Grid container item >
                        <Tooltip title="Crear Examen" followCursor>
                            <Button onClick={this.crearExamen} variant="contained" className="boton">Agregar exámen</Button>
                        </Tooltip>
                        </Grid>

                    </div>
                    <br></br>
                    <div>
                    <TbExamenes busquedaex={this.state.buscarTextoClone} />
                    </div>

                </Contenido>
            </div>
        )
    }
    }

function withNavigation(Component: any): (props: any) => JSX.Element {
    return props => <Component {...props} navigate={useNavigate()} />;
}
export default withNavigation(Examenes);