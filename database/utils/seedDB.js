const { Campus, Student } = require('../models');

const seedDB = async () => {
	const dummy_campus = await Campus.create({
		name: "Hunter College",
		description: "This is a school in NYC.",
		address: "695 Park Avenue"
	});
	const dummy_campus2 = await Campus.create({
		name: "Harvard",
		description: "This is a school in MA.",
		address: "Cambridge"
	});

	const dummy_student = await Student.create({
			firstname: "Joe",
			lastname: "Shmo",
			email: "joeshomo@ex.com",
			campusname: "Harvard"
		});

	await dummy_student.setCampus(dummy_campus);
	
}

module.exports = seedDB;