import {
    Box,
    Button,
    Slide,
    Grid,
    TextField,
    Typography
} from "@mui/material";
import {
    Link as RouterLink
} from 'react-router-dom';
import Cropper from "cropperjs";

import { forwardRef, useRef, useState } from "react"
import CropperDialog from "../comon/CropperDialog";
import { ListItemLink } from "../comon/ListItemLink";


const Transition = forwardRef(function Transition(props: any, ref) {
    return <Slide direction="left" ref={ref} {...props} />;
});

const Home: React.FC = () => {
    const [fileSelected, setFileSelected] = useState<string>("https://cdn.pixabay.com/photo/2016/12/18/13/45/download-1915753_960_720.png")
    const [cropperObj, setCropperObj] = useState<Cropper>();
    const imgRef = useRef<HTMLImageElement>(null);
    const prevRef = useRef<HTMLDivElement>();

    const [isCropperDialogOpen, setIsCropperDialogOpen] = useState(false);

    // const [open, setOpen] = useState(false);

    // const handleClick = () => {
    //     console.log(open)
    //     setOpen((prevOpen) => !prevOpen);
    //     console.log(open)
    // };


    const selectImage = async (url: string) => {
        if (!cropperObj) {
            const cropper = new Cropper(imgRef.current as HTMLImageElement, {
                aspectRatio: 1 / 1,
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

    const cropperDialogClose = () => {
        setIsCropperDialogOpen(false);
    };

    const cropperDialogSave = async function (e: React.MouseEvent<HTMLElement>) {
        const base = cropperObj?.getCroppedCanvas().toDataURL() as string;
        console.log(base);
        await setFileSelected(base)
        setIsCropperDialogOpen(false);
    };

    return (
        <>
            <Grid>
                <Box sx={{ width: "100%", display: "flex" }}>
                    <Grid item sx={{ py: 2, width: "70%" }}>
                        <Grid item xs={12} mb={3}>
                            <Typography variant="h5">Home</Typography>
                        </Grid>

                    </Grid>
                </Box>

            </Grid>

            {/* <Typography variant="h5" color="inherit" component="div" sx={{ mb: 2 }}>
                    Region
                </Typography>
                <TextField type="text" label="Name" name="Name" id="Image" sx={{ mb: 2 }} />
                <Typography variant="h6" color="inherit" component="div" >
                    Choose image
                </Typography>
                <label htmlFor="Image">
                    <img
                        src={fileSelected}
                        alt="DefaultImage"
                        style={{ width: "160px", height: "160px", cursor: "pointer", borderRadius: 7 }} />
                </label>
                <input style={{ display: "none" }} type="file" name="Image" id="Image" onChange={handleImageChange} />
                <Button >Add</Button>
            </Box> */}
        </>
    )
}

export default Home;