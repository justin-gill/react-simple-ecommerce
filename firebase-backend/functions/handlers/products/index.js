const { db } = require("../../utils/admin");

// get single product
exports.getProduct = async (req, res) => {
  try {
    let productDoc = await db.doc('/products/' + req.params.name).get();
    let result = productDoc.data();
    return res.status(200).json({ result: result });
  } catch (error) {
    return res.status(404).json({ error: error });
  }
};

// remove a item from the cart all together
exports.removeItemCart = async (req, res) => {
  try{
    const email = req.body.email;
    let item = req.body.item;
    let itemDocRef = db.doc(`/users/${email}/cart/${item}`);

    // catch undefined body elements
    if(email === undefined || item === undefined){
      throw Error("Undefined elements in request..");
    } 

    await itemDocRef.delete();



    return res.status(200).json({result:true});
  }
  catch(error){
    return res.status(400).json({error:error});
  }  
}

// remove all items from the cart all together
exports.removeAllItemsCart = async (req, res) => {
  try{
    const email = req.body.email;
    let itemDocRef = await db.collection(`/users/${email}/cart`).get();
    
    itemDocRef.forEach((doc) => {
      doc.ref.delete();
    });

    // catch undefined body elements
    if(email === undefined){
      throw Error("Undefined elements in request..");
    } 

    await itemDocRef.delete();
    return res.status(200).json({result:true});
  }
  catch(error){
    return res.status(400).json({error:error});
  }  
}


// remove a single quantity of an item from the cart
exports.subtractItemQuantityCart = async (req, res) => { 
  try{
    const email = req.body.email;
    let item = req.body.item;
    let liveQuantity = req.body.quantity;
    let itemDocRef = db.doc(`/users/${email}/cart/${item}`);

    if(email === undefined || item === undefined){
      throw Error("Undefined elements in request..");
    }

    await itemDocRef.update({
      quantity: liveQuantity
    })
    
    return res.status(200).json({result:true});
  }
  catch(error){
    return res.status(400).json({error:error});
  }
}

// add a single quantity of an item from the cart
exports.addItemQuantityCart = async (req, res) => { 
  try{
    const email = req.body.email;
    let item = req.body.item;
    let liveQuantity = req.body.quantity;
    let itemDocRef = db.doc(`/users/${email}/cart/${item}`);

    if(email === undefined || item === undefined){
      throw Error("Undefined elements in request..");
    }

    await itemDocRef.update({
      quantity: liveQuantity
    })

    return res.status(200).json({result:true});
  }
  catch(error){
    return res.status(400).json({error:error});
  }
}



exports.getProducts = async (req, res) => {
  try {
    let productCollection = await db.collection('/products').get();
    let result = [];

    for (let doc of productCollection.docs) {
      // prepare result
      result.push({
        name: doc.name,
        ...doc.data(),
      });
    }

    return res.status(200).json({ result: result });
  } catch (error) {
    return res.status(404).json({ error: error });
  }
};

exports.getCartTotal = async (req, res) => {
  try{
    const email = req.user.email;

    let total = 0;

    let cartCollection = await db.collection(`/users/${email}/cart`).get();
    let cartItems = [];
  
    for (let doc of cartCollection.docs) {
      let docData = doc.data();
      let tempName = docData.productName;
      cartItems.push(
        {name: tempName, quantity : docData.quantity} 
      );
  
    for(let cItem of cartItems){
      // console.log(cItem);
      let item = await db.doc(`/products/${cItem.name}`).get();
      item = item.data();
      // console.log(item);
      total += (item.price * cItem.quantity);
    }
  }
  
    return res.status(200).json({ result: total });
  } catch (error) {
    console.log(error);
    return res.status(400).json({ error: error });
  }

}
  


exports.getCart = async (req, res) => {
  try {
    const email = req.user.email;
    

    let cartCollection = await db.collection(`/users/${email}/cart`).get();
    let result = [];
    let cart = [];

    for (let doc of cartCollection.docs) {
      let docData = doc.data();
      let tempName = docData.productName;
      cart.push(
        {name: tempName, quantity : docData.quantity} 
      );

      // prepare result
      result.push({
        name: doc.name,
        ...doc.data(),
      });
    }

    return res.status(200).json({ result: result });
  } catch (error) {
    console.log(error);
    return res.status(400).json({ error: error });
  }
};


// add a product to the user's cart
exports.addProductToCart = async (req, res) => {
  try {
    // console.log('here')
    const email = req.body.email;
    let product = req.body.product;
    // console.log(product)

    let cartDoc = await db.collection(`/users/${email.email}/cart`).doc(product);
    // get the number of the item in the cart, if it exists
    let numOfItem = 0;
    try {
      let cartProductDoc = await db.doc(`/users/${email.email}/cart/${product}`).get();
      let result = cartProductDoc.data();
      numOfItem = result['quantity']
    }
    catch (err) {
      console.log(err)
      console.log("Item not in cart, adding new item to cart")
    }
    if (numOfItem === 0) {
      cartDoc.set({
        productName: product,
        quantity: numOfItem + 1
      });
    } else {
      cartDoc.update({
        quantity: numOfItem + 1
      })
    }

    // make sure id is added before return
    // task.id = taskDoc.id;

    return res.status(200).json({ result: product });
  } catch (error) {
    console.log(error);
    return res.status(400).json({ error: error });
  }
};
