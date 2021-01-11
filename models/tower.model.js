module.exports = (sequelize, Sequelize) => {
  const Tower = sequelize.define("tower", {
    name: {
      type: Sequelize.STRING
    },
    location: {
      type: Sequelize.STRING
    },
    number_of_floors: {
      type: Sequelize.INTEGER
    },
    number_of_offices: {
      type: Sequelize.INTEGER
    },
    rating: {
      type: Sequelize.INTEGER
    },
    latitude: {
      type : Sequelize.STRING
    },
    longitude: {
      type: Sequelize.STRING
    }
  });


/////// Sync tower and insert data
  Tower.sync().then(() => {
    Tower.findAll().then(data => {
      if(data.length <= 0){
        Tower.create({
          name: 'Dubai Tower',
          location: 'Dubai',
          rating: 4.1,
          number_of_offices: 10,
          number_of_floors: 20,
          latitude: '19.6767',
          longitude: '34.67676'
        });
      }
    });
  
});

  return Tower;
};