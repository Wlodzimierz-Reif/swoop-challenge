import { AlertDialog, Button, Flex } from '@radix-ui/themes';

const Modal = ({
  title,
  buttonText,
  description,
  onConfirm,
  onCancel,
  dataTestId,
}: {
  title: string;
  buttonText: string;
  description: string;
  onConfirm: () => void;
  onCancel: () => void;
  dataTestId?: string;
}) => {
  return (
    <AlertDialog.Root>
      <AlertDialog.Trigger>
        <Button color="red" data-testid={dataTestId || "delete-button"}>
          {buttonText}
        </Button>
      </AlertDialog.Trigger>
      <AlertDialog.Content style={{ maxWidth: '450px' }} data-testid="modal-dialog">
        <AlertDialog.Title>{title}</AlertDialog.Title>
        <AlertDialog.Description size="2">{description}</AlertDialog.Description>

        <Flex gap="3" mt="4" justify="end">
          <AlertDialog.Cancel>
            <Button
              variant="soft"
              color="gray"
              onClick={onCancel}
              data-testid="modal-cancel-button"
            >
              Cancel
            </Button>
          </AlertDialog.Cancel>
          <AlertDialog.Action>
            <Button
              variant="solid"
              color="red"
              onClick={onConfirm}
              data-testid="modal-confirm-button"
            >
              {buttonText}
            </Button>
          </AlertDialog.Action>
        </Flex>
      </AlertDialog.Content>
    </AlertDialog.Root>
  );
};

export default Modal;
