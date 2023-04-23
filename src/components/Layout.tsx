import Navbar from './Navbar'
import Footer from './Footer'
import { createTheme, ThemeProvider } from '@mui/material/styles'
import CssBaseline from '@mui/material/CssBaseline';

interface layoutProps{
    children: JSX.Element
}

const theme = createTheme();
const Layout = ({children}: layoutProps) => {
  return (
    <ThemeProvider theme={theme}>
        <CssBaseline />
        <Navbar />
            <div style={{ backgroundColor: "#f5f5f5"}}>{children}</div>
        <Footer/>
    </ThemeProvider>
  )
}

export default Layout