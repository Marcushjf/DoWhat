interface TaskCardProps {
    task: any
}

function TaskCard({ task }: TaskCardProps) {

    const handleEdit = () => {
        // Implement edit functionality
        console.log('Editing task:', task);
    };

    const handleMark = () => {
        // Implement mark functionality
        console.log('Marking task:', task);
    };

    return (
        <div className="border p-1 m-1 d-flex justify-content-between align-items-center">
            <div>{task.task_name}</div>
            <div>
                <button className="btn btn-sm btn-primary me-1" onClick={handleEdit}>Edit</button>
                <button className="btn btn-sm btn-success" onClick={handleMark}>Mark</button>
            </div>
        </div>
    );
}

export default TaskCard;
