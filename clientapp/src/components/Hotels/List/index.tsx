import * as React from "react";
import {
    Box,
    CircularProgress,
    Grid,
    Pagination,
    PaginationItem,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Button,
    Typography,
    IconButton
} from "@mui/material";
import qs from "qs";
import {
    Delete,
    Edit,
    PagesOutlined
} from "@mui/icons-material";
import { useSearchParams, Link } from "react-router-dom";
import { useActions } from "../../../hooks/useActions";
import { useTypedSelector } from "../../../hooks/useTypedSelector";
import { baseURL } from "../../../http_comon";


const ListHotel: React.FC = () => {
    const { hotels, totalPages } = useTypedSelector((state) => state.hotel);
    const [loading, setLoading] = React.useState<boolean>(false);
    const { GetHotels, DeleteHotel } = useActions();
    const [searchParams, setSearchParams] = useSearchParams();
    const [page, setPage] = React.useState<number>(1);

    async function getHotels() {

        setLoading(true)
        try {
            const url = window.location.search;
            const params = new URLSearchParams(url);

            let pageParams = params.get("page");

            if (pageParams !== null) {
                setPage(+pageParams)
            }

            await GetHotels(+page);
            setLoading(false);
        } catch (ex) {
            setLoading(false);
        }
    }

    const DeleteHotelHandle = async (id: number) => {
        setLoading(true);
        try {
            await DeleteHotel(id);
            await getHotels();
            setLoading(false);
        }
        catch (exeption) {
            setPage(1)
            setLoading(false);
        }
    }

    React.useEffect(() => {
        document.title = "Hotels";
        getHotels();
    }, [page]);

    return (
        <>
            {loading
                ? <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                    <CircularProgress sx={{ mt: 3 }} />
                </Box>
                : <>
                    <Box sx={{ mb: 3 }}>
                        <Grid container mb={2}>
                            <Grid item xs={6} sm={8} md={10} sx={{ mb: 0 }}>
                                <Typography variant="h3">Hotels</Typography>
                            </Grid>
                            <Grid item xs={6} sm={4} md={2} >
                                <Button component={Link} to="/hotels/create" size="large" sx={{ ml: "auto", width: "100%" }} style={{ textDecoration: 'none' }}>Create hotel</Button>
                            </Grid>
                        </Grid>
                        <TableContainer component={Paper} sx={{ mt: 3, borderRadius: '7px', width: "100%" }} >
                            <Table>
                                <TableHead>
                                    <TableRow>
                                        <TableCell component="th" scope="row" sx={{ width: 70 }} align="center" >
                                            Id
                                        </TableCell>
                                        <TableCell component="th" scope="row" sx={{ width: 120 }} align="center" >
                                            Name
                                        </TableCell>
                                        <TableCell component="th" scope="row" sx={{ width: 150 }} align="center" >
                                            Description
                                        </TableCell>
                                        <TableCell component="th" scope="row" align="center" >
                                            Images
                                        </TableCell>
                                        <TableCell component="th" sx={{ width: 90 }} scope="row" align="center" >
                                        </TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>{
                                    hotels.map((row) => (
                                        <TableRow key={row.id}>
                                            <TableCell scope="row" sx={{ width: 70 }} align="center" >
                                                {row.id}.
                                            </TableCell>
                                            <TableCell scope="row" sx={{ width: 120 }} align="center" >
                                                {row.name}.
                                            </TableCell>
                                            <TableCell scope="row" sx={{ width: 150 }} align="center" >
                                                {row.description}.
                                            </TableCell>
                                            <TableCell scope="row" align="center" >
                                                <Grid container>
                                                    {row.images != null && row.images.length > 0 && row.images.map((item, key) => (
                                                        <Grid item key={key} md={3} sx={{ display: "flex", pr: 2, pb: 2 }}>
                                                            <img src={baseURL + "files/" + item.name} alt="images" width="100%" />
                                                        </Grid>
                                                    ))}

                                                </Grid>
                                            </TableCell>
                                            <TableCell scope="row" sx={{ width: 90 }} align="center" >
                                                <IconButton aria-label="edit" sx={{ color: "#ffb74d" }} component={Link} to={`/hotels/edit/${row.id}`} style={{ textDecoration: 'none', color: '#ffb74d' }}>
                                                    <Edit />
                                                </IconButton>
                                                <IconButton aria-label="delete" sx={{ color: "#d32f2f" }} onClick={() => DeleteHotelHandle(row.id)}>
                                                    <Delete />
                                                </IconButton>
                                            </TableCell>
                                        </TableRow>
                                    ))}


                                </TableBody>
                            </Table>
                        </TableContainer>
                        <Grid container>
                            <Pagination page={page} shape="rounded" count={totalPages} size="large" showFirstButton showLastButton sx={{ marginTop: 4, marginX: "auto" }} style={{ color: "#55FCF1" }}
                                onChange={(event: any, value) => {
                                    setSearchParams(qs.stringify({ page: value }));
                                    setPage(value)
                                }}
                                renderItem={(item) => <PaginationItem {...item} />} />
                        </Grid>

                    </Box>
                </>
            }
        </>
    )
}

export default ListHotel;