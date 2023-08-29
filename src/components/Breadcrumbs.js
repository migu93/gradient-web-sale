import React from 'react';
import {useLocation} from 'react-router-dom';
import headerLinks from '../config/headerLinks';
import {Container, Link as MuiLink} from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import { styled } from '@mui/material/styles';
import subCategoriesMap from "../utils/subCategoriesMap";

const StyledLink = styled(MuiLink)({
    color: 'gray',
    textDecoration: 'none',
    fontFamily: 'Roboto, sans-serif',
    '&:hover': {
        color: 'red',
        transition: 'color 0.3s',
    }
});

const Breadcrumbs = () => {


    const pathNamesMap = headerLinks.reduce((acc, link) => {
        const pathSegment = link.path.split("/").filter(Boolean)[0];
        acc[pathSegment] = link.name;
        return acc;
    }, {});
    const combinedPathNamesMap = { ...pathNamesMap, ...subCategoriesMap };

    const location = useLocation();
    const pathnames = location.pathname.split("/").filter((x) => x);

    if (pathnames[0] === 'admin') {
        return null;
    }

    return (
        <Container maxWidth={'lg'} sx={{marginTop: 3, marginBottom: 2}}>
            <StyledLink  component={RouterLink} to="/">Главная</StyledLink >
            {pathnames.map((value, index) => {
                const last = index === pathnames.length - 1;
                const to = `/${pathnames.slice(0, index + 1).join("/")}`;
                const name = combinedPathNamesMap[value] || value;

                return (
                    <span style={{color: 'gray'}} key={to}>
                    {" / "}
                        <StyledLink
                            component={RouterLink}
                            to={to}
                            sx={last ? { color: 'currentColor', pointerEvents: 'none' } : {}}
                        >
                        {name}
                    </StyledLink >
                </span>
                );
            })}
        </Container>
    );
};

export default Breadcrumbs;
