import * as React from 'react';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import TableSortLabel from '@mui/material/TableSortLabel';
import Paper from '@mui/material/Paper';
import { visuallyHidden } from '@mui/utils';
import { getAgreementsListPriceApi, getAppointmentApi, getAppointmentsApi, getExamValuesApi, getFilterAppointmentsApi, deleteAppointmentApi, deleteSpecialityApi } from '../../api';
import { Button, Grid, InputLabel, Modal, TextField, Tooltip } from '@mui/material';
import moment from 'moment';
import { Link } from 'react-router-dom';
import ReactToPrint from 'react-to-print';
import ModeEditRoundedIcon from '@mui/icons-material/ModeEditRounded';
import PersonSearchRoundedIcon from '@mui/icons-material/PersonSearchRounded';
import LocalPrintshopRoundedIcon from '@mui/icons-material/LocalPrintshopRounded';

interface Data {
  codigo: string,
  fecha: string,
  hora: string,
  codigoRef: string,
  referencia: string,
  paciente: string,
  precio: string,
  options: string
}


function createData(
  codigo: string,
  fecha: string,
  hora: string,
  codigoRef: string,
  referencia: string,
  paciente: string,
  precio: string,
  options: string
): Data {
  return {
    codigo,
    fecha,
    hora,
    codigoRef,
    referencia,
    paciente,
    precio,
    options
  };
}

function descendingComparator<T>(a: T, b: T, orderBy: keyof T) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

type Order = 'asc' | 'desc';

