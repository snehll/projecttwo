"use client";
import React, { useState } from "react";
import { ThemeProvider, createTheme, useTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import { motion, Variants } from "framer-motion";
import Head from "next/head";
import Image from "next/image";
import { useMediaQuery } from "@mui/material";
import SuccessModal from "@/components/modal";

// Define the theme with black background and light blue text
const theme = createTheme({
  palette: {
    mode: "dark",
    background: {
      default: "#000000",
      paper: "#000000",
    },
    text: {
      primary: "#4fc3f7", // Light blue text
    },
  },
});

// Animation variants for sections with explicit type
const sectionVariants: Variants = {
  hidden: { opacity: 0, y: 50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: "easeOut" as const }, // Explicitly type ease
  },
};

// Navbar links
const navLinks = [
  { name: "Home", id: "home" },
  { name: "About", id: "about" },
  { name: "Services", id: "services" },
  { name: "Contact", id: "contact" },
];

// Open source image URLs from Pixabay (four per section)
const images = {
  home: ["/sparepart.jpg", "/aboutus.jpg", "/dryer.jpg", "/logistics.jpg"],
  about: [
    "/aboutus.jpg",
    "/industrialpump.jpg",
    "/equipmentsupply.jpg",
    "/rental.jpg",
  ],
  services: [
    "/turbines.jpg",
    "/equipments.png",
    "/compressor.jpg",
    "/sparepart.jpg",
  ],
  logo: "https://img.icons8.com/ios/50/ffffff/gear.png",
};

