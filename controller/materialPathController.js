const materialPathModel = require("../models/MaterializePath");
const findSubTree = async (req, res) => {
    try {
      const subTree = await materialPathModel.aggregate([
        {
          $match: { _id: req.params.id }
        },
        {
          $graphLookup: {
            from: 'materialpaths',
            startWith: '$path',
            connectFromField: 'path',
            connectToField: '_id',
            as: 'subTree'
          }
        }
      ]);
  
      res.json(subTree);
    } catch (err) {
      console.error('Error finding sub-tree:', err);
      res.status(500).json({ error: 'Internal server error' });
    }
  };
module.exports = {findSubTree}