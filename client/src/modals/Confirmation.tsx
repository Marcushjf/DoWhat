interface ConfirmationModalProps {
    show: boolean;
    onCancel: () => void;
    onConfirmRemove: () => void;
    message: string
  }

export const ConfirmationModal: React.FC<ConfirmationModalProps> = ({ show, onCancel, onConfirmRemove, message }) => {
    return (
      <div className={`modal fade${show ? ' show' : ''}`} style={{ display: show ? 'block' : 'none' }}>
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">{`Confirm ${message}?`}</h5>
              <button type="button" className="btn-close" onClick={onCancel}></button>
            </div>
            <div className="modal-body">
              {`Are you sure you want to ${message}?`}
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" onClick={onCancel}>Cancel</button>
              <button type="button" className="btn btn-danger" onClick={onConfirmRemove}>Remove</button>
            </div>
          </div>
        </div>
      </div>
    );
  };