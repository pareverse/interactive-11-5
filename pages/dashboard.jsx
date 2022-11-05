import { Container, Grid, GridItem } from '@chakra-ui/react'
import Statistics from 'components/dashboard/statistics'
import Card from 'components/_card'

const Dashboard = () => {
	return (
		<Container>
			<Grid templateColumns="repeat(12, 1fr)" gap={6}>
				<Statistics />

				<GridItem colSpan={12}>
					<Card></Card>
				</GridItem>

				<GridItem colSpan={12}>
					<Card></Card>
				</GridItem>
			</Grid>
		</Container>
	)
}

Dashboard.authentication = {
	authorized: 'Admin'
}

export default Dashboard
