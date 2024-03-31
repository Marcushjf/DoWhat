interface ConfirmationModalProps {
    onConfirmRemove: () => void;
    id: string
    message: string
  }

  import ReactDOM from 'react-dom';

  export const ConfirmationModal: React.FC<ConfirmationModalProps> = ({ onConfirmRemove, id, message }) => {
      return ReactDOM.createPortal(
          <div className="modal fade" id={`${id}`} tabIndex={-1} aria-labelledby="exampleModalLabel" aria-hidden="true" style={{ position: 'absolute' }}>
              <div className="modal-dialog">
                  <div className="modal-content">
                      <div className="modal-header">
                          <h5 className="modal-title">{`Confirm ${message}?`}</h5>
                          <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                      </div>
                      <div className="modal-body">
                          {`Are you sure you want to ${message}?`}
                      </div>
                      <div className="modal-footer">
                          <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                          <button type="button" className="btn btn-danger" data-bs-dismiss="modal" onClick={onConfirmRemove}>Yes !</button>
                      </div>
                  </div>
              </div>
          </div>,
          document.body // Render the modal outside of the parent container
      );
  };
  