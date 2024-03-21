import { useState } from "react";

interface EditModalProps {
    show: boolean;
    onCancel: () => void;
    onEditSegment: (segmentName: string, deadline: string) => void;
  }
  
  export const EditModal: React.FC<EditModalProps> = ({ show, onCancel, onEditSegment }) => {
    const [segmentName, setSegmentName] = useState('');
    const [deadline, setDeadline] = useState('');
  
    const handleEdit = () => {
      onEditSegment(segmentName, deadline);
      setSegmentName('');
      setDeadline('');
    };
  
    return (
      <div className={`modal${show ? ' show' : ''}`} tabIndex={-1} role="dialog" style={{ display: show ? 'block' : 'none' }}>
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Edit Segment</h5>
              <button type="button" className="close" onClick={onCancel}>
                <span>&times;</span>
              </button>
            </div>
            <div className="modal-body">
              <div className="mb-3">
                <label htmlFor="segmentName" className="form-label">Segment Name</label>
                <input
                  type="text"
                  id="segmentName"
                  className="form-control"
                  value={segmentName}
                  onChange={(e) => setSegmentName(e.target.value)}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="segmentDeadline" className="form-label">Deadline</label>
                <input
                  type="date"
                  id="segmentDeadline"
                  className="form-control"
                  value={deadline}
                  onChange={(e) => setDeadline(e.target.value)}
                />
              </div>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-primary" onClick={handleEdit}>Save</button>
              <button type="button" className="btn btn-secondary" onClick={onCancel}>Cancel</button>
            </div>
          </div>
        </div>
      </div>
    );
  };