import * as React from "react";
import {
    Box,
    Button,
    Grid,
    TextField,
    Typography,
    Paper
} from "@mui/material";
import CropperDialog from "../../comon/CropperDialog";
import { useActions } from "../../../hooks/useActions";
import { baseURL } from "../../../http_comon";



const CreateHotel: React.FC = () => {
    const [name, setName] = React.useState<string>("");
    const [description, setDescription] = React.useState<string>("");
    const { UploadImage, AddHotel } = useActions();

    const [images, setImages] = React.useState<Array<string>>([]);

    const dataImages = images.map((item, key) => {
        return (
            <Grid item key={key} xs={6} md={4} sx={{ display: "flex", pr: 2, pb: 2 }}>
                <img src={baseURL + "files/" + item} alt="images" width="100%" />
            </Grid>
        )
    })
    const onButtonClick = () => {
        AddHotel({ name: name, description: description, images: images });
    }
    const handleSelected = async (base64: string) => {
        const image = await UploadImage(base64);
        console.log(image);
        setImages([...images, "" + image]);
    };


    return (
        <>
            <Grid>
                <Box sx={{ display: "flex" }}>
                    <Grid item sx={{ py: 2, width: { xs: "80%", md: "70%" } }}>
                        <Grid item xs={12} mb={3}>
                            <Typography variant="h5">Create hotel</Typography>
                        </Grid>
                        <Grid item xs={12} mb={3}>
                            <TextField
                                fullWidth
                                autoComplete="name"
                                type="text"
                                label="Name"
                                value={name}
                                onChange={(e) => { setName(e.target.value) }}
                            />
                        </Grid>
                        <Grid item xs={12} mb={3}>
                            <TextField
                                fullWidth
                                autoComplete="Description"
                                type="text"
                                multiline
                                rows={4}
                                label="Description"
                                value={description}
                                onChange={(e) => { setDescription(e.target.value) }}
                            />
                        </Grid>
                        {
                            dataImages.length > 0 &&
                            <Grid container sx={{ display: "flex" }}>{dataImages}</Grid>
                        }
                        <Grid item xs={12} mt={3} display="flex" justifyContent="end" >
                            <Button
                                sx={{ paddingX: "35px" }}
                                size="large"
                                type="submit"
                                variant="contained"
                                onClick={onButtonClick}
                            >
                                Create
                            </Button>
                        </Grid>
                    </Grid>
                    < Grid sx={{ display: 'flex', justifyContent: 'end' }} >
                        <CropperDialog onSelected={handleSelected} aspectRation={16 / 9} />
                    </Grid>
                </Box>
            </Grid >

        </>
    )
}

export default CreateHotel;