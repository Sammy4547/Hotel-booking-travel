import React, { useState } from "react";
import { Autocomplete, TextField, Button, Box } from "@mui/material";

export default function AutocompleteInput({ suggestionsList = [], onSelect, onSearch }) {
  const [query, setQuery] = useState("");

  const handleSearch = (e) => {
    e.preventDefault();
    if (query.trim()) {
      onSearch(query.trim());
    }
  };

  return (
    <Box component="form" onSubmit={handleSearch} sx={{ display: "flex", gap: 1, maxWidth: 500 }}>
      <Autocomplete
        freeSolo
        options={suggestionsList}
        value={query}
        onChange={(event, newValue) => {
          setQuery(newValue);
          onSelect(newValue);
        }}
        onInputChange={(event, newInputValue) => {
          setQuery(newInputValue);
        }}
        sx={{ flexGrow: 1 }}
        renderInput={(params) => (
          <TextField
            {...params}
            label="Search destinations"
            variant="outlined"
            fullWidth
          />
        )}
      />

      <Button
        type="submit"
        variant="contained"
        color="primary"
        sx={{ px: 3 }}
      >
        Search
      </Button>
    </Box>
  );
}
