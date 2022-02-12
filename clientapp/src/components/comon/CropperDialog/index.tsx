import {
    Box,
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Grid,
    Paper,
    IconButton,
} from "@mui/material";
import { Close } from "@mui/icons-material";
import { LegacyRef } from "react";

interface ICropperDialog {
    isDialogOpen: boolean,
    Transition: any,
    modalClose: any,
    imgRef: LegacyRef<HTMLImageElement>,
    preview: LegacyRef<HTMLDivElement | undefined>,
    image: string,
    modalSave: any
}
const CropperDialog: React.FC<ICropperDialog> = ({ isDialogOpen, Transition, modalClose, imgRef, image, modalSave, preview }) => {
    return (
        <Dialog
            open={isDialogOpen}
            TransitionComponent={Transition}
            maxWidth="lg"
            keepMounted
            onClose={modalClose}
            aria-describedby="alert-dialog-slide-description"
            PaperProps={{
                sx: {
                    width: {
                        sm: "50rem"
                    }
                },
                style: { borderRadius: 10 }
            }}
        >
            <DialogTitle sx={{ m: 0, p: 2 }}>
                Change photo
                <IconButton
                    aria-label="close"
                    onClick={modalClose}
                    sx={{
                        position: 'absolute',
                        my: "auto",
                        right: 8,
                        top: 10,
                    }}
                >
                    <Close />
                </IconButton>
            </DialogTitle>
            <DialogContent>
                <Grid container rowSpacing={{ xs: 3 }} columnSpacing={{ xs: 3 }}>
                    <Grid item lg={9} xs={12} sx={{ height: "460px" }}>
                        <Paper>
                            <img ref={imgRef}
                                alt="SelectedImage"
                                src={image}
                                style={{ width: "100%", height: "450px", display: "block" }} />
                        </Paper>
                    </Grid>
                    <Grid item lg={3} xs={12}>
                        <Paper elevation={0} >
                            <div ref={preview as LegacyRef<HTMLDivElement>}
                                style={{
                                    width: "160px",
                                    height: "160px",
                                    overflow: "hidden",
                                }}>
                            </div>
                        </Paper>
                    </Grid>
                </Grid>

            </DialogContent>
            <DialogActions>
                <Button autoFocus size="medium"
                    variant="contained"
                    onClick={modalSave}>
                    Save changes
                </Button>
            </DialogActions>

        </Dialog >
    )
}
export default CropperDialog;