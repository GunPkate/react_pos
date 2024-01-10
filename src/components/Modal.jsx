function Modal(props){

    let modalSize = 'modal-dialog modal-dialog-centered ';
    if(props.modalSize){
        modalSize += ' ' + props.modalSize;
        console.log(modalSize)
    }
    return(<>

        <button type="button" className="btn btn-primary" data-toggle="modal" data-target="#exampleModalCenter">
        Launch demo modal
        </button>        

        <div className="modal fade" id={props.id} tabIndex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
            <div className={modalSize} role="document">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title" id="exampleModalLongTitle">{props.title}</h5>
                        <button id="btnClose" type="button" className="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div className="modal-body">
                        {props.children}
                    </div>
                    {/* <div className="modal-footer">
                        <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                        <button type="button" className="btn btn-primary">Save changes</button>
                    </div> */}
                </div>
            </div>
        </div>
    </>)
}

export default Modal;