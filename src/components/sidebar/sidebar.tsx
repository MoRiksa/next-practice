import {
  IconButton,
  Box,
  CloseButton,
  Flex,
  Icon,
  useColorModeValue,
  Text,
  Drawer,
  DrawerContent,
  useDisclosure,
  Collapse,
  BoxProps,
  FlexProps,
} from "@chakra-ui/react";
import {
  FiHome,
  FiTrendingUp,
  FiCompass,
  FiStar,
  FiSettings,
  FiMenu,
  FiChevronDown,
  FiChevronRight,
  FiDatabase,
  FiUsers,
} from "react-icons/fi";
import { IconType } from "react-icons";
import { removeToken } from "@/app/(auth)/utils/auth";
import { useRouter } from "next/navigation";

interface LinkItemProps {
  name: string;
  icon: IconType;
  location?: string; // Optional untuk menu tanpa tautan
  subLinks?: Array<LinkItemProps>; // Untuk submenu
}

interface NavItemProps extends FlexProps {
  icon: IconType;
  children: React.ReactNode;
  link?: string; // Optional untuk submenu
  onToggle?: () => void;
  isOpen?: boolean;
}

interface MobileProps extends FlexProps {
  onOpen: () => void;
}

interface SidebarProps extends BoxProps {
  onClose: () => void;
}

const LinkItems: Array<LinkItemProps> = [
  { name: "Home", icon: FiHome, location: "/home" },
  {
    name: "Explore",
    icon: FiCompass,
    subLinks: [
      { name: "Data Menu", icon: FiMenu, location: "/modules/menu" },
      { name: "Data Kategori", icon: FiStar, location: "/explore" },
    ],
  },
  {
    name: "Reqres",
    icon: FiDatabase,
    subLinks: [{ name: "Master Users", icon: FiUsers, location: "/users" }],
  },
  { name: "Register", icon: FiSettings, location: "/register" },
  // Tombol logout
  { name: "Logout", icon: FiSettings, location: "/logout" },
];

const SidebarContent = ({ onClose, ...rest }: SidebarProps) => {
  const bgColor = useColorModeValue("white", "gray.900");
  const borderColor = useColorModeValue("gray.200", "gray.700");

  return (
    <Box
      transition="3s ease"
      bg={bgColor}
      borderRight="1px"
      borderRightColor={borderColor}
      w={{ base: "full", md: 60 }}
      pos="fixed"
      h="full"
      {...rest}
    >
      <Flex h="20" alignItems="center" mx="8" justifyContent="space-between">
        <Text
          fontSize="2xl"
          fontFamily="monospace"
          fontWeight="bold"
          color={useColorModeValue("black", "white")}
        >
          Logo
        </Text>
        <CloseButton display={{ base: "flex", md: "none" }} onClick={onClose} />
      </Flex>
      {LinkItems.map((link) =>
        link.subLinks ? (
          <NavItemWithCollapse
            key={link.name}
            icon={link.icon}
            name={link.name}
            subLinks={link.subLinks}
          />
        ) : (
          <NavItem key={link.name} icon={link.icon} link={link.location}>
            <Text color={useColorModeValue("black", "white")}>{link.name}</Text>
          </NavItem>
        )
      )}
    </Box>
  );
};

const NavItem = ({ icon, children, link, ...rest }: NavItemProps) => {
  const router = useRouter();

  const handleClick = () => {
    if (link === "/logout") {
      removeToken(); // Panggil fungsi logout
      router.push("/login"); // Redirect ke halaman login
      window.location.reload();
    } else if (link) {
      router.push(link);
    }
  };

  const hoverBgColor = useColorModeValue("gray.100", "gray.600");

  return (
    <Box
      as="a"
      onClick={handleClick}
      style={{ textDecoration: "none" }}
      _focus={{ boxShadow: "none" }}
    >
      <Flex
        align="center"
        p="4"
        mx="4"
        borderRadius="lg"
        role="group"
        cursor="pointer"
        _hover={{ bg: hoverBgColor }}
        {...rest}
      >
        {icon && (
          <Icon
            mr="4"
            fontSize="16"
            color={useColorModeValue("black", "white")}
            _groupHover={{ color: useColorModeValue("black", "white") }}
            as={icon}
          />
        )}
        {children}
      </Flex>
    </Box>
  );
};

const NavItemWithCollapse = ({
  icon,
  name,
  subLinks,
}: {
  icon: IconType;
  name: string;
  subLinks: LinkItemProps[];
}) => {
  const { isOpen, onToggle } = useDisclosure();

  return (
    <Box>
      <Flex
        align="center"
        p="4"
        mx="4"
        borderRadius="lg"
        role="group"
        cursor="pointer"
        onClick={onToggle}
        _hover={{ bg: useColorModeValue("gray.100", "gray.600") }}
      >
        <Icon
          mr="4"
          fontSize="16"
          color={useColorModeValue("black", "white")}
          as={icon}
        />
        <Text color={useColorModeValue("black", "white")} flex="1">
          {name}
        </Text>
        <Icon as={isOpen ? FiChevronDown : FiChevronRight} />
      </Flex>
      <Collapse in={isOpen} animateOpacity>
        {subLinks.map((subLink) => (
          <NavItem
            key={subLink.name}
            icon={subLink.icon}
            link={subLink.location}
            pl="12"
          >
            <Text color={useColorModeValue("black", "white")}>
              {subLink.name}
            </Text>
          </NavItem>
        ))}
      </Collapse>
    </Box>
  );
};

const MobileNav = ({ onOpen, ...rest }: MobileProps) => {
  const bgColor = useColorModeValue("white", "gray.900");
  const borderColor = useColorModeValue("gray.200", "gray.700");

  return (
    <Flex
      ml={{ base: 0, md: 60 }}
      px={{ base: 4, md: 4 }}
      height="20"
      alignItems="center"
      bg={bgColor}
      borderBottomWidth="1px"
      borderBottomColor={borderColor}
      justifyContent={{ base: "space-between", md: "flex-end" }}
      {...rest}
    >
      <IconButton
        display={{ base: "flex", md: "none" }}
        onClick={onOpen}
        variant="outline"
        aria-label="open menu"
        icon={<FiMenu />}
      />
      <Text
        display={{ base: "flex", md: "none" }}
        fontSize="2xl"
        fontFamily="monospace"
        fontWeight="bold"
        color={useColorModeValue("black", "white")}
      >
        Logo
      </Text>
    </Flex>
  );
};

const SidebarWithHeader = ({ children }: { children: React.ReactNode }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <Box minH="100vh" bg={useColorModeValue("gray.100", "gray.800")}>
      <SidebarContent
        onClose={() => onClose}
        display={{ base: "none", md: "block" }}
      />
      <Drawer
        isOpen={isOpen}
        placement="left"
        onClose={onClose}
        returnFocusOnClose={false}
        onOverlayClick={onClose}
        size="full"
      >
        <DrawerContent>
          <SidebarContent onClose={onClose} />
        </DrawerContent>
      </Drawer>
      <MobileNav onOpen={onOpen} />
      <Box ml={{ base: 0, md: 60 }} p="4">
        {children}
      </Box>
    </Box>
  );
};

export default SidebarWithHeader;
