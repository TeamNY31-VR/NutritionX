//Import dependencies
import React from 'react';
import AppBar from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'

//Import Components

//React Component
const Header = () => {
	return (
		<>
			<AppBar position="fixed" color="primary">
					<Typography variant="h1" textAlign='center'>
						wobbegong nutrition
					</Typography>
			</AppBar>
		</>
	)
}

export default Header;

