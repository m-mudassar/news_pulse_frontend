import {useEffect, useState} from "react";
import {apiService} from "../../helpers/api/ApiService.tsx";
import {ApiEndpoints} from "../../helpers/ApiEndpoints.tsx";
import {Chip, Typography} from "@mui/material";
import Stack from "@mui/material/Stack";
import {PrimaryButton} from "../Wrappers/PrimaryButton/PrimaryButton.tsx";
import AddIcon from "@mui/icons-material/Add";
import {useDispatch, useSelector} from "react-redux";
import {selectCategories, selectUserCategories} from "../../store/modules/categories/get/getCategoriesSelectors.tsx";
import {ActionTypes} from "../../store/ActionTypes.tsx";
import {showSnackbar} from "../../store/modules/ui-triggers/snackbar/snackbarSlice.tsx";
import {SNACKBAR_TYPES} from "../../helpers/constants.tsx";

interface Category {
    id: number;
    name: string;
    created_at: string;
    updated_at: string;
}

export const Categories = () => {
    const dispatch = useDispatch();


    const apiCategories = useSelector(selectCategories);
    const apiUserCategories = useSelector(selectUserCategories);
    const categoriesPage = useSelector(selectCategories);
    const categoriesLastPage = useSelector(selectCategories);
    const isCategoriesLoading = useSelector(selectCategories);

    const [categories, setCategories] = useState<Category[]>(apiCategories);
    const [userCategories, setUserCategories] = useState<Category[]>(apiUserCategories);
    const [page, setPage] = useState(1);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const fetchCategories = async (page = 1) => {
        dispatch({type: ActionTypes.GET_CATEGORIES, payload: {formData: {page: page}}});
    };

    const handleLoadMore = () => {
        dispatch({type: ActionTypes.LOAD_MORE_CATEGORIES});
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

    const handleUpdateCategories = async () => {
        try {
            setIsSubmitting(true);
            const resp: any = await apiService.patch(ApiEndpoints.UPDATE_CATEGORIES, {
                categories: userCategories
            });
            dispatch(showSnackbar({
                message: resp?.message || "Categories updated successfully.",
                severity: SNACKBAR_TYPES.SUCCESS
            }));
            getNews();
            setIsSubmitting(false);
        } catch (err) {
            dispatch(showSnackbar({
                message: "An Error occurred when updating categories.",
                severity: SNACKBAR_TYPES.ERROR
            }));
            setIsSubmitting(false);
        }
    };

    const handleAddCategory = (category: Category) => {
        setUserCategories((prevCategories) => [...prevCategories, category]);
        setCategories((prevCategories) => prevCategories.filter((c) => c.id !== category.id));

        if (categories.length <= 1) {
            fetchCategories(page + 1);
            setPage(page + 1);
        }
    };

    const handleDeleteCategory = (category: Category) => {
        setCategories((prevCategories) => [...prevCategories, category]);
        setUserCategories((prevCategories) => prevCategories.filter((c) => c.id !== category.id));
    };

    useEffect(() => {
        setCategories(apiCategories);
    }, [apiCategories]);

    useEffect(() => {
        setUserCategories(apiUserCategories);
    }, [apiUserCategories]);

    useEffect(() => {
        fetchCategories();
    }, []);

    return (
        <>
            <Typography fontWeight="600" mt={"2rem"}>
                Categories
            </Typography>
            <Typography fontWeight="400" mt={"1rem"}>
                My Categories
            </Typography>
            <Stack direction={"row"} flexWrap={"wrap"} spacing={1}>
                {userCategories.length === 0 && (
                    <Typography fontWeight="300" fontSize={".8rem"} mt={"1rem"}>
                        No categories found
                    </Typography>
                )}
                {userCategories.map((category: Category, i) => (
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
                            label={category.name}
                            onDelete={() => handleDeleteCategory(category)}
                        />
                    </Stack>
                ))}
            </Stack>
            <Typography fontWeight="400" mt={"1rem"}>
                All Categories
            </Typography>
            <Stack direction={"row"} flexWrap={"wrap"} spacing={1}>
                {categories.length === 0 && (
                    <Typography fontWeight="300" fontSize={".8rem"} mt={"1rem"}>
                        No more categories found
                    </Typography>
                )}
                {categories.map((category: Category, i) => (
                    <Stack
                        key={i}
                        direction={"row"}
                        justifyContent={"space-between"}
                        alignItems={"center"}
                        py={"1rem"}
                    >
                        <Chip
                            variant={"filled"}
                            label={category.name}
                            deleteIcon={<AddIcon/>}
                            onDelete={() => handleAddCategory(category)}
                        />
                    </Stack>
                ))}
            </Stack>
            <Stack alignItems={'center'} pt={"2rem"}>
                {(categoriesPage < categoriesLastPage) && <PrimaryButton variant={'outlined'}
                                                                         isLoading={isCategoriesLoading}
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
                    onClick={handleUpdateCategories}
                >
                    <Typography textTransform={"none"}>Update Categories</Typography>
                </PrimaryButton>
            </Stack>
        </>
    );
};