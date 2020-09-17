import React, { Fragment, useEffect, useState } from 'react';
import Clima from './components/Clima';
import Error from './components/Error';
import Formulario from './components/Formulario';
import Header from './components/Header';

function App() {
  
  const [busqueda, setBusqueda] = useState({
    ciudad:'',
    pais:''
  });
  const [consultar, setConsultar] = useState(false);
  const [resultado, setResultado] = useState({});
  const [error, setError] = useState(false);


  const {ciudad, pais} = busqueda;


  useEffect(()=>{
    const consultarAPI = async () =>{
      if(consultar === true){
        const appID = 'c8b2141661c831d58cdb5010ad8f973d';
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${ciudad},${pais}&appid=${appID}`;
    
        const respuesta = await fetch(url);
        const resultado = await respuesta.json();
    
        setResultado(resultado);
        setConsultar(false);

        if (resultado.cod === "404"){
          setError(true);
        }else{
          setError(false);
        }
      }
    };
    consultarAPI();
    
    //eslint-disable-next-line
  }, [consultar])

  let componente;

  if(error) {
    componente =  <Error 
                      mensaje="No hay resultados"
                  />
  }else{
    componente = <Clima
                    resultado={resultado}
                  />
  }
  
  return (
    <Fragment>
      <Header
        titulo ="Clima React APP"
      />

      <div className="contenedor-form">
        <div className="container">
          <div className="row">
            <div className="col m6 s12">
              <Formulario
                busqueda={busqueda}
                setBusqueda={setBusqueda}
                setConsultar={setConsultar}
              />
            </div>
            <div className="col m6 s12">
              {componente}
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
}

export default App;
