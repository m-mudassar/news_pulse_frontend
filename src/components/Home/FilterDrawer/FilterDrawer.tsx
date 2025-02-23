import {Box, Drawer, IconButton} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import Stack from "@mui/material/Stack";
import {MyAutocomplete} from "../../Wrappers/MyAutocomplete/MyAutocomplete.tsx";
import {MyTextField} from "../../Wrappers/MyTextField/MyTextField.tsx";
import {PrimaryButton} from "../../Wrappers/PrimaryButton/PrimaryButton.tsx";
import {useDispatch, useSelector} from "react-redux";
import {useEffect, useState} from "react";
import {ActionTypes} from "../../../store/ActionTypes.tsx";
import {
    selectIsSearchingSources,
    selectSearchedSources
} from "../../../store/modules/sources/search/searchSourcesSelectors.tsx";
import {Source} from "../../../../types/news.ts";
import {useDebounce} from "../../../helpers/hooks/useDebounce.tsx";
import {isEmpty} from "../../../helpers/utils.tsx";
import {
    selectIsSearchingAuthors,
    selectSearchedAuthors
} from "../../../store/modules/authors/search/searchAuthorsSelectors.tsx";
import {
    selectIsSearchingCategories,
    selectSearchedCategories
} from "../../../store/modules/categories/search/searchCategoriesSelectors.tsx";
import {selectIsNewsLoading} from "../../../store/modules/news/get/getNewsSelectors.tsx";

export const FilterDrawer = (props: any) => {
    const {open, onClose, newsSearch} = props;

    const dispatch = useDispatch();

    const isNewsLoading = useSelector(selectIsNewsLoading);
    const sources = useSelector(selectSearchedSources);
    const isSearchingSources = useSelector(selectIsSearchingSources);
    const authors = useSelector(selectSearchedAuthors);
    const isSearchingAuthors = useSelector(selectIsSearchingAuthors);
    const categories = useSelector(selectSearchedCategories);
    const isSearchingCategories = useSelector(selectIsSearchingCategories);

    const [sourcesSearch, setSourcesSearch] = useState('');
    const [selectedSources, setSelectedSources] = useState<Source[]>([]);
    const debouncedSourcesSearch = useDebounce(sourcesSearch, 500);

    const [authorsSearch, setAuthorsSearch] = useState('');
    const [selectedAuthors, setSelectedAuthors] = useState<Source[]>([]);
    const debouncedAuthorsSearch = useDebounce(authorsSearch, 500);

    const [categorySearch, setCategorySearch] = useState('');
    const [selectedCategories, setSelectedCategories] = useState<Source[]>([]);
    const debouncedCategoriesSearch = useDebounce(categorySearch, 500);

    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');

    const fetchSources = (search = '') => {
        dispatch({
            type: ActionTypes.SEARCH_SOURCES,
            payload: {formData: {search: search}},
        });
    }

    const fetchAuthors = (search = '') => {
        dispatch({
            type: ActionTypes.SEARCH_AUTHORS,
            payload: {formData: {search: search}},
        });
    }

    const fetchCategories = (search = '') => {
        dispatch({
            type: ActionTypes.SEARCH_CATEGORIES,
            payload: {formData: {search: search}},
        });
    }

    useEffect(() => {
        fetchSources(debouncedSourcesSearch);
    }, [debouncedSourcesSearch]);

    useEffect(() => {
        fetchAuthors(debouncedAuthorsSearch);
    }, [debouncedAuthorsSearch]);

    useEffect(() => {
        fetchCategories(debouncedCategoriesSearch);
    }, [debouncedCategoriesSearch]);

    const handleFilter = () => {
        const data = {
            search: newsSearch,
            startDate: startDate,
            endDate: endDate,
            sources: selectedSources.map((source) => source.id),
            authors: selectedAuthors.map((author) => author.id),
            categories: selectedCategories.map((category) => category.id),
        }

        dispatch({
            type: ActionTypes.GET_NEWS,
            payload: {
                formData: data,
                handlePopupClose: onClose
            },

        });
    }

    return (
        <Drawer
            open={open}
            onClose={onClose}
            anchor="right"
            slotProps={{backdrop: {invisible: true}}}
            PaperProps={{sx: {width: {xs: "100%", lg: "40%"}}}}
        >
            <IconButton
                onClick={onClose}
                sx={{
                    top: 12,
                    left: 12,
                    zIndex: 9,
                    position: "absolute",
                }}
            >
                <CloseIcon/>
            </IconButton>

            <Stack
                pt={8}
                sx={{
                    pr: 2,
                    pl: 2,
                }}
            >
                <Stack direction={"column"} spacing={1}>
                    <Box sx={{width: "100%"}}>
                        <MyTextField
                            type={"date"}
                            value={startDate}
                            onChange={(e) => {
                                setStartDate(e.target.value)
                            }}
                            label="Start date"
                            fullWidth
                        />
                    </Box>
                    <Box sx={{width: "100%"}}>
                        <MyTextField type={"date"}
                                     value={endDate}
                                     onChange={(e) => {
                                         setEndDate(e.target.value)
                                     }}
                                     label="End date"
                                     fullWidth
                        />
                    </Box>
                </Stack>
                <Stack direction={"column"} spacing={1}>
                    <Box sx={{width: "100%"}}>
                        <MyAutocomplete
                            multiple={true}
                            isLoading={isSearchingSources}
                            onFocus={() => {
                                if (isEmpty(sources)) {
                                    fetchSources();
                                }
                            }}
                            value={selectedSources}
                            onChange={(source: any) => {
                                setSelectedSources(source);
                            }}
                            onInputChange={(_event: any, newInputValue: string) => {
                                setSourcesSearch(newInputValue);
                            }}
                            options={sources?.map((source: any) => {
                                return {...source, label: source.name, value: source.name};
                            })}
                            label={"Sources"}
                            fullWidth
                        />
                    </Box>
                    <Box sx={{width: "100%"}}>

                        <MyAutocomplete
                            multiple={true}
                            isLoading={isSearchingAuthors}
                            onFocus={() => {
                                if (isEmpty(authors)) {
                                    fetchAuthors();
                                }
                            }}
                            value={selectedAuthors}
                            onChange={(authors: any) => {
                                setSelectedAuthors(authors);
                            }}
                            onInputChange={(_event: any, newInputValue: string) => {
                                setAuthorsSearch(newInputValue);
                            }}
                            options={authors?.map((author: any) => {
                                return {...author, label: author.name, value: author.name};
                            })}
                            label={"Authors"}
                            fullWidth
                        />
                    </Box>
                    <Box sx={{width: "100%"}}>
                        <MyAutocomplete
                            multiple={true}
                            isLoading={isSearchingCategories}
                            onFocus={() => {
                                if (isEmpty(categories)) {
                                    fetchCategories();
                                }
                            }}
                            value={selectedCategories}
                            onChange={(category: any) => {
                                setSelectedCategories(category);
                            }}
                            onInputChange={(_event: any, newInputValue: string) => {
                                setCategorySearch(newInputValue);
                            }}
                            options={categories?.map((category: any) => {
                                return {...category, label: category.name, value: category.name};
                            })}
                            label={"Categories"}
                            fullWidth
                        />
                    </Box>
                </Stack>
                <PrimaryButton
                    isLoading={isNewsLoading}
                    onClick={handleFilter}
                >Filter</PrimaryButton>
            </Stack>
        </Drawer>
    );
};
