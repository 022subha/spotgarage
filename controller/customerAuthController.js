const {sendOtp, verifyOtp} = require('../util/otp');

//* Helper functions
const registerTheUser = async (username, phone, collection) => {
    
    let user = await collection.findOne({phone});
    
    if(!user)
    {
        let newUser = await collection.insertOne({username, phone, createdAt: new Date()});
        return {status:true, newUser};
    }
    else 
        return {status: false, msg: "User already exist!!", user};
}


//* Main functions
exports.userRegister = async (req, res, next) => {

    try 
    {
        const { userMobile, userName } = req.body;

        const db = global.db.db('spotgrage');
        const collection = db.collection('users');

        const data = await registerTheUser(userName, userMobile, collection);

        (!data.status) ? res.status(400).json({status:false, message: data.msg}) : res.status(200).send(data.newUser);

    }
    catch (err) 
    {
        console.log(err);
    }

}

exports.userOtpSend = async (req, res) => {
    try 
    {
        const {userMobile} = req.body;
        // mongoClient = await connectWithDb();
        const db = global.db.db('spotgrage');
        const collection = db.collection('users');
        let user = await collection.findOne({phone:userMobile});

        (await sendOtp(userMobile) && user) ? res.status(200).json({status: true , message : "User already exist!!"}) : res.status(400).json({status: false ,  message : "User does not exist!!"});   
    }
    catch (error) 
    {
        console.log(error);
        res.status(500).json({message: "Internal Server Error"});
    }
}

exports.userOtpVerify = async (req , res , next) => {
    try 
    {
        const {userMobile , userOtp} = req.body;
        if(await verifyOtp(userMobile , userOtp))
            res.status(200).json({status: true});
        else
            res.status(400).json({status: false});
    } 
    catch (error) 
    {
        console.log(error);
        res.status(500).json({message: "Internal Server Error"});
    }
}

exports.userLogin = async (req, res, next) => {

    try 
    {
        const { userMobile } = req.body;

        // mongoClient = await connectWithDb();
        const db = global.db.db('spotgrage');
        const collection = db.collection('users');

        let confirmUser = await collection.findOne({phone: userMobile});

        if(!confirmUser)
            return res.status(400).json({status: false, msg: "Please go for the registration!!"});
        
        await this.userOtpSend(req, res);
    }
    catch (err) 
    {
        console.log(err);
    }

}