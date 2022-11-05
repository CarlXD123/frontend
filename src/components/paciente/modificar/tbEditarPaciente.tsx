import { Button, CardContent, Grid, InputLabel, MenuItem, Tab, TextField } from "@mui/material";
import { Box } from "@mui/system";
import React, { ChangeEvent } from "react";
import { Contenido } from "../../Home";
import KeyboardBackspaceRoundedIcon from '@mui/icons-material/KeyboardBackspaceRounded';
import TabContext from '@material-ui/lab/TabContext';
import TabList from '@material-ui/lab/TabList';
import TabPanel from '@material-ui/lab/TabPanel';
import { getDistrictsForProvince, savePatientApi, getProvincesForRegion, getRegionsApi, getTypeDocsApi, getPatientApi, editPatientApi } from "../../../api";
import { civilStatus, genders, nationality } from "../../../constant";
import { Link, useParams } from "react-router-dom";
import moment from "moment";

export default function TbEditarPaciente() {

    const { id, userid } = useParams();

    const getAgeFromBirthday = (birthday: any) => {
        if (birthday) {
            let totalMonths = +moment().diff(birthday, 'months');
            let years = totalMonths / 12;
            let months = totalMonths % 12;
            if (months !== 0) {
                return parseInt(years + "");
            }
            return years;
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

    React.useEffect(() => {
        //#region llamadas al servicio
        getTypeDocsApi().then((ag: any) => {
            setTipoDocList(ag.data)
        });
        getRegionsApi().then((ag: any) => {
            setRegionList(ag.data);
        });
        getPatientApi(id).then((ag: any) => {
            setTipoDoc(ag.data.typeDoc.id)
            setNumDoc(ag.data.typeDoc.dni)
            setNombres(ag.data.person.name)
            setApePa(ag.data.person.lastNameP)
            setApeMa(ag.data.person.lastNameM)
            setTelMovil(ag.data.person.phoneNumber)
            setTelFijo(ag.data.person.tlfNumber)
            if(ag.data.person.gender!="" || ag.data.person.gender!=null){
                setGenero(ag.data.person.gender)
            }else{
                setGenero("")
            }
            if(ag.data.person.civilStatus!="" || ag.data.person.civilStatus!=null){
               setEstadoCivil(ag.data.person.civilStatus)
            }else{
                setEstadoCivil("")
            }            
            setFeNacimiento(ag.data.person.birthDateUS)
            setEdad(getAgeFromBirthday(ag.data.person.birthDateUS))
            setNacionalidad(ag.data.person.nationality == null ? "" : ag.data.person.nationality)
            setRegion(ag.data.region.value == null || ag.data.region.value == "" ? "" : ag.data.region.value)
            if (ag.data.region.value != null || ag.data.region.value != "") {
                getProvincesForRegion(ag.data.region.value).then((x: any) => {
                    setProvinciaList(x.data)
                })
            } else {
                setProvincia("")
            }
            setProvincia(ag.data.province.value == null || ag.data.province.value == "" ? "" : ag.data.province.value)
            if (ag.data.province.value != null || ag.data.province.value != "") {
                getDistrictsForProvince(ag.data.province.value).then((x: any) => {
                    setDistritoList(x.data)
                })
            } else {
                setDistrito("")
            }
            setDistrito(ag.data.district.value == null || ag.data.district.value == "" ? "" : ag.data.district.value)
            setDirecLugar(ag.data.person.address)
            setCorreo(ag.data.user.username)
            setTelMovil(ag.data.person.phoneNumber)
            setTelFijo(ag.data.person.tlfNumber)
        })
        //#endregion
    }, []);

    const crearPaciente = () => {
        let mError = "LLenar Campos: \n";
        let error = false;
        //#region validaciones
        if (tipoDoc == "") {
            mError += "Datos personales-Seleccione tipo de documento\n";
            error = true;
        }
        if (numDoc == "") {
            mError += "Datos personales-Ingrese numero de doc\n";
            error = true;
        }
        if (nombres == "") {
            mError += "Datos personales-Ingrese nombre\n";
            error = true;
        }
        if (apePa == "") {
            mError += "Datos personales-Ingrese apellido paterno\n";
            error = true;
        }
        if (apeMa == "") {
            mError += "Datos personales-Ingrese apellido materno\n";
            error = true;
        }
        if (telMovil == "") {
            mError += "Datos personales-Ingrese telefono movil\n";
            error = true;
        }
        if (genero == "") {
            mError += "Datos personales-Ingrese genero\n";
            error = true;
        }
        if (feNacimiento == "") {
            mError += "Datos personales-Ingrese Fecha Nacimiento\n";
            error = true;
        }
        if (nacionalidad == "") {
            mError += "Datos personales-Ingrese Fecha admision\n";
            error = true;
        }
        if (region == "") {
            mError += "Domicilio-Seleccione un departamento \n";
            error = true;
        }
        if (provincia == "") {
            mError += "Domicilio-Seleccione una provincia \n";
            error = true;
        }
        if (distrito == "") {
            mError += "Domicilio-Seleccione un distrito \n";
            error = true;
        }
        if (direcLugar == "") {
            mError += "Domicilio-Ingrese una direccion \n";
            error = true;
        }
        if (correo == "") {
            mError += "Datos de contacto-Ingrese correo \n";
            error = true;
        }
        if (error) {
            alert(mError);
            return;
        }
        //#endregion 

        let data = {
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
        editPatientApi(data, userid).then((x: any) => {
            if (x.status) {
                alert(x.message.text);
                window.location.href = '/apps/patients'
            } else {
                alert(x.message.text);
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
                        <Grid item  md={8}>
                            <div style={{ color: "white", fontFamily: "Quicksand", fontWeight: "400", fontSize: "2.2rem" }} >{nombres + " " + apePa + " " + apeMa}</div>
                        </Grid>
                        <Grid item  md={4}>
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
                                    <TabList scrollButtons="auto" variant="scrollable" indicatorColor="primary" textColor="primary" onChange={handleChange}>
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
                                                <TextField fullWidth id="outlined-basic" label="Fecha de admisión" variant="outlined"
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
            </Contenido>
        </div>
    )

}