export default function Home() {
  const themes = useTheme();
  const isMobile = useMediaQuery(themes.breakpoints.down("lg"));

  const [formData, setFormData] = useState({
    email: "",
    message: "",
    name: "",
    service: "",
    companyname: "nur",
  });
  const [agreedToTerms, setAgreedToTerms] = useState(false);
  const [status, setStatus] = useState<{
    success: boolean;
    message: string;
  } | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log(formData);
    try {
      const response = await fetch(
        "https://email-xi-pearl.vercel.app/api/send-email",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );

      const result = await response.json();
      setStatus(result);
      alert(result.message); // Matches your original alert-based feedback
      setFormData({
        email: "",
        message: "",
        name: "",
        service: "",
        companyname: "nur",
      });
      setAgreedToTerms(false); // Reset checkbox after submission
    } catch (error: any) {
      setStatus({
        success: false,
        message: error.message || "Failed to send request",
      });
      alert("Error: " + error.message);
    }
  };

  // Smooth scroll handler
  const scrollToSection = (id: any) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box
        sx={{
          minHeight: "100vh",
          bgcolor: "background.default",
          color: "text.primary",
          minWidth: 380,
          position: "relative", // Needed for starry background
        }}>
        {/* Starry Background */}
        <Box
          sx={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            zIndex: 0,
            pointerEvents: "none", // Ensure stars don’t interfere with interactions
            overflow: "hidden", // Contain starry overflow
            "&::before": {
              content: '""',
              position: "absolute",
              width: "100%",
              height: "100%",
              background: `
                radial-gradient(circle, rgba(255, 255, 255, 0.5) 1px, transparent 1px),
                radial-gradient(circle, rgba(255, 255, 255, 0.4) 1px, transparent 1px),
                radial-gradient(circle, rgba(255, 255, 255, 0.3) 1px, transparent 1px),
                radial-gradient(circle, rgba(79, 195, 247, 0.4) 1px, transparent 1px)
              `,
              backgroundSize:
                "100px 100px, 150px 150px, 200px 200px, 120px 120px",
              backgroundPosition: "0 0, 50px 50px, 100px 100px, 25px 25px",
              animation: "twinkle 6s infinite, drift 30s linear infinite",
            },
            "@keyframes twinkle": {
              "0%": { opacity: 0.4 },
              "50%": { opacity: 0.8 },
              "100%": { opacity: 0.4 },
            },
            "@keyframes drift": {
              "0%": {
                backgroundPosition: "0 0, 50px 50px, 100px 100px, 25px 25px",
              },
              "100%": {
                backgroundPosition:
                  "100px 100px, 150px 150px, 200px 200px, 125px 125px",
              },
            },
          }}
        />
        {/* Navbar */}
        <AppBar
          position="sticky"
          sx={{
            bgcolor: "background.default",
            top: 0,
            zIndex: 1100, // Ensure AppBar is above starry background and content
          }}>
          <Toolbar>
            {isMobile ? (
              <Box
                // flexGrow={1}
                sx={{
                  position: "relative",
                  borderRadius: 50,
                  width: 40,
                  height: 40,
                  overflow: "hidden",
                }}
                width={20}
                height={20}>
                <Image
                  src={"/images/logo.png"}
                  alt={`Home image`}
                  fill
                  style={{ objectFit: "cover" }}
                />
              </Box>
            ) : (
              <>
                <Box
                  sx={{
                    position: "relative",
                    borderRadius: 50,
                    width: 40,
                    height: 40,
                    overflow: "hidden",
                    marginRight: 2,
                  }}
                  width={20}
                  height={20}>
                  <Image
                    src={"/images/logo.png"}
                    alt={`Home image`}
                    fill
                    style={{ objectFit: "cover" }}
                  />
                </Box>
                <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                  NUR OVERSEAS PROFESYONEL TEKNOLOJIK
                </Typography>
              </>
            )}
            {navLinks.map((link) => (
              <Button
                key={link.id}
                color="inherit"
                onClick={() => scrollToSection(link.id)}
                sx={{ mx: isMobile ? 0 : 1, fontSize: isMobile ? 12 : 16 }}>
                {link.name}
              </Button>
            ))}
          </Toolbar>
        </AppBar>

        {/* Home Section */}
        <Box
          id="home"
          sx={{ minHeight: "100vh", display: "flex", alignItems: "center" }}>
          <Container maxWidth="lg">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={sectionVariants}>
              <Grid
                container
                direction="row"
                justifyContent="space-between"
                alignItems="center">
                <Grid
                  width={isMobile ? "100%" : "38%"}
                  display="flex"
                  flexDirection="column"
                  justifyContent="center"
                  alignItems="center">
                  <Box sx={{ p: 2 }}>
                    <Typography variant={isMobile ? "h5" : "h4"} gutterBottom>
                      Welcome to
                    </Typography>
                    <Typography
                      color="white"
                      variant={isMobile ? "h5" : "h4"}
                      fontWeight={"600"}
                      gutterBottom>
                      NUR OVERSEAS PROFESYONEL TEKNOLOJIK YATIRIMLAR OTOMOTIV
                      TİCARET LİMİTED ŞİRKETİ
                    </Typography>
                    <Typography
                      variant="body1"
                      paragraph
                      textAlign={isMobile ? "justify" : "left"}>
                      We specialize in the supply of spare parts for industrial
                      equipment such as generators, turbines, and more, for
                      production and resale.
                    </Typography>
                    <Button
                      onClick={() => scrollToSection("contact")}
                      variant="outlined"
                      sx={{
                        borderWidth: 2,
                        borderColor: "#4fc3f7",
                        borderRadius: 4,
                        px: 4,
                      }}>
                      Learn More
                    </Button>
                  </Box>
                </Grid>
                <Grid
                  width={isMobile ? "100%" : "60%"}
                  sx={{ ml: 2, p: 1.5, borderRadius: 4 }}>
                  <Grid
                    container
                    direction="row"
                    justifyContent="space-between"
                    gap={2}>
                    {images.home.map((src, index) => (
                      <Grid width={isMobile ? "47.4%" : "48.7%"} key={index}>
                        <Box
                          sx={{
                            position: "relative",
                            height: isMobile ? 200 : 250,
                            width: "100%",
                            border: 2,
                            borderColor: "#4fc3f7",
                            borderRadius: 4,
                            overflow: "hidden",
                          }}>
                          <Image
                            src={"/images" + src}
                            alt={`Home image ${index + 1}`}
                            fill
                            style={{ objectFit: "cover" }}
                          />
                        </Box>
                      </Grid>
                    ))}
                  </Grid>
                </Grid>
              </Grid>
            </motion.div>
          </Container>
        </Box>

        {/* About Section */}
        <Box
          id="about"
          sx={{ minHeight: "100vh", display: "flex", alignItems: "center" }}>
          <Container maxWidth="lg">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={sectionVariants}>
              <Grid
                container
                direction="row"
                justifyContent="space-between"
                alignItems="center">
                <Grid
                  width={isMobile ? "100%" : "50%"}
                  display="flex"
                  flexDirection="column"
                  justifyContent="center"
                  alignItems="center">
                  <Box sx={{ p: 2 }}>
                    <Typography variant={isMobile ? "h5" : "h4"} gutterBottom>
                      About Us
                    </Typography>
                    <Typography
                      variant="body1"
                      paragraph
                      textAlign={isMobile ? "justify" : "left"}>
                      Every container and every contract carries a story of
                      trust. Founded in 2007 as a small player in international
                      trade, the company has grown into a global team that
                      connects factories in the United States and Europe with
                      customers, delivering complex equipment exactly where it
                      is needed. Over fifteen years and more than 10,000
                      shipments, the team has developed a distinctive way of
                      working that combines technical precision with respect for
                      people and their time. Transparent terms are the norm,
                      partners’ reputations are treated with care, investment is
                      made in modern tracking technologies and staff are trained
                      in the languages and standards of the countries they work
                      with. The company’s goal is to make the purchase of
                      industrial equipment simple and safe. Clients do not waste
                      time searching for suppliers or preparing paperwork. They
                      receive trusted brands, fair pricing and logistics without
                      surprises, all backed by the personal responsibility of a
                      manager who oversees the project from first inquiry to
                      delivery.
                    </Typography>
                    <Button
                      onClick={() => scrollToSection("contact")}
                      variant="outlined"
                      sx={{
                        borderWidth: 2,
                        borderColor: "#4fc3f7",
                        borderRadius: 4,
                        px: 4,
                      }}>
                      Learn More
                    </Button>
                  </Box>
                </Grid>
                <Grid
                  width={isMobile ? "100%" : "47%"}
                  sx={{ ml: 2, p: 1.5, borderRadius: 4 }}>
                  <Grid
                    container
                    direction="row"
                    justifyContent="space-between"
                    gap={2}>
                    {images.about.map((src, index) => (
                      <Grid width={isMobile ? "47.4%" : "48.4%"} key={index}>
                        <Box
                          sx={{
                            position: "relative",
                            height: isMobile ? 200 : 250,
                            width: "100%",
                            border: 2,
                            borderColor: "#4fc3f7",
                            borderRadius: 4,
                            overflow: "hidden",
                          }}>
                          <Image
                            src={"/images" + src}
                            alt={`About image ${index + 1}`}
                            fill
                            style={{ objectFit: "cover" }}
                          />
                        </Box>
                      </Grid>
                    ))}
                  </Grid>
                </Grid>
              </Grid>
            </motion.div>
          </Container>
        </Box>

        {/* Services Section */}
        <Box
          id="services"
          sx={{ minHeight: "100vh", display: "flex", alignItems: "center" }}>
          <Container maxWidth="lg">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={sectionVariants}>
              <Grid
                container
                direction="row"
                justifyContent="space-between"
                alignItems="center">
                <Grid
                  width={isMobile ? "100%" : "50%"}
                  display="flex"
                  flexDirection="column"
                  justifyContent="center"
                  alignItems="center">
                  <Box sx={{ p: 2 }}>
                    <Typography variant={isMobile ? "h5" : "h4"} gutterBottom>
                      Our Services
                    </Typography>
                    <Typography
                      variant="body1"
                      paragraph
                      textAlign={isMobile ? "justify" : "left"}>
                      Search and procurement of equipment and components on a
                      turnkey basis Consulting on customs and certification with
                      support in preparing documentation Flexible financial
                      arrangements including agency agreements, mirror
                      contracts, acceptance of payments in rubles and execution
                      of international transfers A dedicated manager who
                      supervises each transaction from the first request to
                      delivery Equipment A broad range of industrial equipment
                      from generators and compressors to specialised pumps and
                      components. Supplies only from verified brands with
                      documented quality. Logistics Solutions Global
                      organisation of transport, insurance, route optimisation
                      and full control at every stage. Clients receive a clear
                      plan and precise timelines while the company takes full
                      responsibility for the result.
                    </Typography>
                    <Typography
                      variant="body1"
                      paragraph
                      textAlign={isMobile ? "justify" : "left"}>
                      <strong>Equipment Specializations:</strong>
                      <br />
                      - Generators
                      <br />
                      - Turbines
                      <br />
                      - Compressors
                      <br />
                      - Pumps
                      <br />- Heat Exchangers
                    </Typography>
                    <Button
                      onClick={() => scrollToSection("contact")}
                      variant="outlined"
                      sx={{
                        borderWidth: 2,
                        borderColor: "#4fc3f7",
                        borderRadius: 4,
                        px: 4,
                      }}>
                      Learn More
                    </Button>
                  </Box>
                </Grid>
                <Grid
                  width={isMobile ? "100%" : "48.5%"}
                  sx={{ ml: 2, p: 1.5, borderRadius: 4 }}>
                  <Grid
                    container
                    direction="row"
                    justifyContent="space-between"
                    gap={2}>
                    {images.services.map((src, index) => (
                      <Grid width={isMobile ? "47.4%" : "48.5%"} key={index}>
                        <Box
                          sx={{
                            position: "relative",
                            height: isMobile ? 200 : 250,
                            width: "100%",
                            border: 2,
                            borderColor: "#4fc3f7",
                            borderRadius: 4,
                            overflow: "hidden",
                          }}>
                          <Image
                            src={"/images" + src}
                            alt={`Services image ${index + 1}`}
                            fill
                            style={{ objectFit: "cover" }}
                          />
                        </Box>
                      </Grid>
                    ))}
                  </Grid>
                </Grid>
              </Grid>
            </motion.div>
          </Container>
        </Box>

        {/* Contact Section with Form */}
        <Box
          id="contact"
          sx={{ minHeight: "100vh", display: "flex", alignItems: "center" }}>
          <Container maxWidth="sm">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={sectionVariants}>
              <Typography
                variant={isMobile ? "h5" : "h4"}
                gutterBottom
                textAlign="center">
                Contact Us
              </Typography>

              <Box
                component="form"
                onSubmit={handleSubmit}
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  gap: 2,
                  maxWidth: 500,
                  mx: "auto",
                }}>
                <Typography paragraph>
                  <b>Address</b>: Cukurcayir Mah. Yedikaldirim Cad. Binbir Evler
                  R Blok No: 58 R / 34 Ortahisar / Trabzon / 61030
                </Typography>
                <Typography paragraph>
                  <b>Email </b>: info@nuroverseas.com
                </Typography>

                <TextField
                  label="Name"
                  variant="outlined"
                  fullWidth
                  required
                  InputLabelProps={{ style: { color: "#4fc3f7" } }}
                  InputProps={{ style: { color: "#4fc3f7" } }}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  value={formData.name}
                />
                <TextField
                  label="Email"
                  variant="outlined"
                  type="email"
                  fullWidth
                  required
                  InputLabelProps={{ style: { color: "#4fc3f7" } }}
                  InputProps={{ style: { color: "#4fc3f7" } }}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                  value={formData.email}
                />
                <TextField
                  label="Message"
                  variant="outlined"
                  multiline
                  rows={4}
                  fullWidth
                  required
                  InputLabelProps={{ style: { color: "#4fc3f7" } }}
                  InputProps={{ style: { color: "#4fc3f7" } }}
                  onChange={(e) =>
                    setFormData({ ...formData, message: e.target.value })
                  }
                  value={formData.message}
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={agreedToTerms}
                      onChange={(e) => setAgreedToTerms(e.target.checked)}
                      sx={{
                        color: "#4fc3f7",
                        "&.Mui-checked": { color: "#4fc3f7" },
                      }}
                      // required
                    />
                  }
                  label={
                    <Typography sx={{ color: "#4fc3f7" }}>
                      I agree to the{" "}
                      <Link
                        href="/terms-and-conditions"
                        sx={{ color: "#4fc3f7", textDecoration: "underline" }}>
                        Terms and Conditions
                      </Link>{" "}
                      and{" "}
                      <Link
                        href="/user-agreement"
                        sx={{ color: "#4fc3f7", textDecoration: "underline" }}>
                        Users agreement
                      </Link>
                    </Typography>
                  }
                  sx={{ mb: 2 }}
                />
                <Button
                  type="submit"
                  variant="contained"
                  disabled={!agreedToTerms}
                  sx={{
                    bgcolor: "#4fc3f7",
                    color: "#000000",
                    "&:hover": { bgcolor: "#40c4ff" },
                    "&.Mui-disabled": { bgcolor: "#4fc3f7", opacity: 0.5 },
                  }}>
                  Contact Us
                </Button>
              </Box>
            </motion.div>
          </Container>
        </Box>
        <SuccessModal status={status} onClose={() => setStatus(null)} />
        {/* Footer */}
        <Box sx={{ bgcolor: "background.default", p: 2, textAlign: "center" }}>
          <Typography variant="body2">
            © {new Date().getFullYear()} NUR OVERSEAS PROFESYONEL TEKNOLOJIK.
            All rights reserved.
          </Typography>
        </Box>
      </Box>
    </ThemeProvider>
  );
}
