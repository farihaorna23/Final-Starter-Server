const express = require('express');
const router = express.Router();
const { Student, Campus } = require('../database/models');

//so we don't have to use try-catch for each request handler
const ash = require('express-async-handler');

/** GET ALL STUDENTS: then/catch */
// router.get('/', function(req, res, next) {
//   Student.findAll({include: [Campus]})
//     .then(students => res.status(200).json(students))
//     .catch(err => next(err));
// });

/** GET ALL STUDENTS: async/await */
// router.get('/', async (req, res, next) => {
//   try {
//     let students = await Student.findAll({include: [Campus]});
//     res.status(200).json(students);
//   } catch(err) {
//     next(err);
//   }
// });

/** GET ALL STUDENTS: express-async-handler (ash) */
// automatically catches any error and sends to middleware
// same as using try/catch and calling next(error)
router.get('/', ash(async(req, res) => {
  let students = await Student.findAll({include: [Campus]});
  res.status(200).json(students);
}));

/** GET STUDENT BY ID */
router.get('/:id', ash(async(req, res) => {
  let student = await Student.findByPk(req.params.id, {include: [Campus]});
  res.status(200).json(student);
}));

/** ADD NEW STUDENT */
router.post('/', ash(async(req, res, next) => {
  const campusId= req.body.campusId
  console.log("CampusId", campusId)
  const studentCreate=req.body
  delete studentCreate.campusId
  try{
    const campusToAssociate= await Campus.findOne({where:{id:campusId}})
    console.log("Campus", campusToAssociate) 
    const newStudent= await Student.create(studentCreate) 
    await newStudent.setCampus(campusToAssociate)
    res.status(201).json(newStudent)
  }
  catch(err){
  res.status(400).json({message: "Invalid Information"})
  }
}));

/** DELETE STUDENT */
router.delete('/:id', function(req, res, next) {
  Student.destroy({
    where: {
      id: req.params.id
    }
  })
    .then(() => res.status(200).json("Deleted a student!"))
    .catch(err => next(err));
});

/******************* EDIT *********************/

router.put('/:id', ash(async(req, res) => {
  await Student.update(req.body,
        { where: {id: req.params.id} }
  );
  let updatedCampus=await Campus.findByPk(req.body.campusId)
  let student = await Student.findByPk(req.params.id, {include: [Campus]});
  await student.setCampus(updatedCampus)
  res.status(201).json(student);
}));

// Export our router, so that it can be imported to construct our apiRouter;
module.exports = router;