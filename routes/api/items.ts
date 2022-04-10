const express = require('express');
const router= express.Router(); 
import {Item} from '../../models/Item';

router.get('/' , (req: any, res: { json: (arg0: any) => any; }) => {
               
    Item.find()
           .sort({ date : -1 })
           .then ((items: any) => res.json(items) )
});

router.post ('/', (req: { body: { name: any } }, res: { json: (arg0: any) => any; }) => {
   const newItem = new Item ({
     name : req.body.name,
 });
 newItem.save()
       .then( (item: any) => res.json(item) );
});

router.delete('/:id',(req: { params: { id: any; }; }, res: { json: (arg0: { success: boolean; }) => any; status: (arg0: number) => { (): any; new(): any; json: { (arg0: { success: boolean; }): any; new(): any; }; }; }) => {
    Item.findById(req.params.id)
     .then( (item: { remove: () => Promise<any>; }) => item.remove(). then( () => res.json( {success:true} ) ) )
     .catch( (err: any) => res.status(404).json( {success:false} ) )
});
module.exports = router ;


