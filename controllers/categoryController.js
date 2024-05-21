import categoryModel from "../models/categoryModel.js";
import slugify from "slugify";

export const createCategoryController = async(req , res)=> {
    try{
        const {name} = req.body;
        //validate

        if(!name){
            return res.status(401).send({
                message: "Name is required"
            })
        }

        //existing category
        const existingCategory = await categoryModel.findOne({name});
        if(existingCategory){
            return res.status(200).send({
                success: true,
                message: "category already exist",
               
            })
        }

        const category = await new categoryModel({name , slug :slugify(name)}).save()
        res.status(200).send({
            success:true,
            message:"New Category created",
            category
        })
    }
    catch(error){
        console.log(error);
        res.status(500).send(
            {
                success : false,
                message : "Error in creating category",
                error
            }
        )
    }
}

export const updateCategoryController = async(req , res) =>{
 try{
  const {name} = req.body;
  const {id} = req.params;

  const category = await categoryModel.findByIdAndUpdate(id , {name , slug:slugify(name)} , {new : true})
  res.status(200).send({
    success: true,
    message:"category updated successfully",
    category
  })
 }
 catch(error){
    console.log(error)
    req.status(500).send({
        success:false,
        message:"Error in updating category",
        error
    })
 }
}

export const categoryController = async(req , res)=>{
    try{
        const category = await categoryModel.find({})
        res.status(200).send({
            success: true,
            message:"All categories list",
            category
        })
    }
    catch(error){
        console.log(error)
        res.status(500).send({
            success: false,
            messgae:"Error while getting all categories"
        })
    }
}

export const singleCategoryController = async(req , res)=>{
    try{
        const category = await categoryModel.findOne({slug : req.params.slug})
        if(!category){
            return res.status(401).send({
                success:false,
                message:"Category doesn't exist"
            })
        }

        res.status(200).send({
            success:true,
            message:"fetched single category",
            category
        })

    }
    catch(error){
        console.log(error)
        res.status(500).send({
            success:false,
            message:"Error while fetching this category"
        })
    }
}

export const deleteCategoryController = async(req , res)=>{
    try{
       const {id} = req.params
        await categoryModel.findByIdAndDelete(id);
        res.status(200).send({
            success: true,
            message:"Successfully deleted category"
        })

    }
    catch(error){
        console.log(error)
        res.status(500).send({
            success:false,
            message:"Error while deleting category"
        })
    }
}