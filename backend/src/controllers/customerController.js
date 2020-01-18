const controller = {}

var Employee = require('../model/Employee');
var Role = require('../model/Role');
var sequelize = require('../model/mysql');

//migrar por si no hay tablas
sequelize.sync();

controller.get = async (req,res) => {
  const { id } = req.params;
  const data = await Employee.findAll({
      where: { id: id },
      include: [ Role ]
  })
  .then(function(data){
    return data;
  })
  .catch(error =>{
    return error;
  })
  res.json({ success: true, data: data });
}

controller.list = async (req, res) => {

  const data = await Employee.findAll({
    include: [ Role ]
  })
  .then(function(data){
    return data;
  })
  .catch(error => {
    return error;
  }); 

  res.json({success : true, data : data});

}

controller.create = async (req,res) => {
  // data
  const { name, email, address, phone, role } = req.body;
  // create
  const data = await Employee.create({
    name: name,
    email: email,
    address: address,
    phone: phone,
    roleId: role
  })
  .then(function(data){
    return data;
  })
  .catch(error =>{
    console.log("Errorazo "+error)
    return error;
  })
  // return res
  res.status(200).json({
    success: true,
    message:"Guardado exitosamente",
    data: data
  });
}

controller.update = async (req,res) => {
  // parameter get id
  const { id } = req.params;
  // parameter POST
  const {name, email, address, phone, role } = req.body;
  // Update data
  const data = await Employee.update({
    name:name,
    email:email,
    address:address,
    phone:phone,
    roleId:role
  },
  {
    where: { id: id}
  })
  .then( function(data){
    return data;
  })
  .catch(error => {
    return error;
  }) 
  res.json({success:true, data:data, message:"Updated successful"});
}

controller.delete = async (req, res) => {
  // parameter post
  const { id } = req.body;
  // delete sequelize
  const del = await Employee.destroy({
    where: { id: id}
  })
  res.json({success:true,deleted:del,message:"Deleted successful"});
}

//migrar los modelos en la db (prueba)
controller.testdata = async ( req, res) => {
  
  const response = await sequelize.sync().then(function() {

    //Create role
    /*Role.create({
      role:  'Admin'
    });*/

    // create employee
    /*Employee.create({
      name: 'Jhon Smith',
      email:  'jhonsmith@mail.com',
      address: 'Malibu Cr 10 No 54',
      phone: '123456789',
      roleId:1
    });*/

    //llama todos los datos de empleados
     const data =  Employee.findAll();
     return data;
  })
  .catch(err => {
    return err;
  });
  res.json({success: true, data: response})

}

/*controller.list = async ( req, res) => {

    const data = await Employee.findAll();
    res.json(data)

}*/

//prueba
controller.test = (req,res) => {

  const data = {
    name: "Jhon Smith",
    age: 20,
    city: 'London'
  }

  console.log("Send data from controller employee");
  res.json(data);

};

module.exports = controller;