import { List, ListItem } from "@mui/material";
import styled from "styled-components";
import { makeStyles } from "@mui/styles";
import { useState } from "react";
import logo from "../images/logo.png";
import { useNavigate, useLocation, matchPath } from "react-router";
import Text from "../ui-kit/Text";
import { useAuth } from '../sc-context/AuthContext'
import LoadingButton from "@mui/lab/LoadingButton";
import Divider from '@mui/material/Divider'

const Wrapper = styled.div`
  display: block;
  width: 250px;
`;

const Container = styled.div`
  width: 230px;
  height: 100%;
  position: fixed;
  z-index: 1;
  overflow: hidden;
  flex-direction: column;
  justify-content: space-between;
  background-image: linear-gradient(90deg, #102066, #2c46b5);
`;

const FooterWrapper = styled.div`
  height: 100%;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  display: flex;
`;


const LogoWrapper = styled.div`
  margin: 24px 24px;
`;

const Menus = styled.div`
  margin-top: 40px;
`;

const MainMenu = styled.div`
  flex: 1 1 auto;
  min-width: 0;
  font-family: LexendDeca;
  font-size: 16px;
`;

const MenuDivider = styled.div`
  margin-top: 15px;
`;

const SubMenu = styled.div<{ active: boolean }>`
  width: 100%;
  color: ${(props) => (props.active ? "#00d379" : "#ffffff")};
  font-family: "LexendDeca";
  font-size: 12px;
  margin: 6px 0 6px 0;
`;

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    color: "#ffffff",
    fontFamily: "LexendDeca",
    fontSize: "14px",
    cursor: "pointer",
  },
  nested: {
    paddingLeft: "40px",
  },
  inActive: {
    background: "transparent",
    color: "#ffffff",
    borderLeft: "5px solid #102066",
    "&:hover, &:active": {
      borderLeft: "5px solid #00d379",
      color: "#00d379",
    },
  },
  active: {
    borderLeft: "5px solid #00d379",
    color: "#00d379",
  },
}));

const isProductActive = (path: string) => {
  return path.includes("/product");
};

const isConfirmationActive = (path: string) => {
  return path.includes("/confirmation");
};


const isTransactionActive = (path: string) => {
  return path.includes("/transaction");
};

const isOrderActive = (path: string) => {
  return path.includes("/order");
};

const isHistoryActive = (path: string) => {
  return path.includes("/history");
};

const isUserManagementActive = (path: string) => {
  return path.includes("/user-management");
};

export default function NavBar() {
  const classes = useStyles();
  const navigate = useNavigate();
  const location = useLocation();
  const { currentUser, logout} = useAuth()

  const toggleMenu1 = () => {
    console.log("toggle1");
  };

  const toggleMenu2 = () => {
    console.log("toggle2");
  };

  const signOut = () => {
    logout().then(function() {
      navigate('/')
    }).catch(function(error) {
      // An error happened.
    });
  }

  return (
    <Wrapper>
      <Container>
        <LogoWrapper>
          <img
            src={logo}
            alt="ryan"
            width="31"
            height="35"
            onClick={(e) => {
              e.stopPropagation();
              navigate("/");
            }}
          />
        </LogoWrapper>
        <Text size={28} align="center" family="LexendDeca" padding='20px' color="white">
        Welcome
      </Text>
        <Menus>
          <List className={classes.root}>
            <ListItem
           onClick={(e) => {
            e.stopPropagation();
            navigate("/confirmation");
          }}
              className={
                isConfirmationActive(location.pathname)
                  ? classes.active
                  : classes.inActive
              }
            >
              <MainMenu>
                <Text weight={500} family="LexendDeca">
                  ใบตอบรับ
                </Text>
              </MainMenu>
            </ListItem>
            <MenuDivider />
            <ListItem
           onClick={(e) => {
            e.stopPropagation();
            navigate("/product");
          }}
              className={
                isProductActive(location.pathname)
                  ? classes.active
                  : classes.inActive
              }
            >
              <MainMenu>
                <Text weight={500} family="LexendDeca">
                  Schedule
                </Text>
              </MainMenu>
            </ListItem>
            <MenuDivider />
            <ListItem
               onClick={(e) => {
                e.stopPropagation();
                navigate("/transaction");
              }}
              className={
                isTransactionActive(location.pathname)
                  ? classes.active
                  : classes.inActive
              }
            >
              <MainMenu> Teacher </MainMenu>
            </ListItem>
            <MenuDivider />
            <ListItem
          onClick={(e) => {
            e.stopPropagation();
            navigate("/order");
          }}
              className={
                isOrderActive(location.pathname)
                  ? classes.active
                  : classes.inActive
              }
            >
              <MainMenu> Registration </MainMenu>
            </ListItem>
            <MenuDivider />
            <ListItem
               onClick={(e) => {
                e.stopPropagation();
                navigate("/user-management");
              }}
              className={
                isUserManagementActive(location.pathname)
                  ? classes.active
                  : classes.inActive
              }
            >
              <MainMenu> User Management </MainMenu>
            </ListItem>
          </List>
        </Menus>
        <FooterWrapper>
        <Text size={13} align="center" family="LexendDeca" color="white">{currentUser?.email}</Text>
        <Divider sx={{ mt: 1.5, bgcolor: "white",borderRightWidth: 2,width: '200px',   }} />
        <LoadingButton
        disabled={false}
        onClick={signOut}
        loading={false}
        sx={{
          border: 1,
          borderColor: '#2c46b5n',
          boxShadow: 1,
          borderRadius: 2,
          fontFamily: "LexendDeca",
          mt: 2,
          width: '150px',
          bgcolor: "white",
          color: "#001da0",
          textTransform: "none",
          "&:hover": {
            backgroundColor: "#001da0",
            color: "white",
          },
        }}
        variant="contained"
      >
        Logout
      </LoadingButton>
        </FooterWrapper>
      </Container>

    </Wrapper>
  );
}
