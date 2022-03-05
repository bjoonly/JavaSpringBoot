import * as React from "react";
import {
    Box,
    Button,
    Grid,
    TextField,
    Typography,
    Paper,
    TableContainer,
    Table,
    TableBody,
    TableHead,
    TableCell,
    TableRow,
    Avatar,
    IconButton,
    TableFooter,
    TablePagination
} from "@mui/material";
import { Add, ArrowBackIosNew, ArrowForwardIos, Clear, RemoveRedEyeOutlined } from "@mui/icons-material";
import CropperDialog from "../../comon/CropperDialog";
import { useParams, useNavigate } from "react-router-dom";
import { useActions } from "../../../hooks/useActions";
import { useTypedSelector } from "../../../hooks/useTypedSelector"
import { baseURL } from "../../../http_comon";
import { IHotelImageItem } from "../types";
import TablePaginationActions from "@mui/material/TablePagination/TablePaginationActions";



const EditHotel: React.FC = () => {
    const { selectedHotel } = useTypedSelector((state) => state.hotel);
    const [name, setName] = React.useState<string>("");
    const [description, setDescription] = React.useState<string>("");
    const [filesForDelete, setFilesForDelete] = React.useState<Array<string>>([]);
    const { UploadImage, GetHotel, EditHotel } = useActions();
    const [savedFiles, setSavedFiles] = React.useState<Array<string>>([]);
    const [tableRowsPerPage, setTableRowsPerPage] = React.useState<number>(5);
    const [loading, setLoading] = React.useState<boolean>(false);
    const [tablePage, setTablePage] = React.useState<number>(0);
    let { id } = useParams() as any;
    const [images, setImages] = React.useState<Array<IHotelImageItem>>([]);
    const navigate = useNavigate();


    const dataImages = images.map((item, key) => {
        return (
            <Grid item key={key} xs={6} md={4} sx={{ display: "flex", pr: 2, pb: 2 }}>
                <img src={baseURL + "files/" + item.name} alt="images" width="100%" />
            </Grid>
        )
    })
    const onButtonClick = () => {
        let uploadImages = images.map(i => i.name);

        EditHotel(id, { name: name, description: description, images: uploadImages }, filesForDelete)
        navigate("/hotels");

    }

    async function getHotel() {

        setLoading(true)
        try {
            await GetHotel(id);

            setLoading(false);
        } catch (ex) {
            navigate("/hotels");
            setLoading(false);
        }
    }


    React.useEffect(() => {
        document.title = "Edit hotel";
        if (name == "")
            getHotel();
        setName(selectedHotel.name)
        setDescription(selectedHotel.description)
    }, [selectedHotel]);

    const handleChangeTablePage = (event: any, newPage: number) => {
        setTablePage(newPage)
    };
    const handleChangeTableRowsPerPage = (event: any) => {
        setTableRowsPerPage(parseInt(event.target.value, 10))
        setTablePage(0)
    };

    const isImageDeleted = (name: string) => {
        if (filesForDelete != null) {
            const index = filesForDelete.findIndex(elem => elem == name);
            if (index === -1)
                return false
            else
                return true
        }
    }
    const addOrDeleteFile = (name: string) => {
        if (filesForDelete != null) {
            const indexForDelete = filesForDelete.findIndex(elem => elem === name);
            const indexForSave = savedFiles.findIndex(elem => elem === name);
            const tmpListForDelete = filesForDelete.slice();
            const tmpListForSave = savedFiles.slice();
            if (indexForDelete === -1) {
                tmpListForDelete.push(name)
                tmpListForSave.splice(indexForSave, 1);
            }
            else {
                tmpListForSave.push(name)
                tmpListForDelete.splice(indexForDelete, 1);
            }

            setFilesForDelete(tmpListForDelete);
            setSavedFiles(tmpListForSave);
        }
        else {
            const indexForSave = savedFiles.findIndex(elem => elem === name);
            const tmpListForDelete = [] as Array<string>;
            const tmpListForSave = savedFiles.slice();
            tmpListForDelete.push(name)
            tmpListForSave.splice(indexForSave, 1);
            setFilesForDelete(tmpListForDelete);
            setSavedFiles(tmpListForSave);
        }
    }

    const handleSelected = async (base64: string) => {
        const image = await UploadImage(base64);
        setImages([...images, { name: "" + image }]);
    };


    return (
        <>
            {loading || selectedHotel.name == "" ?
                <Box>
                    <h4>Loading ...</h4>
                </Box>
                :
                <Grid>
                    <Box sx={{ display: "flex" }}>
                        <Grid item sx={{ py: 2, width: { xs: "80%", md: "70%" } }}>
                            <Grid item xs={12} mb={3}>
                                <Typography variant="h5">Edit hotel</Typography>
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
                            <Grid item xs={12}>
                                <TableContainer component={Paper} >
                                    <Table aria-label="custom pagination table">
                                        <TableHead>
                                            <TableRow >
                                                <TableCell component="th" scope="row" sx={{ width: 70 }} align="center" >
                                                    №
                                                </TableCell>
                                                <TableCell sx={{ width: 70 }}>
                                                    Image
                                                </TableCell>
                                                <TableCell align="right">
                                                </TableCell>
                                            </TableRow>
                                        </TableHead>
                                        <TableBody>
                                            {(tableRowsPerPage > 0
                                                ? selectedHotel.images.slice(tablePage * tableRowsPerPage, tablePage * tableRowsPerPage + tableRowsPerPage)
                                                : selectedHotel.images
                                            ).map((row, index) => (
                                                <TableRow key={index}>
                                                    <TableCell component="th" scope="row" sx={{ width: 70 }} align="center" >
                                                        {index + 1}.
                                                    </TableCell>
                                                    <TableCell sx={{ width: 70 }}>
                                                        <Avatar
                                                            src={baseURL + "files/" + row.name}
                                                            alt="Image"
                                                        />
                                                    </TableCell>
                                                    <TableCell align="right">
                                                        {isImageDeleted(row.name)
                                                            ? <IconButton aria-label="delete" sx={{ color: "#388e3c" }} onClick={() => addOrDeleteFile(row.name)}>
                                                                <Add />
                                                            </IconButton>
                                                            : <IconButton sx={{ color: "#d32f2f" }} onClick={() => { addOrDeleteFile(row.name) }}>
                                                                <Clear />
                                                            </IconButton>}
                                                    </TableCell>
                                                </TableRow>
                                            ))}
                                        </TableBody>
                                        <TableFooter>
                                            <TableRow>
                                                <TablePagination
                                                    rowsPerPageOptions={[5, 10, 25, { label: 'All', value: -1 }]}
                                                    colSpan={3}
                                                    count={selectedHotel.images.length}
                                                    rowsPerPage={tableRowsPerPage}
                                                    page={tablePage}
                                                    SelectProps={{
                                                        inputProps: {
                                                            'aria-label': 'rows per page',
                                                        },
                                                        native: true,
                                                    }}
                                                    onPageChange={handleChangeTablePage}
                                                    onRowsPerPageChange={handleChangeTableRowsPerPage}
                                                    ActionsComponent={TablePaginationActions}
                                                />
                                            </TableRow>
                                        </TableFooter>
                                    </Table>
                                </TableContainer>
                            </Grid>

                            <Grid item xs={12} mt={3} display="flex" justifyContent="end" >
                                <Button
                                    sx={{ paddingX: "35px" }}
                                    size="large"
                                    type="submit"
                                    variant="contained"
                                    onClick={onButtonClick}
                                >
                                    Update
                                </Button>
                            </Grid>
                        </Grid>
                        < Grid sx={{ display: 'flex', justifyContent: 'end' }} >
                            <CropperDialog onSelected={handleSelected} aspectRation={16 / 9} />
                        </Grid>
                    </Box>

                </Grid >
            }
        </>
    )
}

export default EditHotel;