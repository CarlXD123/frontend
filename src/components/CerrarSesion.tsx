import React from "react"


export default function CerrarSesion() {

    React.useEffect(() => {
        localStorage.clear();
        window.location.href = '/'
    },[])
    return (
        <h1></h1>
    )

}