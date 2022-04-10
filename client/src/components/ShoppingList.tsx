import React , {useState,useEffect} from 'react';
import { Container, ListGroup, ListGroupItem, Button } from 'reactstrap';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import {v1 as uuid} from 'uuid';
import '../App.css';
import axios from 'axios';
const api=axios.create({
    baseURL:"http://localhost:4000/api/items"
})
function ShoppingList(){
    const LOCAL_STORAGE_KEY='anass.dahchour'
        const [items,setItems]=useState<Array<any>>(
        [
           /* { id: uuid(),name: 'Eggs' },
            { id: uuid(),name: 'Milk' },
            { id: uuid(),name: 'Steak'},
            { id: uuid(),name: 'Water'}*/
        ]             
        )
        
        
        // For local storage when reloading
       /* useEffect(()=>{
            const storedItems=JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY)||"{}")
            if(storedItems){setItems(storedItems)}
        },[])//empty array so the function would be called once
        useEffect(()=>{
            localStorage.setItem(LOCAL_STORAGE_KEY,JSON.stringify(items))
        },[items]
        )//Anything that changes in the array useEffect is used
        */
        useEffect(()=>{
            api.get('/').then(res=>{
                setItems(res.data)
            })
        },[])

        

        return(
                       
            <Container >
                <Button color="dark" style={{marginBottom: '10px'}}
                         onClick={ () => {
                             const name =prompt('Enter Item'); 
                             if(name){
                                 /*this.setState(state => ({
                                      items :[ ...state.items,{ id : uuid(), name}]
                                 })
                                 );*/
                                 api.post('/',{id:uuid(),name}).then(res=>{
                                    console.log(res.data);
                                    setItems([...items,res.data])
                                })
                                
                                 //setItems([...items, { id : uuid(), name}]);
                                }
                            }
                            }>
                    Add Item
                </Button>
                <ListGroup>
                    <TransitionGroup className="shopping-list" >
                        { items.map( ({_id, name})=> (
                            <CSSTransition key={_id} timeout={500} classNames="fade">
                                <ListGroupItem>
                                    <Button className="remove-btn" color="danger"
                                        onClick={ () => {
                                            api.delete(`/${_id}`)
                                            .then(res => {
                                                console.log(res.data);
                                            })
                                            setItems(
                                                items.filter(item => item._id !== _id)
                                            );
                                        }}>
                                        &times;
                                    </Button>
                                    {name}
                                </ListGroupItem>
                            </CSSTransition>
                        )
                        )}
                    </TransitionGroup>
                </ListGroup>
            </Container>
        );
    }

export default ShoppingList;