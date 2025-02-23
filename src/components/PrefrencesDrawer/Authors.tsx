import {useEffect, useState} from "react";
import {apiService} from "../../helpers/api/ApiService.tsx";
import {ApiEndpoints} from "../../helpers/ApiEndpoints.tsx";
import {Chip, Typography} from "@mui/material";
import Stack from "@mui/material/Stack";
import {PrimaryButton} from "../Wrappers/PrimaryButton/PrimaryButton.tsx";
import AddIcon from "@mui/icons-material/Add";
import {useDispatch, useSelector} from "react-redux";
import {
    selectAuthors,
    selectAuthorsLastPage,
    selectAuthorsPage,
    selectIsAuthorsLoading,
    selectUserAuthors,
} from "../../store/modules/authors/get/getAuthorsSelectors.tsx";
import {ActionTypes} from "../../store/ActionTypes.tsx";
import {showSnackbar} from "../../store/modules/ui-triggers/snackbar/snackbarSlice.tsx";
import {SNACKBAR_TYPES} from "../../helpers/constants.tsx";

interface Author {
    id: number;
    name: string;
    created_at: string;
    updated_at: string;
}

export const Authors = () => {
    const dispatch = useDispatch();

    const apiAuthors = useSelector(selectAuthors);
    const apiUserAuthor = useSelector(selectUserAuthors);
    const isAuthorsLoading = useSelector(selectIsAuthorsLoading);
    const authorsPage = useSelector(selectAuthorsPage);
    const authorsLastPage = useSelector(selectAuthorsLastPage);


    const [authors, setAuthors] = useState<Author[]>(apiAuthors);
    const [userAuthors, setUserAuthors] = useState<Author[]>(apiUserAuthor);
    const [page, setPage] = useState(1);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const fetchAuthors = async (page = 1) => {
        dispatch({
            type: ActionTypes.GET_AUTHORS,
            payload: {formData: {page: page}},
        });
    };

    const handleLoadMore = () => {
        dispatch({
            type: ActionTypes.LOAD_MORE_AUTHORS,
        });
    }

    const getNews = (page: number = 1) => {
        dispatch({
            type: ActionTypes.GET_NEWS,
            payload: {
                formData: {
                    page: page,
                },
            },
        });
    };

    const handleUpdateAuthors = async () => {
        try {
            setIsSubmitting(true);
            const resp:any = await apiService.patch(ApiEndpoints.UPDATE_AUTHORS, {
                authors: userAuthors,
            });
            dispatch(showSnackbar({
                message: resp?.message || "Authors updated successfully.",
                severity: SNACKBAR_TYPES.SUCCESS
            }));
            getNews(1);
            setIsSubmitting(false);
        } catch (err) {
            setIsSubmitting(false);
        }
    };

    useEffect(() => {
        setAuthors(apiAuthors);
    }, [apiAuthors]);

    useEffect(() => {
        setUserAuthors(apiUserAuthor);
    }, [apiUserAuthor]);

    useEffect(() => {
        fetchAuthors();
    }, [open]);
    return (
        <>
            <Typography fontWeight="600" mt={"2rem"}>
                Authors
            </Typography>
            <Typography fontWeight="400" mt={"1rem"}>
                My Authors
            </Typography>
            <Stack direction={"row"} flexWrap={"wrap"} spacing={1}>
                {userAuthors?.length < 1 && (
                    <Typography fontWeight="300" fontSize={".8rem"} mt={"1rem"}>
                        No authors found
                    </Typography>
                )}
                {userAuthors?.map((author: Author, i) => (
                    <Stack
                        key={i}
                        direction={"row"}
                        justifyContent={"space-between"}
                        alignItems={"center"}
                        py={"1rem"}
                    >
                        <Chip
                            variant={"filled"}
                            color={"primary"}
                            label={author.name}
                            onDelete={() => {
                                setAuthors((prevAuthors) => {
                                    const updatedAuthors = new Set([
                                        ...prevAuthors.map((s) => s.id),
                                        author.id,
                                    ]);
                                    return Array.from(updatedAuthors).map(
                                        (id) => prevAuthors.find((s) => s.id === id) || author,
                                    );
                                });

                                const newUserAuthors = userAuthors?.filter(
                                    (s: Author) => s.id !== author?.id,
                                );
                                setUserAuthors(newUserAuthors);
                            }}
                        />
                    </Stack>
                ))}
            </Stack>
            <Typography fontWeight="400" mt={"1rem"}>
                All Authors
            </Typography>
            <Stack direction={"row"} flexWrap={"wrap"}>
                {authors?.length < 1 && (
                    <Typography fontWeight="300" fontSize={".8rem"} mt={"1rem"}>
                        No more authors found
                    </Typography>
                )}
            </Stack>
            <Stack direction={"row"} flexWrap={"wrap"} spacing={1}>
                {authors?.map((author: Author, i) => (
                    <Stack
                        key={i}
                        direction={"row"}
                        justifyContent={"space-between"}
                        alignItems={"center"}
                        py={"1rem"}
                    >
                        <Chip
                            variant={"filled"}
                            label={author.name}
                            deleteIcon={<AddIcon/>}
                            onDelete={() => {
                                setUserAuthors((prevAuthors) => {
                                    const updatedAuthors = new Set([
                                        ...prevAuthors.map((s) => s.id),
                                        author.id,
                                    ]);
                                    return Array.from(updatedAuthors).map(
                                        (id) => prevAuthors.find((s) => s.id === id) || author,
                                    );
                                });

                                const newAuthors = authors?.filter(
                                    (s: Author) => s.id !== author?.id,
                                );
                                setAuthors(newAuthors);
                                if (newAuthors?.length < 3) {
                                    fetchAuthors(page + 1);
                                    setPage(page + 1);
                                }
                            }}
                        />
                    </Stack>
                ))}
            </Stack>
            <Stack alignItems={'center'} pt={"2rem"}>
                {(authorsPage < authorsLastPage) && <PrimaryButton variant={'outlined'}
                                                                   isLoading={isAuthorsLoading}
                                                                   sx={{width: "max-content"}}
                                                                   onClick={handleLoadMore}
                >
                    <Typography textTransform={"none"}>Load More Authors</Typography>
                </PrimaryButton>}
            </Stack>
            <Stack direction={"row"} justifyContent={"end"} pt={"2rem"}>
                <PrimaryButton
                    isLoading={isSubmitting}
                    sx={{width: "max-content"}}
                    onClick={handleUpdateAuthors}
                >
                    <Typography textTransform={"none"}>Update Authors</Typography>
                </PrimaryButton>
            </Stack>
        </>
    );
};
