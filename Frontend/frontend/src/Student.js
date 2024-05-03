import React,{Component} from 'react';
import {Table} from 'react-bootstrap';

//import 'bootstrap/dist/css/bootstrap.min.css';



export class Student extends Component{

    constructor(){
        super();
        this.state={
            deps:[]
        }
    }

    refreshList(){
        fetch(`http://localhost:8000/RH/dashboard_formation/`)
        .then(response=>response.json())
        .then(deps=>{
            this.setState({
                deps:deps
            });
            console.log(deps);

        })};


    componentDidMount(){
        this.refreshList();
        }

    componentDidUpadte(){
        this.refreshList();
            }
            

    render(){
        const stuData = this.state.deps;
        const rows = stuData.map((formation) =>
        <tr key={formation.id}>
            <td>{formation.name}</td>
            <td>{formation.created_by}</td>
            <td>{formation.created_at}</td>
            <td>{formation.updated_by}</td>
            <td>{formation.updated_at}</td>      


      </tr>
        );

        return(
            <div>
                <p id="before-table"></p>
               <table className="table table-bordered" id="dataTable">
                <thead>
                    <tr>
                <th>ID</th>
                <th>name</th>
                <th>created_by</th>
                <th>created_at</th>
                <th>updated_by</th>
                <th>updated_at</th>

                </tr>
                </thead>
                <tbody>
                    {rows} 
                </tbody>
                </table>
            </div>
        )
    }
}