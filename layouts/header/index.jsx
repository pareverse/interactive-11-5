import { useState, useEffect } from 'react'
import NextLink from 'next/link'
import { useRouter } from 'next/router'
import { useSession, signIn, signOut } from 'next-auth/react'
import { Avatar, Button, chakra, Flex, Image, Link, Menu, MenuButton, MenuDivider, MenuItem, MenuList, Text, useColorMode, useColorModeValue } from '@chakra-ui/react'
import { FiLogOut, FiMoon, FiSun } from 'react-icons/fi'

const Header = ({ onSidebarOpen }) => {
	const router = useRouter()
	const { data: session } = useSession()
	const { toggleColorMode } = useColorMode()
	const colorModeIcon = useColorModeValue(<FiMoon size={16} fill="currentColor" />, <FiSun size={16} fill="currentColor" />)
	const [isScrolling, setIsScrolling] = useState(false)

	useEffect(() => {
		if (typeof window !== 'undefined') {
			window.addEventListener('scroll', () => {
				setIsScrolling(window.pageYOffset > 0)
			})
		}
	}, [])

	return (
		<chakra.header bg="white" position="sticky" top={0} shadow={isScrolling && 'sm'} transition=".4s" zIndex={99} _dark={{ bg: isScrolling ? 'surface' : 'system', border: 'none', shadow: isScrolling && 'dark-xl' }}>
			<Flex justify="space-between" align="center" gap={6} mx="auto" px={6} h={20} w="full" maxW={1280}>
				<Image alt="logo" src="/assets/logo.png" boxSize={10} />

				{session && session.user.role === 'Admin' ? (
					<Flex align="center" gap={8}>
						<NextLink href="/dashboard" passHref>
							<Link as="span" active={router.pathname.includes('dashboard') ? 1 : 0}>
								Dashboard
							</Link>
						</NextLink>

						<NextLink href="/teachers" passHref>
							<Link as="span" active={router.pathname.includes('teachers') ? 1 : 0}>
								Teachers
							</Link>
						</NextLink>

						<NextLink href="/students" passHref>
							<Link as="span" active={router.pathname.includes('students') ? 1 : 0}>
								Students
							</Link>
						</NextLink>

						<NextLink href="/accounts" passHref>
							<Link as="span" active={router.pathname.includes('accounts') ? 1 : 0}>
								Accounts
							</Link>
						</NextLink>

						<Menu>
							<MenuButton>
								<Avatar name={session.user.name} src={session.user.image} />
							</MenuButton>

							<MenuList w={256}>
								<MenuItem>
									<Flex align="center" gap={3}>
										<Avatar name={session.user.name} src={session.user.image} />

										<Text fontWeight="medium" color="accent-1">
											{session.user.name}
										</Text>
									</Flex>
								</MenuItem>

								<MenuDivider />
								<MenuItem icon={<FiLogOut size={16} />} onClick={() => signOut()}>
									Log out
								</MenuItem>
							</MenuList>
						</Menu>
					</Flex>
				) : (
					<Flex align="center" gap={8}>
						<Link active={1}>Home</Link>
						<Link>Mission</Link>
						<Link>Vision</Link>
						<Link>About</Link>
						<Link>Contact</Link>

						<Button colorScheme="brand" onClick={() => signIn('google')}>
							Sign in
						</Button>
					</Flex>
				)}
			</Flex>
		</chakra.header>
	)
}

export default Header
