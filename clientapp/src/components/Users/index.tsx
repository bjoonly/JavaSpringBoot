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
    TextField,
    Typography
} from "@mui/material";
import qs from "qs";
import * as React from "react";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { useActions } from "../../hooks/useActions";
import { useTypedSelector } from "../../hooks/useTypedSelector";
import { ISearch } from "./types";



const Users: React.FC = () => {
    const { users, totalPages } = useTypedSelector((state) => state.users);
    const { GetUsers } = useActions();
    const [loading, setLoading] = useState<boolean>(false);
    const [page, setPage] = useState<number>(1);
    const [count, setCount] = useState<number>(15);
    const [searchParams, setSearchParams] = useSearchParams();
    const [search, setSearch] = useState<ISearch>(
        {
            page: searchParams.get("page"),
            count: searchParams.get("count")
        }
    )
    async function getUsers(search: ISearch) {

        setLoading(true)
        try {
            const url = window.location.search;
            const params = new URLSearchParams(url);

            let countParams = params.get("count");
            let pageParams = params.get("page");
            if (pageParams !== null) {
                setPage(+pageParams)
            }
            if (countParams != null) {
                setCount(+countParams)
            }
            setSearch(search)
            await GetUsers(+page, +count);
            setLoading(false);
        } catch (ex) {
            setLoading(false);
        }
    }

    const handleChangePage = (event: any, newPage: number) => {
        setPage(newPage)
    };

    const handleChangeRowsPerPage = (event: any) => {
        setCount(parseInt(event.target.value, 10));
        setPage(0);
    };
    useEffect(() => {
        document.title = "Users";
        getUsers(search);
    }, [page, count]);

    return (
        <>
            {loading
                ? <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                    <CircularProgress sx={{ mt: 3 }} />
                </Box>
                : <>
                    <Box sx={{ mb: 3 }}>
                        <Grid container mb={2}>

                            <Grid item xs={12} md={10} sx={{ mb: { md: 0, xs: 2 } }}>
                                <Typography variant="h3">Users</Typography>
                            </Grid>
                            <Grid item xs={3} md={2}>
                                <TextField sx={{ md: 5 }} fullWidth
                                    type="number"
                                    value={count}
                                    InputProps={{
                                        inputProps: {
                                            max: 200, min: 5, step: 10
                                        }
                                    }}
                                    onChange={(e) => {
                                        var value = parseInt(e.target.value, 10);

                                        if (value > 200) value = 200;
                                        if (value < 5) value = 5;
                                        setSearchParams(qs.stringify({ count: value, page: 1 }, { indices: false }));
                                        setPage(1)
                                        setCount(value);
                                    }}

                                    label="Count"
                                />

                            </Grid>
                        </Grid>
                        <TableContainer component={Paper} sx={{ mt: 3, borderRadius: '7px', width: "100%" }} >
                            <Table aria-label="custom  table" >
                                <TableHead>
                                    <TableRow>
                                        <TableCell component="th" scope="row" sx={{ width: 70 }} align="center" >
                                            Id
                                        </TableCell>
                                        <TableCell align="center">
                                            Display Name
                                        </TableCell>
                                        <TableCell sx={{ width: 90 }} align="center">
                                            Up Votes
                                        </TableCell>
                                        <TableCell sx={{ width: 90 }} align="center">
                                            Down Votes
                                        </TableCell>
                                        <TableCell sx={{ width: 70 }} align="center">
                                            Views
                                        </TableCell>
                                        <TableCell sx={{ width: 120 }} align="center">
                                            Reputation
                                        </TableCell>
                                        <TableCell align="center" sx={{ width: 200 }}>
                                            Location
                                        </TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>{
                                    users.map((row) => (
                                        <TableRow key={row.id}>
                                            <TableCell scope="row" sx={{ width: 70 }} align="center" >
                                                {row.id}.
                                            </TableCell>
                                            <TableCell scope="row" align="center" >
                                                {row.displayName}
                                            </TableCell>
                                            <TableCell scope="row" sx={{ width: 90 }} align="center" >
                                                {row.upVotes}
                                            </TableCell>
                                            <TableCell scope="row" sx={{ width: 90 }} align="center" >
                                                {row.downVotes}
                                            </TableCell>
                                            <TableCell scope="row" sx={{ width: 120 }} align="center" >
                                                {row.views}
                                            </TableCell>
                                            <TableCell scope="row" sx={{ width: 70 }} align="center" >
                                                {row.reputation}
                                            </TableCell>
                                            <TableCell scope="row" align="center" sx={{ width: 200 }} >
                                                {row.location}
                                            </TableCell>
                                        </TableRow>
                                    ))}


                                </TableBody>
                            </Table>
                        </TableContainer>
                        <Grid container>
                            <Pagination page={page} shape="rounded" count={totalPages} size="large" showFirstButton showLastButton sx={{ marginTop: 4, marginX: "auto" }} style={{ color: "#55FCF1" }}
                                onChange={(event: any, value) => {
                                    setSearchParams(qs.stringify({ page: value, count: count }, { indices: false }));
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

export default Users;