function getComparator<Key extends keyof any>(
  order: Order,
  orderBy: Key,
): (
    a: { [key in Key]: number | string },
    b: { [key in Key]: number | string },
  ) => number {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function getCurrentDate() {
  let date = new Date();
  let month = date.getMonth() + 1;
  let auxDay = date.getDate() < 10 ? "0" : "";
  return `${date.getFullYear()}-${month}-${auxDay}${date.getDate()}`;
}

// This method is created for cross-browser compatibility, if you don't
// need to support IE11, you can use Array.prototype.sort() directly
function stableSort<T>(array: readonly T[], comparator: (a: T, b: T) => number) {
  const stabilizedThis = array.map((el, index) => [el, index] as [T, number]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) {
      return order;
    }
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}

interface HeadCell {
  disablePadding: boolean;
  id: any;
  label: string;
  numeric: boolean;
  disableOrder: boolean;
}

const headCells: readonly HeadCell[] = [
  {
    id: 'codigo',
    numeric: false,
    disablePadding: false,
    label: 'Código',
    disableOrder: true
  },
  {
    id: 'fecha',
    numeric: false,
    disablePadding: false,
    label: 'Fecha',
    disableOrder: true
  },
  {
    id: 'hora',
    numeric: false,
    disablePadding: false,
    label: 'Hora',
    disableOrder: false
  },
  {
    id: 'codigoRef',
    numeric: false,
    disablePadding: false,
    label: 'Código Ref.',
    disableOrder: false
  },
  {
    id: 'referencia',
    numeric: false,
    disablePadding: false,
    label: 'Referencia',
    disableOrder: false
  },
  {
    id: 'paciente',
    numeric: false,
    disablePadding: false,
    label: 'Paciente',
    disableOrder: false
  },
  {
    id: 'precio',
    numeric: false,
    disablePadding: false,
    label: 'Precio Final',
    disableOrder: false
  },
  {
    id: null,
    numeric: false,
    disablePadding: false,
    label: 'Opciones',
    disableOrder: true
  }
];

interface EnhancedTableProps {
  numSelected: number;
  onRequestSort: (event: React.MouseEvent<unknown>, property: keyof Data) => void;
  order: Order;
  orderBy: string;
  rowCount: number;
}

function EnhancedTableHead(props: EnhancedTableProps) {
  const { order, orderBy, numSelected, rowCount, onRequestSort } =
    props;
  const createSortHandler =
    (property: keyof Data) => (event: React.MouseEvent<unknown>) => {
      onRequestSort(event, property);
    };

  return (
    <TableHead >
      <TableRow >
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align={headCell.numeric ? 'right' : 'left'}
            padding={headCell.disablePadding ? 'none' : 'normal'}
            sortDirection={orderBy === headCell.id ? order : false}
            style={{ color: "rgba(0, 0, 0, 0.54)", fontFamily: "Quicksand", fontWeight: "600", fontSize: "1.15rem" }}
          >
            {headCell.disableOrder ? headCell.label :
              <TableSortLabel style={{ color: "rgba(0, 0, 0, 0.54)", fontFamily: "Quicksand", fontWeight: "600", fontSize: "1.15rem" }}
                active={orderBy === headCell.id}
                direction={orderBy === headCell.id ? order : 'asc'}
                onClick={createSortHandler(headCell.id)}
              >
                {headCell.label}

                {orderBy === headCell.id ? (
                  <Box component="span" sx={visuallyHidden}>
                    {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                  </Box>
                ) : null}
              </TableSortLabel>}
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

export default function TbCitas({ texto, opcion }: any) {
  const [order, setOrder] = React.useState<Order>('asc');
  const [orderBy, setOrderBy] = React.useState<string>("");
  const [selected, setSelected] = React.useState<readonly string[]>([]);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [rows, setRows] = React.useState<any>([]);
  const [abrirImpresora, setAbrirImpresora] = React.useState<any>(false);
  const [abrircita, setAbrirCita] = React.useState<any>(false);
  const [abrircitaBorrada, setAbrirCitaBorrada] = React.useState<any>(false);
  const [abrircitaBorradaError, setAbrirCitaBorradaError] = React.useState<any>(false);

  const [nombreCompleto, setNombreCompleto] = React.useState<any>("");
  const [codigo, setCodigo] = React.useState<any>("");
  const [edad, setEdad] = React.useState<any>("");
  const [sede, setSede] = React.useState<any>("");
  const [sexo, setSexo] = React.useState<any>("");
  const [fecha, setFecha] = React.useState<any>("");
  const [medico, setMedico] = React.useState<any>("");
  const [hora, setHora] = React.useState<any>("");
  const [precio, setPrecio] = React.useState<any>("");
  const [descuento, setDescuento] = React.useState<any>("");
  const [precioFinal, setPrecioFinal] = React.useState<any>("");
  const [rowsExamenes, setRowsExamenes] = React.useState<any[]>([]);
  const handleRequestSort = (
    event: React.MouseEvent<unknown>,
    property: keyof Data,
  ) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };
  const handleCloseImpresora = () => {
    setAbrirImpresora(false);
  }
  const handleOpenImpresora = (obj: any) => {
    setAbrirImpresora(true);
    setNombreCompleto(obj.nombreCompleto)
    setCodigo(obj.codigo)
    setEdad(obj.edad)
    setSede(obj.sede)
    setSexo(obj.sexo)
    setFecha(obj.fecha)
    setMedico(obj.medico)
    setHora(obj.hora)
    setPrecio(obj.precio)
    setDescuento(obj.descuento)
    setPrecioFinal(obj.precioFinal)
    getAppointmentApi(obj.id).then((x: any) => {
      getAgreementsListPriceApi(x.data.AgreementId).then((ag: any) => {
        getExamValuesApi(obj.id).then((y: any) => {
          let fila = [];

          for (let a = 0; a < y.data.length; a++) {
            //console.log(y.data[a].ExaminationId)
            let examen = setAgregarExamen(ag.data.find((p: any) => p.id == x.data.priceList.id), y.data[a].ExaminationId)
            fila.push({
              name: examen.name,
              price: examen.price
            });
          }
          setRowsExamenes(fila)
        });
      })
    })
  }


  const handleCloseCita = () => {
    setAbrirCita(false);
  }

  const handleCloseAbrirCitaBorrada = () => {
    setAbrirCitaBorrada(false);
  }

  const handleCloseAbrirCitaBorradaError = () => {
    setAbrirCitaBorradaError(false);
  }

  const handleOpenCita = (obj: any) => {
    setAbrirCita(true)
    setNombreCompleto(obj.nombreCompleto)
    setEdad(obj.edad)
    setSede(obj.sede)
    setSexo(obj.sexo)
    setMedico(obj.medico)
    setHora(obj.hora)
    setFecha(obj.fecha)
    setPrecio(obj.precio)
    setDescuento(obj.descuento)
    setPrecioFinal(obj.precioFinal)
    console.log(precio);
  }

  const sleep = (ms: any) => new Promise(resolve => setTimeout(resolve, ms))
  const handleDelete = async (id: any) => {
    console.log(id);
    var opcion = window.confirm("Realmente desea eliminar la cita?"+ id)
    if(opcion){
      try {
       
        let aux = rows
        setRows([])
        await sleep(50)
        setRows(aux)
        fetch('http://localhost:3000/api/appointment/' + id, {
         method: 'DELETE',
        })
        .then(res => {
        return res.json()
        }) 
        .then(data => console.log(data))
        setRows(aux.filter((row: any) => row.id !== id));
      } catch(error) {
           console.error(error)
      }
      setAbrirCitaBorrada(true);
    } else {
      setAbrirCitaBorradaError(true);
    }
  };


  const setAgregarExamen = (lista: any, id: any) => {
    const examen = lista.examinations.find((x: any) => x.id == id);
    if (examen != undefined) {
      if (examen.price != 0) {
        return examen;
      }
    }
  }
  const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 900,
    bgcolor: 'white',
    border: '1px solid #white',
    borderRadius: "15px",
    boxShadow: 24,
    p: 4,
  };
  let dateNow = moment().format('YYYY-MM-DD');
  React.useEffect(() => {
    if (texto == "") {
      getAppointmentsApi(0, 1000, "", "E").then((ag: any) => {
        let mapeado: any = [];
        ag.data.forEach((d: any) => {
          mapeado.push({
            id: d.id,
            codigo: d.code,
            fecha: d.dateAppointmentEU,
            hora: d.time12h,
            codigoRef: d.Referer.id,
            referencia: d.Referer.name,
            paciente: d.client.name + " " + d.client.lastNameP,
            precio: d.totalPrice == null ? "" : "S/. " + d.totalPrice,
            descuento: d.discount == null ? "" : "S/. " + d.discount,
            precioFinal: d.finalPrice == null ? "" : "S/. " + d.finalPrice,

            nombreCompleto: d.client.name + " " + d.client.lastNameP + " " + d.client.lastNameM,
            edad: d.client.years + "años",
            dni: d.client.dni,
            sexo: d.client.genderStr,
            medico: d.Doctor.name,
            sede: d.headquarter.name

          })
        });
        setRows(mapeado)
      });
    } else {
      getFilterAppointmentsApi(opcion, texto, "").then((ag: any) => {
        let mapeado: any = [];
        ag.data.forEach((d: any) => {
          mapeado.push({
            id: d.id,
            codigo: d.code,
            fecha: d.dateAppointmentEU,
            hora: d.time12h,
            codigoRef: d.Referer.id,
            referencia: d.Referer.name,
            paciente: d.client.name + " " + d.client.lastNameP,
            precio: d.totalPrice == null ? "" : "S/. " + d.totalPrice,
            descuento: d.discount == null ? "" : "S/. " + d.discount,
            precioFinal: d.finalPrice == null ? "" : "S/. " + d.finalPrice,


            nombreCompleto: d.client.name + " " + d.client.lastNameP + " " + d.client.lastNameM,
            edad: d.client.years + "años",
            dni: d.client.dni,
            sexo: d.client.genderStr,
            medico: d.Doctor.name,
            sede: d.headquarter.name
          })
        });
        setRows(mapeado)
      });
    }
  }, [texto, opcion]);

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const isSelected = (name: string) => selected.indexOf(name) !== -1;

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;
  let componente: any;
  return (
    <Box sx={{ width: '100%' }}>
      <Paper sx={{ width: '100%', mb: 12 }} className="card-table">
        <TableContainer>
          <Table
            sx={{ minWidth: 750 }}
            aria-labelledby="tableTitle"
            size={'medium'}
          >
            <EnhancedTableHead
              numSelected={selected.length}
              order={order}
              orderBy={orderBy}
              onRequestSort={handleRequestSort}
              rowCount={rows.length}
            />
            <TableBody>
              {/* if you don't need to support IE11, you can replace the `stableSort` call with:
              rows.slice().sort(getComparator(order, orderBy)) */}
              {stableSort(rows, getComparator(order, orderBy))
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row: any, index: any) => {
                  const labelId = `enhanced-table-checkbox-${index}`;

                  return (
                    <TableRow
                      hover
                      tabIndex={-1}
                      key={row.id}
                    >
                      <TableCell
                        component="th"
                        id={labelId}
                        scope="row"
                        style={{ color: "black", fontFamily: "Quicksand", fontWeight: "400", fontSize: "1.1rem" }}
                      >
                        {row.codigo}
                        
                      </TableCell>
                      <TableCell
                        align="left"
                        style={{ color: "black", fontFamily: "Quicksand", fontWeight: "400", fontSize: "1.1rem" }}
                      >
                        {row.fecha}
                        
                      </TableCell>
                      <TableCell
                        align="left"
                        style={{ color: "black", fontFamily: "Quicksand", fontWeight: "400", fontSize: "1.1rem" }}
                      >
                        {row.hora}
                      </TableCell>
                      <TableCell
                        align="left"
                        style={{ color: "black", fontFamily: "Quicksand", fontWeight: "400", fontSize: "1.1rem" }}
                      >
                        {row.codigoRef}
                      </TableCell>
                      <TableCell
                        align="left"
                        style={{ color: "black", fontFamily: "Quicksand", fontWeight: "400", fontSize: "1.1rem" }}
                      >
                        {row.referencia}
                      </TableCell>
                      <TableCell
                        align="left"
                        style={{ color: "black", fontFamily: "Quicksand", fontWeight: "400", fontSize: "1.1rem" }}
                      >
                        {row.paciente}
                      </TableCell>
                      <TableCell
                        align="left"
                        style={{ color: "black", fontFamily: "Quicksand", fontWeight: "400", fontSize: "1.1rem" }}
                      >
                        {row.precioFinal}
                      </TableCell>
                      <TableCell align="left">
                        <div style={{ display: "flex" }}>

                        <div style={{ paddingRight: "5px" }}>
                            <Tooltip title="Ver Cita" followCursor>
                              <Button onClick={() => handleOpenCita(row)} variant="contained" className='boton-icon'>
                              <PersonSearchRoundedIcon />
                              </Button>
                            </Tooltip>
                          </div>
                          
                          <div style={{ paddingLeft: "5px" }}>
                            <Link to={`/apps/appointments/` + row.id}>
                              <Tooltip title="Editar" followCursor>
                                <Button variant="contained" className='boton-icon'>
                                  <ModeEditRoundedIcon />
                                </Button>
                              </Tooltip>
                            </Link>
                          </div>
                          <div style={{ paddingLeft: "5px" }}>
                            <Tooltip title="Imprimir Cita" followCursor>
                              <Button onClick={() => handleOpenImpresora(row)} variant="contained" className='boton-icon'>
                                <LocalPrintshopRoundedIcon />
                              </Button>
                            </Tooltip>
                          </div>

                          <div style={{ paddingLeft: "5px" }}>
                            <Tooltip title="Borrar Cita" followCursor>
                              <Button onClick={() => handleDelete(row.id)}  variant="contained" className='boton-icon'>
                                
                              </Button>
                            </Tooltip>
                          </div>

                        </div>
                      </TableCell>
                    </TableRow>
                  );
                })}
              {(emptyRows > 0 && (
                <TableRow
                  style={{
                    height: (53) * emptyRows,
                  }}
                >
                  <TableCell colSpan={8} />
                </TableRow>
              ))}
              {
                rows.length == 0 ? <TableRow >
                  <TableCell colSpan={8} >
                    No tiene Citas
                  </TableCell>
                </TableRow> : ""
              }
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 15, 20]}
          component="div"
          count={rows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          labelRowsPerPage={"Filas por Pagina: "}
          labelDisplayedRows={
            ({ from, to, count }) => {
              return '' + from + '-' + to + ' de ' + count
            }
          }
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
      <div id="areaImprimir">
        <Modal
          keepMounted
          open={abrirImpresora}
          onClose={handleCloseImpresora}
          aria-labelledby="keep-mounted-modal-title"
          aria-describedby="keep-mounted-modal-description"
        >
          <Box sx={style} >
            <Grid container item ref={(ins) => (componente = ins)}>
              <div style={{ margin: "20px" }}>
                <Grid container item >
                  <Grid item xs >
                    <InputLabel style={{ color: "black", fontFamily: "Quicksand", fontWeight: "400", fontSize: "2rem" }} >Nueva colegiatura</InputLabel >
                  </Grid>
                  <Grid container item >
                    <Grid item xs={12} mt={2} >
                      <div style={{ border: '2px solid black', borderRadius: '20px', width: "770px", maxWidth: "100%" }}>
                        <div style={{ margin: "20px" }}>
                          <Grid container item mt={2}>
                            <Grid item xs={3} >
                              <InputLabel style={{ color: "black", fontFamily: "Quicksand", fontWeight: "600", fontSize: "1rem" }} >Paciente:</InputLabel >
                            </Grid>
                            <Grid item xs={3} >
                              <InputLabel style={{ color: "black", fontFamily: "Quicksand", fontWeight: "400", fontSize: "1rem" }} >{nombreCompleto}</InputLabel >
                            </Grid>
                            <Grid item xs={3} >
                              <InputLabel style={{ color: "black", fontFamily: "Quicksand", fontWeight: "600", fontSize: "1rem" }} >Edad:</InputLabel >
                            </Grid>
                            <Grid item xs={3} >
                              <InputLabel style={{ color: "black", fontFamily: "Quicksand", fontWeight: "400", fontSize: "1rem" }} >{}</InputLabel >
                            </Grid>
                          </Grid>
                          <Grid container item mt={2}>
                            <Grid item xs={3} >
                              <InputLabel style={{ color: "black", fontFamily: "Quicksand", fontWeight: "600", fontSize: "1rem" }} >Edad:</InputLabel >
                            </Grid>
                            <Grid item xs={3} >
                              <InputLabel style={{ color: "black", fontFamily: "Quicksand", fontWeight: "400", fontSize: "1rem" }} >{edad}</InputLabel >
                            </Grid>
                            <Grid item xs={3} >
                              <InputLabel style={{ color: "black", fontFamily: "Quicksand", fontWeight: "600", fontSize: "1rem" }} >Sede:</InputLabel >
                            </Grid>
                            <Grid item xs={3} >
                              <InputLabel style={{ color: "black", fontFamily: "Quicksand", fontWeight: "400", fontSize: "1rem" }} >{sede}</InputLabel >
                            </Grid>
                          </Grid>
                          <Grid container item mt={2}>
                            <Grid item xs={3} >
                              <InputLabel style={{ color: "black", fontFamily: "Quicksand", fontWeight: "600", fontSize: "1rem" }} >Sexo:</InputLabel >
                            </Grid>
                            <Grid item xs={3} >
                              <InputLabel style={{ color: "black", fontFamily: "Quicksand", fontWeight: "400", fontSize: "1rem" }} >{sexo}</InputLabel >
                            </Grid>
                            <Grid item xs={3} >
                              <InputLabel style={{ color: "black", fontFamily: "Quicksand", fontWeight: "600", fontSize: "1rem" }} >Fecha:</InputLabel >
                            </Grid>
                            <Grid item xs={3} >
                              <InputLabel style={{ color: "black", fontFamily: "Quicksand", fontWeight: "400", fontSize: "1rem" }} >{fecha}</InputLabel >
                            </Grid>
                          </Grid>
                          <Grid container item mt={2}>
                            <Grid item xs={3} >
                              <InputLabel style={{ color: "black", fontFamily: "Quicksand", fontWeight: "600", fontSize: "1rem" }} >Medico:</InputLabel >
                            </Grid>
                            <Grid item xs={3} >
                              <InputLabel style={{ color: "black", fontFamily: "Quicksand", fontWeight: "400", fontSize: "1rem" }} >{medico}</InputLabel >
                            </Grid>
                            <Grid item xs={3} >
                              <InputLabel style={{ color: "black", fontFamily: "Quicksand", fontWeight: "600", fontSize: "1rem" }} >Hora:</InputLabel >
                            </Grid>
                            <Grid item xs={3} >
                              <InputLabel style={{ color: "black", fontFamily: "Quicksand", fontWeight: "400", fontSize: "1rem" }} >{hora}</InputLabel >
                            </Grid>
                          </Grid>
                        </div>
                      </div>
                    </Grid>
                    <div style={{ border: '1px solid white', borderRadius: '20px', width: "740px" }}>
                      <Box style={{ margin: "20px" }}>
                        <Grid container item mt={2}>
                          <Grid item xs={3} >
                            <InputLabel style={{ color: "black", fontFamily: "Quicksand", fontWeight: "600", fontSize: "1.3rem" }} ><b>Examenes:</b></InputLabel >
                          </Grid>
                          <Grid item xs={3} ></Grid>
                          <Grid item xs={3} >
                            <InputLabel style={{ color: "black", fontFamily: "Quicksand", fontWeight: "600", fontSize: "1.3rem" }} ><b>Precio:</b></InputLabel >
                          </Grid>
                          <Grid item xs={3} ></Grid>
                        </Grid>
                        {rowsExamenes.map((rowExa: any, index: any) => {
                          return (
                            <Grid container item mt={2} key={index}>
                              <Grid item xs={3}>
                                <InputLabel style={{ color: "black", fontFamily: "Quicksand", fontWeight: "600", fontSize: "1rem" }} >{rowExa.name}</InputLabel >
                              </Grid>

                              <Grid item xs={3} ></Grid>
                              <Grid item xs={3} >
                                <InputLabel style={{ color: "black", fontFamily: "Quicksand", fontWeight: "600", fontSize: "1rem" }} >S/. {rowExa.price}</InputLabel >
                              </Grid>
                              <Grid item xs={3} ></Grid>
                            </Grid>
                          )
                        })}
                        <hr></hr>
                        <Grid container item mt={2}>
                          <Grid item xs={3} >
                            <InputLabel style={{ color: "black", fontFamily: "Quicksand", fontWeight: "600", fontSize: "1.1rem" }} ><b>Descuento:</b></InputLabel >
                          </Grid>
                          <Grid item xs={3} ></Grid>
                          <Grid item xs={3} >
                            <InputLabel style={{ color: "black", fontFamily: "Quicksand", fontWeight: "600", fontSize: "1rem" }} >S/. {descuento}</InputLabel >
                          </Grid>
                          <Grid item xs={3} >
                          </Grid>
                        </Grid>

                        <Grid container item mt={2}>
                          <Grid item xs={3} >
                            <InputLabel style={{ color: "black", fontFamily: "Quicksand", fontWeight: "600", fontSize: "1.1rem" }} ><b>Total:</b></InputLabel >
                          </Grid>
                          <Grid item xs={3} ></Grid>
                          <Grid item xs={3} >
                            <InputLabel style={{ color: "black", fontFamily: "Quicksand", fontWeight: "600", fontSize: "1.1rem" }} ><b>S/. {precioFinal}</b></InputLabel >
                          </Grid>
                          <Grid item xs={3} >
                          </Grid>
                        </Grid>
                      </Box>
                    </div>
                  </Grid>
                </Grid>
              </div>
            </Grid>
            <Grid container item xs mt={2.5}>
              <Grid item xs={8} ></Grid>
              <Grid container item xs={4} spacing={2}>
                <Grid item xs={6} >
                  <Button onClick={handleCloseImpresora} variant="contained" style={{ backgroundColor: "rgb(0 85 169)", color: "white", fontFamily: "Quicksand", fontWeight: "900", fontSize: "1rem" }}>Cancelar</Button>
                </Grid>
                <Grid item xs={6} >
                  <ReactToPrint
                    trigger={() => (
                      <Button variant="contained" style={{ backgroundColor: "rgb(0 85 169)", color: "white", fontFamily: "Quicksand", fontWeight: "900", fontSize: "1rem" }}>Imprimir</Button>
                    )}
                    content={() => componente}
                  />
                </Grid>
              </Grid>
            </Grid>
          </Box>
        </Modal>
      </div>



      <div>
        <Modal
          keepMounted
          open={abrircita}
          onClose={handleCloseCita}
          aria-labelledby="keep-mounted-modal-title"
          aria-describedby="keep-mounted-modal-description"
        >
          <Box sx={style} >
            <Grid container item ref={(ins) => (componente = ins)}>
              <div style={{ margin: "20px" }}>
                <Grid container item >
                  <Grid item xs >
                    <InputLabel style={{ color: "black", fontFamily: "Quicksand", fontWeight: "400", fontSize: "2rem" }} >Detalles de la cita</InputLabel >
                  </Grid>
                  <Grid container item >
                    <Grid item xs={12} mt={2} >
                      <div style={{ border: '2px solid black', borderRadius: '20px', width: "770px", maxWidth: "100%" }}>
                        <div style={{ margin: "20px" }}>
                          <Grid container item mt={2}>
                            <Grid item xs={3} >
                              <InputLabel style={{ color: "black", fontFamily: "Quicksand", fontWeight: "600", fontSize: "1rem" }} >Paciente:</InputLabel >
                            </Grid>
                            <Grid item xs={3} >
                              <InputLabel style={{ color: "black", fontFamily: "Quicksand", fontWeight: "400", fontSize: "1rem" }} >{nombreCompleto}</InputLabel >
                            </Grid>
                            <Grid item xs={3} >
                              <InputLabel style={{ color: "black", fontFamily: "Quicksand", fontWeight: "600", fontSize: "1rem" }} >Sexo:</InputLabel >
                            </Grid>
                            <Grid item xs={3} >
                              <InputLabel style={{ color: "black", fontFamily: "Quicksand", fontWeight: "400", fontSize: "1rem" }} >{sexo}</InputLabel >
                            </Grid>
                          </Grid>
                          <Grid container item mt={2}>
                            <Grid item xs={3} >
                              <InputLabel style={{ color: "black", fontFamily: "Quicksand", fontWeight: "600", fontSize: "1rem" }} >Edad:</InputLabel >
                            </Grid>
                            <Grid item xs={3} >
                              <InputLabel style={{ color: "black", fontFamily: "Quicksand", fontWeight: "400", fontSize: "1rem" }} >{edad}</InputLabel >
                            </Grid>
                            <Grid item xs={3} >
                              <InputLabel style={{ color: "black", fontFamily: "Quicksand", fontWeight: "600", fontSize: "1rem" }} >Sede:</InputLabel >
                            </Grid>
                            <Grid item xs={3} >
                              <InputLabel style={{ color: "black", fontFamily: "Quicksand", fontWeight: "400", fontSize: "1rem" }} >{sede}</InputLabel >
                            </Grid>
                          </Grid>
                          <Grid container item mt={2}>
                            <Grid item xs={3} >
                              <InputLabel style={{ color: "black", fontFamily: "Quicksand", fontWeight: "600", fontSize: "1rem" }} >Fecha:</InputLabel >
                            </Grid>
                            <Grid item xs={3} >
                              <InputLabel style={{ color: "black", fontFamily: "Quicksand", fontWeight: "400", fontSize: "1rem" }} >{fecha}</InputLabel >
                            </Grid>
                            <Grid item xs={3} >
                              <InputLabel style={{ color: "black", fontFamily: "Quicksand", fontWeight: "600", fontSize: "1rem" }} >Hora:</InputLabel >
                            </Grid>
                            <Grid item xs={3} >
                              <InputLabel style={{ color: "black", fontFamily: "Quicksand", fontWeight: "400", fontSize: "1rem" }} >{hora}</InputLabel >
                            </Grid>
                          </Grid>
                          <Grid container item mt={2}>
                            <Grid item xs={3} >
                              <InputLabel style={{ color: "black", fontFamily: "Quicksand", fontWeight: "600", fontSize: "1rem" }} >Medico:</InputLabel >
                            </Grid>
                            <Grid item xs={3} >
                              <InputLabel style={{ color: "black", fontFamily: "Quicksand", fontWeight: "400", fontSize: "1rem" }} >{medico}</InputLabel >
                            </Grid>
 
                          </Grid>
                        </div>
                      </div>
                    </Grid>
                    <div style={{ border: '1px solid white', borderRadius: '20px', width: "740px" }}>
                      <Box style={{ margin: "20px" }}>
                        <Grid container item mt={2}>
                          <Grid item xs={3} >
                            <InputLabel style={{ color: "black", fontFamily: "Quicksand", fontWeight: "600", fontSize: "1.3rem" }} ><b>Examenes</b></InputLabel >
                          </Grid>
                          <Grid item xs={3} ></Grid>
                          <Grid item xs={3} >
                            <InputLabel style={{ color: "black", fontFamily: "Quicksand", fontWeight: "600", fontSize: "1.3rem" }} ><b>Precio:</b></InputLabel >
                          </Grid>
                          <Grid item xs={3} ></Grid>
                        </Grid>
                        {rowsExamenes.map((rowExa: any, index: any) => {
                          return (
                            <Grid container item mt={2} key={index}>
                              <Grid item xs={3}>
                                <InputLabel style={{ color: "black", fontFamily: "Quicksand", fontWeight: "600", fontSize: "1rem" }} >{rowExa.name}</InputLabel >
                              </Grid>

                              <Grid item xs={3} ></Grid>
                              <Grid item xs={3} >
                                <InputLabel style={{ color: "black", fontFamily: "Quicksand", fontWeight: "600", fontSize: "1rem" }} >S/. {rowExa.price}</InputLabel >
                              </Grid>
                              <Grid item xs={3} ></Grid>
                            </Grid>
                          )
                        })}
                        <hr></hr>
                        <Grid container item mt={2}>
                          <Grid item xs={3} >
                            <InputLabel style={{ color: "black", fontFamily: "Quicksand", fontWeight: "600", fontSize: "1.1rem" }} ><b>Precio Total:</b></InputLabel >
                          </Grid>
                          <Grid item xs={3} ></Grid>
                          <Grid item xs={3} >
                            <InputLabel style={{ color: "black", fontFamily: "Quicksand", fontWeight: "600", fontSize: "1rem" }} >{precio}</InputLabel >
                          </Grid>
                          <Grid item xs={3} >
                          </Grid>
                        </Grid>

                        <Grid container item mt={2}>
                          <Grid item xs={3} >
                            <InputLabel style={{ color: "black", fontFamily: "Quicksand", fontWeight: "600", fontSize: "1.1rem" }} ><b>Descuento:</b></InputLabel >
                          </Grid>
                          <Grid item xs={3} ></Grid>
                          <Grid item xs={3} >
                            <InputLabel style={{ color: "black", fontFamily: "Quicksand", fontWeight: "600", fontSize: "1rem" }} >{descuento}</InputLabel >
                          </Grid>
                          <Grid item xs={3} >
                          </Grid>
                        </Grid>

                        <Grid container item mt={2}>
                          <Grid item xs={3} >
                            <InputLabel style={{ color: "black", fontFamily: "Quicksand", fontWeight: "600", fontSize: "1.1rem" }} ><b>Total Final:</b></InputLabel >
                          </Grid>
                          <Grid item xs={3} ></Grid>
                          <Grid item xs={3} >
                            <InputLabel style={{ color: "black", fontFamily: "Quicksand", fontWeight: "600", fontSize: "1.1rem" }} ><b>{precioFinal}</b></InputLabel >
                          </Grid>
                          <Grid item xs={3} >
                          </Grid>
                        </Grid>
                      </Box>
                    </div>
                  </Grid>
                </Grid>
              </div>
            </Grid>
            <Grid container item xs mt={2.5}>
              <Grid item xs={8} ></Grid>
              <Grid container item xs={4} spacing={2}>
                <Grid item xs={20} >
                  <Button onClick={handleCloseCita} variant="contained" style={{ backgroundColor: "rgb(0 85 169)", color: "white", fontFamily: "Quicksand", fontWeight: "900", fontSize: "1rem" }}>Cancelar</Button>
                </Grid>
                
              </Grid>
            </Grid>
          </Box>
        </Modal>
      </div>


      <div>
        <Modal
          keepMounted
          open={abrircitaBorrada}
          onClose={handleCloseAbrirCitaBorrada}
          aria-labelledby="keep-mounted-modal-title"
          aria-describedby="keep-mounted-modal-description"
        >
                        <Box sx={style}>
                            <InputLabel style={{ color: "green", fontFamily: "Quicksand", fontWeight: "400", fontSize: "1.5rem" }} >Registro borrado con exito!!!</InputLabel >
                            <Grid container item mt={2.5}>
                                <Grid item xs={4} ></Grid>
                                <Grid container item xs={8} spacing={2}>
                                    <Grid item xs={9} >

                                   
                                     <InputLabel style={{ color: "black", fontFamily: "Quicksand", fontWeight: "300", fontSize: "1.4rem" }} >La cita fue eliminada</InputLabel >

                                    </Grid>
                                    <Grid item xs={3} >
                                        <Button onClick={handleCloseAbrirCitaBorrada} variant="contained" style={{ backgroundColor: "rgb(0 85 169)", color: "white", fontFamily: "Quicksand", fontWeight: "900", fontSize: "1rem" }}>Cerrar</Button>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Box>
                    </Modal>
                </div>



        <div>
         <Modal
          keepMounted
          open={abrircitaBorradaError}
          onClose={handleCloseAbrirCitaBorradaError}
          aria-labelledby="keep-mounted-modal-title"
          aria-describedby="keep-mounted-modal-description"
        >
                        <Box sx={style}>
                            <InputLabel style={{ color: "green", fontFamily: "Quicksand", fontWeight: "400", fontSize: "1.5rem" }} >Algo salio mal!!!</InputLabel >
                            <Grid container item mt={2.5}>
                                <Grid item xs={4} ></Grid>
                                <Grid container item xs={8} spacing={2}>
                                    <Grid item xs={9} >

                                   
                                     <InputLabel style={{ color: "black", fontFamily: "Quicksand", fontWeight: "300", fontSize: "1.4rem" }} >La cita no fue eliminada</InputLabel >

                                    </Grid>
                                    <Grid item xs={3} >
                                        <Button onClick={handleCloseAbrirCitaBorradaError} variant="contained" style={{ backgroundColor: "rgb(0 85 169)", color: "white", fontFamily: "Quicksand", fontWeight: "900", fontSize: "1rem" }}>Cerrar</Button>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Box>
                    </Modal>
                </div>
    




    </Box >
  );
}

