import React, { useState } from "react";
import {
    Box,
    Modal,
    Typography,
    Button,
    Grid,
    Chip,
    Stack,
    Divider,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

const sizesData = [
    { label: "20 X 10", tag: "Best Value" },
    { label: "30 X 15" },
    { label: "40 X 20" },
    { label: "48 X 24", tag: "Most Popular" },
    { label: "60 X 30" },
];

export default function ProductPreviewModal({ open, setOpen, selectedProduct }) {
    const [selectedSize, setSelectedSize] = useState("48 X 24");
    
    return (
        <Modal open={open} onClose={() => setOpen(false)}>
            <Box
                sx={{
                    position: "absolute",
                    top: "50%",
                    left: "50%",
                    transform: "translate(-50%, -50%)",
                    width: "70%",
                    maxWidth: "1100px",
                    boxShadow: 24,
                    p: 4,
                    maxHeight: "70vh",
                    overflowY: "auto",
                    padding: 0,
                    border: "none",
                }}
            >
                <Box
                    sx={{
                        display: "flex",
                    }}
                >
                    <Box
                        component="img"
                        src={selectedProduct?.image || "https://picsum.photos/400/400?random=1"}
                        alt="Product"
                        sx={{
                            flex: 1,
                            boxShadow: 3,
                            width: "450px",
                            height: "400px",
                            objectFit: "cover",
                        }}
                    />

                    <Box
                        sx={{
                            flex: 1,
                            bgcolor: "#f5f5f5",
                            boxShadow: 1,
                            p: 2,
                        }}
                    >
                        <div onClick={() => setOpen(false)} className="icone  w-full flex justify-end mb-4"> <CloseIcon /></div>
                        <Box sx={{ px: 5, gap: 2 }}>
                            <Typography sx={{ fontSize: "16px", color: "#6b6666", }} variant="h5" gutterBottom>
                                Stiudio DTalk
                            </Typography>
                            <Typography sx={{ fontFamily: "DynaPuff" }} variant="body1" gutterBottom>
                                {selectedProduct?.title || "Default Product Title"}
                            </Typography>
                            <Typography sx={{ fontFamily: "-moz-initial" }} variant="h6" gutterBottom>
                                {selectedProduct?.price || "$99.99"}
                            </Typography>
                            <Typography sx={{ fontSize: "14px", fontFamily: "-moz-initial" }} variant="subtitle1" gutterBottom>
                                Size : {selectedSize}
                            </Typography>
                            <Stack direction="row" spacing={1} mb={2}>
                                {sizesData.map((size) => (
                                    <Box key={size.label}
                                        onClick={() => setSelectedSize(size.label)}
                                        sx={{
                                            cursor: "pointer",
                                            border: selectedSize === size.label ? "2px solid #1976d2" : "1px solid #ccc",
                                            borderRadius: "4px",
                                            paddingX: "15px",
                                            paddingY: "8px",
                                            backgroundColor: selectedSize === size.label ? "#e3f2fd" : "#fff",

                                        }}
                                    >  <Typography sx={{ fontSize: "12px", }} variant="body2">{size.label}</Typography>

                                    </Box>
                                ))}
                            </Stack>
                            <Button variant="contained" sx={{ backgroundColor: "black", textTransform: "none", mb: 1, mt: 1 }} fullWidth>
                                Add to Cart
                            </Button>
                            <Button variant="outlined" sx={{ textTransform: "none" }} fullWidth>
                                Buy Now
                            </Button>
                        </Box>
                    </Box>
                </Box>

            </Box>
        </Modal>
    );
}
