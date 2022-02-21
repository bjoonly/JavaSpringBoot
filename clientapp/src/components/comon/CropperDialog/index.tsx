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
    Slide,
} from "@mui/material";
import { Close } from "@mui/icons-material";
import { forwardRef, LegacyRef, useRef, useState } from "react";
import Cropper from "cropperjs";


export interface ICropperProps {
    onSelected: (base64: string) => void;
    aspectRation?: number;
}
const Transition = forwardRef(function Transition(props: any, ref) {
    return <Slide direction="left" ref={ref} {...props} />;
});
const CropperDialog: React.FC<ICropperProps> = ({
    onSelected,
    aspectRation = 1 / 1 }) => {
    const [isCropperDialogOpen, setIsCropperDialogOpen] = useState(false);
    const [fileSelected, setFileSelected] = useState<string>("https://cdn.pixabay.com/photo/2016/12/18/13/45/download-1915753_960_720.png")
    const [cropperObj, setCropperObj] = useState<Cropper>();
    const imgRef = useRef<HTMLImageElement>(null);
    const prevRef = useRef<HTMLDivElement>();

    const selectImage = async (url: string) => {
        if (!cropperObj) {
            const cropper = new Cropper(imgRef.current as HTMLImageElement, {
                aspectRatio: aspectRation,
                viewMode: 1,
                dragMode: 'move',
                preview: prevRef.current,
            });
            cropper.replace(url);
            setCropperObj(cropper);
        }
        else {
            cropperObj?.replace(url);
        }

        setIsCropperDialogOpen(true);
    }

    const handleImageChange = async function (e: React.ChangeEvent<HTMLInputElement>) {
        const fileList = e.target.files;
        if (!fileList || fileList.length === 0) return;

        await selectImage(URL.createObjectURL(fileList[0]));
        e.target.value = "";
    };



    const cropperDialogSave = async function (e: React.MouseEvent<HTMLElement>) {
        const base = cropperObj?.getCroppedCanvas().toDataURL() as string;
        //await setFileSelected(base)
        onSelected(base);
        setIsCropperDialogOpen(false);
    };
    const cropperDialogClose = () => {
        setIsCropperDialogOpen(false);
    };

    return (
        <>
            <Grid item sx={{ display: 'flex', justifyContent: 'end', width: "30%" }} >
                <label htmlFor="Image">
                    <img
                        src={fileSelected}
                        alt="Image"
                        style={{ width: "160px", height: "160px", cursor: "pointer", borderRadius: 7 }} />
                </label>
                <input style={{ display: "none" }} type="file" name="Image" id="Image" onChange={handleImageChange} />
            </Grid>
            <Dialog
                open={isCropperDialogOpen}
                TransitionComponent={Transition}
                maxWidth="lg"
                keepMounted
                onClose={cropperDialogClose}
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
                        onClick={cropperDialogClose}
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
                                    src={fileSelected}
                                    style={{ width: "100%", height: "450px", display: "block" }} />
                            </Paper>
                        </Grid>
                        <Grid item lg={3} xs={12}>
                            <Paper elevation={0} >
                                <div ref={prevRef as LegacyRef<HTMLDivElement>}
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
                        onClick={cropperDialogSave}>
                        Save changes
                    </Button>
                </DialogActions>

            </Dialog >
        </>
    )
}
export default CropperDialog;