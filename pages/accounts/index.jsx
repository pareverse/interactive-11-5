import { useState } from 'react'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import api from 'instance'
import { useForm } from 'react-hook-form'
import { Avatar, Badge, Button, Container, Flex, FormControl, FormErrorMessage, FormLabel, IconButton, Input, Select, Td, Text, Tr, useDisclosure, useToast } from '@chakra-ui/react'
import { FiEdit2, FiTrash } from 'react-icons/fi'
import Card from 'components/_card'
import Table from 'components/_table'
import Modal from 'components/_modal'
import Toast from 'components/_toast'

const EditModal = ({ user }) => {
	const queryClient = useQueryClient()
	const editModal = useDisclosure()
	const [isLoading, setIsLoading] = useState(false)
	const toast = useToast()

	const {
		register,
		formState: { errors },
		reset,
		clearErrors,
		handleSubmit
	} = useForm()

	const editMutation = useMutation((data) => api.update('/users', user._id, data), {
		onSuccess: () => {
			queryClient.invalidateQueries('accounts')
			setIsLoading(false)
			editModal.onClose()

			toast({
				position: 'top',
				render: () => <Toast title="Success" description="Account updated." />
			})
		}
	})

	const onSubmit = (data) => {
		setIsLoading(true)
		editMutation.mutate(data)
	}

	return (
		<Modal title="" size="sm" header="off" toggle={(onClose) => <IconButton variant="tinted" size="xs" colorScheme="blue" icon={<FiEdit2 size={12} />} onClick={() => reset() || clearErrors() || onClose()} />} disclosure={editModal}>
			<form onSubmit={handleSubmit(onSubmit)}>
				<Flex align="center" direction="column" gap={6}>
					<Avatar size="xl" name={user.name} src={user.image} />

					<FormControl isInvalid={errors.name}>
						<FormLabel>Full Name</FormLabel>
						<Input defaultValue={user.name} size="lg" {...register('name', { required: true })} />
						<FormErrorMessage>This field is required.</FormErrorMessage>
					</FormControl>

					<FormControl>
						<FormLabel>Full Name</FormLabel>

						<Select defaultValue={user.role} size="lg" {...register('role')}>
							<option>Admin</option>
							<option>Teacher</option>
							<option>User</option>
						</Select>
					</FormControl>

					<Flex align="center" gap={3} w="full">
						<Button size="lg" w="full" onClick={editModal.onClose}>
							Close
						</Button>

						<Button type="submit" size="lg" colorScheme="brand" w="full" isLoading={isLoading}>
							Submit
						</Button>
					</Flex>
				</Flex>
			</form>
		</Modal>
	)
}

const DeleteModal = ({ user }) => {
	const queryClient = useQueryClient()
	const disclosure = useDisclosure()
	const [isLoading, setIsLoading] = useState(false)
	const toast = useToast()

	const deleteMutation = useMutation((data) => api.remove('/users', user._id), {
		onSuccess: () => {
			queryClient.invalidateQueries('accounts')
			setIsLoading(false)
			disclosure.onClose()

			toast({
				position: 'top',
				render: () => <Toast title="Success" description="Account updated." />
			})
		}
	})

	const onSubmit = () => {
		deleteMutation.mutate(user._id)
	}

	return (
		<Modal title="" size="sm" header="off" toggle={(onOpen) => <IconButton variant="tinted" size="xs" colorScheme="red" icon={<FiTrash size={12} />} onClick={onOpen} />} disclosure={disclosure}>
			<Flex align="center" direction="column" gap={6}>
				<Avatar size="xl" name={user.name} src={user.image} />

				<Flex align="center" direction="column" textAlign="center">
					<Text fontSize="lg" fontWeight="semibold" color="accent-1">
						{user.name}
					</Text>

					<Text fontSize="sm">{user.email}</Text>
				</Flex>

				<Text>Are you sure you want to delete this user?</Text>

				<Flex align="center" gap={3}>
					<Button size="lg" colorScheme="brand" isLoading={isLoading} onClick={onSubmit}>
						Yes, sure
					</Button>

					<Button size="lg" onClick={disclosure.onClose}>
						No, cancel
					</Button>
				</Flex>
			</Flex>
		</Modal>
	)
}

const Accounts = () => {
	const { data: accounts, isFetched: isAccountsFetched } = useQuery(['accounts'], () => api.all('/users'))
	const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']

	return (
		<Container>
			<Flex justify="space-between" align="center" gap={6} mb={6}>
				<Text fontSize="xl" fontWeight="semibold" color="accent-1">
					Accounts
				</Text>

				<Button size="lg" colorScheme="brand">
					Add New
				</Button>
			</Flex>

			<Card>
				<Table
					data={accounts}
					fetched={isAccountsFetched}
					th={['Full Name', 'Email', 'Role', 'Joined', '']}
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
								<Badge variant="tinted" colorScheme={user.role === 'Admin' ? 'yellow' : user.role === 'Teacher' ? 'blue' : user.role === 'User' && 'red'}>
									{user.role}
								</Badge>
							</Td>

							<Td>
								<Text>
									{months[Number(user.created.split(',')[0].split('/')[0]) - 1]}, {user.created.split(',')[0].split('/')[2]}
								</Text>
							</Td>

							<Td>
								<Flex justify="end" aling="center" gap={3}>
									<EditModal user={user} />
									<DeleteModal user={user} />
								</Flex>
							</Td>
						</Tr>
					)}
					select={(register) => (
						<Flex flex={1} justify="end" align="center" gap={3}>
							<Select placeholder="Role" size="lg" w="auto" {...register('role')}>
								<option value="Admin">Admin</option>
								<option value="Teacher">Teacher</option>
								<option value="User">User</option>
							</Select>
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
							.filter((data) => (watch('role') ? watch('role') === data.role : data))
					}}
				/>
			</Card>
		</Container>
	)
}

Accounts.authentication = {
	authorized: 'Admin'
}

export default Accounts
