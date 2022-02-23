//Import dependencies
import React from 'react';
// import "../App.scss"
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

// added serving_qty, serving_unit
function createData(name, serving_qty, serving_unit, calories, fat, carbs, protein, thumbUrl) {
	return { name, serving_qty, serving_unit, calories, fat, carbs, protein, thumbUrl };
}

//Import Components
const IngredientsList = (props) => {
	const rows = [];

	for (const ingredient of props.ingredientList) {
		const { serving_qty, serving_unit, nf_calories, nf_protein, nf_total_carbohydrate, nf_total_fat} = ingredient;
		const thumbUrl = ingredient.photo.thumb;

		function capitalize(str) {
			return str.charAt(0).toUpperCase() + str.slice(1);
		}

		// const caps = str.split(' ').map(capitalize).join(' ');

		const food_name = ingredient.food_name.split(' ').map(capitalize).join(' ');

		rows.push(createData(
			food_name,
			serving_qty, 
			serving_unit,
			nf_calories,
			nf_total_fat,
			nf_total_carbohydrate,
			nf_protein,
			thumbUrl
		))
	}
	
	// const rows = [
	// 	createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
	// 	createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
	// 	createData('Eclair', 262, 16.0, 24, 6.0),
	// 	createData('Cupcake', 305, 3.7, 67, 4.3),
	// 	createData('Gingerbread', 356, 16.0, 49, 3.9),
	// ];

	return (
		<TableContainer component={Paper}>
			<Table sx={{ minWidth: 650 }} size='small' aria-label='a dense table'>
				<TableHead>
					<TableRow sx={{ fontWeight: 'bold' }}>
						<TableCell>
							<b>Ingredient Name</b>
						</TableCell>
						<TableCell align='right'>
							{/* // adding serving qty + units */}
							<b>Serving Qty</b>
						</TableCell>
						<TableCell align='left'>
							<b>Units</b>
						</TableCell>
						<TableCell align='right'>
							<b>Calories</b>
						</TableCell>
						<TableCell align='right'>
							<b>Fat&nbsp;(g)</b>
						</TableCell>
						<TableCell align='right'>
							<b>Carbs&nbsp;(g)</b>
						</TableCell>
						<TableCell align='right'>
							<b>Protein&nbsp;(g)</b>
						</TableCell>
					</TableRow>
				</TableHead>
				<TableBody>
					{rows.map((row) => (
						<TableRow
							key={row.name}
							sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
						>
							<TableCell component='th' scope='row' sx={{display: 'flex', alignItems: 'center'}}>
								{row.name}
								<img src={row.thumbUrl} style={{ width: '30px', height: '30px', marginLeft: '5px', borderRadius: '50%'}}></img>
							</TableCell>
							{/* // adding serving qty + units */}
							<TableCell align='right'>{row.serving_qty}</TableCell>
							<TableCell align='left'>{row.serving_unit}</TableCell>
							<TableCell align='right'>{row.calories}</TableCell>
							<TableCell align='right'>{row.fat}</TableCell>
							<TableCell align='right'>{row.carbs}</TableCell>
							<TableCell align='right'>{row.protein}</TableCell>
						</TableRow>
					))}
				</TableBody>
			</Table>
		</TableContainer>
	);
};

export default IngredientsList;
