interface TaskInfoProp{
    task:any,
    id:string
}

function TaskInfo({ task, id }:TaskInfoProp) {
    return (
        <div className={`modal fade text-dark`} data-bs-theme='light' id={id} tabIndex={-1} aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog border border-secondary rounded-3">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">{`${task.task_name}`}</h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
              {`Desccription :`}
            </div>
            <div className="modal-body rounded-3 m-3" style={{backgroundColor:'#D9DDDC'}}>
              <p>{`${task.description ? task.description:'No description'}`}</p>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" data-bs-dismiss="modal" aria-label="Close" >Cancel</button>
            </div>
          </div>
        </div>
      </div>
    );
  }
  
export default TaskInfo