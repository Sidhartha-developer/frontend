import Modal  from "./Modal";
import Button from "./Button";

const ConfirmDialog = ({ isOpen, onClose, onConfirm, title = "Are you sure?", message, loading }) => (
  <Modal isOpen={isOpen} onClose={onClose} title={title}>
    <p className="text-gray-600 mb-6">{message}</p>
    <div className="flex justify-end gap-3">
      <Button variant="secondary" onClick={onClose}>Cancel</Button>
      <Button variant="danger" onClick={onConfirm} loading={loading}>Confirm</Button>
    </div>
  </Modal>
);

export default ConfirmDialog;
