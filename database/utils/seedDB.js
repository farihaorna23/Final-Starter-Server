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
		address: "Cambridge",
		imageUrl: "https://images.unsplash.com/photo-1559135197-8a45ea74d367?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1074&q=80"
	});

	const dummy_student = await Student.create({
			firstname: "Joe",
			lastname: "Shmo",
			email: "joeshomo@ex.com"
		});

	await dummy_student.setCampus(dummy_campus);
	
}

module.exports = seedDB;