import { useEffect, useState } from "react";
import Modal from "../components/Modal";
import Template from "../components/Template";
import Config from "../config";
import axios from "axios";
import Swal from "sweetalert2";

function Product(){

    const [books,setBoooks] = useState([]);
    const [book,setBoook] = useState({});

    useEffect(()=>{fetchData()},[])
    
    const fetchData = async () =>{
        try {
            
            await axios.get(Config.api+"/api/Book/List",Config.headers).then(res=>{
                setBoooks(res.data)
            }).catch(err =>{
                throw err.response.data;
            })
        }
        catch (e) {
            Swal.fire({
                title: 'error',
                message: e.message,
                icon: 'error'
            })
        }
    }

    const handleSave = async(e)=>{
        e.preventDefault();
        try {
            if(book.id == null){

                await axios.post(Config.api+'/api/Book/Create', book, Config.headers).then(res=>{
                    if(res.data){   
                        fetchData();
                        document.getElementById('btnClose').click();
                    }
                }).catch(err =>{
                    throw err.response.data;
                })
            }else{
                console.log('Update')
                console.log(book)
                await axios.post(Config.api+'/api/Book/Edit',book,Config.headers).then(res=>{
                    if(res.data){
                        fetchData();
                        document.getElementById('btnClose').click();
                    }
                }).catch(err =>{
                    throw err.response.data;
                })
            }
        }
        catch (e) {
            Swal.fire({
                title: 'error',
                message: e.message,
                icon: 'error'
            })
        }
    }
    return (<>
        <Template>
            <div className="card">
                <div className="h5 p-3">Book</div>
                <div className="card-body">
                    <button className="btn-info" data-target='#modalForm' data-toggle='modal' onClick={e=>setBoook({})}>
                        <i className="fa fa-plus">Add Item</i>
                    </button>
                </div>

            {books.length > 0?
            <table className="table table-bordered table-stiped mt-2">
                <thead>
                    <tr>
                        <th className="col-1">ID</th>
                        <th className="col-1">ISBN</th>
                        <th className="col-6">Name</th>
                        <th className="col-2">Price</th>
                        <th className="col-2"></th>
                    </tr>
                </thead>
                <tbody>{books.map(item =>
                    <>
                        <tr>
                            <td>{item.id}</td>
                            <td>{item.isbn}</td>
                            <td>{item.name}</td>
                            <td className="text-right">{item.price}</td>
                            <td>
                                <button data-toggle="modal" data-target="#modalForm" className="btn-warning mr-2" onClick={e=>setBoook(item)}>
                                    {/* Edit */}
                                    <i className="fa fa-pencil "></i>
                                </button>
                                <button className="btn-success mr-2">
                                    {/* Delete */}
                                    <i className="fa fa-file"></i>
                                </button>
                                <button className="btn-danger mr-2">
                                    {/* Delete */}
                                    <i className="fa fa-times"></i>
                                </button>
                            </td>
                        </tr>

                    </>
                )}</tbody>
        
            </table>
            :''
            }
            
            </div>
        </Template>

        <Modal id = "modalForm" title="Book Profile">
            <div>
                <label >ISBN</label>
                <input value={book.isbn} 
                onChange={e => setBoook({...book,isbn: e.target.value})}  className="form-control" type="text" />
            </div>
            <div className="mt-2">
                <label >Name</label>
                <input value={book.name} 
                onChange={e => setBoook({...book,name: e.target.value})}  className="form-control" type="text" />
            </div>
            <div className="mt-2">
                <label >Price</label>
                <input value={book.price} 
                onChange={e => setBoook({...book,price: e.target.value})}  className="form-control" type="text" />
            </div>
            <div className="mt-2">
                <button onClick={handleSave} className="btn-primary">
                    <i className="fa fa-check"></i>
                    &nbsp;
                    Save
                </button>
            </div>

        </Modal>
    </>)
}

export default Product;
