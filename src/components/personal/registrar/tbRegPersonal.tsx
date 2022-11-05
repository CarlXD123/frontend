import { Backdrop, Button, CardContent, Fade, Grid, InputLabel, MenuItem, Modal, Tab, TextField, Typography } from "@mui/material";
import { Box } from "@mui/system";
import React, { ChangeEvent } from "react";
import { Contenido } from "../../Home";
import KeyboardBackspaceRoundedIcon from '@mui/icons-material/KeyboardBackspaceRounded';
import TabContext from '@material-ui/lab/TabContext';
import TabList from '@material-ui/lab/TabList';
import TabPanel from '@material-ui/lab/TabPanel';
import { getDistrictsForProvince, getHeadquartersAllApi, getProfessionsAllApi, getProvincesForRegion, getRegionsApi, getRolesApi, getSpecialitiesApi, getTuitionsApi, getTypeDocsApi, getTypeEmployeesApi, saveEmployeeApi, saveProfessionApi, saveSpecialityApi, saveTuitionApi, saveTypeEmployeeApi } from "../../../api";
import { civilStatus, genders, typeDirections } from "../../../constant";
import { Link } from "react-router-dom";
import { toBase64 } from "../../../util";


export default function TbRegPersonal() {
    const [values, setValues] = React.useState<string>("1");
    //#region GET-SET textfield

    const [tipoDocList, setTipoDocList] = React.useState<any[]>([]);
    const [tipoDoc, setTipoDoc] = React.useState<any>('');
    const [numDoc, setNumDoc] = React.useState<any>('');
    const [nombres, setNombres] = React.useState<any>('');
    const [apePa, setApePa] = React.useState<any>('');
    const [apeMa, setApeMa] = React.useState<any>('');
    const [telMovil, setTelMovil] = React.useState<any>('');
    const [telFijo, setTelFijo] = React.useState<any>('');
    const [genero, setGenero] = React.useState<any>('');
    const [estadoCivil, setEstadoCivil] = React.useState<any>('');
    const [feNacimiento, setFeNacimiento] = React.useState<any>('');
    const [feAdmision, setFeAdmision] = React.useState<any>('');

    const [regionList, setRegionList] = React.useState<any[]>([]);
    const [region, setRegion] = React.useState<any>('');
    const [provinciaList, setProvinciaList] = React.useState<any[]>([]);
    const [provincia, setProvincia] = React.useState<any>('');
    const [distritoList, setDistritoList] = React.useState<any[]>([]);
    const [distrito, setDistrito] = React.useState<any>('');
    const [direccion, setDireccion] = React.useState<any>('');
    const [referencia, setReferencia] = React.useState<any>('');
    const [direcLugar, setDirecLugar] = React.useState<any>('');
    const [abrirProvincia, setAbrirProvincia] = React.useState<any>(true);
    const [abrirDistrito, setAbrirDistrito] = React.useState<any>(true);



    const [especialidadList, setEspecialidadList] = React.useState<any[]>([]);
    const [especialidad, setEspecialidad] = React.useState<any>('');
    const [cargoList, setCargoList] = React.useState<any[]>([]);
    const [cargo, setCargo] = React.useState<any>('');
    const [profesionList, setProfesionList] = React.useState<any[]>([]);
    const [profesion, setProfesion] = React.useState<any>('');
    const [colegiatura1List, setColegiatura1List] = React.useState<any[]>([]);
    const [colegiatura2List, setColegiatura2List] = React.useState<any[]>([]);
    const [colegiatura1, setColegiatura1] = React.useState<any>('');
    const [colegiatura2, setColegiatura2] = React.useState<any>('');
    const [colegiaturaUno, setColegiaturaUno] = React.useState<any>('');
    const [colegiaturaDos, setColegiaturaDos] = React.useState<any>('');
    const [firma, setFirma] = React.useState<any>('');
    const [firmaFile, setFirmaFile] = React.useState<any>();

    const [correo, setCorreo] = React.useState<any>('');
    const [rolList, setRolList] = React.useState<any[]>([]);
    const [rol, setRol] = React.useState<any>('');
    const [sedeList, setSedeList] = React.useState<any[]>([]);
    const [sede, setSede] = React.useState<any>('');


    //#region crer en combos Especialidad - Cargo - Profesion - Colegiatura 1|2
    const [abrirEspecialidad, setAbrirEspecialidad] = React.useState<any>(false);
    const [nombreEspecialidad, setNombreEspecialidad] = React.useState<any>('');
    const [descripcionEspecialidad, setDescripcionEspecialidad] = React.useState<any>('');

    const [abrirCargo, setAbrirCargo] = React.useState<any>(false);
    const [nombreCargo, setNombreCargo] = React.useState<any>('');
    const [descripcionCargo, setDescripcionCargo] = React.useState<any>('');

    const [abrirProfesion, setAbrirProfesion] = React.useState<any>(false);
    const [abrirGuardarPersonal, setAbrirGuardarPersonal] = React.useState<any>(false);
    const [abrirGuardarPersonalError, setAbrirGuardarPersonalError] = React.useState<any>(false);
    const [nombreProfesion, setNombreProfesion] = React.useState<any>('');
    const [descripcionProfesion, setDescripcionProfesion] = React.useState<any>('');

    const [abrirColegiatura, setAbrirColegiatura] = React.useState<any>(false);
    const [nombreColegiatura, setNombreColegiatura] = React.useState<any>('');
    const [descripcionColegiatura, setDescripcionColegiatura] = React.useState<any>('');

    //#endregion

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
    const handleChangeNombres = (event: React.ChangeEvent<HTMLInputElement>) => {
        setNombres(event.target.value);
    };
    const handleChangeApePa = (event: React.ChangeEvent<HTMLInputElement>) => {
        setApePa(event.target.value);
    };
    const handleChangeApeMa = (event: React.ChangeEvent<HTMLInputElement>) => {
        setApeMa(event.target.value);
    };
    const handleChangeTelMovil = (event: React.ChangeEvent<HTMLInputElement>) => {
        setTelMovil(event.target.value);
    };
    const handleChangeTelFijo = (event: React.ChangeEvent<HTMLInputElement>) => {
        setTelFijo(event.target.value);
    };
    const handleChangeGenero = (event: React.ChangeEvent<HTMLInputElement>) => {
        setGenero(event.target.value);
    };
    const handleChangeEstadoCivil = (event: React.ChangeEvent<HTMLInputElement>) => {
        setEstadoCivil(event.target.value);
    };
    const handleChangeFeNacimiento = (event: React.ChangeEvent<HTMLInputElement>) => {
        setFeNacimiento(event.target.value);
    };
    const handleChangeFeAdmision = (event: React.ChangeEvent<HTMLInputElement>) => {
        setFeAdmision(event.target.value);
    };
    //#endregion

    //#region Segunda Vista(Domicilio)
    const handleChangeRegion = (event: React.ChangeEvent<HTMLInputElement>) => {
        setRegion(event.target.value);
        setProvincia("");
        setDistrito("");
        setAbrirProvincia(false);
        setAbrirDistrito(true);
        setDistritoList([]);
        getProvincesForRegion(event.target.value).then((ag: any) => {
            setProvinciaList(ag.data)
        })
    };
    const handleChangeProvincia = (event: React.ChangeEvent<HTMLInputElement>) => {
        setProvincia(event.target.value);
        setDistrito("");
        setAbrirDistrito(false);
        getDistrictsForProvince(event.target.value).then((ag: any) => {
            setDistritoList(ag.data)
        })
    };
    const handleChangeDistrito = (event: React.ChangeEvent<HTMLInputElement>) => {
        setDistrito(event.target.value);
    };

    const handleCloseAbrirGuardarPersonal = () => {
        setAbrirGuardarPersonal(false);
    }

    const handleCloseAbrirGuardarPersonalError = () => {
        setAbrirGuardarPersonalError(false);
    }

    const handleChangeDireccion = (event: React.ChangeEvent<HTMLInputElement>) => {
        setDireccion(event.target.value);
    };
    const handleChangeReferencia = (event: React.ChangeEvent<HTMLInputElement>) => {
        setReferencia(event.target.value);
    };
    const handleChangeDirecLugar = (event: React.ChangeEvent<HTMLInputElement>) => {
        setDirecLugar(event.target.value);
    };
    //#endregion

    //#region Tercera Vista(Profesion)
    const handleChangeEspecialidad = (event: React.ChangeEvent<HTMLInputElement>) => {
        setEspecialidad(event.target.value);
    };
    const handleChangeCargo = (event: React.ChangeEvent<HTMLInputElement>) => {
        setCargo(event.target.value);
    };
    const handleChangeProfesion = (event: React.ChangeEvent<HTMLInputElement>) => {
        setProfesion(event.target.value);
    };
    const handleChangeColegiatura1 = (event: React.ChangeEvent<HTMLInputElement>) => {
        setColegiatura1(event.target.value);
    };
    const handleChangeColegiatura2 = (event: React.ChangeEvent<HTMLInputElement>) => {
        setColegiatura2(event.target.value);
    };
    const handleChangeColegiaturaUno = (event: React.ChangeEvent<HTMLInputElement>) => {
        setColegiaturaUno(event.target.value);
    };
    const handleChangeColegiaturaDos = (event: React.ChangeEvent<HTMLInputElement>) => {
        setColegiaturaDos(event.target.value);
    };
    const handleChangefirma = (event: any) => {
        setFirma(event.target.value);
        setFirmaFile(event.target.files[0]);
    };
    //#endregion

    //#region Cuarta Vista(Usuario)
    const handleChangeCorreo = (event: React.ChangeEvent<HTMLInputElement>) => {
        setCorreo(event.target.value);
    };
    const handleChangeRol = (event: React.ChangeEvent<HTMLInputElement>) => {
        setRol(event.target.value);
    };
    const handleChangeSede = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSede(event.target.value);
    };
    //#endregion

    //#endregion

    //#region handle Crear Especialidad
    const handleOpenEspecialidad = () => {
        setAbrirEspecialidad(true);
        setNombreEspecialidad("");
        setDescripcionEspecialidad("");
    }
    const handleCloseEspecialidad = () => {
        setAbrirEspecialidad(false);
    }
    const handleChangeNombreEspecialidad = (event: React.ChangeEvent<HTMLInputElement>) => {
        setNombreEspecialidad(event.target.value)
    }
    const handleChangeDescripcionEspecialidad = (event: React.ChangeEvent<HTMLInputElement>) => {
        setDescripcionEspecialidad(event.target.value)
    }
    //#endregion

    //#region handle Crear Cargo
    const handleOpenCargo = () => {
        setAbrirCargo(true);
        setNombreCargo("");
        setDescripcionCargo("");
    }
    const handleCloseCargo = () => {
        setAbrirCargo(false);
    }
    const handleChangeNombreCargo = (event: React.ChangeEvent<HTMLInputElement>) => {
        setNombreCargo(event.target.value)
    }
    const handleChangeDescripcionCargo = (event: React.ChangeEvent<HTMLInputElement>) => {
        setDescripcionCargo(event.target.value)
    }
    //#endregion

    //#region handle Crear Profesion
    const handleOpenProfesion = () => {
        setAbrirProfesion(true);
        setNombreProfesion("");
        setDescripcionProfesion("");
    }
    const handleCloseProfesion = () => {
        setAbrirProfesion(false);
    }
    const handleChangeNombreProfesion = (event: React.ChangeEvent<HTMLInputElement>) => {
        setNombreProfesion(event.target.value)
    }
    const handleChangeDescripcionProfesion = (event: React.ChangeEvent<HTMLInputElement>) => {
        setDescripcionProfesion(event.target.value)
    }
    //#endregion

    //#region handle Crear Colegiatura
    const handleOpenColegiatura = () => {
        setAbrirColegiatura(true);
        setNombreColegiatura("");
        setDescripcionColegiatura("");
    }
    const handleCloseColegiatura = () => {
        setAbrirColegiatura(false);
    }
    const handleChangeNombreColegiatura = (event: React.ChangeEvent<HTMLInputElement>) => {
        setNombreColegiatura(event.target.value)
    }
    const handleChangeDescripcionColegiatura = (event: React.ChangeEvent<HTMLInputElement>) => {
        setDescripcionColegiatura(event.target.value)
    }
    //#endregion


    React.useEffect(() => {
        //#region llamadas al servicio
        getTypeDocsApi().then((ag: any) => {
            setTipoDocList(ag.data)
        });
        getRegionsApi().then((ag: any) => {
            setRegionList(ag.data);
        });
        getSpecialitiesApi().then((ag: any) => {
            setEspecialidadList(ag.data);
        });
        getTypeEmployeesApi().then((ag: any) => {
            setCargoList(ag.data);
        });
        getProfessionsAllApi().then((ag: any) => {
            setProfesionList(ag.data);
        });
        getTuitionsApi().then((ag: any) => {
            setColegiatura1List(ag.data);
            setColegiatura2List(ag.data);
        });
        getRolesApi().then((ag: any) => {
            setRolList(ag.data);
        });
        getHeadquartersAllApi().then((ag: any) => {
            setSedeList(ag.data);
        });

        //#endregion
    }, []);


    const crearEmpleado = async () => {
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
        if (estadoCivil == "") {
            mError += "Datos personales-Ingrese estado civil\n";
            error = true;
        }
        if (feNacimiento == "") {
            mError += "Datos personales-Ingrese Fecha Nacimiento\n";
            error = true;
        }
        if (feAdmision == "") {
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
        if (direccion == "") {
            mError += "Domicilio-Seleccione un tipo de direccion \n";
            error = true;
        }
        if (direcLugar == "") {
            mError += "Domicilio-Ingrese una direccion \n";
            error = true;
        }
        if (especialidad == "") {
            mError += "Profesion-Seleccione una especialidad \n";
            error = true;
        }
        if (cargo == "") {
            mError += "Profesion-Seleccione un cargo \n";
            error = true;
        }
        if (profesion == "") {
            mError += "Profesion-Seleccione una profesion \n";
            error = true;
        }
        if (colegiatura1 == "") {
            mError += "Profesion-Seleccione una colegiatura \n";
            error = true;
        }
        if (correo == "") {
            mError += "Profesion-Ingrese correo \n";
            error = true;
        }
        if (rol == "") {
            mError += "Profesion-Seleccione un rol \n";
            error = true;
        }
        if (sede == "") {
            mError += "Profesion-Seleccione una sede \n";
            error = true;
        }

        if (error) {
            alert(mError);
            return;
        }
        //#endregion 

        let data = {
            DistrictId: distrito,
            HeadquarterId: sede,
            ProfessionId: profesion,
            ProvinceId: provinciaList.filter((x: any) => x.id == provincia),
            RegionId: regionList.filter((x: any) => x.id == region),
            SpecialityId: especialidad,
            Tuition2Id: colegiatura2,
            TuitionId: colegiatura1,
            TypeDocId: tipoDoc,
            TypeEmployeeId: cargo,
            address: direccion,
            admissionDate: feAdmision,
            birthDate: feNacimiento,
            civilStatus: estadoCivil,
            dni: numDoc,
            gender: genero,
            lastNameM: apeMa,
            lastNameP: apePa,
            name: nombres,
            phoneNumber: telMovil,
            referencePoint: referencia,
            roles: rol,
            tlfNumber: telFijo,
            tuitionNumber: colegiatura1,
            tuitionNumber2: colegiatura2,
            typeDirection: direccion,
            digitalSignatureUrl: firma,
            username: correo
        }

        if (firma != "") {

            let daton = {
                ...data,
                file: {
                    base64: await toBase64(firmaFile),
                    path: firma.split("\\")[firma.split("\\").length-1]
                }
            }
            saveEmployeeApi(daton).then((x: any) => {
                if(x.status){
                    //alert(x.message.text);
                    setAbrirGuardarPersonal(true);
                    window.location.href = '/api/employee'
                }else{
                    //alert(x.message.text);
                    setAbrirGuardarPersonalError(true);
                }
            });
            return;
        }

        saveEmployeeApi(data).then((x: any) => {
            if(x.status){
                setAbrirGuardarPersonal(true);
                window.location.href = '/apps/employees'

            }else{
                //alert(x.message.text);
                setAbrirGuardarPersonalError(true);
            }
        });
    }
    const crearEspecialidad = () => {
        if (nombreEspecialidad == "") {
            alert("Ingrese nombre");
            return;
        }
        if (descripcionEspecialidad == "") {
            alert("Ingrese descripcion");
            return;
        }
        saveSpecialityApi({
            description: descripcionEspecialidad,
            name: nombreEspecialidad
        }).then((x: any) => {
            if (x.status) {
                alert(x.message.text);
                handleCloseEspecialidad();
                setNombreEspecialidad("");
                setDescripcionEspecialidad("");
                getSpecialitiesApi().then((ag: any) => {
                    setEspecialidadList(ag.data);
                });
            } else {
                alert(x.text);
                return;
            }
        })
    }
    const crearCargo = () => {
        if (nombreCargo == "") {
            alert("Ingrese nombre");
            return;
        }
        if (descripcionCargo == "") {
            alert("Ingrese descripcion");
            return;
        }
        saveTypeEmployeeApi({
            description: descripcionCargo,
            name: nombreCargo
        }).then((x: any) => {
            if (x.status) {
                alert(x.message.text);
                handleCloseCargo();
                setNombreCargo("");
                setDescripcionCargo("");
                getTypeEmployeesApi().then((ag: any) => {
                    setCargoList(ag.data);
                });
            } else {
                alert(x.text);
                return;
            }
        })
    }
    const crearProfesion = () => {
        if (nombreProfesion == "") {
            alert("Ingrese nombre");
            return;
        }
        if (descripcionProfesion == "") {
            alert("Ingrese descripcion");
            return;
        }
        saveProfessionApi({
            description: descripcionProfesion,
            name: nombreProfesion
        }).then((x: any) => {
            if (x.status) {
                alert(x.message.text);
                handleCloseProfesion();
                setNombreProfesion("");
                setDescripcionProfesion("");
                getProfessionsAllApi().then((ag: any) => {
                    setProfesionList(ag.data);
                });
            } else {
                alert(x.text);
                return;
            }
        })
    }
    const crearColegiatura = () => {
        if (nombreColegiatura == "") {
            alert("Ingrese nombre");
            return;
        }
        if (descripcionColegiatura == "") {
            alert("Ingrese descripcion");
            return;
        }
        saveTuitionApi({
            description: descripcionColegiatura,
            name: nombreColegiatura
        }).then((x: any) => {
            if (x.status) {
                alert(x.message.text);
                handleCloseColegiatura();
                setNombreColegiatura("");
                setDescripcionColegiatura("");
                getTuitionsApi().then((ag: any) => {
                    setColegiatura1List(ag.data);
                });
            } else {
                alert(x.text);
                return;
            }
        })
    }

    //#region fade
    const style = {
        position: 'absolute' as 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 400,
        bgcolor: 'white',
        border: '1px solid #white',
        borderRadius: "15px",
        boxShadow: 24,
        p: 4,
    };
    //#endregion

    return (
        <div className='tabla-componente card-table-general'>
            <Contenido>
                <Grid container style={{ alignItems: "center" }}>
                    <Grid container item >
                        <Link to={"/apps/employees"}>
                            <div style={{ display: "flex", alignItems: "center" }} >
                                <KeyboardBackspaceRoundedIcon style={{ color: "white", fontSize: "1.3rem", cursor: "pointer" }}></KeyboardBackspaceRoundedIcon>
                                <InputLabel style={{ color: "white", fontFamily: "Quicksand", fontWeight: "400", fontSize: "1.3rem", paddingLeft: "4px", cursor: "pointer" }} >Personal</InputLabel >
                            </div>
                        </Link>
                    </Grid>
                    <Grid container item style={{ alignItems: "center" }} mt={1.5}>
                        <Grid item xs md={8}>
                            <div style={{ color: "white", fontFamily: "Quicksand", fontWeight: "400", fontSize: "2.2rem" }} >Registrar personal</div >
                        </Grid>
                        <Grid item md={4} mt={1.5}>
                            <Button onClick={crearEmpleado} variant="contained" style={{ width: '20.5ch', height: '4.4ch', backgroundColor: "rgb(0 85 169)", color: "white", fontFamily: "Quicksand", fontWeight: "900", fontSize: "1.15rem" }}>Guardar</Button>
                        </Grid>
                    </Grid>
                    <Grid container item style={{ alignItems: "center" }} mt={0.3}>
                        <Grid item >
                            <InputLabel style={{ color: "white", fontFamily: "Quicksand", fontWeight: "400", fontSize: "1rem" }} >Detalle del personal</InputLabel >
                        </Grid>
                    </Grid>
                </Grid>
                <br></br>
                <div>
                    <CardContent style={{ backgroundColor: "white", borderRadius: "12px" }}>
                        <div>
                            <TabContext value={values}>
                                <Box>
                                    <TabList scrollButtons="auto" variant="scrollable" indicatorColor="primary" textColor="primary" onChange={handleChange} >
                                        <Tab className="h-64 normal-case" label="Datos personales" value="1" />
                                        <Tab className="h-64 normal-case" label="Domicilio" value="2" />
                                        <Tab className="h-64 normal-case" label="Profesión" value="3" />
                                        <Tab className="h-64 normal-case" label="Usuario" value="4" />
                                    </TabList>
                                </Box>
                                <TabPanel value="1">
                                    <Box sx={{ flexGrow: 1 }}>
                                        <Grid container spacing={2}>
                                            <Grid container item md={6} >
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
                                            <Grid container item md={6}>
                                                <TextField fullWidth id="outlined-basic" label="Nro Documento" variant="outlined" value={numDoc} onChange={handleChangeNumDoc} />
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
                                            <Grid container item md={6}>
                                                <TextField fullWidth id="outlined-basic" label="Teléfono móvil" variant="outlined" value={telMovil} onChange={handleChangeTelMovil} />
                                            </Grid>
                                            <Grid container item md={6}>
                                                <TextField fullWidth id="outlined-basic" label="Teléfono fijo" variant="outlined" value={telFijo} onChange={handleChangeTelFijo} />
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
                                            <Grid container item md={6}>
                                                <TextField type="date" fullWidth id="outlined-basic" label="Fecha de nacimiento" focused variant="outlined" value={feNacimiento} onChange={handleChangeFeNacimiento} />
                                            </Grid>
                                            <Grid container item md={6}>
                                                <TextField type="date" fullWidth id="outlined-basic" label="Fecha de admisión" focused variant="outlined" value={feAdmision} onChange={handleChangeFeAdmision} />
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
                                                    select fullWidth value={provincia} onChange={handleChangeProvincia} disabled={abrirProvincia}
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
                                                    select fullWidth value={distrito} onChange={handleChangeDistrito} disabled={abrirDistrito}
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
                                            <Grid container item md={6} >
                                                <TextField id="outlined-basic" label="Tipo de dirección" variant="outlined"
                                                    select fullWidth value={direccion} onChange={handleChangeDireccion}
                                                >
                                                    {typeDirections.map((row: any, index: any) => {
                                                        return (
                                                            <MenuItem key={index} value={row.value}>{row.label} </MenuItem>
                                                        )
                                                    })}
                                                </TextField>
                                            </Grid>
                                            <Grid container item md={6}>
                                                <TextField fullWidth id="outlined-basic" label="Punto de referencia" variant="outlined" value={referencia} onChange={handleChangeReferencia} />
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
                                                <TextField id="outlined-basic" label="Especialidad" variant="outlined"
                                                    select fullWidth value={especialidad} onChange={handleChangeEspecialidad}
                                                >
                                                    <MenuItem value="">
                                                        <Button onClick={handleOpenEspecialidad} variant="contained" style={{ width: '20.5ch', height: '4.4ch', backgroundColor: "rgb(0 85 169)", color: "white", fontFamily: "Quicksand", fontWeight: "900", fontSize: "1.15rem" }}>Crear Nuevo</Button>
                                                    </MenuItem>
                                                    {especialidadList.map((row: any, index: any) => {
                                                        return (
                                                            <MenuItem key={index} value={row.value}>{row.name}</MenuItem>
                                                        )
                                                    })}
                                                </TextField>
                                            </Grid>
                                            <Grid container item md={4} >
                                                <TextField id="outlined-basic" label="Cargo" variant="outlined"
                                                    select fullWidth value={cargo} onChange={handleChangeCargo}
                                                >
                                                    <MenuItem value="">
                                                        <Button onClick={handleOpenCargo} variant="contained" style={{ width: '20.5ch', height: '4.4ch', backgroundColor: "rgb(0 85 169)", color: "white", fontFamily: "Quicksand", fontWeight: "900", fontSize: "1.15rem" }}>Crear Nuevo</Button>
                                                    </MenuItem>
                                                    {cargoList.map((row: any, index: any) => {
                                                        return (
                                                            <MenuItem key={index} value={row.value}>{row.name}</MenuItem>
                                                        )
                                                    })}
                                                </TextField>
                                            </Grid>
                                            <Grid container item md={4} >
                                                <TextField id="outlined-basic" label="Profesión" variant="outlined"
                                                    select fullWidth value={profesion} onChange={handleChangeProfesion}
                                                >
                                                    <MenuItem value="">
                                                        <Button onClick={handleOpenProfesion} variant="contained" style={{ width: '20.5ch', height: '4.4ch', backgroundColor: "rgb(0 85 169)", color: "white", fontFamily: "Quicksand", fontWeight: "900", fontSize: "1.15rem" }}>Crear Nuevo</Button>
                                                    </MenuItem>
                                                    {profesionList.map((row: any, index: any) => {
                                                        return (
                                                            <MenuItem key={index} value={row.value}>{row.name}</MenuItem>
                                                        )
                                                    })}
                                                </TextField>
                                            </Grid>
                                        </Grid>
                                        <Grid container spacing={2} mt={0.5}>
                                            <Grid container item md={6} >
                                                <TextField id="outlined-basic" label="Colegiatura 1" variant="outlined"
                                                    select fullWidth value={colegiatura1} onChange={handleChangeColegiatura1}
                                                >
                                                    <MenuItem value="">
                                                        <Button onClick={handleOpenColegiatura} variant="contained" style={{ width: '20.5ch', height: '4.4ch', backgroundColor: "rgb(0 85 169)", color: "white", fontFamily: "Quicksand", fontWeight: "900", fontSize: "1.15rem" }}>Crear Nuevo</Button>
                                                    </MenuItem>
                                                    {colegiatura1List.map((row: any, index: any) => {
                                                        return (
                                                            <MenuItem key={index} value={row.value}>{row.name}</MenuItem>
                                                        )
                                                    })}
                                                </TextField>
                                            </Grid>
                                            <Grid container item md={6}>
                                                <TextField fullWidth id="outlined-basic" label="Nro de colegiatura 1" variant="outlined" value={colegiaturaUno} onChange={handleChangeColegiaturaUno} />
                                            </Grid>
                                        </Grid>
                                        <Grid container spacing={2} mt={0.5}>
                                            <Grid container item md={6} >
                                                <TextField id="outlined-basic" label="Colegiatura 2" variant="outlined"
                                                    select fullWidth value={colegiatura2} onChange={handleChangeColegiatura2}
                                                >
                                                    <MenuItem value="">
                                                        <Button onClick={handleOpenColegiatura} variant="contained" style={{ width: '20.5ch', height: '4.4ch', backgroundColor: "rgb(0 85 169)", color: "white", fontFamily: "Quicksand", fontWeight: "900", fontSize: "1.15rem" }}>Crear Nuevo</Button>
                                                    </MenuItem>
                                                    {colegiatura2List.map((row: any, index: any) => {
                                                        return (
                                                            <MenuItem key={index} value={row.value}>{row.name}</MenuItem>
                                                        )
                                                    })}
                                                </TextField>
                                            </Grid>
                                            <Grid container item md={6}>
                                                <TextField fullWidth id="outlined-basic" label="Nro de colegiatura 2" variant="outlined" value={colegiaturaDos} onChange={handleChangeColegiaturaDos} />
                                            </Grid>
                                        </Grid>
                                        <Grid container spacing={2} mt={0.5}>
                                            <Grid container item md={12}>
                                                <TextField type="file" id="outlined-basic" focused label="Firma digital" variant="outlined" fullWidth value={firma} onChange={handleChangefirma} />
                                            </Grid>
                                        </Grid>
                                    </Box>
                                </TabPanel>
                                <TabPanel value="4">
                                    <Box sx={{ flexGrow: 1 }}>
                                        <Grid container spacing={2}>
                                            <Grid container item md={4} >
                                                <TextField fullWidth id="outlined-basic" label="Correo" variant="outlined" value={correo} onChange={handleChangeCorreo} />
                                            </Grid>
                                            <Grid container item md={4} >
                                                <TextField id="outlined-basic" label="Rol" variant="outlined"
                                                    select fullWidth value={rol} onChange={handleChangeRol}
                                                    helperText="Por favor seleccione uno"
                                                >
                                                    {rolList.map((row: any, index: any) => {
                                                        return (
                                                            <MenuItem key={index} value={row.value}>{row.name}</MenuItem>
                                                        )
                                                    })}
                                                </TextField>
                                            </Grid>
                                            <Grid container item md={4} >
                                                <TextField id="outlined-basic" label="Sede" variant="outlined"
                                                    select fullWidth value={sede} onChange={handleChangeSede}
                                                    helperText="Por favor seleccione uno"
                                                >
                                                    {sedeList.map((row: any, index: any) => {
                                                        return (
                                                            <MenuItem key={index} value={row.id}>{row.name}</MenuItem>
                                                        )
                                                    })}
                                                </TextField>
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
                        open={abrirEspecialidad}
                        onClose={handleCloseEspecialidad}
                        aria-labelledby="keep-mounted-modal-title"
                        aria-describedby="keep-mounted-modal-description"
                    >
                        <Box sx={style}>
                            <InputLabel style={{ color: "black", fontFamily: "Quicksand", fontWeight: "400", fontSize: "1.5rem" }} >Nueva especialidad</InputLabel >

                            <Grid container item xs mt={2.5}>
                                <TextField fullWidth id="outlined-basic" label="Nombre" variant="outlined" value={nombreEspecialidad} onChange={handleChangeNombreEspecialidad} />
                            </Grid>
                            <Grid container item xs mt={1.5}>
                                <TextField fullWidth id="outlined-basic" label="Descripción" variant="outlined" value={descripcionEspecialidad} onChange={handleChangeDescripcionEspecialidad} />
                            </Grid>
                            <Grid container item xs mt={2.5}>
                                <Grid item xs={4} ></Grid>
                                <Grid container item xs={8} spacing={2}>
                                    <Grid item xs={6} >
                                        <Button onClick={handleCloseEspecialidad} variant="contained" style={{ backgroundColor: "rgb(0 85 169)", color: "white", fontFamily: "Quicksand", fontWeight: "900", fontSize: "1rem" }}>Cancelar</Button>
                                    </Grid>
                                    <Grid item xs={6} >
                                        <Button onClick={crearEspecialidad} variant="contained" style={{ backgroundColor: "rgb(0 85 169)", color: "white", fontFamily: "Quicksand", fontWeight: "900", fontSize: "1rem" }}>Guardar</Button>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Box>
                    </Modal>
                </div>
                <div>
                    <Modal
                        keepMounted
                        open={abrirCargo}
                        onClose={handleCloseCargo}
                        aria-labelledby="keep-mounted-modal-title"
                        aria-describedby="keep-mounted-modal-description"
                    >
                        <Box sx={style}>
                            <InputLabel style={{ color: "black", fontFamily: "Quicksand", fontWeight: "400", fontSize: "1.5rem" }} >Nuevo cargo</InputLabel >

                            <Grid container item xs mt={2.5}>
                                <TextField fullWidth id="outlined-basic" label="Nombre" variant="outlined" value={nombreCargo} onChange={handleChangeNombreCargo} />
                            </Grid>
                            <Grid container item xs mt={1.5}>
                                <TextField fullWidth id="outlined-basic" label="Descripción" variant="outlined" value={descripcionCargo} onChange={handleChangeDescripcionCargo} />
                            </Grid>
                            <Grid container item xs mt={2.5}>
                                <Grid item xs={4} ></Grid>
                                <Grid container item xs={8} spacing={2}>
                                    <Grid item xs={6} >
                                        <Button onClick={handleCloseCargo} variant="contained" style={{ backgroundColor: "rgb(0 85 169)", color: "white", fontFamily: "Quicksand", fontWeight: "900", fontSize: "1rem" }}>Cancelar</Button>
                                    </Grid>
                                    <Grid item xs={6} >
                                        <Button onClick={crearCargo} variant="contained" style={{ backgroundColor: "rgb(0 85 169)", color: "white", fontFamily: "Quicksand", fontWeight: "900", fontSize: "1rem" }}>Guardar</Button>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Box>
                    </Modal>
                </div>
                <div>
                    <Modal
                        keepMounted
                        open={abrirProfesion}
                        onClose={handleCloseProfesion}
                        aria-labelledby="keep-mounted-modal-title"
                        aria-describedby="keep-mounted-modal-description"
                    >
                        <Box sx={style}>
                            <InputLabel style={{ color: "black", fontFamily: "Quicksand", fontWeight: "400", fontSize: "1.5rem" }} >Nueva profesión</InputLabel >

                            <Grid container item xs mt={2.5}>
                                <TextField fullWidth id="outlined-basic" label="Nombre" variant="outlined" value={nombreProfesion} onChange={handleChangeNombreProfesion} />
                            </Grid>
                            <Grid container item xs mt={1.5}>
                                <TextField fullWidth id="outlined-basic" label="Descripción" variant="outlined" value={descripcionProfesion} onChange={handleChangeDescripcionProfesion} />
                            </Grid>
                            <Grid container item xs mt={2.5}>
                                <Grid item xs={4} ></Grid>
                                <Grid container item xs={8} spacing={2}>
                                    <Grid item xs={6} >
                                        <Button onClick={handleCloseProfesion} variant="contained" style={{ backgroundColor: "rgb(0 85 169)", color: "white", fontFamily: "Quicksand", fontWeight: "900", fontSize: "1rem" }}>Cancelar</Button>
                                    </Grid>
                                    <Grid item xs={6} >
                                        <Button onClick={crearProfesion} variant="contained" style={{ backgroundColor: "rgb(0 85 169)", color: "white", fontFamily: "Quicksand", fontWeight: "900", fontSize: "1rem" }}>Guardar</Button>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Box>
                    </Modal>
                </div>
                <div>
                    <Modal
                        keepMounted
                        open={abrirColegiatura}
                        onClose={handleCloseColegiatura}
                        aria-labelledby="keep-mounted-modal-title"
                        aria-describedby="keep-mounted-modal-description"
                    >
                        <Box sx={style}>
                            <InputLabel style={{ color: "black", fontFamily: "Quicksand", fontWeight: "400", fontSize: "1.5rem" }} >Nueva colegiatura</InputLabel >

                            <Grid container item xs mt={2.5}>
                                <TextField fullWidth id="outlined-basic" label="Nombre" variant="outlined" value={nombreColegiatura} onChange={handleChangeNombreColegiatura} />
                            </Grid>
                            <Grid container item xs mt={1.5}>
                                <TextField fullWidth id="outlined-basic" label="Descripción" variant="outlined" value={descripcionColegiatura} onChange={handleChangeDescripcionColegiatura} />
                            </Grid>
                            <Grid container item xs mt={2.5}>
                                <Grid item xs={4} ></Grid>
                                <Grid container item xs={8} spacing={2}>
                                    <Grid item xs={6} >
                                        <Button onClick={handleCloseColegiatura} variant="contained" style={{ backgroundColor: "rgb(0 85 169)", color: "white", fontFamily: "Quicksand", fontWeight: "900", fontSize: "1rem" }}>Cancelar</Button>
                                    </Grid>
                                    <Grid item xs={6} >
                                        <Button onClick={crearColegiatura} variant="contained" style={{ backgroundColor: "rgb(0 85 169)", color: "white", fontFamily: "Quicksand", fontWeight: "900", fontSize: "1rem" }}>Guardar</Button>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Box>
                    </Modal>
                </div>

                <div>
                    <Modal
                        keepMounted
                        open={abrirGuardarPersonal}
                        onClose={handleCloseAbrirGuardarPersonal}
                        aria-labelledby="keep-mounted-modal-title"
                        aria-describedby="keep-mounted-modal-description"
                    >
                        <Box sx={style}>
                            <InputLabel style={{ color: "green", fontFamily: "Quicksand", fontWeight: "400", fontSize: "1.5rem" }} >Registro Exitoso!!!</InputLabel >
                            <Grid container item mt={2.5}>
                                <Grid item xs={4} ></Grid>
                                <Grid container item xs={8} spacing={2}>
                                    <Grid item xs={3} >
                                        <Button onClick={handleCloseAbrirGuardarPersonal} variant="contained" style={{ backgroundColor: "rgb(0 85 169)", color: "white", fontFamily: "Quicksand", fontWeight: "900", fontSize: "1rem" }}>Cerrar</Button>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Box>
                    </Modal>
                </div>

                <div>
                    <Modal
                        keepMounted
                        open={abrirGuardarPersonalError}
                        onClose={handleCloseAbrirGuardarPersonalError}
                        aria-labelledby="keep-mounted-modal-title"
                        aria-describedby="keep-mounted-modal-description"
                    >
                        <Box sx={style}>
                            <InputLabel style={{ color: "red", fontFamily: "Quicksand", fontWeight: "400", fontSize: "1.5rem" }} >Registro Fallido!!!</InputLabel >
                            <Grid container item mt={2.5}>
                                <Grid item xs={4} ></Grid>
                                <Grid container item xs={8} spacing={2}>
                                    <Grid item xs={3} >
                                        <Button onClick={handleCloseAbrirGuardarPersonalError} variant="contained" style={{ backgroundColor: "rgb(0 85 169)", color: "white", fontFamily: "Quicksand", fontWeight: "900", fontSize: "1rem" }}>Cerrar</Button>
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


