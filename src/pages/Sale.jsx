import { useEffect, useState } from "react";
import Template from "../components/Template";
import axios from "axios";
import Config from "../config";
import Swal from "sweetalert2";


function Sale () {


    const [saleDetails,setSaleDetail] = useState([]);
    const [billSaleid,setBillSaleid] = useState(1);

    useEffect(()=>{fetchData()},[])
    const fetchData = () =>{
        try {
            axios.get(Config.api+"/api/Sale/SaleDetail/"+billSaleid,Config.headers).then(res=>{
                if(res.status == '200'){
                    setSaleDetail(res.data)
                    console.log('set',saleDetails)
                }
            }).catch(err=>{
                throw err.response.data
            })
            
        } catch (error) {
            Swal.fire({
                title: 'error',
                text: error.message,
                icon: 'error'
            })
        }
    }

    const handleSale = ()=>{
        try {
            
        } catch (error) {
            Swal.fire({
                title: 'error',
                text: error.message,
                icon: 'error'
            })
        }
    }
    return (<>
        <Template>
            <div className="card">
                <div className="card-body">
                    <div className="text-right">
                        <span className="alert alert-secondary h2 bg-dark">
                            <b className="text-success">
                                0.00
                            </b>
                        </span>
                    </div>

                    <div className="input-group mt-4">
                        <span className="input-group-text">Barcode</span>
                        <input type="text" className="form-control" />
                        <button className="btn btn-primary">
                            <i className="fa fa-save"></i>
                        </button>
                    </div>

                    <table className="table table-bordered table-striped mt-3">
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Barcode</th>
                                <th>item</th>
                                <th>price</th>
                                <th>amount</th>
                                <th>Total</th>
                            </tr>
                        </thead>
                        <tbody>
                            {saleDetails.length>0?
                            saleDetails.map(item=>{
                                <tr>
                                    <td>{item.id}</td>
                                    <td>{item.isbn}</td>
                                    <td>{item.name}</td>
                                    <td>{item.amount}</td>
                                    <td>{item.price}</td>
                                </tr>
                            })
                            :
                            <tr>
                                <td className="text-center" colSpan={6}>No Data</td>
                            </tr>
                            }
                        </tbody>
                    </table>
                </div>
            </div>
        </Template>
    </>)
}

export default Sale;