const {getPagination, getPaginationData} = require('../helpers/pagination.helper');

///////// Redis get tower list cache
const towerListCache = (req, res, next)=>{
	const {page, size, q, show_with_offices} = req.query;
	const client = req.app.get('client');
	 client.get('tower_list', function(err, tower_list){
	 	if(err) {next();}
		if(tower_list){
			tower_list = JSON.parse(tower_list);
			client.get('tower_list_search', function(err, tls){
				if(err) {next();}
				if(tls){
					tls = JSON.parse(tls);

					if(tls.q == q && tls.show_with_offices == show_with_offices){
					const { limit, offset } = getPagination(page, size);
					const response = getPaginationData(tower_list, page, limit);
					return res.send(response);
					}
				}else{ next();}
			});
		}else{
			next();
		}
	 });
	
}

module.exports = {
	towerListCache,
};