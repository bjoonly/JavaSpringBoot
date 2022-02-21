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

const CreateRegion: React.FC = () => {
    const [name, setName] = React.useState<string>("")
    const { AddRegion } = useActions();

    const [base64, setBase64] = React.useState<string>("");

    const onButtonClick = () => {
        AddRegion({ name: name, base64: base64 })
    }
    const handleSelected = async (base64: string) => {
        setBase64(base64);
    };

    return (
        <>
            <Grid>
                <Box sx={{ display: "flex" }}>
                    <Grid item sx={{ py: 2, width: { xs: "80%", md: "70%" } }}>
                        <Grid item xs={12} mb={3}>
                            <Typography variant="h5">Create region</Typography>
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
                        {base64 != "" &&
                            <Grid item xs={6} md={4} sx={{ display: "flex", pr: 2, pb: 2 }}>
                                <img src={base64} alt="images" width="100%" />
                            </Grid>
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

export default CreateRegion;