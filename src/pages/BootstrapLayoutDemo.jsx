import 'bootstrap/dist/css/bootstrap.min.css'


function BootstrapLayoutDemo() {
    return ( 
    <div className="container-fluid d-flex flex-column" style={{borderColor: 'red', borderWidth: 2}}>
        <div className="row" style={{height: '100%'}}>
            <div className="col-md-3 col-sm-1" style={{backgroundColor: 'red'}}>

            </div>
            <div className="col-md-9 col-sm-11" style={{backgroundColor: 'blue'}}>

            </div>
        </div>
    </div>
     );
}

export default BootstrapLayoutDemo;