import { Button, CardContent, Grid, InputLabel, MenuItem, TextField } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";
import { Contenido } from "../../Home";
import KeyboardBackspaceRoundedIcon from '@mui/icons-material/KeyboardBackspaceRounded';
import { editAgreementApi, getAgreementApi, getTypeAgreementsAllApi, saveAgreementApi } from "../../../api";
import { Link, useParams } from "react-router-dom";


export default function TbEditConvenios() {

    const { id } = useParams();

    //#region GET-SET textfield
    const [tipoList, setTipoList] = React.useState<any[]>([]);
    const [tipo, setTipo] = React.useState<any>('');
    const [nombre, setNombre] = React.useState<any>('');
    const [telefono, setTelefono] = React.useState<any>('');
    const [direccion, setDireccion] = React.useState<any>('');
    const [ruc, setRuc] = React.useState<any>('');
    const [correo, setCorreo] = React.useState<any>('');
    const [descripcion, setDescripcion] = React.useState<any>('');
    //#endregion

    //#region handles de Vistas
    const handleChangeType = (event: React.ChangeEvent<HTMLInputElement>) => {
        setTipo(event.target.value);
    };
    const handleChangeNombre = (event: React.ChangeEvent<HTMLInputElement>) => {
        setNombre(event.target.value);
    };
    const handleChangeTelefono = (event: React.ChangeEvent<HTMLInputElement>) => {
        setTelefono(event.target.value);
    };
    const handleChangeDireccion = (event: React.ChangeEvent<HTMLInputElement>) => {
        setDireccion(event.target.value);
    };
    const handleChangeRuc = (event: React.ChangeEvent<HTMLInputElement>) => {
        setRuc(event.target.value);
    };
    const handleChangeCorreo = (event: React.ChangeEvent<HTMLInputElement>) => {
        setCorreo(event.target.value);
    };
    const handleChangeDescripcion = (event: React.ChangeEvent<HTMLInputElement>) => {
        setDescripcion(event.target.value);
    };
    //#endregion

    React.useEffect(() => {
        //#region llamadas al servicio
        getTypeAgreementsAllApi().then((ag: any) => {
            setTipoList(ag.data)
            getAgreementApi(id).then((x: any) => {
                if (x.status) {
                    setTipo(x.data.TypeAgreementId);
                    setNombre(x.data.name);
                    setTelefono(x.data.tlfNumber);
                    setDireccion(x.data.address);
                    setRuc(x.data.ruc == null ? "" : x.data.ruc);
                    setCorreo(x.data.email);
                    setDescripcion(x.data.description)
                }
            })
        });
        //#endregion
    }, []);

    const guardar = () => {
        let mError = "";
        let error = false;
        if (tipo == "" || tipo == undefined) {
            mError += "Seleccione el tipo\n";
            error = true;
        }
        if (nombre == "") {
            mError += "Seleccione el nombre\n";
            error = true;
        }
        if (error) {
            alert(mError);
            return;
        }
        editAgreementApi({
            "name": nombre,
            "tlfNumber": telefono,
            "address": direccion,
            "ruc": ruc == "" ? null : ruc,
            "email": correo,
            "description": descripcion,
            "TypeAgreementId": tipo
        }, id).then((ag: any) => {
            if (ag.status) {
                alert(ag.message.text)
                window.location.href = '/apps/agreements'
            } else {
                alert(ag.message.text)
            }
        })
    }

    return (
        <div className='tabla-componente card-table-general'>
            <Contenido>
                <Grid container style={{ alignItems: "center" }} >
                    <Grid container item >
                        <Link to={"/apps/agreements"}>
                            <div style={{ display: "flex", alignItems: "center" }} >
                                <KeyboardBackspaceRoundedIcon style={{ color: "white", fontSize: "1.3rem", cursor: "pointer" }}></KeyboardBackspaceRoundedIcon>
                                <InputLabel style={{ color: "white", fontFamily: "Quicksand", fontWeight: "400", fontSize: "1.3rem", paddingLeft: "4px", cursor: "pointer" }} >Convernios</InputLabel >
                            </div>
                        </Link>
                    </Grid>
                    <Grid container item style={{ alignItems: "center" }} mt={1.5}>
                        <Grid item xs md={8} >
                            <div style={{ color: "white", fontFamily: "Quicksand", fontWeight: "400" }} className="text-responsive-edit" >Editar Convernio</div >
                        </Grid>
                        <Grid item xs md={4} mt={1.5}>
                            <Button onClick={guardar} variant="contained" style={{ width: '20.5ch', height: '4.4ch', backgroundColor: "rgb(0 85 169)", color: "white", fontFamily: "Quicksand", fontWeight: "900", fontSize: "1.15rem" }}>Guardar</Button>
                        </Grid>
                    </Grid>
                </Grid>
                <br></br>
                <div>
                    <CardContent style={{ backgroundColor: "white", borderRadius: "12px" }}>
                        <Box sx={{ flexGrow: 1 }}>
                            <Grid container spacing={2} >
                                <Grid container item md={2}>
                                    <TextField id="outlined-basic" label="Tipo *" variant="outlined"
                                        select fullWidth value={tipo} onChange={handleChangeType}
                                        helperText="Por favor seleccione uno"
                                    >
                                        {tipoList.map((row: any, index: any) => {
                                            return (
                                                <MenuItem key={index} value={row.value}>{row.name}</MenuItem>
                                            )
                                        })}

                                    </TextField>
                                </Grid>
                                <Grid container item md={10}>
                                    <TextField fullWidth id="outlined-basic" label="Nombre" variant="outlined" value={nombre} onChange={handleChangeNombre} />
                                </Grid>
                            </Grid>
                            <Grid container spacing={2} mt={0.5}>
                                <Grid container item md={6} >
                                    <TextField fullWidth id="outlined-basic" label="Teléfono" variant="outlined" value={telefono} onChange={handleChangeTelefono} />
                                </Grid>
                                <Grid container item md={6}>
                                    <TextField fullWidth id="outlined-basic" label="Dirección" variant="outlined" value={direccion} onChange={handleChangeDireccion} />
                                </Grid>
                            </Grid>
                            <Grid container spacing={2} mt={0.5}>
                                <Grid container item md={6}>
                                    <TextField fullWidth id="outlined-basic" label="RUC" variant="outlined" value={ruc} onChange={handleChangeRuc} />
                                </Grid>
                                <Grid container item md={6}>
                                    <TextField fullWidth id="outlined-basic" label="Correo" variant="outlined" value={correo} onChange={handleChangeCorreo} />
                                </Grid>
                            </Grid>
                            <Grid container >
                                <Grid container item md={12} mt={1.5}>
                                    <TextField id="outlined-basic"
                                        label="Descripción"
                                        variant="outlined"
                                        multiline fullWidth rows={4}
                                        value={descripcion}
                                        onChange={handleChangeDescripcion} />
                                </Grid>
                            </Grid>
                        </Box>
                    </CardContent>
                </div >
            </Contenido>
        </div>
    )
}


