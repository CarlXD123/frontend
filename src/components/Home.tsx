import { styled } from '@mui/styles';
import React from 'react';
import { NavigateFunction, useNavigate } from 'react-router-dom';

export const Contenido = styled('div')(({ }) => ({
    flex: "1 1 100%",
    display: "flex",
    position: "relative",
    padding: "0 3.2rem",
    zIndex: 2,
    maxWidth: "100%",
    minWidth: 0,
    minHeight: 0,
    flexDirection: "column",
}));

class Home extends React.Component<{ navigate: NavigateFunction }, any> {

    constructor(props: any) {
        super(props);
    }



    render() {

        return (

            <Contenido>
                <div className='fondo con'>
                    <div className='cardHome'>
                        <div style={{ paddingTop: "7.4rem", paddingRight: "7.4rem", paddingBottom: "7.4rem", paddingLeft: "7.4rem" }}>
                            <img src="../assets/images/backgrounds/logo-redlab.png" style={{ height: "144px", marginLeft: "-50px" }} ></img>
                            <div className='cardHome-bienvenida' style={{ color: "white", fontFamily: "Quicksand" }}>Bienvenido al sistema Administrativo del laboratorio Clínico RedLab Perú</div>
                            <div className='cardHome-direccion' style={{ color: "white", fontFamily: "Quicksand" }}>Dirección: Av. Central tlf: 0251</div>
                        </div>
                    </div>
                </div>
            </Contenido>

        )
    }
}
function withNavigation(Component: any): (props: any) => JSX.Element {
    return props => <Component {...props} navigate={useNavigate()} />;
}

export default withNavigation(Home);
