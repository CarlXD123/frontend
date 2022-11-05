import { Box, Button, CardContent, Grid, InputLabel, MenuItem, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, Typography } from "@mui/material";
import { Link, useParams } from "react-router-dom";
import { Contenido } from "../../Home";
import KeyboardBackspaceRoundedIcon from '@mui/icons-material/KeyboardBackspaceRounded';
import React from "react";
import { getExaminationValuesByExamId, getAgreementsListPriceApi, getSpecialitiesApi, getExamValuesApi, getAppointmentApi, attendAppointmentApi } from "../../../api";

import MuiAccordionDetails from '@mui/material/AccordionDetails';
import { styled } from '@mui/material/styles';
import MuiAccordion, { AccordionProps } from '@mui/material/Accordion';
import ArrowForwardIosSharpIcon from '@mui/icons-material/ArrowForwardIosSharp';
import MuiAccordionSummary, {
    AccordionSummaryProps,
} from '@mui/material/AccordionSummary';

export default function TbRegistrarResultado() {
    const { id } = useParams();

    const [especialidadLista, setEspecialidadLista] = React.useState<any[]>([])
    const [observaciones, setObservaciones] = React.useState<any>("")
    const [cargo, setCargo] = React.useState<any>("")
    const [nombreCompleto, setNombreCompleto] = React.useState<any>("")

    const [examenLista, setExamenLista] = React.useState<any[]>([])

    const [expanded, setExpanded] = React.useState<string | false>('');


    const handleChangeObservaciones = (event: React.ChangeEvent<HTMLInputElement>) => {
        setObservaciones(event.target.value)
    }
    const handleChangeCargo = (event: React.ChangeEvent<HTMLInputElement>) => {
        setCargo(event.target.value)
    }
    const handleChangeNombreCompleto = (event: React.ChangeEvent<HTMLInputElement>) => {
        setNombreCompleto(event.target.value)
    }

    React.useEffect(() => {
        getSpecialitiesApi().then((x: any) => {
            setEspecialidadLista(x.data)
        })

        getExamValuesApi(id).then(async (y: any) => {
            let daton: any = [];
            for (let exam of y.data) {
                let aux: any = [];
                let x = await getExaminationValuesByExamId(exam.ExaminationId, "")
                for (let exam of x.data) {
                    let dato = {
                        id: exam.id,
                        valorNombre: exam.name,
                        grupoExamenNombre: exam.examGroup.name,
                        unidad: exam.unit.name,
                        examenReferencial: exam.examinationReferenceValues,
                        valorObtenido: ""
                    }
                    aux.push(dato)
                }
                daton.push({
                    name: exam.name,
                    detalleExam: aux
                })
            }
            setExamenLista(daton)
        })
        const dato = localStorage.getItem('dataUser')
        if (dato != null) {
            const info = JSON.parse(dato);
            setNombreCompleto(info.person.name + " " + info.person.lastNameP + " " + info.person.lastNameM)
        }
    }, [])


    //#region Acorderon de examenes
    const Accordion = styled((props: AccordionProps) => (
        <MuiAccordion disableGutters elevation={0} square {...props} />
    ))(({ theme }) => ({
        border: `1px solid ${theme.palette.divider}`,
        '&:not(:last-child)': {
            borderBottom: 0,
        },
        '&:before': {
            display: 'none',
        },
    }));
    const AccordionSummary = styled((props: AccordionSummaryProps) => (
        <MuiAccordionSummary
            expandIcon={<ArrowForwardIosSharpIcon sx={{ fontSize: '0.9rem' }} />}
            {...props}
        />
    ))(({ theme }) => ({
        backgroundColor:
            theme.palette.mode === 'dark'
                ? 'rgba(255, 255, 255, .05)'
                : 'rgba(0, 0, 0, .03)',
        flexDirection: 'row-reverse',
        '& .MuiAccordionSummary-expandIconWrapper.Mui-expanded': {
            transform: 'rotate(90deg)',
        },
        '& .MuiAccordionSummary-content': {
            marginLeft: theme.spacing(1),
        },
    }));
    const AccordionDetails = styled(MuiAccordionDetails)(({ theme }) => ({
        padding: theme.spacing(2),
        borderTop: '1px solid rgba(0, 0, 0, .125)',
    }));
    const handleChange =
        (panel: string) => (event: React.SyntheticEvent, newExpanded: boolean) => {
            setExpanded(newExpanded ? panel : false);
        };

    //#endregion
    const sleep = (ms: any) => new Promise(resolve => setTimeout(resolve, ms))
    const changeValor = (indexX: any, indexY: any) => async (event: any) => {
        examenLista[indexX].detalleExam[indexY].valorObtenido = event.target.value
        setExpanded(false);
        await sleep(50)
        setExpanded(`panel${indexX + 1}`);

        //setExamenLista(aux)
    }

    const GuardarResultado = () => {

        let data = {
            examinations: examenLista,
            ResponsibleId: cargo,
            result: observaciones
        }
        console.log(data)
        attendAppointmentApi(data, id).then((x: any) => {
            if (x.status) {
                alert(x.message.text)
            } else {
                alert(x.message.text)
            }
        })

    }

    return (
        <div className='tabla-componente'>
            <Contenido>
                <Grid container style={{ alignItems: "center" }}>
                    <Grid container >
                        <Link to={`/apps/results`}>
                            <div style={{ display: "flex", alignItems: "center" }} >
                                <KeyboardBackspaceRoundedIcon style={{ color: "white", fontSize: "1.3rem", cursor: "pointer" }}></KeyboardBackspaceRoundedIcon>
                                <InputLabel style={{ color: "white", fontFamily: "Quicksand", fontWeight: "400", fontSize: "1.3rem", paddingLeft: "4px", cursor: "pointer" }} >Resultados</InputLabel >
                            </div>
                        </Link>
                    </Grid>
                    <Grid container style={{ alignItems: "center" }} mt={1.5}>
                        <Grid item xs>
                            <InputLabel style={{ color: "white", fontFamily: "Quicksand", fontWeight: "400", fontSize: "2.2rem" }} >Registrar Resultados</InputLabel >
                        </Grid>
                        <Grid item xs>
                            <Button onClick={GuardarResultado} variant="contained" style={{ width: '22ch', height: '4.4ch', backgroundColor: "rgb(0 85 169)", color: "white", fontFamily: "Quicksand", fontWeight: "900", fontSize: "1.15rem" }}>Guardar</Button>
                        </Grid>
                    </Grid>
                </Grid>
                <br></br>
                <div>
                    <CardContent style={{ backgroundColor: "white", borderRadius: "12px", overflowY: "scroll", maxHeight: "500px" }}>
                        <Box sx={{ flexGrow: 1 }}>
                            <Grid container spacing={2}>
                                <Grid item xs={6}>
                                    <TextField id="outlined-basic" label="Observaciones" variant="outlined"
                                        multiline fullWidth rows={4} value={observaciones} onChange={handleChangeObservaciones} />
                                </Grid>
                                <Grid item xs={3} >
                                    <TextField id="outlined-basic" label="Cargo *" variant="outlined"
                                        select fullWidth
                                        helperText="Por favor seleccione uno"
                                        value={cargo} onChange={handleChangeCargo}
                                    >
                                        {
                                            especialidadLista.map((row: any, index: any) => {
                                                return (
                                                    <MenuItem key={index} value={row.id}>{row.name}</MenuItem>
                                                )
                                            })
                                        }
                                    </TextField>
                                </Grid>
                                <Grid item xs={3}>
                                    <TextField fullWidth id="outlined-basic" label="Nombre" variant="outlined"
                                        value={nombreCompleto} onChange={handleChangeNombreCompleto}
                                    />
                                </Grid>
                            </Grid>
                            <br></br>
                            <Grid container >
                                <Grid item xs={12}>
                                    {examenLista.map((data: any, indexX: any) =>
                                        <Accordion expanded={expanded === `panel${indexX + 1}`} onChange={handleChange(`panel${indexX + 1}`)} key={indexX}
                                        >
                                            <AccordionSummary aria-controls="panel1d-content" id="panel1d-header" >
                                                <Typography>{data.name}</Typography>
                                            </AccordionSummary>
                                            <AccordionDetails>
                                                {
                                                    <Box sx={{ width: '100%' }}>
                                                        <Paper sx={{ width: '100%', mb: 2, borderRadius: "12px" }}>
                                                            <TableContainer >
                                                                <Table sx={{ minWidth: 750 }}
                                                                    aria-labelledby="tableTitle"
                                                                    size={'medium'}>
                                                                    <TableHead>
                                                                        <TableRow>
                                                                            <TableCell
                                                                                style={{ color: "black", fontFamily: "Quicksand", fontWeight: "500", fontSize: "1.1rem" }}>
                                                                                Nombre
                                                                            </TableCell>
                                                                            <TableCell
                                                                                style={{ color: "black", fontFamily: "Quicksand", fontWeight: "500", fontSize: "1.1rem" }}>
                                                                                Sub grupo
                                                                            </TableCell>
                                                                            <TableCell
                                                                                style={{ color: "black", fontFamily: "Quicksand", fontWeight: "500", fontSize: "1.1rem" }}>
                                                                                Valor obtenido
                                                                            </TableCell>
                                                                            <TableCell
                                                                                style={{ color: "black", fontFamily: "Quicksand", fontWeight: "500", fontSize: "1.1rem" }}>
                                                                                Unidad
                                                                            </TableCell>
                                                                            <TableCell
                                                                                style={{ color: "black", fontFamily: "Quicksand", fontWeight: "500", fontSize: "1.1rem" }}>
                                                                                Pagos referenciales
                                                                            </TableCell>
                                                                        </TableRow>
                                                                    </TableHead>
                                                                    <TableBody>
                                                                        {data.detalleExam.map((row: any, indexY: any) => (
                                                                            <TableRow
                                                                                key={indexY}
                                                                            >
                                                                                <TableCell component="th" scope="row"
                                                                                    style={{ color: "black", fontFamily: "Quicksand", fontWeight: "400", fontSize: "1.1rem" }}
                                                                                >
                                                                                    {row.valorNombre}
                                                                                </TableCell>
                                                                                <TableCell component="th" scope="row"
                                                                                    style={{ color: "black", fontFamily: "Quicksand", fontWeight: "400", fontSize: "1.1rem" }}
                                                                                >
                                                                                    {row.grupoExamenNombre}
                                                                                </TableCell>
                                                                                <TableCell component="th" scope="row"
                                                                                    style={{ color: "black", fontFamily: "Quicksand", fontWeight: "400", fontSize: "1.1rem" }}
                                                                                >
                                                                                    <TextField fullWidth id="outlined-basic" label="Ingrese valor" variant="outlined" value={row.valorObtenido} onChange={changeValor(indexX, indexY)} />
                                                                                </TableCell>
                                                                                <TableCell component="th" scope="row"
                                                                                    style={{ color: "black", fontFamily: "Quicksand", fontWeight: "400", fontSize: "1.1rem" }}
                                                                                >
                                                                                    {row.unidad}
                                                                                </TableCell>
                                                                                <TableCell component="th" scope="row"
                                                                                    style={{ color: "black", fontFamily: "Quicksand", fontWeight: "400", fontSize: "1.1rem" }}
                                                                                >
                                                                                    {row.examenReferencial.map((x: any, indeex: any) =>
                                                                                        <div key={indeex}>{x.name}<hr /></div>
                                                                                    )}
                                                                                </TableCell>
                                                                            </TableRow>
                                                                        ))}
                                                                    </TableBody>
                                                                </Table>
                                                            </TableContainer>
                                                        </Paper>
                                                    </Box>
                                                }
                                            </AccordionDetails>
                                        </Accordion>

                                    )}
                                </Grid>
                            </Grid>
                        </Box>
                    </CardContent>
                </div >
            </Contenido>
        </div>
    )
}


// <Accordion expanded={expanded === 'panel1'} onChange={handleChange('panel1')} key={index} >
                                            //     <AccordionSummary aria-controls="panel1d-content" id="panel1d-header">
                                            //         <Typography>hola</Typography>
                                            //     </AccordionSummary>
                                            //     <AccordionDetails>
                                            //         <Typography>
                                            //             Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
                                            //             malesuada lacus ex, sit amet blandit leo lobortis eget. Lorem ipsum dolor
                                            //             sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus ex,
                                            //             sit amet blandit leo lobortis eget.
                                            //         </Typography>
                                            //     </AccordionDetails>
                                            // </Accordion>