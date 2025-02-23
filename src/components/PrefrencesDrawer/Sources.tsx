import {useEffect, useState} from "react";
import {apiService} from "../../helpers/api/ApiService.tsx";
import {ApiEndpoints} from "../../helpers/ApiEndpoints.tsx";
import {Chip, Typography} from "@mui/material";
import Stack from "@mui/material/Stack";
import {PrimaryButton} from "../Wrappers/PrimaryButton/PrimaryButton.tsx";
import AddIcon from "@mui/icons-material/Add";
import {useDispatch, useSelector} from "react-redux";
import {ActionTypes} from "../../store/ActionTypes.tsx";
import {
    selectIsSourcesLoading,
    selectSources,
    selectSourcesLastPage,
    selectSourcesPage,
    selectUserSources,
} from "../../store/modules/sources/get/getSourcesSelectors.tsx";
import {Source} from "../../../types/news.ts";
import {showSnackbar} from "../../store/modules/ui-triggers/snackbar/snackbarSlice.tsx";
import {SNACKBAR_TYPES} from "../../helpers/constants.tsx";

export const Sources = () => {
    const dispatch = useDispatch();

    const apiSources = useSelector(selectSources);
    const apiUserSources = useSelector(selectUserSources);
    const isSourcesLoading = useSelector(selectIsSourcesLoading);
    const sourcesPage = useSelector(selectSourcesPage);
    const sourceLastPage = useSelector(selectSourcesLastPage);

    const [sources, setSources] = useState<Source[]>(apiSources);
    const [userSources, setUserSources] = useState<Source[]>(apiUserSources);
    const [page, setPage] = useState(1);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const fetchSources = async (page = 1) => {
        dispatch({
            type: ActionTypes.GET_SOURCES,
            payload: {formData: {page: page}},
        });
    };

    const handleLoadMore = () => {
        dispatch({
            type: ActionTypes.LOAD_MORE_SOURCES,
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

    const handleUpdateSources = async () => {
        try {
            setIsSubmitting(true);
           const resp:any = await apiService.patch(ApiEndpoints.UPDATE_SOURCES, {
                sources: userSources,
            });
            dispatch(showSnackbar({
                message: resp?.message || "Sources updated successfully.",
                severity: SNACKBAR_TYPES.SUCCESS
            }));
            getNews();
            setIsSubmitting(false);
        } catch (err) {
            setIsSubmitting(false);
        }
    };

    const handleAddSource = async (source: Source) => {
        setUserSources((prevSources) => {
            const updatedAuthors = new Set([
                ...prevSources.map((s) => s.id),
                source.id,
            ]);
            return Array.from(updatedAuthors).map(
                (id) => prevSources.find((s) => s.id === id) || source,
            );
        });

        const newSources = sources?.filter((s: Source) => s.id !== source?.id);
        setSources(newSources);
        if (newSources?.length < 3) {
            setPage(page + 1);
            await fetchSources(page + 1);
        }
    };

    const handleDeleteSource = (source: Source) => {
        setSources((prevSources) => [...prevSources, source]);
        setUserSources((prevSources) =>
            prevSources.filter((s) => s.id !== source.id),
        );
    };

    useEffect(() => {
        setSources(apiSources);
    }, [apiSources]);

    useEffect(() => {
        setUserSources(apiUserSources);
    }, [apiUserSources]);

    useEffect(() => {
        fetchSources(page);
    }, [page]);

    return (
        <>
            <Typography fontWeight="600" mt={"2rem"}>
                Sources
            </Typography>
            <Typography fontWeight="400" mt={"1rem"}>
                My Sources
            </Typography>
            <Stack direction={"row"} flexWrap={"wrap"} spacing={1}>
                {userSources.length === 0 && (
                    <Typography fontWeight="300" fontSize={".8rem"} mt={"1rem"}>
                        No sources found
                    </Typography>
                )}
                {userSources.map((source: Source, i) => (
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
                            label={source.name}
                            onDelete={() => handleDeleteSource(source)}
                        />
                    </Stack>
                ))}
            </Stack>
            <Typography fontWeight="400" mt={"1rem"}>
                All Sources
            </Typography>
            <Stack direction={"row"} flexWrap={"wrap"} spacing={1}>
                {sources.length === 0 && (
                    <Typography fontWeight="300" fontSize={".8rem"} mt={"1rem"}>
                        No more sources found
                    </Typography>
                )}
                {sources.map((source: Source, i) => (
                    <Stack
                        key={i}
                        direction={"row"}
                        justifyContent={"space-between"}
                        alignItems={"center"}
                        py={"1rem"}
                    >
                        <Chip
                            variant={"filled"}
                            label={source.name}
                            deleteIcon={<AddIcon/>}
                            onDelete={() => handleAddSource(source)}
                        />
                    </Stack>
                ))}
            </Stack>
            <Stack alignItems={'center'} pt={"2rem"}>
                {(sourcesPage < sourceLastPage) && <PrimaryButton variant={'outlined'}
                                                                  isLoading={isSourcesLoading}
                                                                  sx={{width: "max-content"}}
                                                                  onClick={handleLoadMore}
                >
                    <Typography textTransform={"none"}>Load More Sources</Typography>
                </PrimaryButton>}
            </Stack>

            <Stack direction={"row"} justifyContent={"end"} pt={"2rem"}>
                <PrimaryButton
                    isLoading={isSubmitting}
                    sx={{width: "max-content"}}
                    onClick={handleUpdateSources}
                >
                    <Typography textTransform={"none"}>Update Sources</Typography>
                </PrimaryButton>
            </Stack>
        </>
    );
};
