import React, { useState } from 'react';
import { Container, Button, Typography, Paper, Collapse } from '@mui/material';
import axios from 'axios';

function Bill({billInfo: bill, setRefresh}) {
    const [expanded, setIsExpanded] = useState(false);
    const [viewOrCollapse, setViewOrCollapse] = useState('View More...')
    
    function showMoreDetails() {
        setIsExpanded(!expanded);
        if(viewOrCollapse === 'View More...') setViewOrCollapse('Collapse');
        else setViewOrCollapse('View More...');
    }

	function showMoreDetails() {
		setIsExpanded(!expanded);
		console.log(bill);
		if (viewOrCollapse === 'View More...') setViewOrCollapse('Collapse');
		else setViewOrCollapse('View More...');
	}

	async function deleteBill() {
		const token = localStorage.getItem('token');
		const headers = { 'x-auth-token': token };

        await axios.delete(url, {headers});
        setIsExpanded(!expanded);
        setRefresh(true);
    }

		await axios.delete(url, { headers });
		setIsExpanded(!expanded);
	}

	async function markPaid() {
		const token = localStorage.getItem('token');
		const headers = { 'x-auth-token': token };
		const body = { billid: bill._id };
		const url = `http://localhost:8000/app/dashboard/paid/`;
		setPaid(true);
		await axios.put(url, body, { headers });
	}

	async function markUnpaid() {
		const token = localStorage.getItem('token');
		const headers = { 'x-auth-token': token };
		const body = { billid: bill._id };
		const url = `http://localhost:8000/app/dashboard/unpaid/`;
		setPaid(false);
		await axios.put(url, body, { headers });
	}

	return (
		<Container component='div' sx={{ margin: '1.5em' }}>
			<Paper elevation={4}>
				<Typography variant='h6' component='h2'>
					{bill.storeName}
				</Typography>
				<Typography variant='subtitle1' component='h4'>
					Amount: {bill.amount}
				</Typography>
				<Typography variant='subtitle1' component='h4'>
					Key: {bill._id}
				</Typography>
				<Typography variant='subtitle1' component='h4'>
					Paid: {bill.paid.toString()}
				</Typography>
				<Button onClick={showMoreDetails}>{viewOrCollapse}</Button>
				<Collapse component='div' in={expanded}>
					{bill.dishes.map((dish, index) => {
						return (
							<Container key={index}>
								<Typography>Dish name:{dish.dishName}</Typography>
								<Typography>Dish amount: {dish.amount}</Typography>
							</Container>
						);
					})}

					<Button onClick={deleteBill}>Delete this bill</Button>
					<Button onClick={markUnpaid}>Unpay</Button>
				</Collapse>
			</Paper>
		</Container>
	);
}

export default Bill;
