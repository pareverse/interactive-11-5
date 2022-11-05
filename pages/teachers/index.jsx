import { useQuery } from '@tanstack/react-query'
import api from 'instance'
import { Avatar, Button, Container, Flex, IconButton, Select, Td, Text, Tr } from '@chakra-ui/react'
import { FiTrash } from 'react-icons/fi'
import Card from 'components/_card'
import Table from 'components/_table'

const Teachers = () => {
	const { data: teachers, isFetched: isTeachersFetched } = useQuery(['teachers'], () => api.all('/users'))
	const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
	return (
		<Container>
			<Flex justify="space-between" align="center" gap={6} mb={6}>
				<Text fontSize="xl" fontWeight="semibold" color="accent-1">
					Teachers
				</Text>

				<Button size="lg" colorScheme="brand">
					Add New
				</Button>
			</Flex>

			<Card>
				<Table
					data={teachers}
					fetched={isTeachersFetched}
					th={['Full Name', 'Email', 'Joined', '']}
					td={(user) => (
						<Tr key={user._id}>
							<Td maxW={200}>
								<Flex align="center" gap={3}>
									<Avatar name={user.name} src={user.image} />

									<Text fontWeight="medium" color="accent-1">
										{user.name}
									</Text>
								</Flex>
							</Td>

							<Td>
								<Text>{user.email}</Text>
							</Td>

							<Td>
								<Text>
									{months[Number(user.created.split(',')[0].split('/')[0]) - 1]}, {user.created.split(',')[0].split('/')[2]}
								</Text>
							</Td>

							<Td textAlign="right">
								<IconButton variant="tinted" size="xs" colorScheme="red" icon={<FiTrash size={12} />} />
							</Td>
						</Tr>
					)}
					select={(register) => (
						<Flex flex={1} justify="end" align="center" gap={3}>
							<Select size="lg" w="auto"></Select>
						</Flex>
					)}
					filters={(data, watch) => {
						return data
							.filter((data) =>
								['name', 'email'].some((key) =>
									data[key]
										.toString()
										.toLowerCase()
										.includes(watch('search') && watch('search').toLowerCase())
								)
							)
							.filter((data) => data.role === 'Teacher')
					}}
				/>
			</Card>
		</Container>
	)
}

Teachers.authentication = {
	authorized: 'Admin'
}

export default Teachers
