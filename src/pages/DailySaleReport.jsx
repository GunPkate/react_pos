import { useEffect, useState } from "react"
import Template from "../components/Template"


export default function DailySaleReport(){

    const [BillReport,setBillReport] = useState([])
    const [yearInput,setYearInput] = useState()
    const [yearList,setYearsList] = useState([])
    const [monthInput,setMonthInput] = useState()
    
    const months =  [ 
                        {value:'January'}, { value:'February'}, { value:'March'}, { value:'April' }, 
                        {value:'May'}, { value:'June'}, { value:'July'}, { value:'August' }, 
                        {value:'September'},  { value:'October'}, {  value:'November'}, { value:'December' }
                    ]
    
    useEffect(()=>{DefaultData()},[]);

    let yearsTemp = []
    const DefaultData = () =>{
        let currentDate = new Date();
        let thisYear = currentDate.getFullYear();

        setYearInput(thisYear);
        setMonthInput(currentDate.getMonth()+1)

        let defaultYear = thisYear -3
        for(let i = thisYear; thisYear >= defaultYear; thisYear--){
            let year = {value: thisYear}
            yearsTemp.push(year);
        }
        setYearsList(yearsTemp)

    }

    const handleChangeYear = (data) => {
        setYearInput(data)
        console.log(data)
    }

    const handleChangeMonth = (data) => {
        setYearInput(data)
        console.log(data)
    }

    const handleDailySaleReport = (e) =>{
        e.preventDefault();
        console.log(monthInput,yearInput)
    }

    return (
        <>
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
                                    <select className="form-control" value={yearInput} 
                                    onChange={e=>handleChangeYear(e.target.value)}
                                    >
                                        { 
                                            yearList.map(year=> <option value={year.value}>{year.value}</option>)
                                        }
                                    </select>
                                </div>
                            </div>
                            <div className="col-4">
                                <div className="input-group">
                                    <span className="input-group-text">Date to</span>
                                    <select className="form-control" value={monthInput} 
                                    onChange={e=>handleChangeMonth(e.target.value)}
                                    >
                                        { 
                                            months.map(month=> <option value={month.value}>{month.value}</option>)
                                        }
                                    </select>
                                </div>
                            </div>
                            <div className="col-4">
                                <div className="input-group">
                                    <button className="btn btn-primary"  onClick={handleDailySaleReport}>
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
                            <tr key={item.id}>
                                <td className="text-center">
                                    <button className="btn btn-info btn-lg" 
                                    data-toggle="modal" data-target="#modalViewBill" 

                                    >
                                        Bill Detail
                                    </button>
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
    )

}