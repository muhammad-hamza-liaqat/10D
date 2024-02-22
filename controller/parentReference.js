const parentReferenceModel = require("../models/parentReferences");

const findParent = async (req, res) => {
  const _id = req.params.id;
  if (!_id) {
    return res.status(400).json({ message: "id not available in the params" });
  }

  try {
    const nodeToFind = await parentReferenceModel.findOne({ _id: _id });
    if (!nodeToFind) {
      return res.status(404).json({ message: "Parent not found" });
    }
    return res
      .status(200)
      .json({ message: "Parent found!", data: nodeToFind.parent });
  } catch (error) {
    console.error("Error finding parent:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

const subTree = async (req, res) => {
    const _id = req.params.id;
    if (!_id) {
      return res.status(400).json({ message: "id not available in the params" });
    }
  
    try {
      const subtree = await parentReferenceModel.aggregate([
        {
          $match: {
            _id: _id
          }
        },
        {
          $graphLookup: {
            from: "parentreferences", // Name of the collection
            startWith: "$_id",
            connectFromField: "_id",
            connectToField: "parent",
            as: "subtree"
          }
        },
        {
          $project: {
            subtree: 1
          }
        }
      ]);
  
      if (!subtree || subtree.length === 0) {
        return res.status(404).json({ message: "Subtree not found" });
      }
  
      return res.status(200).json({ message: "Subtree found!", data: subtree[0].subtree });
    } catch (error) {
      console.error("Error finding subtree:", error);
      return res.status(500).json({ message: "Internal server error" });
    }
  };
  
module.exports = { findParent, subTree };
