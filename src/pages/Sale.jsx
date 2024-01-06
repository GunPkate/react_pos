import { useEffect, useState } from "react";
import Template from "../components/Template";
import axios from "axios";
import Config from "../config";
import Swal from "sweetalert2";


function Sale () {
    const [saleDetails,setSaleDetails] = useState([])
    const [saleDetail,setSaleDetail] = useState({})
    const [barCode,setBarCode] = useState(1);
    const [totalPrice,setTotalPrice] = useState(0);
    const [billSaleId,setBillSaleId] = useState(0);

    useEffect(()=>{ fetchLastSale() },[])
    
    const fetchLastSale = async () =>{
        try {
            await axios.get(Config.api+"/api/Sale/LastSale/",Config.headers).then( res=>{
                // console.log(res)
                if(res.data.billSaleId != 0){
                    fetchData(res.data.billSaleId);
                    setBillSaleId(res.data.billSaleId);
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
                    handlePrice(data);
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

    // Add item to Sale  
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

    const handlePrice = (data) =>{
        let sum = 0;
        console.log('lag 01',saleDetails)
        data.map(item=> sum += item.price* item.amount );
        console.log('sum',sum);
        setTotalPrice(sum);
    }

    const handleDelete = (item) =>{
        Swal.fire({
            title: 'confirm delete?',
            text: 'delete this item?',
            icon: 'question',
            showConfirmButton: true,
            showCancelButton: true
        }).then(async  res=>{
            if( res.isConfirmed){
                await axios.delete(Config.api+'/api/Sale/DeleteSale/'+item.id,Config.headers).then(res=>{
                    if(res.data.message === 'success'){
                        fetchData(billSaleId);
                    }
                })   
            }
        }).catch(err =>{
            throw err.response.data
        })
        console.log(item)
    }
    return (<>
        <Template>
            <div className="card">
                <div className="card-body">
                    <div className="text-right">
                        <span className="alert alert-secondary h2 bg-dark">
                            <b className="text-success">
                                {(totalPrice).toLocaleString('th-TH')}
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
                                <th className="col-1">#</th>
                                <th className="col-1">Barcode</th>
                                <th className="col-2">item</th>
                                <th className="col-2">price</th>
                                <th className="col-2">amount</th>
                                <th className="col-2">Total</th>
                                <th className="col-1"></th>
                            </tr>
                        </thead>
                        <tbody>
                            {saleDetails.length>0?
                            saleDetails.map((item,index)=>
                                <tr key={item.id}>
                                    <td >{item.id}</td>
                                    <td>{item.isbn}</td>
                                    <td>{item.name}</td>
                                    <td>{item.price.toLocaleString('th-TH')}</td>
                                    <td>{item.amount}</td>
                                    <td>{(item.price * item.amount).toLocaleString('th-TH')}</td>
                                    <td>
                                        <button data-toggle="modal" data-target="#modalForm" className="btn-warning mr-2" onClick={e=>saleDetail(item)}>
                                            {/* Edit */}
                                            <i className="fa fa-pencil "></i>
                                        </button>
                                        <button className="btn-danger mr-2 " onClick={e => handleDelete(item)}>
                                            {/* Delete */}
                                            <i className="fa fa-times"></i>
                                        </button>
                                    </td>
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