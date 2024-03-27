interface TaskInfoProp{
    show:boolean,
    task:any,
    onClose:()=>void
}

function TaskInfo({ show,task, onClose }:TaskInfoProp) {
    return (
        <div className={`modal fade${show ? ' show' : ''} text-dark`} style={{ display: show ? 'block' : 'none' }} data-bs-theme='light'>
        <div className="modal-dialog border border-secondary rounded-3">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">{`${task.task_name}`}</h5>
              <button type="button" className="btn-close" onClick={onClose}></button>
            </div>
            <div className="modal-body">
              {`Desccription :`}
            </div>
            <div className="modal-body rounded-3 m-3" style={{backgroundColor:'#D9DDDC'}}>
              <p>{`${task.description ? task.description:'No description'}`}</p>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" onClick={onClose} >Cancel</button>
            </div>
          </div>
        </div>
      </div>
    );
  }
  
export default TaskInfo