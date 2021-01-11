const db = require('../models');
const Tower = db.tower;
const OP = db.Sequelize.Op;
const {getPagination, getPaginationData} = require('../helpers/pagination.helper');

// Save new tower
const createTower = (req, res)=>{
	// Create tower
	const tower = {
      name: req.body.name,
      location: req.body.location,
      number_of_floors: req.body.number_of_floors,
      number_of_offices: req.body.number_of_offices,
      rating: req.body.rating,
      latitude: req.body.latitude,
      longitude: req.body.longitude
	};

	// Save tower
	Tower.create(tower)
		.then(data => {
			const io = req.app.get('socketio');
			const client = req.app.get('client');
			client.del('tower_list');
			io.emit("tower-create", "New tower created");
			res.send({success: true, message:"Created successfully",  data: data});
		})
		.catch(err => {
			res.status(500)
				.send(
					{   success: false,
						message: "Exception Error",
						data: err.message,
					}
				);
		});
} 


// Get towers list	
const getTowers = (req, res)=>{
	const {page, size, q, show_with_offices} = req.query;
	const { limit, offset } = getPagination(page, size);
	const condition = {
			number_of_offices:show_with_offices == "true" ?{[OP.gte]: 0}: {[OP.lte]: 0}, 
			[OP.or]: [
				{name: {[OP.like]: '%'+ q + '%'}},
				{location: {[OP.like]: '%{q}%'}},
				{rating: {[OP.like]: '%{q}%'}},
				{number_of_floors: {[OP.like]: '%{q}%'}},
				{number_of_offices: {[OP.like]: '%{q}%'}},
				]
			};
	Tower.findAndCountAll(
			{
				limit,
				offset,
				where: condition,
			}
		).then(data => {
			if(data.length >= 0)
			{
						const client = req.app.get('client');
						const param = {q:q, show_with_offices:show_with_offices};
						const rs = client.setex('tower_list', 360, JSON.stringify(data));
						const rs2 = client.setex('tower_list_search', 360, JSON.stringify(param));
			}
			const response = getPaginationData(data, page, limit);
			res.send(response);
	})
	.catch(err => {
		res.status(500)
			.send(
					{
						message: err.message,
					}
				);
	});
}

//Update tower
const updateTower = (req, res)=>{
	const id = req.body.id;
	// tower
	const tower = {
      name: req.body.name,
      location: req.body.location,
      number_of_floors: req.body.number_of_floors,
      number_of_offices: req.body.number_of_offices,
      rating: req.body.rating,
      latitude: req.body.latitude,
      longitude: req.body.longitude
	};

	// Update tower
	Tower.update(tower, {where:{id: id}})
		.then(st => {
			if(st == 1)
			{
				const client = req.app.get('client');
				client.del('tower_list');
				const io = req.app.get('socketio');
				io.emit("tower-update", "Tower updated");
				res.send({success: true, message: "Updated successfully"});
			}
			else
				res.send({success: false,message: "Not Updated, may be record not found"});
		})
		.catch(err => {
		res.status(500)
			.send(
					{
						success: false,
						message: "Exception error",
						data: err.message
					}
				);
	});	

}

// Delete tower 
const deleteTower = (req, res)=>{
	const id = req.query.tower_id;

	Tower.destroy({where:{id: id}})
		.then(st => {
			
			if(st == 1){
				const client = req.app.get('client');
				client.del('tower_list');
				const io = req.app.get('socketio');
				io.emit("tower-delete", "Tower deleted");
				res.send({message: "Deleted successfully"});
			}
			else
				res.send({message: "Not Deleted, may be record not found"});
		})
		.catch(err => {
		res.status(500)
			.send(
					{
						message: err.message,
					}
				);
	});
}

module.exports = {
	createTower,
	getTowers,
	deleteTower,
	updateTower,
};