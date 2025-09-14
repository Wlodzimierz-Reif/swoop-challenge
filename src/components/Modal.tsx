import { AlertDialog, Button, Flex } from '@radix-ui/themes';

const Modal = ({
  buttonText,
  description,
  onConfirm,
  onCancel,
}: {
  buttonText: string;
  description: string;
  onConfirm: () => void;
  onCancel: () => void;
}) => {
  return (
    <AlertDialog.Root>
      <AlertDialog.Trigger>
        <Button color="red">{buttonText}</Button>
      </AlertDialog.Trigger>
      <AlertDialog.Content style={{ maxWidth: '450px' }}>
        <AlertDialog.Title>Revoke access</AlertDialog.Title>
        <AlertDialog.Description size="2">{description}</AlertDialog.Description>

        <Flex gap="3" mt="4" justify="end">
          <AlertDialog.Cancel>
            <Button variant="soft" color="gray" onClick={onCancel}>
              Cancel
            </Button>
          </AlertDialog.Cancel>
          <AlertDialog.Action>
            <Button variant="solid" color="red" onClick={onConfirm}>
              {buttonText}
            </Button>
          </AlertDialog.Action>
        </Flex>
      </AlertDialog.Content>
    </AlertDialog.Root>
  );
};

export default Modal;
