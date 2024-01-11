import { useEffect, useState } from "react";
import Template from "../components/Template";
import axios from "axios";
import Config from "../config";
import Swal from "sweetalert2";
import Modal from "../components/Modal";
import * as dayjs from "dayjs"


function Sale() {
    const [saleDetails, setSaleDetails] = useState([])
    const [saleDetail, setSaleDetail] = useState({})
    const [barCode, setBarCode] = useState(1);
    const [totalPrice, setTotalPrice] = useState(0);
    const [billSaleId, setBillSaleId] = useState(0);
    const [itemId, setItemId] = useState(0);
    const [itemAmount, setItemAmount] = useState(0);

    const [inputMoney, setInputMoney] = useState(0);
    const [inputChange, setInputChange] = useState(0);

    useEffect(() => { fetchLastSale() }, [])

    const fetchLastSale = async () => {
        try {
            await axios.get(Config.api + "/api/Sale/LastSale/", Config.headers).then(res => {
                // console.log(res)
                if (res.data.billSaleId != 0) {
                    fetchData(res.data.billSaleId);
                    setBillSaleId(res.data.billSaleId);
                }
            }).catch(err => {
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

    const fetchData = async (billSaleid) => {
        try {
            await axios.get(Config.api + "/api/Sale/SaleDetail/" + billSaleid, Config.headers).then(res => {
                const data = res.data.result
                handlePrice(data);
                setSaleDetails(data)
                console.log('set', saleDetails)


            }).catch(err => {
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
    const handleSale = (e) => {
        try {
            console.group(barCode)
            axios.post(Config.api + "/api/Sale/Sale?barcode=" + barCode, Config.headers).then(res => {

                if (res.data) {
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

    const handlePrice = (data) => {
        let sum = 0;
        console.log('lag 01', saleDetails)
        data.map(item => sum += item.price * item.amount);
        console.log('sum', sum);
        setTotalPrice(sum);
    }

    const handleDelete = (item) => {
        Swal.fire({
            title: 'confirm delete?',
            text: 'delete this item?',
            icon: 'question',
            showConfirmButton: true,
            showCancelButton: true
        }).then(async res => {
            if (res.isConfirmed) {
                await axios.delete(Config.api + '/api/Sale/DeleteSale/' + item.id, Config.headers).then(res => {
                    if (res.data.message === 'success') {
                        fetchData(billSaleId);
                    }
                })
            }
        }).catch(err => {
            throw err.response.data
        })
        console.log(item)
    }

    const handleUpdate = async (id, amount) => {
        console.log(id, amount)
        setItemAmount(amount);
        setItemId(id);

    }

    const handleEditSave = async (e) => {
        e.preventDefault();
        const id = itemId;
        const amount = itemAmount
        await axios.put(Config.api + '/api/Sale/EditSale?id=' + id + '&amount=' + amount, null, Config.headers).then(res => {
            if (res.data.message === 'success') {
                document.getElementById('btnClose').click();
                fetchData(billSaleId);
            }
        }).catch(err => {
            throw err.response.data
        })
    }

    const clearSaleItem = async (e) => {
        e.preventDefault();
        try {
            Swal.fire({
                title: '',
                text: 'Clear all Items',
                icon: 'question',
                showConfirmButton: true,
                showCancelButton: true
            }).then(async res => {
                if (res.isConfirmed)
                    await axios.delete(Config.api + '/api/Sale/ClearBill/' + billSaleId, Config.headers).then(res => {
                        if (res.data.message === 'success') {
                            fetchData(billSaleId);
                            resetData();
                        }
                    })
            })
        } catch (error) {
            Swal.fire({
                title: 'error',
                text: error.message,
                icon: 'error',
            })
        }

    }

    const computeChange = (data) => {
        setInputMoney(data);
        setInputChange(data - totalPrice);
    }

    const handleConfirmPurchase = async (e) => {
        e.preventDefault();
        try {
            console.log("confirm Purchase", billSaleId)
            await axios.put(Config.api + '/api/Sale/ConfirmBill/' + billSaleId, null, Config.headers).then(res => {
                if (res.data.message === 'success') {
                    Swal.fire({
                        title: 'Confirm Success',
                        text: 'Confirm Success',
                        icon: 'success'
                    })
                    resetData();
                }
            }).catch(err => {
                throw err
            })
        } catch (error) {
            Swal.fire({
                title: 'error',
                text: error.message,
                icon: 'error',
            })
        }

    }

    function resetData() {
        setSaleDetails([]);
        setBillSaleId(0);
        setTotalPrice(0);
        setInputMoney('');
        setInputChange(0);
    }

    const [lastBillId, setLastBillId] = useState();
    const [lastBill, setLastBill] = useState([]);

    const handleViewLastBill = async (e) => {
        try {
            e.preventDefault();
            await axios.get(Config.api + '/api/Sale/viewLastBill?billSaleId=' + billSaleId, Config.headers).then(res => {
                console.log(res)
                setLastBill(res.data.result)
            }).catch(err => {
                throw err.response
            })
        } catch (error) {
            Swal.fire({
                title: 'error',
                text: error.message,
                icon: 'error',
            })
        }
    }

    const [saleHistory, setSaleHistory] = useState([]);
    const handleSaleHistory = () => {
        try {
            axios.get(Config.api + "/api/Sale/saleHistory", Config.headers).then(res => {
                console.log(res.data.result)
                setSaleHistory(res.data.result)
            }).catch(err => {
                throw err.response.data
            })
        } catch (error) {
            Swal.fire({
                title: 'error',
                text: error.message,
                icon: 'error',
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
                                {(totalPrice).toLocaleString('th-TH')}
                            </b>
                        </span>
                    </div>

                    <div className="input-group mt-4">
                        <span className="input-group-text">Barcode</span>
                        <input onChange={e => setBarCode(e.target.value)} type="text" className="form-control" />
                        <button className="btn btn-primary" onClick={e => handleSale(e.target.value)}>
                            <i className="fa fa-save"></i>
                        </button>
                    </div>

                    <button className="btn btn-group">
                        <button data-toggle="modal" data-target="#modalConfirmPurchase" className="btn btn-success btn-lg">
                            <i className="fa fa-check"></i> Confirm Purchase
                        </button>
                    </button>
                    <button className="btn btn-group" onClick={handleSaleHistory} data-toggle="modal" data-target="#modalHistory">
                        <button className="btn btn-info btn-lg">
                            <i className="fa fa-list-alt"></i> Sale History
                        </button>
                    </button>
                    <button className="btn btn-group">
                        <button className="btn btn-primary btn-lg" data-toggle="modal" data-target="#modalViewLastBill"
                            onClick={handleViewLastBill}>
                            <i className="fa fa-file"></i> Latest Bill
                        </button>
                    </button>
                    <button className="btn btn-group">
                        <button className="btn btn-danger btn-lg" onClick={clearSaleItem}>
                            <i className="fa fa-times"></i> Clear All Item
                        </button>
                    </button>

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
                            {saleDetails.length > 0 ?
                                saleDetails.map((item, index) =>
                                    <tr key={item.id}>
                                        <td >{item.id}</td>
                                        <td>{item.isbn}</td>
                                        <td>{item.name}</td>
                                        <td>{item.price.toLocaleString('th-TH')}</td>
                                        <td>{item.amount}</td>
                                        <td>{(item.price * item.amount).toLocaleString('th-TH')}</td>
                                        <td>
                                            <button data-toggle="modal" data-target="#modalEditAmount"
                                                className="btn-warning mr-2" onClick={e => handleUpdate(item.id, item.amount)}>
                                                {/* Edit */}
                                                <i className="fa fa-pencil" ></i>
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

        <Modal title="Edit amount" id="modalEditAmount">
            <div>
                <label>Amount</label>
                <input value={itemAmount} onChange={e => setItemAmount(e.target.value)} className="form-control" />
                <button className="mt-3 tn btn-primary" onClick={handleEditSave}>Save</button>
            </div>
        </Modal>

        <Modal title="Confirm Purchase" id="modalConfirmPurchase">
            <div>
                <label>Total price</label>
                <input value={totalPrice} className="form-control form-control-lg text-right" disabled />
            </div>
            <div>
                <label>Payment</label>
                <input onChange={e => computeChange(e.target.value)} className="form-control form-control-lg text-right" />
            </div>
            <div>
                <label>Change</label>
                <input value={inputChange} className="form-control form-control-lg text-right" disabled />
            </div>
            <div className="mt-3">
                {inputChange >= 0 ? <>
                    <button className="btn btn-success btn-lg" onClick={handleConfirmPurchase} data-dismiss="modal">
                        <i className="fa fa-check">Paid</i>
                    </button>

                    <button className="btn btn-primary ml-3 btn-lg">
                        <i className="fa fa-check">Paid no Change</i>
                    </button>
                </> :
                    <div>
                    </div>
                }

            </div>
        </Modal>

        <Modal title="View Last Bill" id="modalViewLastBill" modalSize="modal-lg">

            <table className="table table-bordered table-striped mt-3">
                <thead>
                    <tr className="bg-dark">
                        <th className="col-1">#</th>
                        <th className="col-1">Barcode</th>
                        <th className="col-2">item</th>
                        <th className="col-2">price</th>
                        <th className="col-2">amount</th>
                        <th className="col-2">Total</th>
                    </tr>
                </thead>
                <tbody>
                    {lastBill.length > 0 ?
                        lastBill.map((item, index) =>
                            <tr key={item.id}>
                                <td >{item.id}</td>
                                <td>{item.isbn}</td>
                                <td>{item.name}</td>
                                <td className="text-right">{item.price.toLocaleString('th-TH')}</td>
                                <td className="text-right">{item.amount}</td>
                                <td className="text-right">{(item.price * item.amount).toLocaleString('th-TH')}</td>
                            </tr>
                        )
                        :
                        <tr>
                            <td className="text-center" colSpan={6}>No Data</td>
                        </tr>
                    }
                </tbody>
            </table>
        </Modal>

        <Modal title="Sale History" id="modalHistory" modalSize="modal-lg">
            <table>
                <thead>
                    <tr className="bg-dark text-center">
                        <th style={{ width: "8%" }}>#</th>
                        <th style={{ width: "10%" }}>Barcode</th>
                        <th style={{ width: "15%" }}>item</th>
                        <th style={{ width: "7%" }}>Bill ID</th>
                        <th style={{ width: "10%" }}>price</th>
                        <th style={{ width: "10%" }}>amount</th>
                        <th style={{ width: "15%" }}>Total</th>
                        <th style={{ width: "15%" }}>Date</th>
                        <th style={{ width: "10%" }}>Time</th>
                    </tr>
                </thead>
                <tbody>
                    {saleHistory.length > 0 ?
                        saleHistory.map((item) =>
                            <tr key={item.id}>
                                <td >{item.id}</td>
                                <td>{item.isbn}</td>
                                <td>{item.name}</td>
                                <td>{item.billSaleId}</td>
                                <td className="text-right">{item.price.toLocaleString('th-TH')}</td>
                                <td className="text-right">{item.amount}</td>
                                <td className="text-right">{(item.price * item.amount).toLocaleString('th-TH')}</td>
                                <td className="text-right">{dayjs(item.payAt).format("DD/MM/YYYY")}</td>
                                <td className="text-right">{dayjs(item.payAt).format("HH:mm")}</td>
                            </tr>
                        )
                        :
                        <tr>
                            <td className="text-center" colSpan={6}>No Data</td>
                        </tr>
                    }
                </tbody>
            </table>
        </Modal>
    </>)
}

export default Sale;