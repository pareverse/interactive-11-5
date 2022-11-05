import { Button, Container, Flex, Select, Td, Text, Tr } from '@chakra-ui/react'
import Card from 'components/_card'
import Table from 'components/_table'

const Students = () => {
	return (
		<Container>
			<Flex justify="space-between" align="center" gap={6} mb={6}>
				<Text fontSize="xl" fontWeight="semibold" color="accent-1">
					Students
				</Text>

				<Button size="lg" colorScheme="brand">
					Add New
				</Button>
			</Flex>

			<Card>
				<Table
					data={[]}
					th={['Full Name', 'Email', 'Section', 'Joined', '']}
					td={(data, index) => (
						<Tr key={index}>
							<Td></Td>
						</Tr>
					)}
					select={(register) => (
						<Flex flex={1} justify="end" align="center" gap={3}>
							<Select placeholder="Gender" size="lg" w="auto">
								<option>Male</option>
								<option>Female</option>
							</Select>
						</Flex>
					)}
				/>
			</Card>
		</Container>
	)
}

Students.authentication = {
	authorized: 'Admin'
}

export default Students
