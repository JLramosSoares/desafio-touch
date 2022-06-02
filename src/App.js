import React,{useState, useEffect} from 'react';
import api from './services/api';

class Clock extends React.Component {

    constructor(props){
        super(props);
        this.state = {date:new Date()};
    }

    componentDidMount(){
        this.timerID = setInterval(
            () => this.tick(),
            1000
        );
    }

    componentWillUnmount(){
        clearInterval(this.timerID)
    }

    tick(){
        this.setState({
            date: new Date()
        });
    }

    render(){
        return(
            <>
                {this.state.date.toLocaleTimeString()}
            </>
        );
    }
}


function Header(){
    return(
        <div className="Header">
            <h2>Casa de Cambio</h2>
        </div>
    );
};

function Title(){
    return(
        <div>
            <h1>Casa de Cambio</h1>
        </div>
    );
};


function Table(){
    
    const[moedas, setMoedas] = useState();

    useEffect(() => {
        api
            .get('/USD-BRL,CAD-BRL,EUR-BRL,BTC-BRL,BOB-BRL,CHF-BRL')
            .then((response) => setMoedas(response.data))
            .catch((err) => {
                console.log('Ops! Ocorreu um erro...'+err);
            })
    },[]);
    

    return(
        <div className="Table">
            <p>Tabela de cotações - {new Date().toLocaleDateString()}, {<Clock/>}</p>
            <table>
                <tr>
                    <th>Moeda</th>
                    <th>Valor de Compra</th>
                    <th>Valor de Venda</th>
                </tr>
                <tr>
                    <td>USD</td>
                    <td>{Number(moedas?.USDBRL.bid).toLocaleString('pt-br',{style:'currency',currency:'BRL'})}</td>
                    <td>{Number(moedas?.USDBRL.low).toLocaleString('pt-br',{style:'currency',currency:'BRL'})}</td>
                </tr>
                <tr>
                    <td>CAD</td>
                    <td>{Number(moedas?.CADBRL.bid).toLocaleString('pt-br',{style:'currency',currency:'BRL'})}</td>
                    <td>{Number(moedas?.CADBRL.low).toLocaleString('pt-br',{style:'currency',currency:'BRL'})}</td>
                </tr>
                <tr>
                    <td>EUR</td>
                    <td>{Number(moedas?.EURBRL.bid).toLocaleString('pt-br',{style:'currency',currency:'BRL'})}</td>
                    <td>{Number(moedas?.EURBRL.low).toLocaleString('pt-br',{style:'currency',currency:'BRL'})}</td>
                </tr>
                <tr>
                    <td>BOB</td>
                    <td>{Number(moedas?.BOBBRL.bid).toLocaleString('pt-br',{style:'currency',currency:'BRL'})}</td>
                    <td>{Number(moedas?.BOBBRL.low).toLocaleString('pt-br',{style:'currency',currency:'BRL'})}</td>
                </tr>
                <tr>
                    <td>CHF</td>
                    <td>{Number(moedas?.CHFBRL.bid).toLocaleString('pt-br',{style:'currency',currency:'BRL'})}</td>
                    <td>{Number(moedas?.CHFBRL.low).toLocaleString('pt-br',{style:'currency',currency:'BRL'})}</td>
                </tr>
            </table>
        </div>
    );
};

function App(){
    return(
        <div className="App">
            <Header/>
            <Title/>
            <Table/>
        </div>
    );
};

export default App;