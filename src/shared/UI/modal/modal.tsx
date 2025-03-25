import { FC, ReactNode } from 'react';
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Button,
    IconButton,
    styled
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    title: string;
    showActions: boolean;
    children: ReactNode;
    confirmText?: string;
    cancelText?: string;
    onConfirm?: () => void;
}

const StyledDialog = styled(Dialog)(({ theme }) => ({
    '& .MuiDialog-paper': {
        minWidth: 400,
        borderRadius: theme.shape.borderRadius,
        padding: theme.spacing(2)
    }
}));

const Header = styled(DialogTitle)({
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '16px 24px',
    position: 'relative'
});

const CloseButton = styled(IconButton)(({ theme }) => ({
    position: 'absolute',
    right: theme.spacing(2),
    top: theme.spacing(2),
    color: theme.palette.grey[500]
}));

export const Modal: FC<ModalProps> = (
    {
        isOpen,
        onClose,
        title,
        children,
        showActions = false,
        confirmText = 'Далее',
        cancelText = 'Отменить',
        onConfirm
    }) => {
    return (
        <StyledDialog
            open={isOpen}
            onClose={onClose}
            aria-labelledby="modal-title"
        >
            <Header>
                {title}
                <CloseButton
                    aria-label="close"
                    onClick={onClose}
                >
                    <CloseIcon />
                </CloseButton>
            </Header>

            <DialogContent dividers>{children}</DialogContent>

            {showActions && (
                <DialogActions>
                    <Button
                        variant="outlined"
                        onClick={onClose}
                        sx={{ mr: 2 }}
                    >
                        {cancelText}
                    </Button>
                    <Button
                        variant="contained"
                        onClick={onConfirm}
                        color="primary"
                    >
                        {confirmText}
                    </Button>
                </DialogActions>
            )}
        </StyledDialog>
    );
};