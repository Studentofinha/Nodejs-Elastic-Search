const express = require("express");
const router = express.Router();
const { Client } = require("@elastic/elasticsearch");
const esClient = new Client({ node: "http://localhost:9200" });

router.post("/", async (req, res) => {
  try {
    const { name, description, price } = req.body;
    const response = await esClient.index({
      index: "products",
      body: { name, description, price },
    });

    res.status(201).json(response.body);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error creating product" });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const response = await esClient.get({
      index: "products",
      id,
    });

    res.json(response.body);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error getting product" });
  }
});

router.put('/:id',async (req,res)=>{
    try{
        const {id}=req.params
        const {name,description,price}=req.body

        const response=await esClient.update({
            index:'products',
            id,
            body:{doc:{name,description,price}},
        })
        res.send(response.body)


    }catch (error){
        console.error(error)
        res.send(500).json({error:'Error updating product'})
    }
})

router.delete('/:id', async (req,res)=>{
    try {
        const {id}=req.params
        const response=await esClient.delete({
            index:'products',
            id,

        })

        res.send(response.body)
    } catch (error) {
        console.error(error)
        res.send(500).json({error:'Error while deleting product'})
    }
})


module.exports = router;
