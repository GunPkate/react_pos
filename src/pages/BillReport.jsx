import { useEffect, useState } from "react";
import Template from "../components/Template"
import Config from "../config";
import axios from "axios";

function BillReport(){
    const [fromDate,setFromDate] = useState();
    const [toDate,setToDate] = useState();
    const [BillReport,setBillReport] = useState([]);

    useEffect( () => {fetchData()} ,[])

    const fetchData = async () => {
        const myDate = new Date();
        const y = myDate.getFullYear();
        let m = myDate.getMonth() + 1;
        let d = myDate.getDate() + '';

        if(d.length ===1){
            d = '0' + d;
        }
        m > 10 ? m += '': m = '0' + m;

        const fromDate = y + '-' + m + '-' + '01';
        const toDate = y + '-' + m  + '-' + d;
        // const defaultDate = '2024-01-01'
        console.log(toDate)
        setFromDate(fromDate);
        setToDate(toDate);

        const dateBody = {
            fromDate: fromDate,
            toDate: toDate
        }
        await axios.post(Config.api+'/api/Report/BillReport',dateBody,Config.headers).then(res=>{
            console.log(res)
            setBillReport(res.data)
        }).catch(err => {
            throw err.response.data
        })
    }

    const handleBillReport = async() =>{
        const dateBody = {
            fromDate: fromDate,
            toDate: toDate
        }
        await axios.post(Config.api+'/api/Report/BillReport',dateBody,Config.headers).then(res=>{
            console.log(res)
            setBillReport(res.data)
        }).catch(err => {
            throw err.response.data
        })
    }
    
    return <>
        <Template>
            <div className="card mt-3">
                <div className="card-body">
                    <div className="h5">
                        Bill Report
                    </div>
                    <div className="row">
                        <div className="col-4">
                            <div className="input-group">
                                <span className="input-group-text">Date from</span>
                                <input value={fromDate} onChange={e=>setFromDate(e.target.value)} type="date" className="form-control" />
                            </div>
                        </div>
                        <div className="col-4">
                            <div className="input-group">
                                <span className="input-group-text">Date to</span>
                                <input value={toDate} onChange={e=>setToDate(e.target.value)} type="date" className="form-control" />
                            </div>
                        </div>
                        <div className="col-4">
                            <div className="input-group">
                                <button className="btn btn-primary" onClick={handleBillReport}>
                                    <i className="fa fa-check">Show item list</i>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <table className="table table-bordered table-stiped mt-2">
                <thead>
                    <tr>
                        <th className="col-2"></th>
                        <th className="col-1">#</th>
                        <th className="col-1">Bill ID</th>
                        <th className="col-6">Date</th>

                    </tr>
                </thead>
                <tbody>{
                    BillReport.length > 0 ?
                    BillReport.map((item,index) =>
                    <>
                        <tr>
                            <td className="text-center">
                                <button className="btn btn-info btn-lg">Bill Detail</button>
                            </td>
                            <td>{index+1}</td>
                            <td>{item.id}</td>
                            <td>{item.payAt}</td>
                        </tr>

                    </> ) : 
                    <>
                        <tr>
                            <td className="text-center" colSpan={6}>No Data</td>
                        </tr>
                    </>
                }</tbody>
        
            </table>
        </Template>
    </>
}

export default BillReport;