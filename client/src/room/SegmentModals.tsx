import { useState } from "react";

interface EditModalProps {
  onEditSegment: (segmentName: string, deadline: string) => void;
  segment: any
  id: string
}

export const EditModal: React.FC<EditModalProps> = ({ onEditSegment, segment, id }) => {
  const [segmentName, setSegmentName] = useState(segment.segment_name);
  const [deadline, setDeadline] = useState(segment.deadline);
  const [error, setError] = useState("");

  const handleEdit = () => {
    if (!segmentName) {
      setError("Segment name is required.");
      return;
    }
    onEditSegment(segmentName, deadline);
    const closeButton = document.querySelector(`#${id} .btn-close`) as HTMLButtonElement;
    if (closeButton) {
      closeButton.click();
    }
  };

  return (
    <div className="modal fade" tabIndex={-1} role="dialog" id={id} aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div className="modal-dialog" role="document">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Edit Segment</h5>
            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
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
              <label htmlFor="segmentDeadline" className="form-label">{`Deadline (Optional)`}</label>
              <input
                type="date"
                id="segmentDeadline"
                className="form-control"
                value={deadline}
                onChange={(e) => setDeadline(e.target.value)}
              />
            </div>
            {error && <div className="alert alert-danger">{error}</div>}
          </div>
          <div className="modal-footer">
            <button type="button" className="btn btn-secondary" onClick={handleEdit}>Save</button>
            <button type="button" className="btn btn-danger" data-bs-dismiss="modal">Cancel</button>
          </div>
        </div>
      </div>
    </div>
  );
};