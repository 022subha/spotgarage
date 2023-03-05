//* Controller to select the vechicle
const { ObjectID } = require("bson");

//? Helper Function

const getTheBrands = async (collection, brandId) => {
  let data = await collection.find({ vechtype_id: brandId }).toArray();
  return data;
};

const getTheModel = async (collection, brand, modelType) => {
  return await collection
    .find({ brand_id: brand, vechtype_id: modelType })
    .toArray();
};

const getTheModelFuel = async (collection, model) => {
  return await collection.findOne({ _id: new ObjectID(model) });
};

const getGarages = async (longitude, latitude) => {

  try 
  {
    const db = global.db.db("spotgrage");

    let data = await db
      .collection("garage")
      .aggregate([
        {
          $geoNear: {
            near: {
              type: "Point",
              coordinates: [longitude || 0, latitude || 0],
            },
            distanceField: "string",
            maxDistance: 50000,
            spherical: true,
          },
        },
      ])
      .toArray();
    return data;
  } 
  catch (error) 
  {
    console.log(error);
  } 
}


//? Main serving functions

exports.getBrandsCollection = async (req, res, next) => {

  try 
  {
    let brandId = req.params.brandId;

    const db = global.db.db("spotgrage");
    const collection = db.collection("brand");
    const data = await getTheBrands(collection, brandId);
    res.status(200).send(data);

  } 
  catch (err) 
  {
    console.log(err);
  } 
};

exports.getTheModelOfBrand = async (req, res, next) => {
  
  try 
  {
    let brand = req.params.brand;
    let modelType = req.params.modelType;

    const db = global.db.db("spotgrage");
    const collection = db.collection("model");

    const data = await getTheModel(collection, brand, modelType);
    res.status(200).send(data);
  } 
  catch (err) 
  {
    console.log(err);
  } 
};

exports.getTheModelFuelType = async (req, res, next) => {

  try {
    let model = req.params.model;

    const db = global.db.db("spotgrage");
    const collection = db.collection("model");
    const data = await getTheModelFuel(collection, model);

    res.status(200).send(data);
  } catch (err) {
    console.log(err);
  }
};

exports.getCity = async (req, res, next) => {
  

  try {

    const db = global.db.db("spotgrage");
    const collection = db.collection("city");
    const data = await collection.find().toArray();
    res.status(200).send(data);

  } 
  catch (err) 
  {
    console.log(err);
  } 
};

