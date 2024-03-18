interface NotificationProps {
  message: string;
  onClose: () => void;
}

const Notification: React.FC<NotificationProps> = ({ message, onClose }) => {
  return (
    <div className="modal fade show" style={{ display: "block" }}>
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Notification</h5>
            <button type="button" className="btn-close" onClick={onClose}></button>
          </div>
          <div className="modal-body">{message}</div>
          <div className="modal-footer">
            <button type="button" className="btn btn-primary" onClick={onClose}>
              OK
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Notification;
