import { Box, Button, Grid, InputLabel, MenuItem, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, Tooltip } from "@mui/material";
import React from "react";
import ReactToPrint from "react-to-print";
import { getAgreementsAllApi, getHeadquartersAllApi, reportExamMonthly } from "../../../api";
import { months } from "../../../constant";
import BackupRoundedIcon from '@mui/icons-material/BackupRounded';
import LocalPrintshopRoundedIcon from '@mui/icons-material/LocalPrintshopRounded';

export default function TbReporte() {
    const [rows, setRows] = React.useState<any[]>([]);

    const [dia, setDia] = React.useState<any>('');
    const [mes, setMes] = React.useState<any>('');
    const [anio, setAnio] = React.useState<any>('');

    const [convenioList, setConvenioList] = React.useState<any[]>([]);
    const [convenio, setConvenio] = React.useState<any>('');
    const [sedeList, setSedeList] = React.useState<any[]>([]);
    const [sede, setSede] = React.useState<any>('');



    React.useEffect(() => {
        getHeadquartersAllApi().then((ag: any) => {
            setSedeList(ag.data);
        });
        getAgreementsAllApi().then((ag: any) => {
            setConvenioList(ag.data);
        });
    }, [])
    const handleChangeDia = (event: React.ChangeEvent<HTMLInputElement>) => {
        setDia(event.target.value);
    };
    const handleChangeMes = (event: React.ChangeEvent<HTMLInputElement>) => {
        setMes(event.target.value);
    };
    const handleChangeAnio = (event: React.ChangeEvent<HTMLInputElement>) => {
        setAnio(event.target.value);
    };
    const handleChangeConvenio = (event: React.ChangeEvent<HTMLInputElement>) => {
        setConvenio(event.target.value);
    };
    const handleChangeSede = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSede(event.target.value);
    };


    const generaReporte = () => {
        let aux: any = [];

        reportExamMonthly(mes, anio, convenio, sede).then((x: any) => {
            if (x.status) {
                x.data.dates.forEach((y: any) => {
                    y.appointments.forEach((z: any) => {
                        aux.push({
                            fecha: y.date,
                            codigo: z.code,
                            dni: z.dni,
                            nombreCompleto: z.fullName,
                            edad: z.age,
                            servicio: z.services,
                            precio: z.totalPrice
                        })
                    })
                })
                setRows(aux);
                console.log(x)
            } else {
                alert(x.message.text)
            }

        })
    }
    let componente: any;
    return (
        <Grid container >
            <Box sx={{ width: '100%' }}>
                <Paper sx={{ width: '100%', borderRadius: "12px", overflowY: "scroll", maxHeight: "480px" }} >
                    <Grid container spacing={1} mt={2.5}>
                        <Grid item xs={0.5} mt={2.5}></Grid>
                        <Grid container item xs={4} mt={2.5} spacing={1}>
                            <Grid item xs={3}>
                                <TextField fullWidth id="outlined-basic" label="Dia" variant="outlined" value={dia} onChange={handleChangeDia} />
                            </Grid>
                            <Grid item xs={6}>
                                <TextField id="select-currency-native" select
                                    fullWidth variant={"outlined"} label="Mes"
                                    value={mes} onChange={handleChangeMes}
                                >
                                    {months.map((row: any, index: any) => {
                                        return (
                                            <MenuItem key={index} value={row.value}>{row.label}</MenuItem>
                                        )
                                    })}
                                </TextField>
                            </Grid>
                            <Grid item xs={3}>
                                <TextField fullWidth id="outlined-basic" label="Año" variant="outlined" value={anio} onChange={handleChangeAnio} />
                            </Grid>
                        </Grid>
                        <Grid container item xs={5} mt={2.5} spacing={1}>
                            <Grid item xs={6}>
                                <TextField id="outlined-basic" label="Convenio" variant="outlined"
                                    select fullWidth value={convenio} onChange={handleChangeConvenio}
                                >
                                    {convenioList.map((row: any, index: any) => {
                                        return (
                                            <MenuItem key={index} value={row.value}>{row.label} </MenuItem>
                                        )
                                    })}

                                </TextField>
                            </Grid>
                            <Grid item xs={6}>
                                <TextField id="outlined-basic" label="Sede" variant="outlined"
                                    select fullWidth value={sede} onChange={handleChangeSede}
                                >
                                    {sedeList.map((row: any, index: any) => {
                                        return (
                                            <MenuItem key={index} value={row.id}>{row.name} </MenuItem>
                                        )
                                    })}

                                </TextField>
                            </Grid>
                        </Grid>
                        <Grid container item xs={2} mt={2.5} spacing={1}>
                            <Grid item xs={6}>
                                <Tooltip title="Generar Reporte" followCursor>
                                    <Button onClick={generaReporte} fullWidth variant="contained" style={{ alignItems: "center", height: '5.4ch', backgroundColor: "#095CB4", color: "white", fontFamily: "Quicksand", fontWeight: "900", fontSize: "1.15rem" }}>
                                        <BackupRoundedIcon />
                                    </Button>
                                </Tooltip>
                            </Grid>
                            <Grid item xs={6}>
                                <ReactToPrint
                                    trigger={() => (
                                        <Tooltip title="Imprimir Reporte" followCursor>
                                            <Button fullWidth variant="contained" style={{ alignItems: "center", height: '5.4ch', backgroundColor: "#095CB4", color: "white", fontFamily: "Quicksand", fontWeight: "900", fontSize: "1.15rem" }}>
                                                <LocalPrintshopRoundedIcon />
                                            </Button>
                                        </Tooltip>

                                    )}
                                    content={() => componente}
                                />
                            </Grid>
                        </Grid>
                        <Grid item xs={0.5} mt={2.5}></Grid>
                    </Grid>
                    <br></br>
                    <Grid container >
                        <Box sx={{ width: '100%' }}
                            ref={(ins) => (componente = ins)}>
                            <Grid container mt={2.5} sx={{ placeContent: "center" }}>
                                <InputLabel style={{ color: "black", fontFamily: "Quicksand", fontWeight: "600", fontSize: "1.8rem" }} >REPORTE DE EXAMENES REALIZADOS - Redlab Perú</InputLabel >
                            </Grid>
                            <Grid container mt={2.5}>
                                <Grid item xs={0.5} mt={2.5}></Grid>
                                <Grid item xs={11} mt={2.5}>
                                    <TableContainer >
                                        <Table sx={{ minWidth: 750 }}
                                            aria-labelledby="tableTitle"
                                            size={'medium'}>
                                            <TableHead>
                                                <TableRow>
                                                    <TableCell
                                                        style={{ color: "black", fontFamily: "Quicksand", fontWeight: "500", fontSize: "1.1rem" }}>
                                                        FECHA
                                                    </TableCell>
                                                    <TableCell
                                                        style={{ color: "black", fontFamily: "Quicksand", fontWeight: "500", fontSize: "1.1rem" }}>
                                                        CODIGO
                                                    </TableCell>
                                                    <TableCell
                                                        style={{ color: "black", fontFamily: "Quicksand", fontWeight: "500", fontSize: "1.1rem" }}>
                                                        DNI
                                                    </TableCell>
                                                    <TableCell
                                                        style={{ color: "black", fontFamily: "Quicksand", fontWeight: "500", fontSize: "1rem" }}>
                                                        NOMBRES Y APELLIDOS
                                                    </TableCell>
                                                    <TableCell
                                                        style={{ color: "black", fontFamily: "Quicksand", fontWeight: "500", fontSize: "1.1rem" }}>
                                                        EDAD
                                                    </TableCell>
                                                    <TableCell
                                                        style={{ color: "black", fontFamily: "Quicksand", fontWeight: "500", fontSize: "1.1rem" }}>
                                                        SERVICIO
                                                    </TableCell>
                                                    <TableCell
                                                        style={{ color: "black", fontFamily: "Quicksand", fontWeight: "500", fontSize: "1.1rem" }}>
                                                        PRUEBAS
                                                    </TableCell>
                                                    <TableCell
                                                        style={{ color: "black", fontFamily: "Quicksand", fontWeight: "500", fontSize: "1.1rem" }}>
                                                        PRECIO UNIT.
                                                    </TableCell>
                                                    <TableCell
                                                        style={{ color: "black", fontFamily: "Quicksand", fontWeight: "500", fontSize: "1.1rem" }}>
                                                        TOTAL
                                                    </TableCell>
                                                </TableRow>
                                            </TableHead>
                                            <TableBody >
                                                {rows.map((row: any, index: any) =>
                                                    <TableRow
                                                        key={index}
                                                    >
                                                        <TableCell component="th" scope="row"
                                                            style={{ color: "black", fontFamily: "Quicksand", fontWeight: "400", fontSize: "1.1rem" }}
                                                        >
                                                            {row.fecha}
                                                        </TableCell>
                                                        <TableCell component="th" scope="row"
                                                            style={{ color: "black", fontFamily: "Quicksand", fontWeight: "400", fontSize: "1.1rem" }}
                                                        >
                                                            {row.codigo}
                                                        </TableCell>
                                                        <TableCell component="th" scope="row"
                                                            style={{ color: "black", fontFamily: "Quicksand", fontWeight: "400", fontSize: "1.1rem" }}
                                                        >
                                                            {row.dni}
                                                        </TableCell>
                                                        <TableCell component="th" scope="row"
                                                            style={{ color: "black", fontFamily: "Quicksand", fontWeight: "400", fontSize: "1.1rem" }}
                                                        >
                                                            {row.nombreCompleto}
                                                        </TableCell>
                                                        <TableCell component="th" scope="row"
                                                            style={{ color: "black", fontFamily: "Quicksand", fontWeight: "400", fontSize: "1.1rem" }}
                                                        >
                                                            {row.edad}
                                                        </TableCell>
                                                        <TableCell component="th" scope="row"
                                                            style={{ color: "black", fontFamily: "Quicksand", fontWeight: "400", fontSize: "1.1rem" }}
                                                        >
                                                            {row.servicio.map((x: any, index: any) =>
                                                                <div key={index} >{x.name}<hr /></div>
                                                            )}
                                                        </TableCell>
                                                        <TableCell component="th" scope="row"
                                                            style={{ color: "black", fontFamily: "Quicksand", fontWeight: "400", fontSize: "1.1rem" }}
                                                        >
                                                            {row.servicio.map((x: any, index: any) =>
                                                                <div key={index} >{x.examinations[0].name}<hr /></div>
                                                            )}
                                                        </TableCell>
                                                        <TableCell component="th" scope="row"
                                                            style={{ color: "black", fontFamily: "Quicksand", fontWeight: "400", fontSize: "1.1rem" }}
                                                        >
                                                            {row.servicio.map((x: any, index: any) =>
                                                                <div key={index} >{x.examinations[0].price}<hr /></div>
                                                            )}
                                                        </TableCell>
                                                        <TableCell component="th" scope="row"
                                                            style={{ color: "black", fontFamily: "Quicksand", fontWeight: "400", fontSize: "1.1rem" }}
                                                        >
                                                            {row.precio}
                                                        </TableCell>
                                                    </TableRow>
                                                )}
                                            </TableBody>
                                        </Table>
                                    </TableContainer>
                                </Grid>
                                <Grid item xs={0.5} mt={2.5}></Grid>
                            </Grid>
                        </Box>
                    </Grid>
                </Paper >
            </Box >
        </Grid>
    );
}