exports.insertGarageDataService = async (req, res, next) => {
  

  try {
    // let model = req.body.services;
    let services = [
      {
        "model":"ritz",
        "fuelType":"gas",
        "fuelCode":"GS30",
        "brandId":"MS16",
          "services": [
              {
                "serviceName": "servicing",
                "serviceCode":"SER01",
                "serviceStatus": true,
                "cId": new ObjectID(),
                "providedService":[
                  {
                    "type": "basic",
                    "ccId":new ObjectID(),
                    "includedServices": [
                      "Engine Oil Replacement",
                      "Air Filter Cleaning",
                      "Wiper Fluid Replacement",
                      "Heater/ Spark Plugs Checking",
                      "Interior Vacuuming",
                      "Oil Filter Replacement",
                      "Coolant Top up",
                      "Battery Water Top up",
                      "Car Wash"
                    ],
                    "price": 1699
                  },
                  {
                    "type": "standard",
                    "serviceStatus": true,
                    "ccId":new ObjectID(),
                    "includedServices": [
                      "Engine Oil Replacement",
                      "Air Filter Replacement",
                      "Cabin Filter / AC Filter Cleaning",
                      "Wiper Fluid Replacement",
                      "Battery Water Top up",
                      "Car Wash",
                      "Scanning ",
                      "Front Brake Pads Serviced",
                      "Oil Filter Replacement",
                      "Fuel Filter Checking",
                      "Coolant Top up (200 ml)",
                      "Brake Fluid Top up (50 ml)",
                      "Heater/Sparks Plugs Checking",
                      "Interior Vacuuming",
                      "Rear Brake Shoes Serviced"
                    ],
                    "price": 2799
                  }
                ]
              },
              {
                "serviceName": "ac services",
                "serviceCode":"ACS02",
                "serviceStatus": true,
                "cId": new ObjectID(),
                "providedServices": [
                  {
                    "type": "regular",
                    "serviceStatus": true,
                    "ccId":new ObjectID(),
                    "includedServices": [
                      "AC Gas Top-up (up to 400gms)",
                      "AC Filter Cleaning",
                      "AC Inspection",
                      "Condenser Cleaning",
                      "AC Vent Cleaning"
                    ],
                    "price": 1599
                  },
                  {
                    "type": "standard",
                    "serviceStatus": true,
                    "ccId":new ObjectID(),
                    "includedServices": [
                      "AC Gas Replacement (Up to 600gms)",
                      "Compressor Oil Top-up (Up to 200ml)",
                      "Condenser Cleaning ",
                      "AC Vent Cleaning",
                      "Dashboard Cleaning",
                      "Dashboard Removing Refitting",
                      "Cooling Coil Cleaning (Front + Rear)",
                      "AC Filter Cleaning",
                      "AC Leak Test"
                    ],
                    "price": 3199
                  }
                ]
              },
              {
                "serviceName": "denting-painting",
                "serviceCode":"DP03",
                "serviceStatus": true,
                "cId": new ObjectID(),
                "providedServices": [
                  {
                    "type": "full body",
                    "serviceStatus": true,
                    "ccId":new ObjectID(),
                    "includedServices": [
                      "Full denting work",
                      "Grade A Primer",
                      "4 Layers of Painting",
                      "Premium DuPont Paint",
                      "Panel Rubbing Polishing"
                    ],
                    "price": 24000
                  },
                  {
                    "type": "Bonnet",
                    "serviceStatus": true,
                    "ccId":new ObjectID(),
                    "includedServices": [
                      "Full denting work",
                      "Grade A Primer",
                      "4 Layers of Painting",
                      "Premium DuPont Paint",
                      "Panel Rubbing Polishing"
                    ],
                    "price": 1800
                  },
                  {
                    "type": "Front Bumper",
                    "serviceStatus": true,
                    "ccId":new ObjectID(),
                    "includedServices": [
                      "Full denting work",
                      "Grade A Primer",
                      "4 Layers of Painting",
                      "Premium DuPont Paint",
                      "Panel Rubbing Polishing"
                    ],
                    "price": 1800
                  },
                  {
                    "type": "Rear Bumper",
                    "serviceStatus": true,
                    "ccId":new ObjectID(),
                    "includedServices": [
                      "Full denting work",
                      "Grade A Primer",
                      "4 Layers of Painting",
                      "Premium DuPont Paint",
                      "Panel Rubbing Polishing"
                    ],
                    "price": 1800
                  },
                  {
                    "type": "Boot Paint",
                    "serviceStatus": true,
                    "ccId":new ObjectID(),
                    "includedServices": [
                      "Full denting work",
                      "Grade A Primer",
                      "4 Layers of Painting",
                      "Premium DuPont Paint",
                      "Panel Rubbing Polishing"
                    ],
                    "price": 1800
                  },
                  {
                    "type": "Left Fender Paint",
                    "serviceStatus": true,
                    "ccId":new ObjectID(),
                    "includedServices": [
                      "Full denting work",
                      "Grade A Primer",
                      "4 Layers of Painting",
                      "Premium DuPont Paint",
                      "Panel Rubbing Polishing"
                    ],
                    "price": 1800
                  },
                  {
                    "type": "Left Front Door Paint",
                    "serviceStatus": true,
                    "ccId":new ObjectID(),
                    "includedServices": [
                      "Full denting work",
                      "Grade A Primer",
                      "4 Layers of Painting",
                      "Premium DuPont Paint",
                      "Panel Rubbing Polishing"
                    ],
                    "price": 1800
                  },
                  {
                    "type": "Left Rear Door Paint",
                    "serviceStatus": true,
                    "ccId":new ObjectID(),
                    "includedServices": [
                      "Full denting work",
                      "Grade A Primer",
                      "4 Layers of Painting",
                      "Premium DuPont Paint",
                      "Panel Rubbing Polishing"
                    ],
                    "price": 1800
                  },
                  {
                    "type": "Left quarter Panel Paint",
                    "serviceStatus": true,
                    "ccId":new ObjectID(),
                    "includedServices": [
                      "Full denting work",
                      "Grade A Primer",
                      "4 Layers of Painting",
                      "Premium DuPont Paint",
                      "Panel Rubbing Polishing"
                    ],
                    "price": 1800
                  },
                  {
                    "type": "Right Fender Paint",
                    "serviceStatus": true,
                    "ccId":new ObjectID(),
                    "includedServices": [
                      "Full denting work",
                      "Grade A Primer",
                      "4 Layers of Painting",
                      "Premium DuPont Paint",
                      "Panel Rubbing Polishing"
                    ],
                    "price": 1800
                  },
                  {
                    "type": "Right Front Door Paint",
                    "serviceStatus": true,
                    "ccId":new ObjectID(),
                    "includedServices": [
                      "Full denting work",
                      "Grade A Primer",
                      "4 Layers of Painting",
                      "Premium DuPont Paint",
                      "Panel Rubbing Polishing"
                    ],
                    "price": 1800
                  },
                  {
                    "type": "Right Rear Door Paint",
                    "serviceStatus": true,
                    "ccId":new ObjectID(),
                    "includedServices": [
                      "Full denting work",
                      "Grade A Primer",
                      "4 Layers of Painting",
                      "Premium DuPont Paint",
                      "Panel Rubbing Polishing"
                    ],
                    "price": 1800
                  },
                  {
                    "type": "Right quarter Panel Paint",
                    "serviceStatus": true,
                    "ccId":new ObjectID(),
                    "includedServices": [
                      "Full denting work",
                      "Grade A Primer",
                      "4 Layers of Painting",
                      "Premium DuPont Paint",
                      "Panel Rubbing Polishing"
                    ],
                    "price": 1800
                  },
                  {
                    "type": "Alloy Paint",
                    "serviceStatus": true,
                    "ccId":new ObjectID(),
                    "includedServices": [
                      "Full denting work",
                      "Grade A Primer",
                      "4 Layers of Painting",
                      "Premium DuPont Paint",
                      "Panel Rubbing Polishing"
                    ],
                    "price": 700
                  }
                ]
              },
              {
                "serviceName": "wheel and tyre care",
                "serviceCode":"WTC04",
                "serviceStatus": true,
                "cId": new ObjectID(),
                "providedServices": [
                  {
                    "type": "Wheel Alignment & Balancing",
                    "ccId":new ObjectID(),
                    "serviceStatus": true,
                    "includedServices": [
                      "Automated Wheel Balancing",
                      "Wheel Rigidity Inspection",
                      "Laser Assisted Wheel Alignment",
                      "Camber and Castor Adjustment",
                      "Weight Correction",
                      "Alloy Weights Additional",
                      "Steering Adjustment and Correction"
                    ],
                    "price": 999
                  }
                ]
              },
              {
                "serviceName": "inspection",
                "serviceCode":"INS05",
                "serviceStatus": true,
                "cId": new ObjectID(),
                "providedServices": [
                  {
                    "type": "Full Body Checkup",
                    "includedServices":[
                    "Engine oil check  up",
                    "Coolant check up",
                    "AC check up",
                    "Water fluid check up"
                  ],
                    "price": 599
                  }
                ]
              }
            ],
          "working":true,
          "zone":"patna"
      }
  ];

    // mongoClient = await connectWithDb();
    const db = global.db.db("spotgarage");
    const collection = db.collection("carmodels");

    let reponseService = await collection.insertOne(services[0]);

    res.status(200).send(reponseService);
  } catch (err) {
    console.log(err);
  } 
};

