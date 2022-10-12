import { AvatarIcon, PriceTagIcon } from 'src/assets/svg';
import { Dialog, Button } from '@mui/material';
import { FileProps } from 'src/store/data/types';
import {
  BoxModal,
  Content,
  GasFees,
  Header,
  MainFee,
  Price,
  PriceWrapper,
  Title,
  Wallet,
  Footer,
} from './ConfirmationDialog.styles';

type ConfirmationDialogProps = {
  message: string;
  isOpen: boolean;
  walletId?: string;
  file?: FileProps | null;
  handleClose: () => void;
  handleConfirm: () => void;
};

const ConfirmationDialog = ({
  message,
  isOpen,
  file,
  handleClose,
  handleConfirm,
  walletId,
}: ConfirmationDialogProps) => {
  return (
    <Dialog open={isOpen} onClose={handleClose} transitionDuration={{ appear: 0, enter: 0, exit: 0 }}>
      <BoxModal>
        <Header>
          <Title>{message}</Title>
          <Wallet>
            <AvatarIcon />
            {(file && file.walletId) || (walletId && walletId)}
          </Wallet>
        </Header>
        <Content>
          <PriceWrapper>
            <MainFee>
              <PriceTagIcon />
              Transaction Fee
            </MainFee>
            <Price>$0.00</Price>
          </PriceWrapper>
          <PriceWrapper>
            <GasFees>Prime drive covers all gas fees.</GasFees>
            <GasFees>0.00 NEAR</GasFees>
          </PriceWrapper>
        </Content>

        <Footer>
          <Button variant="text" onClick={handleClose}>
            Cancel
          </Button>
          <Button variant="contained" onClick={handleConfirm}>
            Continue
          </Button>
        </Footer>
      </BoxModal>
    </Dialog>
  );
};

export default ConfirmationDialog;
