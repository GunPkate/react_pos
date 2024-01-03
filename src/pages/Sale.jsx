import Template from "../components/Template";

function Sale () {
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
                        <th>
                            <tr>
                                <th>#</th>
                                <th>Barcode</th>
                                <th>item</th>
                                <th>price</th>
                                <th>amount</th>
                                <th>Total</th>
                            </tr>
                        </th>
                    </table>
                </div>
            </div>
        </Template>
    </>)
}

export default Sale;