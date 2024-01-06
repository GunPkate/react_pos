import { useEffect, useState } from "react";
import Template from "../components/Template";
import axios from "axios";
import Config from "../config";
import Swal from "sweetalert2";


function Sale () {
    const [saleDetails,setSaleDetails] = useState([])
    const [barCode,setBarCode] = useState(1);

    useEffect(()=>{ fetchLastSale() },[])
    
    const fetchLastSale = async () =>{
        try {
            await axios.get(Config.api+"/api/Sale/LastSale/",Config.headers).then( res=>{
                // console.log(res)
                if(res.data.billSaleId != 0){
                    fetchData(res.data.billSaleId);
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

    const fetchData = async(billSaleid) =>{
        try {
            await  axios.get(Config.api+"/api/Sale/SaleDetail/"+billSaleid,Config.headers).then(res=>{
                const data = res.data.result
                    setSaleDetails(data)
                    console.log('set',saleDetails)


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

    const handleSale = (e)=>{
        try {
            console.group(barCode)
            axios.post(Config.api+"/api/Sale/Sale?barcode="+barCode,Config.headers).then(res=>{

                if(res.data){
                    console.log(res.data)
                    fetchData(res.data.billSaleId);
                }
            })
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
                        <input onChange={e=>setBarCode(e.target.value)} type="text" className="form-control" />
                        <button className="btn btn-primary" onClick={e=>handleSale(e.target.value)}>
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
                            saleDetails.map((item,index)=>
                                <tr key={item.id}>
                                    <td>{index+1}</td>
                                    <td >{item.id}</td>
                                    <td>{item.isbn}</td>
                                    <td>{item.name}</td>
                                    <td>{item.amount}</td>
                                    <td>{item.price}</td>
                                </tr>
                            )
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