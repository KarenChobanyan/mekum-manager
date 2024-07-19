import React, { ReactNode } from 'react';
import Dialog from '@mui/material/Dialog';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import { DialogActions } from '@mui/material';
import Loading from '../Loading/loading';
import Button from '../Button/button';
import { ButtonTypes } from '../../Interfaces/componentTypes';

interface IProps {
  open: boolean;
  title: string;
  titleStyle?:string,
  children: ReactNode;
  buttonTitle?: string;
  loading?: boolean;
  onClick?: any;
  handleClose: () => void;
}

const CustomModal: React.FC<IProps> = (props) => {
  const {
    open,
    title,
    loading,
    children,
    onClick,
    handleClose,
    buttonTitle,
    titleStyle
  } = props;

  return (
    <>
      <Dialog
        onClose={handleClose}
        aria-labelledby='customized-dialog-title'
        open={open}
      >
        <DialogTitle className={titleStyle!}>{title}</DialogTitle>
        <IconButton
          aria-label='close'
          onClick={handleClose}
          sx={{
            position: 'absolute',
            right: '14px',
            top: '10px',
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
        <DialogContent dividers>{children}</DialogContent>
        {onClick && (
          <DialogActions style={{ padding: 0 }}>
            {loading ? (
              <Loading styleProps={{ height: 'auto' }} />
            ) : (
              <Button
                title={buttonTitle}
                onClick={onClick}
                buttonType={ButtonTypes.Primery}
              />
            )}
          </DialogActions>
        )}
      </Dialog>
    </>
  );
};
export default CustomModal;
