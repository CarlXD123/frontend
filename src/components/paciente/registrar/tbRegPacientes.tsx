import { Button, CardContent, Grid, InputLabel, MenuItem, Tab, TextField } from "@mui/material";
import { Box } from "@mui/system";
import React, { ChangeEvent } from "react";
import { Contenido } from "../../Home";
import KeyboardBackspaceRoundedIcon from '@mui/icons-material/KeyboardBackspaceRounded';
import TabContext from '@material-ui/lab/TabContext';
import TabList from '@material-ui/lab/TabList';
import TabPanel from '@material-ui/lab/TabPanel';
import { getDistrictsForProvince,savePatientApi, getProvincesForRegion, getRegionsApi, getTypeDocsApi } from "../../../api";
import { civilStatus, genders, nationality } from "../../../constant";
import { Link } from "react-router-dom";
import { Modal } from "@material-ui/core";
import moment from "moment";

export default function TbRegPaciente() {
    const getAgeFromBirthday = (birthday:any) => {
        if(birthday){
          let totalMonths = +moment().diff(birthday, 'months');
          let years =totalMonths/ 12;
          let months = totalMonths % 12;
            if(months !== 0){
               return parseInt(years+"");
             }
        return  years;
          }
        return null;
    }

    const [values, setValues] = React.useState<string>("1");
    //#region GET-SET textfield

    const [tipoDocList, setTipoDocList] = React.useState<any[]>([]);
    const [tipoDoc, setTipoDoc] = React.useState<any>('');
    const [numDoc, setNumDoc] = React.useState<any>('');
    const [numHistoria, setNumHistoria] = React.useState<any>('');
    const [nombres, setNombres] = React.useState<any>('');
    const [apePa, setApePa] = React.useState<any>('');
    const [apeMa, setApeMa] = React.useState<any>('');
    const [genero, setGenero] = React.useState<any>('');
    const [estadoCivil, setEstadoCivil] = React.useState<any>('');
    const [feNacimiento, setFeNacimiento] = React.useState<any>('');
    const [edad, setEdad] = React.useState<any>('');
    const [nacionalidad, setNacionalidad] = React.useState<any>('');

    const [regionList, setRegionList] = React.useState<any[]>([]);
    const [abrirGuardarPaciente, setAbrirGuardarPaciente] = React.useState<any>(false);
    const [abrirGuardarErrorTipoDoc, setAbrirGuardarErrorTipoDoc] = React.useState<any>(false);
    const [abrirGuardarErrorNumDoc, setAbrirGuardarErrorNumDoc] = React.useState<any>(false);
    const [abrirGuardarErrorNom, setAbrirGuardarErrorNom] = React.useState<any>(false);
    const [abrirGuardarErrorApePa, setAbrirGuardarErrorApePa] = React.useState<any>(false);
    const [abrirGuardarErrorApeMa, setAbrirGuardarErrorApeMa] = React.useState<any>(false);
    const [abrirGuardarErrorGenero, setAbrirGuardarErrorGenero] = React.useState<any>(false);
    const [abrirGuardarErrorTelMovil, setAbrirGuardarErrorTelMovil] = React.useState<any>(false);
    const [abrirGuardarErrorFeNacimiento, setAbrirGuardarErrorFeNacimiento] = React.useState<any>(false);
    const [abrirGuardarErrorNacionalidad, setAbrirGuardarErrorNacionalidad] = React.useState<any>(false);
    const [abrirGuardarErrorRegion, setAbrirGuardarErrorRegion] = React.useState<any>(false);
    const [abrirGuardarErrorDistrito, setAbrirGuardarErrorDistrito] = React.useState<any>(false);
    const [abrirGuardarErrorDirecLugar, setAbrirGuardarErrorDirecLugar] = React.useState<any>(false);
    const [abrirGuardarErrorProvincia, setAbrirGuardarErrorProvincia] = React.useState<any>(false);
    const [abrirGuardarErrorECivil, setAbrirGuardarErrorECivil] = React.useState<any>(false);
    const [abrirGuardarErrorCorreo, setAbrirGuardarErrorCorreo] = React.useState<any>(false);
    const [abrirGuardarPacienteError, setAbrirGuardarPacienteError] = React.useState<any>(false);
    const [region, setRegion] = React.useState<any>('');
    const [provinciaList, setProvinciaList] = React.useState<any[]>([]);
    const [provincia, setProvincia] = React.useState<any>('');
    const [distritoList, setDistritoList] = React.useState<any[]>([]);
    const [distrito, setDistrito] = React.useState<any>('');
    const [direcLugar, setDirecLugar] = React.useState<any>('');

    const [correo, setCorreo] = React.useState<any>('');
    const [telMovil, setTelMovil] = React.useState<any>('');
    const [telFijo, setTelFijo] = React.useState<any>('');
    //#endregion

    //#region handles de Vistas

    //#region Primera Vista(Datos Personales)
    const handleChange = (event: ChangeEvent<{}>, newValue: any) => {
        setValues(newValue);
    };
    const handleChangeTypeDoc = (event: React.ChangeEvent<HTMLInputElement>) => {
        setTipoDoc(event.target.value);
    };
    const handleChangeNumDoc = (event: React.ChangeEvent<HTMLInputElement>) => {
        setNumDoc(event.target.value);
    };
    const handleChangeNumHistoria = (event: React.ChangeEvent<HTMLInputElement>) => {
        setNumHistoria(event.target.value);
    };

    const handleChangeNombres = (event: React.ChangeEvent<HTMLInputElement>) => {
        setNombres(event.target.value);
    };
    const handleChangeApePa = (event: React.ChangeEvent<HTMLInputElement>) => {
        setApePa(event.target.value);
    };
    const handleChangeApeMa = (event: React.ChangeEvent<HTMLInputElement>) => {
        setApeMa(event.target.value);
    };
    const handleChangeGenero = (event: React.ChangeEvent<HTMLInputElement>) => {
        setGenero(event.target.value);
    };
    const handleChangeEstadoCivil = (event: React.ChangeEvent<HTMLInputElement>) => {
        setEstadoCivil(event.target.value);
    };
    const handleChangeFeNacimiento = (event: React.ChangeEvent<HTMLInputElement>) => {
        setFeNacimiento(event.target.value);
        setEdad(getAgeFromBirthday(event.target.value));
    };
    const handleChangeEdad = (event: React.ChangeEvent<HTMLInputElement>) => {
        setEdad(event.target.value);
    };
    const handleChangenacionalidad = (event: React.ChangeEvent<HTMLInputElement>) => {
        setNacionalidad(event.target.value);
    };
    //#endregion

    //#region Segunda Vista(Domicilio)
    const handleChangeRegion = (event: React.ChangeEvent<HTMLInputElement>) => {
        setRegion(event.target.value);
        getProvincesForRegion(event.target.value).then((ag: any) => {
            setProvinciaList(ag.data)
        })
    };
    const handleChangeProvincia = (event: React.ChangeEvent<HTMLInputElement>) => {
        setProvincia(event.target.value);
        getDistrictsForProvince(event.target.value).then((ag: any) => {
            setDistritoList(ag.data)
        })
    };
    const handleChangeDistrito = (event: React.ChangeEvent<HTMLInputElement>) => {
        setDistrito(event.target.value);
    };

    const handleCloseRegistrarPacientes = () => {
        setAbrirGuardarPaciente(false);
    }

    const handleCloseRegistrarPacientesError = () => {
        setAbrirGuardarPacienteError(false);
    }

    const handleCloseErrorTipoDoc = () => {
        setAbrirGuardarErrorTipoDoc(false);
    }

    const handleCloseErrorNumDoc= () => {
        setAbrirGuardarErrorNumDoc(false);
    }

    const handleCloseErrorNom = () => {
        setAbrirGuardarErrorNom(false);
    }

    const handleCloseErrorApePa = () => {
        setAbrirGuardarErrorApePa(false);
    }

    const handleCloseErrorApeMa = () => {
        setAbrirGuardarErrorApeMa(false);
    }

    const handleCloseErrorTelMovil = () => {
        setAbrirGuardarErrorTelMovil(false);
    }

    const handleCloseErrorFeNacimiento = () => {
        setAbrirGuardarErrorFeNacimiento(false);
    }

    const handleCloseErrorNacionalidad = () => {
        setAbrirGuardarErrorNacionalidad(false);
    }

    const handleCloseErrorRegion = () => {
        setAbrirGuardarErrorRegion(false);
    }

    const handleCloseErrorDistrito = () => {
        setAbrirGuardarErrorDistrito(false);
    }

    const handleCloseErrorProvincia = () => {
        setAbrirGuardarErrorProvincia(false);
    }

    const handleCloseErrorDirecLugar = () => {
        setAbrirGuardarErrorDirecLugar(false);
    }

    const handleCloseErrorECivil = () => {
        setAbrirGuardarErrorECivil(false);
    }

    const handleCloseErrorCorreo = () => {
        setAbrirGuardarErrorCorreo(false);
    }

    const handleCloseErrorGenero = () => {
        setAbrirGuardarErrorGenero(false);
    }

    const handleChangeDirecLugar = (event: React.ChangeEvent<HTMLInputElement>) => {
        setDirecLugar(event.target.value);
    };
    //#endregion

    //#region Tercera Vista(Datos de contacto)
    const handleChangeCorreo = (event: React.ChangeEvent<HTMLInputElement>) => {
        setCorreo(event.target.value);
    };
    const handleChangeTelMovil = (event: React.ChangeEvent<HTMLInputElement>) => {
        setTelMovil(event.target.value);
    };
    const handleChangeTelFijo = (event: React.ChangeEvent<HTMLInputElement>) => {
        setTelFijo(event.target.value);
    };
    //#endregion

    //#endregion
    const style = {
        position: 'absolute' as 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 500,
        bgcolor: 'white',
        border: '1px solid #white',
        borderRadius: "15px",
        boxShadow: 24,
        p: 4,
    };

    React.useEffect(() => {
        //#region llamadas al servicio
        getTypeDocsApi().then((ag: any) => {
            setTipoDocList(ag.data)
        });
        getRegionsApi().then((ag: any) => {
            setRegionList(ag.data);
        });
        //#endregion
    }, []);

    const crearPaciente = () => {
        //let mError = "LLenar Campos: \n";
        let error = false;
        //#region validaciones
        if (tipoDoc == "") {
            //mError += "Datos personales-Seleccione tipo de documento\n";
            error = true;
            setAbrirGuardarErrorTipoDoc(true);
        }
        if (numDoc == "") {
            //mError += "Datos personales-Ingrese numero de doc\n";
            error = true;
            setAbrirGuardarErrorNumDoc(true);
        }
        if (nombres == "") {
            //mError += "Datos personales-Ingrese nombre\n";
            error = true;
            setAbrirGuardarErrorNom(true);
        }
        if (apePa == "") {
            //mError += "Datos personales-Ingrese apellido paterno\n";
            error = true;
            setAbrirGuardarErrorApePa(true);
        }
        if (apeMa == "") {
            //mError += "Datos personales-Ingrese apellido materno\n";
            error = true;
            setAbrirGuardarErrorApeMa(true);
        }
        if (telMovil == "") {
            //mError += "Datos personales-Ingrese telefono movil\n";
            error = true;
            setAbrirGuardarErrorTelMovil(true);
        }
        if (genero == "") {
            //mError += "Datos personales-Ingrese genero\n";
            error = true;
            setAbrirGuardarErrorGenero(true);
        }
        if (feNacimiento == "") {
            //mError += "Datos personales-Ingrese Fecha Nacimiento\n";
            error = true;
            setAbrirGuardarErrorFeNacimiento(true);
        }
        if (nacionalidad == "") {
            //mError += "Datos personales-Ingrese Fecha admision\n";
            error = true;
            setAbrirGuardarErrorNacionalidad(true);
        }
        if (region == "") {
            //mError += "Domicilio-Seleccione un departamento \n";
            error = true;
            setAbrirGuardarErrorRegion(true);
        }
        if (provincia == "") {
            //mError += "Domicilio-Seleccione una provincia \n";
            error = true;
            setAbrirGuardarErrorProvincia(true);
        }
        if (distrito == "") {
            //mError += "Domicilio-Seleccione un distrito \n";
            error = true;
            setAbrirGuardarErrorDistrito(true);
        }
        if (direcLugar == "") {
            //mError += "Domicilio-Ingrese una direccion \n";
            error = true;
            setAbrirGuardarErrorDirecLugar(true);
        }
        if(estadoCivil==""){
            //mError += "Domicilio-Ingrese estado civil \n";
            error = true;
            setAbrirGuardarErrorECivil(true);
        }
        if (correo == "") {
            //mError += "Datos de contacto-Ingrese correo \n";
            error = true;
            setAbrirGuardarErrorCorreo(true);
        }
        if (error) {
            //alert(mError);
            return;
        }
        //#endregion 

        let data= {
            DistrictId: distrito,
            ProvinceId: provincia,
            RegionId: region,
            TypeDocId: tipoDoc,
            address: direcLugar,
            birthDate: feNacimiento,
            civilStatus: estadoCivil,
            dni: numDoc,
            gender: genero,
            historyNumber: numHistoria,
            lastNameM: apeMa,
            lastNameP: apePa,
            name: nombres,
            nationality: nacionalidad,
            phoneNumber: telMovil,
            tlfNumber: telFijo,
            username: correo
        }
        savePatientApi(data).then((x: any) => {
            if(x.status){
                //alert(x.message.text);
                setAbrirGuardarPaciente(true);
                window.location.href = '/apps/patients'
            }else{
                //alert(x.message.text);
                setAbrirGuardarPacienteError(true);
            }
        });
        

    }

    return (
        <div className='tabla-componente card-table-general'>
            <Contenido>
                <Grid container style={{ alignItems: "center" }}>
                    <Grid container item  >
                        <Link to={"/apps/patients"}>
                            <div style={{ display: "flex", alignItems: "center" }} >
                                <KeyboardBackspaceRoundedIcon style={{ color: "white", fontSize: "1.3rem", cursor: "pointer" }}></KeyboardBackspaceRoundedIcon>
                                <InputLabel style={{ color: "white", fontFamily: "Quicksand", fontWeight: "400", fontSize: "1.3rem", paddingLeft: "4px", cursor: "pointer" }} >Paciente</InputLabel >
                            </div>
                        </Link>
                    </Grid>
                    <Grid container item style={{ alignItems: "center" }} mt={1.5}>
                        <Grid item md={8}>
                            <InputLabel style={{ color: "white", fontFamily: "Quicksand", fontWeight: "400", fontSize: "2.2rem" }} >Nuevo paciente</InputLabel >
                        </Grid>
                        <Grid  item md={4}>
                            <Button onClick={crearPaciente} variant="contained" style={{ width: '20.5ch', height: '4.4ch', backgroundColor: "rgb(0 85 169)", color: "white", fontFamily: "Quicksand", fontWeight: "900", fontSize: "1.15rem" }}>Guardar</Button>
                        </Grid>
                    </Grid>
                    <Grid container item style={{ alignItems: "center" }} mt={0.3}>
                        <Grid item >
                            <InputLabel style={{ color: "white", fontFamily: "Quicksand", fontWeight: "400", fontSize: "1rem" }} >Detalle del paciente</InputLabel >
                        </Grid>
                    </Grid>
                </Grid>
                <br></br>
                <div>
                    <CardContent style={{ backgroundColor: "white", borderRadius: "12px" }}>
                        <div>
                            <TabContext value={values}>
                                <Box >
                                    <TabList scrollButtons="auto" variant="scrollable" indicatorColor="primary" textColor="primary" onChange={handleChange} >
                                        <Tab className="h-64 normal-case" label="Datos personales" value="1" />
                                        <Tab className="h-64 normal-case" label="Domicilio" value="2" />
                                        <Tab className="h-64 normal-case" label="Datos de contacto" value="3" />
                                    </TabList>
                                </Box>
                                <TabPanel value="1">
                                    <Box sx={{ flexGrow: 1 }}>
                                        <Grid container spacing={2}>
                                            <Grid container item md={4} >
                                                <TextField id="outlined-basic" label="Tipo Documento" variant="outlined"
                                                    select fullWidth value={tipoDoc} onChange={handleChangeTypeDoc}
                                                    helperText="Por favor seleccione uno"
                                                >
                                                    {tipoDocList.map((row: any, index: any) => {
                                                        return (
                                                            <MenuItem key={index} value={row.value}>{row.name}</MenuItem>
                                                        )
                                                    })}

                                                </TextField>
                                            </Grid>
                                            <Grid container item md={4}>
                                                <TextField fullWidth id="outlined-basic" label="Nro Documento" variant="outlined" value={numDoc} onChange={handleChangeNumDoc} />
                                            </Grid>
                                            <Grid container item md={4}>
                                                <TextField fullWidth id="outlined-basic" label="Nro de historia clinica" variant="outlined" value={numHistoria} onChange={handleChangeNumHistoria} />
                                            </Grid>
                                        </Grid>
                                        <Grid container spacing={2} mt={0.5}>
                                            <Grid container item md={4} >
                                                <TextField fullWidth id="outlined-basic" label="Nombres" variant="outlined" value={nombres} onChange={handleChangeNombres} />
                                            </Grid>
                                            <Grid container item md={4}>
                                                <TextField fullWidth id="outlined-basic" label="Apellido paterno" variant="outlined" value={apePa} onChange={handleChangeApePa} />
                                            </Grid>
                                            <Grid container item md={4}>
                                                <TextField fullWidth id="outlined-basic" label="Apellido materno" variant="outlined" value={apeMa} onChange={handleChangeApeMa} />
                                            </Grid>
                                        </Grid>
                                        <Grid container spacing={2} mt={0.5}>
                                            <Grid container item md={6} >
                                                <TextField id="outlined-basic" label="Género" variant="outlined"
                                                    select fullWidth value={genero} onChange={handleChangeGenero}
                                                >
                                                    {genders.map((row: any, index: any) => {
                                                        return (
                                                            <MenuItem key={index} value={row.value}>{row.label} </MenuItem>
                                                        )
                                                    })}

                                                </TextField>
                                            </Grid>
                                            <Grid container item md={6}>
                                                <TextField id="outlined-basic" label="Estado civil" variant="outlined"
                                                    select fullWidth value={estadoCivil} onChange={handleChangeEstadoCivil}
                                                >
                                                    {civilStatus.map((row: any, index: any) => {
                                                        return (
                                                            <MenuItem key={index} value={row.value}>{row.label} </MenuItem>
                                                        )
                                                    })}

                                                </TextField>
                                            </Grid>
                                        </Grid>
                                        <Grid container spacing={2} mt={0.5}>
                                            <Grid container item md={5}>
                                                <TextField type="date" fullWidth id="outlined-basic" label="Fecha de nacimiento" focused variant="outlined" value={feNacimiento} onChange={handleChangeFeNacimiento} />
                                            </Grid>
                                            <Grid container item md={2}>
                                                <TextField fullWidth id="outlined-basic" label="Edad" focused variant="outlined" value={edad} onChange={handleChangeEdad} />
                                            </Grid>
                                            <Grid container item md={5}>
                                                <TextField  fullWidth id="outlined-basic" label="Fecha de admisión" variant="outlined" 
                                                select value={nacionalidad} onChange={handleChangenacionalidad} 
                                                >
                                                    {nationality.map((row: any, index: any) => {
                                                        return (
                                                            <MenuItem key={index} value={row.value}>{row.label}</MenuItem>
                                                        )
                                                    })}
                                                </TextField>
                                            </Grid>
                                        </Grid>
                                    </Box>
                                </TabPanel>
                                <TabPanel value="2">
                                    <Box sx={{ flexGrow: 1 }}>
                                        <Grid container spacing={2}>
                                            <Grid container item md={4} >
                                                <TextField id="outlined-basic" label="Escoge un departamento" variant="outlined"
                                                    select fullWidth value={region} onChange={handleChangeRegion}
                                                >
                                                    {regionList.map((row: any, index: any) => {
                                                        return (
                                                            <MenuItem key={index} value={row.value}>{row.name}</MenuItem>
                                                        )
                                                    })}

                                                </TextField>
                                            </Grid>
                                            <Grid container item md={4} >
                                                <TextField id="outlined-basic" label="Escoge una provincia" variant="outlined"
                                                    select fullWidth value={provincia} onChange={handleChangeProvincia}
                                                >
                                                    {provinciaList.map((row: any, index: any) => {
                                                        return (
                                                            <MenuItem key={index} value={row.value}>{row.name}</MenuItem>
                                                        )
                                                    })}

                                                </TextField>
                                            </Grid>
                                            <Grid container item md={4} >
                                                <TextField id="outlined-basic" label="Escoge un distrito" variant="outlined"
                                                    select fullWidth value={distrito} onChange={handleChangeDistrito}
                                                >
                                                    {distritoList.map((row: any, index: any) => {
                                                        return (
                                                            <MenuItem key={index} value={row.value}>{row.name}</MenuItem>
                                                        )
                                                    })}

                                                </TextField>
                                            </Grid>
                                        </Grid>
                                        <Grid container spacing={2} mt={0.5}>
                                            <Grid container item md={12}>
                                                <TextField id="outlined-basic" label="Dirección" variant="outlined"
                                                    multiline fullWidth rows={4} value={direcLugar} onChange={handleChangeDirecLugar} />
                                            </Grid>
                                        </Grid>
                                    </Box>
                                </TabPanel>
                                <TabPanel value="3">
                                    <Box sx={{ flexGrow: 1 }}>
                                        <Grid container spacing={2}>
                                            <Grid container item md={4} >
                                                <TextField fullWidth id="outlined-basic" label="Correo" variant="outlined" value={correo} onChange={handleChangeCorreo} />
                                            </Grid>
                                            <Grid container item md={4} >
                                                <TextField fullWidth id="outlined-basic" label="Teléfono móvil" variant="outlined" value={telMovil} onChange={handleChangeTelMovil} />
                                            </Grid>
                                            <Grid container item md={4} >
                                                <TextField fullWidth id="outlined-basic" label="Teléfono fijo" variant="outlined" value={telFijo} onChange={handleChangeTelFijo} />
                                            </Grid>
                                        </Grid>
                                    </Box>
                                </TabPanel>
                            </TabContext>
                        </div>
                    </CardContent>
                </div >

                <div>
                    <Modal
                        keepMounted
                        open={abrirGuardarPaciente}
                        onClose={handleCloseRegistrarPacientes }
                        aria-labelledby="keep-mounted-modal-title"
                        aria-describedby="keep-mounted-modal-description"
                    >
                        <Box sx={style}>
                            <InputLabel style={{ color: "green", fontFamily: "Quicksand", fontWeight: "400", fontSize: "1.5rem" }} >Paciente Registrado!!!</InputLabel >
                            <Grid container item mt={2.5}>
                                <Grid item xs={4} ></Grid>
                                <Grid container item xs={8} spacing={2}>
                                    <Grid item xs={9} >
                                    </Grid>
                                    <Grid item xs={3} >
                                        <Button onClick={handleCloseRegistrarPacientes} variant="contained" style={{ backgroundColor: "rgb(0 85 169)", color: "white", fontFamily: "Quicksand", fontWeight: "900", fontSize: "1rem" }}>Cerrar</Button>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Box>
                    </Modal>
                </div>


                <div>
                    <Modal
                        keepMounted
                        open={abrirGuardarPacienteError}
                        onClose={handleCloseRegistrarPacientesError }
                        aria-labelledby="keep-mounted-modal-title"
                        aria-describedby="keep-mounted-modal-description"
                    >
                        <Box sx={style}>
                            <InputLabel style={{ color: "red", fontFamily: "Quicksand", fontWeight: "400", fontSize: "1.5rem" }} >Ups algo fallo, Revisa los campos faltantes!!!</InputLabel >
                            <Grid container item mt={2.5}>
                                <Grid item xs={4} ></Grid>
                                <Grid container item xs={8} spacing={2}>
                                    <Grid item xs={9} >
                                    </Grid>
                                    <Grid item xs={3} >
                                        <Button onClick={handleCloseRegistrarPacientesError} variant="contained" style={{ backgroundColor: "rgb(0 85 169)", color: "white", fontFamily: "Quicksand", fontWeight: "900", fontSize: "1rem" }}>Cerrar</Button>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Box>
                    </Modal>
                </div>


                <div>
                    <Modal
                        keepMounted
                        open={abrirGuardarErrorTipoDoc}
                        onClose={handleCloseErrorTipoDoc}
                        aria-labelledby="keep-mounted-modal-title"
                        aria-describedby="keep-mounted-modal-description"
                    >
                        <Box sx={style}>
                            <InputLabel style={{ color: "red", fontFamily: "Quicksand", fontWeight: "400", fontSize: "1.5rem" }} >Registro fallido!!!</InputLabel >
                            <Grid container item mt={2.5}>
                                <Grid item xs={4} ></Grid>
                                <Grid container item xs={8} spacing={2}>
                                    <Grid item xs={9} >

                                   
                                     <InputLabel style={{ color: "black", fontFamily: "Quicksand", fontWeight: "300", fontSize: "1.4rem" }} >Elija el tipo de documento</InputLabel >

                                    </Grid>
                                    <Grid item xs={3} >
                                        <Button onClick={handleCloseErrorTipoDoc} variant="contained" style={{ backgroundColor: "rgb(0 85 169)", color: "white", fontFamily: "Quicksand", fontWeight: "900", fontSize: "1rem" }}>Cerrar</Button>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Box>
                    </Modal>
                </div>

                <div>
                    <Modal
                        keepMounted
                        open={abrirGuardarErrorNumDoc}
                        onClose={handleCloseErrorNumDoc}
                        aria-labelledby="keep-mounted-modal-title"
                        aria-describedby="keep-mounted-modal-description"
                    >
                        <Box sx={style}>
                            <InputLabel style={{ color: "red", fontFamily: "Quicksand", fontWeight: "400", fontSize: "1.5rem" }} >Registro fallido!!!</InputLabel >
                            <Grid container item mt={2.5}>
                                <Grid item xs={4} ></Grid>
                                <Grid container item xs={8} spacing={2}>
                                    <Grid item xs={9} >

                                   
                                     <InputLabel style={{ color: "black", fontFamily: "Quicksand", fontWeight: "300", fontSize: "1.4rem" }} >Escriba numero de documento</InputLabel >

                                    </Grid>
                                    <Grid item xs={3} >
                                        <Button onClick={handleCloseErrorNumDoc} variant="contained" style={{ backgroundColor: "rgb(0 85 169)", color: "white", fontFamily: "Quicksand", fontWeight: "900", fontSize: "1rem" }}>Cerrar</Button>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Box>
                    </Modal>
                </div>


                <div>
                    <Modal
                        keepMounted
                        open={abrirGuardarErrorNom}
                        onClose={handleCloseErrorNom}
                        aria-labelledby="keep-mounted-modal-title"
                        aria-describedby="keep-mounted-modal-description"
                    >
                        <Box sx={style}>
                            <InputLabel style={{ color: "red", fontFamily: "Quicksand", fontWeight: "400", fontSize: "1.5rem" }} >Registro fallido!!!</InputLabel >
                            <Grid container item mt={2.5}>
                                <Grid item xs={4} ></Grid>
                                <Grid container item xs={8} spacing={2}>
                                    <Grid item xs={9} >

                                   
                                     <InputLabel style={{ color: "black", fontFamily: "Quicksand", fontWeight: "300", fontSize: "1.4rem" }} >Escriba un nombre</InputLabel >

                                    </Grid>
                                    <Grid item xs={3} >
                                        <Button onClick={handleCloseErrorNom} variant="contained" style={{ backgroundColor: "rgb(0 85 169)", color: "white", fontFamily: "Quicksand", fontWeight: "900", fontSize: "1rem" }}>Cerrar</Button>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Box>
                    </Modal>
                </div>

                <div>
                    <Modal
                        keepMounted
                        open={abrirGuardarErrorApePa}
                        onClose={handleCloseErrorApePa}
                        aria-labelledby="keep-mounted-modal-title"
                        aria-describedby="keep-mounted-modal-description"
                    >
                        <Box sx={style}>
                            <InputLabel style={{ color: "red", fontFamily: "Quicksand", fontWeight: "400", fontSize: "1.5rem" }} >Registro fallido!!!</InputLabel >
                            <Grid container item mt={2.5}>
                                <Grid item xs={4} ></Grid>
                                <Grid container item xs={8} spacing={2}>
                                    <Grid item xs={9} >

                                   
                                     <InputLabel style={{ color: "black", fontFamily: "Quicksand", fontWeight: "300", fontSize: "1.4rem" }} >Ingrese Apellido Paterno</InputLabel >

                                    </Grid>
                                    <Grid item xs={3} >
                                        <Button onClick={handleCloseErrorApePa} variant="contained" style={{ backgroundColor: "rgb(0 85 169)", color: "white", fontFamily: "Quicksand", fontWeight: "900", fontSize: "1rem" }}>Cerrar</Button>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Box>
                    </Modal>
                </div>

                <div>
                    <Modal
                        keepMounted
                        open={abrirGuardarErrorApeMa}
                        onClose={handleCloseErrorApeMa}
                        aria-labelledby="keep-mounted-modal-title"
                        aria-describedby="keep-mounted-modal-description"
                    >
                        <Box sx={style}>
                            <InputLabel style={{ color: "red", fontFamily: "Quicksand", fontWeight: "400", fontSize: "1.5rem" }} >Registro fallido!!!</InputLabel >
                            <Grid container item mt={2.5}>
                                <Grid item xs={4} ></Grid>
                                <Grid container item xs={8} spacing={2}>
                                    <Grid item xs={9} >

                                   
                                     <InputLabel style={{ color: "black", fontFamily: "Quicksand", fontWeight: "300", fontSize: "1.4rem" }} >Ingrese Apellido Materno</InputLabel >

                                    </Grid>
                                    <Grid item xs={3} >
                                        <Button onClick={handleCloseErrorApeMa} variant="contained" style={{ backgroundColor: "rgb(0 85 169)", color: "white", fontFamily: "Quicksand", fontWeight: "900", fontSize: "1rem" }}>Cerrar</Button>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Box>
                    </Modal>
                </div>


                <div>
                    <Modal
                        keepMounted
                        open={abrirGuardarErrorTelMovil}
                        onClose={handleCloseErrorTelMovil}
                        aria-labelledby="keep-mounted-modal-title"
                        aria-describedby="keep-mounted-modal-description"
                    >
                        <Box sx={style}>
                            <InputLabel style={{ color: "red", fontFamily: "Quicksand", fontWeight: "400", fontSize: "1.5rem" }} >Registro fallido!!!</InputLabel >
                            <Grid container item mt={2.5}>
                                <Grid item xs={4} ></Grid>
                                <Grid container item xs={8} spacing={2}>
                                    <Grid item xs={9} >

                                   
                                     <InputLabel style={{ color: "black", fontFamily: "Quicksand", fontWeight: "300", fontSize: "1.4rem" }} >Ingrese Telefono Movil</InputLabel >

                                    </Grid>
                                    <Grid item xs={3} >
                                        <Button onClick={handleCloseErrorTelMovil} variant="contained" style={{ backgroundColor: "rgb(0 85 169)", color: "white", fontFamily: "Quicksand", fontWeight: "900", fontSize: "1rem" }}>Cerrar</Button>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Box>
                    </Modal>
                </div>

                <div>
                    <Modal
                        keepMounted
                        open={abrirGuardarErrorFeNacimiento}
                        onClose={handleCloseErrorFeNacimiento}
                        aria-labelledby="keep-mounted-modal-title"
                        aria-describedby="keep-mounted-modal-description"
                    >
                        <Box sx={style}>
                            <InputLabel style={{ color: "red", fontFamily: "Quicksand", fontWeight: "400", fontSize: "1.5rem" }} >Registro fallido!!!</InputLabel >
                            <Grid container item mt={2.5}>
                                <Grid item xs={4} ></Grid>
                                <Grid container item xs={8} spacing={2}>
                                    <Grid item xs={9} >

                                   
                                     <InputLabel style={{ color: "black", fontFamily: "Quicksand", fontWeight: "300", fontSize: "1.4rem" }} >Escoja fecha de nacimiento</InputLabel >

                                    </Grid>
                                    <Grid item xs={3} >
                                        <Button onClick={handleCloseErrorFeNacimiento} variant="contained" style={{ backgroundColor: "rgb(0 85 169)", color: "white", fontFamily: "Quicksand", fontWeight: "900", fontSize: "1rem" }}>Cerrar</Button>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Box>
                    </Modal>
                </div>

                <div>
                    <Modal
                        keepMounted
                        open={abrirGuardarErrorNacionalidad}
                        onClose={handleCloseErrorNacionalidad}
                        aria-labelledby="keep-mounted-modal-title"
                        aria-describedby="keep-mounted-modal-description"
                    >
                        <Box sx={style}>
                            <InputLabel style={{ color: "red", fontFamily: "Quicksand", fontWeight: "400", fontSize: "1.5rem" }} >Registro fallido!!!</InputLabel >
                            <Grid container item mt={2.5}>
                                <Grid item xs={4} ></Grid>
                                <Grid container item xs={8} spacing={2}>
                                    <Grid item xs={9} >

                                   
                                     <InputLabel style={{ color: "black", fontFamily: "Quicksand", fontWeight: "300", fontSize: "1.4rem" }} >Elija una nacionalidad</InputLabel >

                                    </Grid>
                                    <Grid item xs={3} >
                                        <Button onClick={handleCloseErrorNacionalidad} variant="contained" style={{ backgroundColor: "rgb(0 85 169)", color: "white", fontFamily: "Quicksand", fontWeight: "900", fontSize: "1rem" }}>Cerrar</Button>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Box>
                    </Modal>
                </div>

                <div>
                    <Modal
                        keepMounted
                        open={abrirGuardarErrorRegion}
                        onClose={handleCloseErrorRegion}
                        aria-labelledby="keep-mounted-modal-title"
                        aria-describedby="keep-mounted-modal-description"
                    >
                        <Box sx={style}>
                            <InputLabel style={{ color: "red", fontFamily: "Quicksand", fontWeight: "400", fontSize: "1.5rem" }} >Registro fallido!!!</InputLabel >
                            <Grid container item mt={2.5}>
                                <Grid item xs={4} ></Grid>
                                <Grid container item xs={8} spacing={2}>
                                    <Grid item xs={9} >

                                   
                                     <InputLabel style={{ color: "black", fontFamily: "Quicksand", fontWeight: "300", fontSize: "1.4rem" }} >Elija una Region</InputLabel >

                                    </Grid>
                                    <Grid item xs={3} >
                                        <Button onClick={handleCloseErrorRegion} variant="contained" style={{ backgroundColor: "rgb(0 85 169)", color: "white", fontFamily: "Quicksand", fontWeight: "900", fontSize: "1rem" }}>Cerrar</Button>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Box>
                    </Modal>
                </div>

                <div>
                    <Modal
                        keepMounted
                        open={abrirGuardarErrorDistrito}
                        onClose={handleCloseErrorDistrito}
                        aria-labelledby="keep-mounted-modal-title"
                        aria-describedby="keep-mounted-modal-description"
                    >
                        <Box sx={style}>
                            <InputLabel style={{ color: "red", fontFamily: "Quicksand", fontWeight: "400", fontSize: "1.5rem" }} >Registro fallido!!!</InputLabel >
                            <Grid container item mt={2.5}>
                                <Grid item xs={4} ></Grid>
                                <Grid container item xs={8} spacing={2}>
                                    <Grid item xs={9} >

                                   
                                     <InputLabel style={{ color: "black", fontFamily: "Quicksand", fontWeight: "300", fontSize: "1.4rem" }} >Elija un distrito</InputLabel >

                                    </Grid>
                                    <Grid item xs={3} >
                                        <Button onClick={handleCloseErrorDistrito} variant="contained" style={{ backgroundColor: "rgb(0 85 169)", color: "white", fontFamily: "Quicksand", fontWeight: "900", fontSize: "1rem" }}>Cerrar</Button>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Box>
                    </Modal>
                </div>

                <div>
                    <Modal
                        keepMounted
                        open={abrirGuardarErrorDirecLugar}
                        onClose={handleCloseErrorDirecLugar}
                        aria-labelledby="keep-mounted-modal-title"
                        aria-describedby="keep-mounted-modal-description"
                    >
                        <Box sx={style}>
                            <InputLabel style={{ color: "red", fontFamily: "Quicksand", fontWeight: "400", fontSize: "1.5rem" }} >Registro fallido!!!</InputLabel >
                            <Grid container item mt={2.5}>
                                <Grid item xs={4} ></Grid>
                                <Grid container item xs={8} spacing={2}>
                                    <Grid item xs={9} >

                                   
                                     <InputLabel style={{ color: "black", fontFamily: "Quicksand", fontWeight: "300", fontSize: "1.4rem" }} >Escriba una direccion</InputLabel >

                                    </Grid>
                                    <Grid item xs={3} >
                                        <Button onClick={handleCloseErrorDirecLugar} variant="contained" style={{ backgroundColor: "rgb(0 85 169)", color: "white", fontFamily: "Quicksand", fontWeight: "900", fontSize: "1rem" }}>Cerrar</Button>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Box>
                    </Modal>
                </div>

                <div>
                    <Modal
                        keepMounted
                        open={abrirGuardarErrorProvincia}
                        onClose={handleCloseErrorProvincia}
                        aria-labelledby="keep-mounted-modal-title"
                        aria-describedby="keep-mounted-modal-description"
                    >
                        <Box sx={style}>
                            <InputLabel style={{ color: "red", fontFamily: "Quicksand", fontWeight: "400", fontSize: "1.5rem" }} >Registro fallido!!!</InputLabel >
                            <Grid container item mt={2.5}>
                                <Grid item xs={4} ></Grid>
                                <Grid container item xs={8} spacing={2}>
                                    <Grid item xs={9} >

                                   
                                     <InputLabel style={{ color: "black", fontFamily: "Quicksand", fontWeight: "300", fontSize: "1.4rem" }} >Elija una provincia</InputLabel >

                                    </Grid>
                                    <Grid item xs={3} >
                                        <Button onClick={handleCloseErrorProvincia} variant="contained" style={{ backgroundColor: "rgb(0 85 169)", color: "white", fontFamily: "Quicksand", fontWeight: "900", fontSize: "1rem" }}>Cerrar</Button>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Box>
                    </Modal>
                </div>

                <div>
                    <Modal
                        keepMounted
                        open={abrirGuardarErrorECivil}
                        onClose={handleCloseErrorECivil}
                        aria-labelledby="keep-mounted-modal-title"
                        aria-describedby="keep-mounted-modal-description"
                    >
                        <Box sx={style}>
                            <InputLabel style={{ color: "red", fontFamily: "Quicksand", fontWeight: "400", fontSize: "1.5rem" }} >Registro fallido!!!</InputLabel >
                            <Grid container item mt={2.5}>
                                <Grid item xs={4} ></Grid>
                                <Grid container item xs={8} spacing={2}>
                                    <Grid item xs={9} >

                                   
                                     <InputLabel style={{ color: "black", fontFamily: "Quicksand", fontWeight: "300", fontSize: "1.4rem" }} >Elija un estado civil</InputLabel >

                                    </Grid>
                                    <Grid item xs={3} >
                                        <Button onClick={handleCloseErrorECivil} variant="contained" style={{ backgroundColor: "rgb(0 85 169)", color: "white", fontFamily: "Quicksand", fontWeight: "900", fontSize: "1rem" }}>Cerrar</Button>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Box>
                    </Modal>
                </div>


                <div>
                    <Modal
                        keepMounted
                        open={abrirGuardarErrorCorreo}
                        onClose={handleCloseErrorCorreo}
                        aria-labelledby="keep-mounted-modal-title"
                        aria-describedby="keep-mounted-modal-description"
                    >
                        <Box sx={style}>
                            <InputLabel style={{ color: "red", fontFamily: "Quicksand", fontWeight: "400", fontSize: "1.5rem" }} >Registro fallido!!!</InputLabel >
                            <Grid container item mt={2.5}>
                                <Grid item xs={4} ></Grid>
                                <Grid container item xs={8} spacing={2}>
                                    <Grid item xs={9} >

                                   
                                     <InputLabel style={{ color: "black", fontFamily: "Quicksand", fontWeight: "300", fontSize: "1.4rem" }} >Coloque un correo</InputLabel >

                                    </Grid>
                                    <Grid item xs={3} >
                                        <Button onClick={handleCloseErrorCorreo} variant="contained" style={{ backgroundColor: "rgb(0 85 169)", color: "white", fontFamily: "Quicksand", fontWeight: "900", fontSize: "1rem" }}>Cerrar</Button>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Box>
                    </Modal>
                </div>

                <div>
                    <Modal
                        keepMounted
                        open={abrirGuardarErrorGenero}
                        onClose={handleCloseErrorGenero}
                        aria-labelledby="keep-mounted-modal-title"
                        aria-describedby="keep-mounted-modal-description"
                    >
                        <Box sx={style}>
                            <InputLabel style={{ color: "red", fontFamily: "Quicksand", fontWeight: "400", fontSize: "1.5rem" }} >Registro fallido!!!</InputLabel >
                            <Grid container item mt={2.5}>
                                <Grid item xs={4} ></Grid>
                                <Grid container item xs={8} spacing={2}>
                                    <Grid item xs={9} >

                                   
                                     <InputLabel style={{ color: "black", fontFamily: "Quicksand", fontWeight: "300", fontSize: "1.4rem" }} >Coloque un correo</InputLabel >

                                    </Grid>
                                    <Grid item xs={3} >
                                        <Button onClick={handleCloseErrorGenero} variant="contained" style={{ backgroundColor: "rgb(0 85 169)", color: "white", fontFamily: "Quicksand", fontWeight: "900", fontSize: "1rem" }}>Cerrar</Button>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Box>
                    </Modal>
                </div>


            </Contenido>
        </div>
    )

}


