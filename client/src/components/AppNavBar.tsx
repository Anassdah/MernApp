import React , {useState} from 'react';
import { render } from 'react-dom';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  Container
} from 'reactstrap';
import '../App.css';
function AppNavBar(this: any){
        const [isOpen, setIsOpen] = useState<boolean>(false)
        /*toggle = () => {
            this.setState({
                isOpen: !this.state.isOpen
            });
        }*/
        //const toggle=()=> {setIsOpen(!isOpen)}
        //function toggle(){return setIsOpen(!isOpen)}
        const toggle=()=> setIsOpen(!isOpen)

        return(
            <div>
            <Navbar color="dark" dark expand="md" className="mb-5">
                <Container className="NavBar">
                    <NavbarBrand href="/">ShoppingList</NavbarBrand>
                    <NavbarToggler onClick={toggle} />
                    <Collapse isOpen={isOpen} navbar>
                        <Nav className="ml-auto" navbar>
                            <NavItem>
                                <NavLink href="/http://www.google.com/">Google</NavLink>
                            </NavItem>
                        </Nav>
                    </Collapse>
                </Container>
            </Navbar>
        </div>
        );
    }
export default AppNavBar;