import React from 'react';
import {Container, Typography} from "@mui/material";
import CategoriesCards from "../components/Catalog/CategoriesCards";

const CatalogPage: React.FC = () => {
  return (
    <Container maxWidth={'lg'}>
      <Typography variant={'h4'} sx={{marginBottom: 4}}>Каталог оборудования</Typography>
        <CategoriesCards/>
    </Container>
  );
}

export default CatalogPage;