exports.getTheNearestGarage = async (req, res, next) => {
  
  try 
  {
    const { longitude, latitude } = req.body;

    //* Gather all the garages near the user location
    let data = await getGarages(longitude, latitude);

    if (!data) 
      res.status(400).json({status: false, msg: "Please check the coordinates!!"});

    let garageServiceId = [];

    data.map(item => {
      garageServiceId.push(item.garageService);
    });

    let db = global.db.db("spotgrage");

    //* get the services provided by the garages

    let serviceCollector = new Set();

    for(let i=0 ; i<garageServiceId.length ; i++)
    {
      const sdata = await db.collection('garageservice').findOne({_id: new ObjectID(garageServiceId[i])});

      if(sdata.serviceCount === 5)
        return res.status(200).send(["servicing", "ac-services", "denting-painting", "wheel-care", "cleaning"]);

      if(sdata.serviceCount < 5)
        sdata.services.map(item => {
          serviceCollector.add(item.serviceName)
        });
    }

    let finalService = [...serviceCollector];
  
    res.status(200).send(finalService);
  } 
  catch (err) 
  {
    console.log(err);
  }
};

exports.getTheNearestGarageService = async (req, res, next) => {

  try 
  {
    let categoryId  = req.params.categoryId;
    const { longitude, latitude } = req.body;

    let data = await getGarages(longitude, latitude);
    
    if (!data) 
      res.status(400).json({status: false, msg: "Please check the coordinates!!"});

    let garageServiceId = [];
    
    data.map(item => {
      garageServiceId.push(item.garageService);
    });
    
    //* get the services provided by the garages
    
    let db = global.db.db("spotgrage");
    let selectedService = [];

    // Getting the particular service
    for(let i=0 ; i<garageServiceId.length ; i++)
    {
      const sdata = await db.collection('garageservice').findOne({_id: new ObjectID(garageServiceId[i])});

      sdata.services.forEach(element => {

        if(element.serviceName === categoryId && element.serviceStatus)
          selectedService.push(element);
      });
    }

    res.status(200).json(selectedService);
  } 
  catch (err) 
  {
    console.log(err);
  }
};

